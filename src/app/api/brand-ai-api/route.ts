import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import axios from "axios";
import { READER_PROMPT, RESEARCHER_SYSTEM_PROMPT } from "@/contants/prompts";
import { Annotation, END, StateGraph } from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages";

const google_ai_api_key = 'AIzaSyBX28F6rAtuaOR-6EMsxr-1Z6TwtKY6Muw';
const jina_authorization_token = "jina_16bbc0cffc604081a7b312eb4ae0c05ccyJ1X0KiNFcOLASKtYqAsc1VoWU3";

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-pro",
  temperature: 0,
  apiKey: google_ai_api_key,
});

export async function GET() {
  return NextResponse.json({ message: 'Hello from Next.js!' });
}

class Queries {
  queries: any[];
  constructor(queries: any[]) {
    this.queries = queries;
  }
}



const AgentState = Annotation.Root({
  term: Annotation<string>,
  scraped_data: Annotation<any[]>({
    reducer: (currentState, updateValue) => currentState.concat(updateValue),
    default: () => [],
  }),

  result: Annotation<any[]>({
    reducer: (currentState, updateValue) => currentState.concat(updateValue),
    default: () => [],
  }),
  keywords: Annotation<any[]>({
    reducer: (currentState, updateValue) => currentState.concat(updateValue),
    default: () => [],
  }),
  criteria: Annotation<any[]>({
    reducer: (currentState, updateValue) => currentState.concat(updateValue),
    default: () => [],
  }),
  total_searched: Annotation<number>,
  max_search: Annotation<number>
});

// class AgentState {
//   term: string = ""
//   scraped_data: any[] = []
//   result: any[] = []
//   keywords: any[] = []
//   criteria: any[] = []
//   total_searched: number | null = null
//   max_search: number | null = null
// }


async function getUrlScrapedData(link: string) {
  const url = `https://r.jina.ai/${link}`;
  const headers = {
    'Accept': 'application/json',
    'Authorization': jina_authorization_token
  };

  try {
    const response = await axios.get(url, { headers });
    const data = response.data;

    if (data.code !== 200) {
      return [];
    }
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function researchUsingJina(query: string) {
  const url = `https://s.jina.ai/${query}`;
  const headers = {
    'Accept': 'application/json',
    'Authorization': jina_authorization_token
  };

  try {
    const response = await axios.get(url, { headers });
    const data = response.data;

    if (data.code !== 200) {
      return [];
    }
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

const research_term = async (state: typeof AgentState.State) => {
  const queries = await model.withStructuredOutput(Queries).invoke([
    ["system", RESEARCHER_SYSTEM_PROMPT],
    ["human", `Term: ${state.term}\nKeywords: ${state.keywords}\nCriteria: ${state.criteria}`]
  ]);
  const content = [];
  for (const q of queries) {
    console.log('=====', q);
    const response = await researchUsingJina(q);

    if (response.length > 0) {
      const scrapedUrl = await getUrlScrapedData(response[0].url);
      content.push(scrapedUrl.content);
    }
  }
  return {
    scraped_data: content,
    total_searched: state.total_searched + 1
  }
}

const read_web_data = async (state: typeof AgentState.State) => {
  const response = await model.invoke([
    ["system", READER_PROMPT],
    ["human", `Here is the scraped_data: ${state['scraped_data']} and \
                     term: ${state.term}, keywords: ${state.keywords} and criteria: ${state.criteria}`]
  ]);
  return {
    result: response,
  }
}

const check_researches = (state: typeof AgentState.State) => {
  if (state.total_searched > state.max_search) {
    return END
  }
  return "research";
}

export async function POST(request: NextRequest) {
  const builder = new StateGraph(AgentState)
    .addNode("searcher", research_term)
    .addNode("reader", read_web_data)
    .addEdge("__start__", "searcher")
    .addEdge("searcher", "reader");

  builder.addConditionalEdges(
    "reader",
    check_researches,
    { END: END, "research": "searcher" }
  )

  const graph = builder.compile();

  const thread = { "configurable": { "thread_id": "1" } }
  const response = graph.stream({
    "term": "Top organic skincare brands in Japan",
    "keywords": ["natural", "moisturizing"],
    "criteria": ["Price", "Quality"],
    "max_search": 2,
    "total_searched": 0,
  }, thread);
  console.log("responseee", response);
  return NextResponse.json({ message: "Hello World", response }, { status: 200 });
}
