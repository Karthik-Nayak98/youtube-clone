import { useInfiniteQuery } from "react-query";

const fetchInfiniteList = async ({ queryKey, pageParam = "" }) => {
  const [_key, API, qparams] = queryKey;

  const params = new URLSearchParams({
    ...qparams,
    pageToken: pageParam,
    key: process.env.REACT_APP_YOUTUBE_API,
  });

  const url = `${API}?${params.toString()}`;

  const res = await fetch(url);
  return res.json();
};

export const useInfiniteYouTubeQuery = (queryKey, API, qparams) => {
  return useInfiniteQuery([queryKey, API, qparams], fetchInfiniteList, {
    getNextPageParam: lastPage => {
      if ("nextPageToken" in lastPage) return lastPage.nextPageToken;

      return undefined;
    },
  });
};
