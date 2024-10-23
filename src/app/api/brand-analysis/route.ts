import { BRAND_ANALYSIS_PROMPT } from '@/contants/prompts';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, tool } from 'ai';
import axios from 'axios';
import { z } from "zod";


const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_AI_API_KEY,
});

const model = google('gemini-1.5-flash')


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

const research_query = async (query: string) => {
    try {
        const content: any[] = [];
        const response = await researchUsingJina(query);

        if (response.length > 0) {
            for (const ele of response) {
                const scrapedUrl = await getUrlScrapedData(ele.url);
                content.push(scrapedUrl.content);
            }
        }
        return content;
    } catch (error) {
        console.log("Error in researching query", error);
        return [];
    }
}

const get_brands_scraped_data = (brands: any) => {
    console.log(brands);
    return [];
}

const brandStructure = z.object({
    brandName: z.string().describe("Brand name"),
    searchQuery: z.string().describe("Search query for the brand")
});

const CriteriaItem = z.object({
    criteriaType: z.string().describe("Criteria Type given by user"),
    classification: z.string().describe("Classify where the brands lies between the given ends of the criteria"),
    division: z.number().describe("Division number where it lies between the given noOfDivisions"),
    reasoning: z.string().describe("Reason for this determination of why this brand lies in this division and classification"),
});

const CriteriaStructure = z.array(CriteriaItem).describe("List of Criteria")

const ScrapedItem = z.object({
    brand: z.string().describe("Brand name or source of the item"),
    description: z.string().describe("A brief description of the item, its features, and any relevant details that match the term and criteria"),
    logo: z.string().describe("High Quality brand Logo if the query relates to brand, add the item image only when the query is relevant to item research. Make sure the \
    brand logo image url is trusted and correct."),
    criteria: CriteriaStructure,
    keywords: z.array(z.string().describe("All the keywords that were required to find the brand")).describe("List of keywords"),
})

const outputStructure = z.array(ScrapedItem).describe("List")

export async function POST(req: Request) {
    const { term, city, keywords, criteria, brands } = await req.json();

    const { toolCalls } = await generateText({
        model,
        tools: {
            get_brands_scraped_data: tool({
                description: 'A tool that returns the web scraped data of a brand using search query',
                parameters: z.object({ brands: z.array(brandStructure) }),
                execute: async (params) => get_brands_scraped_data(params),
            }),
            // answer: tool({
            //     description: 'A tool for providing the final answer.',
            //     parameters: z.object({
            //         steps: z.array(
            //             z.object({
            //                 reasoning: z.string(),
            //             }),
            //         ),
            //         answer: outputStructure,
            //     }),
            // }),
        },
        toolChoice: 'required',
        maxSteps: 5,
        system: BRAND_ANALYSIS_PROMPT,
        prompt: `Here is the term: ${term}, Brands list: ${brands}, Criteria: ${criteria}`
    });

    console.log(`FINAL TOOL CALLS: ${JSON.stringify(toolCalls, null, 2)}`);
}