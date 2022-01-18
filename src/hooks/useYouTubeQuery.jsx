import { useQuery } from "react-query";
import { CHANNEL_API } from "../constants/apiUrl";

const fetcher = async (API, id) => {
  const params = new URLSearchParams({
    part: "snippet,contentDetails,statistics",
    id: id,
    key: process.env.REACT_APP_YOUTUBE_API,
  });

  const url = `${API}?${params.toString()}`;
  const res = await fetch(url);
  return res.json();
};

export const useYouTubeQuery = (querykey, API, id) => {
  return useQuery([querykey, API, id], () => fetcher(API, id), {
    enabled: id !== undefined,
  });
};
