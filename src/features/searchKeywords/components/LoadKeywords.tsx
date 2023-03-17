import { useCallback, useEffect, useMemo, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { Spinner } from "../../../components/Spinner";
import { usePusher } from "../../../hooks/usePusher";
import {
  activeProcesses,
  createSearchKeywords,
} from "../api/searchKeywords.api";

export const LoadKeywords = () => {
  const pusherChannel = usePusher();
  const [loading, setLoading] = useState<boolean>(false);
  const [openFileSelector, { filesContent, loading: fileLoading }] =
    useFilePicker({
      accept: ".csv",
    });

  const keywords = useMemo(
    () =>
      filesContent?.[0]?.content
        ?.split("\n")
        ?.splice(1)
        .filter((s) => s.length > 0) || [],
    [filesContent]
  );

  useEffect(() => {
    (async () => {
      const processes = await activeProcesses();
      if (processes > 0) setLoading(true);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (keywords.length > 0) {
        setLoading(true);
        try {
          await createSearchKeywords(keywords);
        } catch (err) {
          // TODO: Toast
          setLoading(false);
        }
      }
    })();
  }, [keywords]);

  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (pusherChannel) {
      pusherChannel.bind("start-keyword-search", startLoading);
      pusherChannel.bind("stop-keyword-search", stopLoading);
      return () => {
        pusherChannel.unbind("start-keyword-search", startLoading);
        pusherChannel.unbind("stop-keyword-search", stopLoading);
      };
    }
  }, [pusherChannel, startLoading, stopLoading]);

  return (
    <button
      onClick={openFileSelector}
      disabled={loading || fileLoading}
      className="flex rounded-lg p-2 mx-1 text-white bg-indigo-500"
    >
      {(loading || fileLoading) && (
        <div className="mr-1">
          <Spinner />
        </div>
      )}
      <div className="flex">Load CSV file</div>
    </button>
  );
};
