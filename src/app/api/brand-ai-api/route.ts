import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import axios from "axios";
import { BRANDS_LINK_GENERATOR, READER_PROMPT, RESEARCHER_SYSTEM_PROMPT } from "@/contants/prompts";
import { Annotation, END, MemorySaver, StateGraph } from "@langchain/langgraph";
import { BaseMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { headers } from "next/headers";
import { CriteriaType } from "@/stores/steve-analysis-query-store";
import { z } from "zod";
import { StructuredTool } from "node_modules/@langchain/core/dist/tools";
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from "@langchain/core/output_parsers";

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-flash",
  temperature: 0,
  apiKey: process.env.GOOGLE_AI_API_KEY,
});


const AgentState = Annotation.Root({
  query: Annotation<string>,
  term: Annotation<string>,
  country: Annotation<string>,
  city: Annotation<string>,
  scraped_data: Annotation<any[]>({
    reducer: (currentState, updateValue) => {
      return currentState.concat(updateValue);
    },
    default: () => [],
  }),
  result: Annotation<any[]>({
    reducer: (currentState, updateValue) => updateValue,
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
  replace_brands: Annotation<any[]>({
    reducer: (currentState, updateValue) => updateValue,
    default: () => [],
  }),
  total_searched: Annotation<number>,
  max_search: Annotation<number>,
  total_replaced: Annotation<number>,
  max_replacement: Annotation<number>,
});

async function getUrlScrapedData(link: string) {
  const url = `https://r.jina.ai/${link}`;
  const headers = {
    'Accept': 'application/json',
    'Authorization': process.env.JINA_AUTHORIZATION_TOKEN
  };

  try {
    const response = await axios.get(url, { headers });
    const data = response.data;

    if (data.code !== 200) {
      return [];
    }
    return data.data;
  } catch (error) {
    console.error('Error fetching URL Scraped data:', (error as Error)?.message);
    return [];
  }
}

async function researchUsingJina(query: string) {
  const url = `https://s.jina.ai/search`;
  const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': process.env.JINA_AUTHORIZATION_TOKEN,
  };

  console.log("query", query);
  
  try {
    const response = await axios({
      method: "POST",
      url,
      data: {
        q: query,
        top_k: 10,
      },
      headers: {
        ...requestHeaders
      }
    });
    const data = response.data;
    console.log("data", data, response);
    
    if (data.code !== 200) {
      console.error('Error in API response:', data);
      return [];
    }
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error fetching RESEARCH data:', error.response.status, error.response.data);
    } else {
      console.error('Error fetching RESEARCH data:', error);
    }
    return [];
  }
}

const research_term = async (state: typeof AgentState.State) => {
  const queries = await model.invoke([
    ["system", RESEARCHER_SYSTEM_PROMPT],
    ["human", `Term: ${state.term}\nKeywords: ${state.keywords}\nCriteria: ${state.criteria}\nPrevious Query: ${state.query}\nCountry: ${state.country}\n
      City: ${state.city}`]
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
  }
  return {
    scraped_data: content,
    query: queries.content,
    total_searched: state.total_searched + 1
  }
}

// const CriteriaItem = z.object({
//   criteriaType: z.string().describe("Criteria Type given by user"),
//   classification: z.string().describe("Classify where the brands lies between the given ends of the criteria"),
//   division: z.number().describe("Division number where it lies between the given noOfDivisions"),
// });

// const CriteriaStructure = z.array(CriteriaItem).describe("List of Criteria")

// const ScrapedItem = z.object({
//   brand: z.string().describe("Brand name or source of the item"),
//   description: z.string().describe("A brief description of the item, its features, and any relevant details that match the term and criteria"),
//   logo: z.string().describe("High Quality brand Logo if the query relates to brand, add the item image only when the query is relevant to item research. Make sure the \
//     brand logo image url is trusted and correct."),
//   criteria: CriteriaStructure,
//   keywords: z.array(z.string().describe("All the keywords that were required to find the brand")).describe("List of keywords"),
// })

// const prompt = ChatPromptTemplate.fromTemplate(READER_PROMPT);

// const outputParser = StructuredOutputParser.fromZodSchema(
//   z.array(ScrapedItem).describe("List")
// );

// const read_web_data = async (state: typeof AgentState.State) => {
//   const chain = prompt.pipe(model).pipe(outputParser);
//   const invokeState = {
//     term: state.term,
//     keywords: state.keywords,
//     criteria: state.criteria,
//     scraped_data: state.scraped_data,
//     city: state.city,
//     result: state.result,
//     format_instructions: outputParser.getFormatInstructions(),
//   };
//   const response  = await chain.invoke(invokeState);
//   const data = response;
//   return {
//     result: data,
//   }
// }


const prompt = ChatPromptTemplate.fromTemplate(BRANDS_LINK_GENERATOR);


const BrandItem = z.object({
  brand: z.string().describe("Brand name or source of the item"),
  link: z.string().describe("Official Brand's website domain only, excluding subpages or specific URLs"),
  brandLogo: z.string().optional().describe("Brand logo image url"),
})

const outputParser = StructuredOutputParser.fromZodSchema(
  z.array(BrandItem).describe("List")
);

const read_research = async (state: typeof AgentState.State) => {
  const chain = prompt.pipe(model).pipe(outputParser);
  const invokeState = {
    term: state.term,
    keywords: state.keywords,
    criteria: state.criteria,
    scraped_data: state.scraped_data,
    city: state.city,
    country: state.country,
    result: state.result,
    replace_brands: state.replace_brands,
    format_instructions: outputParser.getFormatInstructions(),
  };
  const response  = await chain.invoke(invokeState);
  const data = response;
  return {
    result: data,
  }
}

const check_researches = (state: typeof AgentState.State) => {

  if (state.total_searched > state.max_search) {
    return "check_urls"
  }
  return "research";
}

const fetch_link = async (link: string) => {
  try {
    const response = await axios(link, {
      method: 'GET'
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

const check_web_urls = async (state: typeof AgentState.State) => {
  const corrupt_brands_with_url = [];
  for (const ele of state.result) {
    const is_url_correct = await fetch_link(`https://logo.clearbit.com/${ele?.link}`);
    if (!is_url_correct) {
      corrupt_brands_with_url.push(ele);
    }
  }
  return {
    replace_brands: corrupt_brands_with_url,
    total_replaced: state.total_replaced + 1,
  }
}

const check_brands_to_replace = (state: typeof AgentState.State) => {
  if (state.total_replaced > state.max_replacement) {
    return "END"
  }
  return "research";
}


// const check_brands = async () => {
//   const checked = await model.invoke([
//     ["system", RESEARCHER_SYSTEM_PROMPT],
//     ["human", ``]
//   ]);
// }

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { term, country, keywords, criteria, city } = requestBody

  if (!term) {
    return NextResponse.json({ message: "Term is mandatory" }, { status: 500 })
  }
  if (!keywords.length) {
    return NextResponse.json({ message: "Please add keywords" }, { status: 500 })
  }
  if (!criteria.length) {
    return NextResponse.json({ message: "Please add a Criteria" }, { status: 500 })
  }

  const builder = new StateGraph(AgentState)
    .addNode("searcher", research_term)
    .addNode("reader", read_research)
    .addNode("check_urls", check_web_urls)
    .addEdge("__start__", "searcher")
    .addEdge("searcher", "reader")
    .addConditionalEdges(
      "reader",
      check_researches,
      { check_urls: "check_urls", research: "searcher" }
    ).addConditionalEdges(
      "check_urls",
      check_brands_to_replace,
      { END: END, research: "reader" }
    )
  const checkpointer = new MemorySaver();
  const graph = builder.compile({ checkpointer });

  const thread = { "configurable": { "thread_id": "1" } }
  try {
    const response = await graph.invoke({
      "term": term,
      "keywords": keywords,
      "country": country,
      "city": city,
      "criteria": criteria,
      "max_search": 2,
      "total_searched": 1,
      "total_replaced": 1,
      "max_replacement": 2,
    }, thread);

    return NextResponse.json({ message: "Successfully processed brand AI request", data: response.result }, { status: 200 });
  } catch (error: unknown) {
    console.log("ERORRR", (error as Error)?.message);
    return NextResponse.json({ message: (error as Error)?.message }, { status: 500 });
  }
}


export async function GET() {
  console.log(AgentState);
  
  return NextResponse.json({ message: 'Hello from Next.js!' });
}