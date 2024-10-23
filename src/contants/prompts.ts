
export const RESEARCHER_SYSTEM_PROMPT = `
You are tasked with creating a highly optimized search query based on the given term, keywords, and criteria types. \
The goal is to generate a query that is comprehensive, ensuring we capture the most relevant results with minimal additional searches.


Understand the user's query structure: The user will provide a query with the following structure:
{
  term: string,
  city: string,
  keywords: string[],
  criterias: [
    {
      criteriaType: string,
      ends: string[],
      noOfDivisions: number, // Note: This field should be ignored in query formulation
    },
  ]
}

Use this structure to formulate a comprehensive search query that incorporates all provided elements:
- Include the 'term' as the main subject of the search.
- Mention the 'city' to localize the search results.
- Incorporate all 'keywords' to refine the search focus.
- Utilize each 'criteriaType' to further specify the search parameters, considering the 'ends' (e.g., low/high) to create a nuanced query. \
  Ignore the 'noOfDivisions' field when formulating the query.
- Also include to get the brand's global domain url link.

Please follow these steps when forming the query:

Include the user-provided term: Make sure the core subject (i.e., the 'term') is explicitly mentioned in the query.

Incorporate all relevant keywords: These should guide the search engine to prioritize content directly related to the term. Ensure each keyword is used in a context that naturally complements the term.

Specify criteria types: Focus on criteria that refine the search results. For example, when filtering for things like 'Price,' use phrases like 'affordable,' 'cheap,' 'high-end,' 'luxury' to reflect price ranges. When the criterion is "Quality," use terms like 'best,' 'top-rated,' 'high-quality,' or 'popular.' Each criterion should be applied with appropriate synonyms to capture all variations.

Consider contextual relevance: Guide the search engine by explicitly requesting pages that match multiple criteria (e.g., 'best nearby restaurants with affordable prices and high customer ratings').

Aim for detailed results: Ensure the search is focused on retrieving well-documented and comprehensive pieces of content, ideally ones that contain a mixture of reviews, rankings, descriptions, and pricing details.

Avoid vague or unrelated results: Prioritize queries that encourage the retrieval of content closely aligned with the criteria, eliminating the need for irrelevant or overly broad results.

If you get the previous query, try to modify it and generate a new query.

Here is an example format to help you frame the query:

Example Format: 'Find [term] in [city] that are [keyword 1], [keyword 2], and [keyword 3] that match criteria like [price], [quality], and [type]. \
Information should include pricing, product reviews, descriptions, customer ratings, offical website and brand logo. \
Prioritize results from trusted sources, guides, or reviews.'

Using this approach, generate a search query that combines the term, keywords, and criteria in a manner that ensures comprehensive and targeted results. Make sure that the generated query does not have any quotes
Generate Maximum 1 query for now.
`;


export const BRANDS_LINK_GENERATOR =  `
You are tasked with processing the web-scraped data to identify the 10 most relevant brands based on the following criteria:

Term: {term}
Keywords: {keywords}
city: {city}
Country: {country}
Criteria: {criteria} (consider only the criteriaType)

Instructions:
Filter the data: Focus on brands that match the provided term and keywords. Only include brands that meet the criteria.
Evaluate the brands: Assess each brand according to the criteria such as type, price range, and quality, and prioritize those that closely align with the specified parameters.
Select the top 10 brands: Choose the 10 brands that best match the term, keywords, and criteria. Ensure that no brand is repeated in the final list.
Check the brand's website link:
Only return the global official domain of the brand's website. Exclude any links that are region-specific or that lead to subpages.
If the link belongs to an e-commerce or multi-brand platform, exclude the brand and replace it with another relevant one from the scraped data.

Replacement Instructions:
If any brand from the {replace_brands} list is found in the {result} list, replace it with a brand from the {scraped_data} that has a working global website link. Ensure the replacement also meets the criteria for relevance.

General Guidelines:
Focus on identifying the global official websites of the brands. If a brand does not have a global website or only has region-specific links, it should be excluded.
Prioritize accuracy when selecting brands based on the user’s input and criteria, ensuring that all results meet the requirements.
Generate a unique result where no brand is repeated in the final selection of 10 brands.
The brand website url should start with "www." only, without the "https://" prefix

Format Instructions: {format_instructions}
`


export const CHECK_BRANDS_PROMPT = `
You are tasked to checked all the brands and their links. If you find find any brands website link non-working or \
you find any website link that is not official website of the brand, you exclude that brand from the result and return the result \
with the brands that have official website link.

Whenever you find any brand whose website link is not official,
`;


// ==================================


export const READER_PROMPT = `
You are tasked with processing web-scraped data: {scraped_data} from URLs, evaluating the content to identify the most relevant items based on a given term: {term}, \
keywords : {keywords}, country: {country} and criteria: {criteria}. Use the following steps to ensure accurate selection:

1. Process the Web-Scraped Data: Loop through scraped_data, analyze the entire text for items that match the specified term, keywords, and \
criteria provided by the user.

1.1. Conditional: If you are not satisfy with the scraped data and you think that the given urls does not provide the relevant, appropriate and \
accurate data, then feel free to revise/add/remove {keywords} and search again to generate new urls.

2. Select the Best-Matching Items: Identify up to 10 items that most closely align with the given keywords and criteria. For example, if the user is \
searching for food items from a restaurant like KFC with keywords such as 'chicken,' 'nuggets,' and 'buckets,' and criteria like 'price,' 'quality,' \
and 'quantity,' you should find the items that match these keywords and group them based on their criteria.

3. Classify Criteria Levels and Assign Divisions: For each selected item, evaluate it based on the provided criteria. For each criteriaType, \
follow these steps to classify the item and assign a division number:

3.1. Criteria Ends: Each criteriaType (e.g., "price") will have two endpoints: a low end and a high end (e.g., ["low", "high"]).

3.2. Number of Divisions: The scale of classification is defined by noOfDivisions. \
For example, if noOfDivisions is 4, you will create 4 levels:
3.2.1. Division 1 represents the lowest end (e.g., "low").
3.2.2. Division 4 represents the highest end (e.g., "high").
3.2.3. Divisions 2 and 3 represent intermediate levels.

3.3. Assign Division Numbers: Based on what you have read in the scraped data for each item, assign a division number from 1 to (criteria.noOfDivisions). \
For example:
3.3.1. If the item's "price" is closer to the "low" end, assign it to Division 1 or 2.
3.3.2. If the item's "price" is closer to the "high" end, assign it to Division 3 or 4.

3.4. Classification Example: If the user provides "price" as the criteria with ends ["low", "high"] and noOfDivisions = 4:
3.4.1. An item with a very low price would fall into Division 1.
3.4.2. An item with a moderate price would fall into Division 2 or 3.
3.4.3. An item with a very high price would fall into Division 4.

4. Prioritization: Always prioritize items that meet multiple criteria (e.g., both "high quality" and "low price") over items that meet \
fewer or less relevant criteria.

Adjust the classification based on the specific ends provided for each criteria (e.g., ["low", "high"] or any other range).

Formatting Instructions: {format_instructions}

General Instructions:

Always ensure that you focus on matching the most relevant content based on the user's input. Items should be prioritized if they meet \
multiple criteria (e.g., both 'high quality' and 'low price').
If fewer than 10 matching items are found, return only the available matches. Do not add irrelevant items to meet the quota.
Be as descriptive as possible while maintaining accuracy when providing item descriptions and criteria classifications.
Also, before returning the items, check if the {result} have that brand/item already, it it includes already you will not return that item.
`;


export const BRAND_ANALYSIS_PROMPT = `

You are given term, criterias and a list of brands.
Each criteria have: 
{
type: price, quality, etc,
ends: [] // for example, [low, high], [mass, premium]
noOfDivisions: number // total number of division for the brand to lie on
}

Each brand have:
{
brand: string, // brand name
url: string // brand website link url
}

Generate a search query for each brand using the brand name, given term and the criteria type, \
which will allow us to get most web scraped data for the brand to \
determine which brands lies where in the given end of the criteria and at what division it lies between the noOfDivions.

Once all the scraped data is fetched, go throught the scraped data and determine where the brand lies in the given ends \
of the criteria and at what of number of division it lies, reasoning for this determination and scraped data for that brand.
`;