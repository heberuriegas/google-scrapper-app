import { DownloadTemplate } from "./DowloadTemplate";
import { LoadKeywords } from "./LoadKeywords";

export const KeywordsActions = () => {
  return (
    <div className="flex mb-2 justify-end w-full">
      <DownloadTemplate />
      <LoadKeywords />
    </div>
  );
};
