import Pusher, * as PusherTypes from "pusher-js";
import { useEffect, useState } from "react";

export const usePusher = () => {
  const [pusherChannel, setPusherChannel] = useState<PusherTypes.Channel>();

  useEffect(() => {
    if (process.env.REACT_APP_PUSHER_ID) {
      const pusher = new Pusher(process.env.REACT_APP_PUSHER_ID, {
        cluster: "us2",
      });

      setPusherChannel(pusher.subscribe("google-scrapper"));
      return () => {
        pusher.unsubscribe("google-scrapper");
      };
    }
  }, []);

  return pusherChannel;
};
