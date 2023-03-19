import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "../../src/clients/axios";
import { keywordSearchesFactory } from "../factories/keywordSearches.factory";

const mock = new MockAdapter(axiosInstance);

export const emptyKeywordSearchesMock = () => {
  return mock
    .onGet("/keyword_searches", { params: { offset: 0, limit: 10 } })
    .reply(200, []);
};

export const keywordSearchesMock = (
  offset: number = 0,
  limit: number = 10,
  data = Array.from(Array(limit).keys()).map((i) =>
    keywordSearchesFactory.build({ id: i })
  )
) => {
  return mock
    .onGet("/keyword_searches", { params: { offset, limit } })
    .reply(200, data);
};

export const activeProcessesMock = (size: number = 0) => {
  return mock.onGet("/active_processes").reply(200, { size });
};

export const createKeywordSearchesMock = (keywords: string[]) => {
  return mock
    .onPost("/keyword_searches", { keywordSearch: { keywords } })
    .reply(200, {});
};
