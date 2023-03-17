import { DownloadKeywords } from "./DowloadKeywords";
import { LoadKeywords } from "./LoadKeywords";

export const KeywordsActions = () => {
  return (
    <div className="flex mb-2 justify-end w-full">
      <DownloadKeywords />
      <LoadKeywords />
    </div>
  );
};
