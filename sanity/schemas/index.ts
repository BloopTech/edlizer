import { type SchemaTypeDefinition } from "sanity";
import { product } from "./product";
import { siteSettings } from "./siteSettings";
import { homepage } from "./homepage";
import { shopInfo } from "./shopInfo";

export const schemaTypes: SchemaTypeDefinition[] = [product, siteSettings, homepage, shopInfo];

/** One-of-a-kind documents: opened directly from the Studio menu, never
 *  created, duplicated or deleted. Each one's id is its type name. */
export const SINGLETONS = new Set(["siteSettings", "homepage", "shopInfo"]);
