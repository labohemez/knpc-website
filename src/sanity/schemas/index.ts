import { type SchemaTypeDefinition } from "sanity";
import sermon from "./sermon";
import news from "./news";
import gallery from "./gallery";
import worship from "./worship";
import banner from "./banner";
import siteSettings from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  sermon,
  news,
  gallery,
  worship,
  banner,
  siteSettings,
];
