import { fireEvent, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter/types";
import * as useFilePicker from "use-file-picker";
import { renderWithAct } from "../../../../__tests__/helpers/render";
import { keywordsFactory } from "../../../../tests/factories/keywordSearches.factory";
import {
  activeProcessesMock,
  createKeywordSearchesMock,
} from "../../../../tests/mocks/keywordSearches.mock";
import { LoadKeywords } from "../components/LoadKeywords";

const openFileSelector = jest.fn();
const mockUseFilePicker = (keywords: string[] = []) => {
  jest.spyOn(useFilePicker, "useFilePicker").mockReturnValue([
    openFileSelector,
    {
      filesContent:
        keywords.length > 0
          ? [
              {
                lastModified: 0,
                name: "nameFile",
                content: keywords.join("\n"),
              },
            ]
          : undefined,
      loading: false,
    } as any,
  ]);
};

let _createKeywordSearchesMock: MockAdapter;
let _activeProessesMock: MockAdapter;

describe("with csv file", () => {
  beforeEach(() => {
    _activeProessesMock = activeProcessesMock();
    const keywords = keywordsFactory();
    _createKeywordSearchesMock = createKeywordSearchesMock(keywords);
    mockUseFilePicker(keywords);
  });

  afterEach(() => {
    _createKeywordSearchesMock.resetHistory();
  });

  it("render the component", async () => {
    await renderWithAct(<LoadKeywords />);
    expect(screen.getByTestId("keyword-load-button")).toBeInTheDocument();
  });

  it("open file selector", async () => {
    await renderWithAct(<LoadKeywords />);
    fireEvent.click(screen.getByTestId("keyword-load-button"));
    await waitFor(() => {
      expect(openFileSelector).toHaveBeenCalledTimes(1);
    });
  });

  it("create search keyword", async () => {
    await renderWithAct(<LoadKeywords />);
    fireEvent.click(screen.getByTestId("keyword-load-button"));
    expect(_createKeywordSearchesMock.history.post.length).toEqual(1);
  });
});

describe("for active processes", () => {
  beforeEach(() => {
    _activeProessesMock = activeProcessesMock(1);
    mockUseFilePicker();
  });
  it("check number of processes", async () => {
    await renderWithAct(<LoadKeywords />);
    expect(_activeProessesMock.history.get.length).toEqual(1);
  });

  describe("with a current process", () => {
    it("if active show spinner", async () => {
      await renderWithAct(<LoadKeywords />);
      const spinner = await screen.findByTestId("spinner");
      expect(spinner).toBeInTheDocument();
    });
  });
});
