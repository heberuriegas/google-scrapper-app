export const KeywordsActions = () => {
  return (
    <div className="flex mb-2 justify-end w-full">
      <a href="/template.csv" download className="p-2 mx-1 text-indigo-500">
        Download CSV template
      </a>
      <button className="rounded-lg p-2 mx-1 text-white bg-indigo-500">
        Load CSV file
      </button>
    </div>
  );
};
