import { faker } from "@faker-js/faker";
import * as Factory from "factory.ts";
import { KeywordSearch } from "../../src/features/searchKeywords/types/keywordSearch.types";

export const keywordSearchesFactory = Factory.Sync.makeFactory<KeywordSearch>({
  id: Number(Factory.each((i) => i)),
  keyword: faker.word.adjective(),
  totalAdwords: faker.datatype.number(),
  totalLinks: faker.datatype.number(),
  totalResults: `About of ${faker.datatype.number() * 100000000} results. `,
  createdAt: faker.date.recent().toISOString(),
});

export const keywordSearchesListFactory = (size: number) =>
  Array.from(Array(size).keys()).map((i) =>
    keywordSearchesFactory.build({ id: i })
  );
