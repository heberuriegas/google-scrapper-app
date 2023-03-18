import { faker } from "@faker-js/faker";
import { screen } from "@testing-library/react";
import { renderWithAuth } from "../../../../__tests__/helpers/render";
import { keywordSearchesListFactory } from "../../../../tests/factories/keywordSearches.factory";
import {
  emptyKeywordSearchesMock,
  keywordSearchesMock,
} from "../../../../tests/mocks/keywordSearches.mock";
import { KeywordsTable } from "../components/KeywordsTable";

describe("render", () => {
  beforeEach(() => {
    emptyKeywordSearchesMock();
  });

  describe("with data", () => {
    const keywordsLength = 10;
    const keywords = keywordSearchesListFactory(keywordsLength);
    beforeEach(() => {
      keywordSearchesMock(0, keywordsLength, keywords);
    });

    it("a table", async () => {
      await renderWithAuth(<KeywordsTable />);
      expect(screen.getByTestId("keyword-table")).toBeInTheDocument();
    });

    it("render a row for each keyword", async () => {
      await renderWithAuth(<KeywordsTable />);
      expect(screen.getAllByTestId("keyword-row").length).toEqual(
        keywordsLength
      );
    });

    describe("render correct", () => {
      let randomIndex: number;
      beforeEach(() => {
        randomIndex = faker.datatype.number({ min: 0, max: 9 });
      });
      it("id", async () => {
        await renderWithAuth(<KeywordsTable />);
        const randomRow = screen.getAllByTestId("keyword-row")[randomIndex];
        expect(randomRow.childNodes[0].textContent).toContain(
          keywords[randomIndex].id.toString()
        );
      });

      it("keyword", async () => {
        await renderWithAuth(<KeywordsTable />);
        const randomRow = screen.getAllByTestId("keyword-row")[randomIndex];
        expect(randomRow.childNodes[1].textContent).toContain(
          keywords[randomIndex].keyword
        );
      });

      it("totalResults", async () => {
        await renderWithAuth(<KeywordsTable />);
        const randomRow = screen.getAllByTestId("keyword-row")[randomIndex];
        expect(randomRow.childNodes[2].textContent).toContain(
          keywords[randomIndex].totalResults?.toString()
        );
      });

      it("totalAdwords", async () => {
        await renderWithAuth(<KeywordsTable />);
        const randomRow = screen.getAllByTestId("keyword-row")[randomIndex];
        expect(randomRow.childNodes[3].textContent).toContain(
          keywords[randomIndex].totalAdwords?.toString()
        );
      });

      it("totalLinks", async () => {
        await renderWithAuth(<KeywordsTable />);
        const randomRow = screen.getAllByTestId("keyword-row")[randomIndex];
        expect(randomRow.childNodes[4].textContent).toContain(
          keywords[randomIndex].totalLinks?.toString()
        );
      });

      it("createdAt", async () => {
        await renderWithAuth(<KeywordsTable />);
        const randomRow = screen.getAllByTestId("keyword-row")[randomIndex];
        expect(randomRow.childNodes[5].textContent).toContain(
          keywords[randomIndex].createdAt?.toString()
        );
      });
    });
  });

  describe("without data", () => {
    it("render no data message", async () => {
      await renderWithAuth(<KeywordsTable />);
      expect(
        screen.getByText("No keyword data, please upload a csv file.")
      ).toBeInTheDocument();
    });
  });
});
