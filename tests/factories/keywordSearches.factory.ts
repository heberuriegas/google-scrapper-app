import { faker } from "@faker-js/faker";
import * as Factory from "factory.ts";
import { KeywordSearch } from "../../src/features/keywordsSearch/types/keywordSearch.types";

export const keywordSearchesFactory = Factory.Sync.makeFactory<KeywordSearch>({
  id: Number(Factory.each((i) => i)),
  keyword: faker.word.adjective(),
  totalAdwords: faker.datatype.number(),
  totalLinks: faker.datatype.number(),
  totalResults: `About of ${faker.datatype.number() * 100000000} results. `,
  createdAt: faker.date.recent().toISOString(),
});

export const keywordSearchesListFactory = (
  size: number = Math.floor(Math.random() * 10) + 1
) =>
  Array.from(Array(size).keys()).map((i) =>
    keywordSearchesFactory.build({ id: i })
  );

export const keywordsFactory = (
  size: number = Math.floor(Math.random() * 10) + 1
) => Array.from(Array(size).keys()).map((i) => faker.word.adverb());
