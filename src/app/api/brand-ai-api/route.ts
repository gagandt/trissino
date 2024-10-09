import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import axios from "axios";
import { READER_PROMPT, RESEARCHER_SYSTEM_PROMPT } from "@/contants/prompts";
import { Annotation, END, MemorySaver, StateGraph } from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages";
import { headers } from "next/headers";

const google_ai_api_key = 'AIzaSyBX28F6rAtuaOR-6EMsxr-1Z6TwtKY6Muw';
const jina_authorization_token = "jina_67bd5778df3f42b8846f10ce684275fd6_gaE2JkA-36Ex0BiaA1i3vmTFaF";

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-flash",
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
    reducer: (currentState, updateValue) => {
      const tempCurrentState = [...currentState];
      updateValue.forEach(element => {
        const exixts = tempCurrentState.find(ele => ele.brand === element.brand);
        if (!exixts) {
          tempCurrentState.push(element);
        }
      });
      return tempCurrentState;
    },
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
    console.error('Error fetching data:', error?.message);
    return [];
  }
}

async function researchUsingJina(query: string) {
  // console.log("query ====================", query)
  const url = `https://s.jina.ai/search`;
  const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': jina_authorization_token,
  };

  try {
    const response = await axios({
      method: "POST",
      url,
      data: {
        q: `${query}`
      },
      headers: {
        ...requestHeaders
      }
    });
    const data = response.data;
    if (data.code !== 200) {
      return [];
    }
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error?.message);
    return [];
  }
}

const research_term = async (state: typeof AgentState.State) => {
  const queries = await model.invoke([
    ["system", RESEARCHER_SYSTEM_PROMPT],
    ["human", `Term: ${state.term}\nKeywords: ${state.keywords}\nCriteria: ${state.criteria}`]
  ]);
  const content: any[] = [];
  console.log(queries.content)
  const response = await researchUsingJina(queries.content as string);
  // console.log("response", response)

  if (response.length > 0) {
    for (const ele of response) {
      const scrapedUrl = await getUrlScrapedData(ele.url);
      content.push(scrapedUrl.content);
    }
    // console.log("scrapedUrl", scrapedUrl)
  }
  // console.log("contenttt", content)
  // for (const q of queries) {
  //   console.log('=====', q);
  // }
  return {
    scraped_data: content,
    total_searched: state.total_searched + 1
  }
}

const read_web_data = async (state: typeof AgentState.State) => {
  // console.log("stateeee, ===============================================", state);
  const response = await model.invoke([
    ["system", READER_PROMPT],
    ["human", `Here is the scraped_data: ${state['scraped_data']} and \
                     term: ${state.term}, keywords: ${state.keywords} and criteria: ${state.criteria}`]
  ]);
  console.log("=====================");
  console.log("=====================");

  const data = response.content?.split('json')[1].split('```')[0];
  // console.log("responsee",)
  console.log("=====================");
  console.log("=====================");
  return {
    result: JSON.parse(data),
  }
}

const check_researches = (state: typeof AgentState.State) => {
  if (state.total_searched > state.max_search) {
    return "END"
  }
  return "research";
}

export async function POST(request: NextRequest) {
  const builder = new StateGraph(AgentState)
    .addNode("searcher", research_term)
    .addNode("reader", read_web_data)
    .addEdge("__start__", "searcher")
    .addEdge("searcher", "reader")
    .addConditionalEdges(
      "reader",
      check_researches,
      { END: END, research: "searcher" }
    );
  const checkpointer = new MemorySaver();
  const graph = builder.compile({ checkpointer });
  console.log("graphhh", graph.getGraph())

  const thread = { "configurable": { "thread_id": "1" } }
  try {
    const response = await graph.invoke({
      "term": "Top organic skincare brands in Japan",
      "keywords": ["natural", "moisturizing"],
      "criteria": ["Price", "Quality"],
      "max_search": 2,
      "total_searched": 1,
    }, thread);

    console.log("Final response:", response);
    return NextResponse.json({ message: "Hello World", data: response.result }, { status: 200 });
  } catch (error) {
    console.log("ERORRR", error?.message);
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
}
