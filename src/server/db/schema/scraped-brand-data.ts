import { integer, text } from "drizzle-orm/sqlite-core";
import { createTable } from "../schema";

export const brandScrapedData = createTable("scraped_brand_data", {
    id: integer('id').primaryKey({ autoIncrement: true }),
    brandLink: text('brand_link').unique(),
    scrapedData: text('scraped_data'),
})