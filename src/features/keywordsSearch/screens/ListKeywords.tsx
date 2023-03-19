import { KeywordsActions } from "../components/KeywordsActions";
import { KeywordsTable } from "../components/KeywordsTable";

export const ListKeywords = () => {
  return (
    <div className="p-10 bg-slate-100 h-full">
      <div>
        <KeywordsActions />
        <KeywordsTable />
      </div>
    </div>
  );
};
