import { axiosInstance } from "../../../clients/axios";
import { KeywordSearch } from "../types/keywordSearch.types";

export const findKeywords = async (offset: number = 0, limit: number = 10) => {
  const results = await axiosInstance.get<KeywordSearch[]>(
    `/keyword_searches?offset=${offset}&limit=${limit}`
  );

  return results?.data;
};

interface ActiveProcesses {
  size: number;
}

export const activeProcesses = async () => {
  const results = await axiosInstance.get<ActiveProcesses>(`/active_processes`);

  return results?.data?.size;
};

export const createSearchKeywords = async (keywords: string[]) => {
  return axiosInstance.post("/keyword_searches", {
    keywordSearch: {
      keywords,
    },
  });
};
