import { axiosInstance } from "../../../clients/axios";

export const createSearchKeywords = async (keywords: string[]) => {
  return axiosInstance.post("/keyword_searches", {
    keywordSearch: {
      keywords,
    },
  });
};
