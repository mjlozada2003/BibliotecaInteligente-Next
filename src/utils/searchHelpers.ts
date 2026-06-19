import { SearchParams } from "@/types";

export const parseSort = (
  value: string | null
): SearchParams["sort"] => {
  if (
    value === "year_asc" ||
    value === "year_desc" ||
    value === "editions_desc"
  ) {
    return value;
  }
  
  return undefined;
};