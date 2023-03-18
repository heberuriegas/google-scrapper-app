import { useCallback, useEffect, useState } from "react";
import { usePusher } from "../../../hooks/usePusher";
import { findKeywords } from "../api/searchKeywords.api";
import { KeywordSearch } from "../types/keywordSearch.types";

const PAGE_SIZE = 10;

export const KeywordsTable = () => {
  const [keywords, setKeywords] = useState<KeywordSearch[]>();
  const [page, setPage] = useState<number>(1);
  const pusherChannel = usePusher();

  const reload = useCallback(async () => {
    setPage(1);
    const newKeywords = await findKeywords(0);
    setKeywords(newKeywords);
  }, []);

  useEffect(() => {
    if (pusherChannel) pusherChannel.bind("reload-keyword-table", reload);
    return () => {
      if (pusherChannel) pusherChannel.unbind("reload-keyword-table", reload);
    };
  }, [reload, pusherChannel]);

  useEffect(() => {
    (async () => {
      const newKeywords = await findKeywords((page - 1) * PAGE_SIZE, PAGE_SIZE);
      setKeywords(newKeywords);
    })();
  }, [page]);

  return keywords && keywords.length > 0 ? (
    <div data-testid="keyword-table">
      <div className="flex flex-col bg-white rounded-lg">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Keyword
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Total results
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Total adwords
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Total links
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Created at
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Source code
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {keywords?.map((k) => (
                    <tr
                      data-testid="keyword-row"
                      key={k.id}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {k.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {k.keyword}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {k.totalResults}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {k.totalAdwords}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {k.totalLinks}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {k.createdAt}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <a
                          href={
                            process.env.REACT_APP_API_HOST +
                            "/api/keyword_searches/" +
                            k.id
                          }
                          rel="noreferrer"
                          target="_blank"
                        >
                          Show source code
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full mt-1 mr-1 justify-end">
        {page > 1 && (
          <button
            className="text-indigo-500 mr-3"
            onClick={() => setPage((page) => page - 1)}
          >
            Prev page
          </button>
        )}
        {keywords.length >= PAGE_SIZE && (
          <button
            className="text-indigo-500"
            onClick={() => setPage((page) => page + 1)}
          >
            Next page
          </button>
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col bg-white items-center p-5 rounded-lg">
      <h1 className="text-lg">No keyword data, please upload a csv file.</h1>
    </div>
  );
};
