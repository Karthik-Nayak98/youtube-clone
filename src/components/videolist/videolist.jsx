import React from "react";
import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";

import Video from "../video/video";
import { VIDEOS_API } from "../../constants/apiUrl";

const fetchVideos = async ({ pageParam = "" }) => {
  const params = new URLSearchParams({
    part: "snippet,contentDetails,statistics",
    maxResults: 20,
    chart: "mostPopular",
    pageToken: pageParam,
    key: process.env.REACT_APP_YOUTUBE_API,
  });

  const url = `${VIDEOS_API}?${params.toString()}`;
  const res = await fetch(url);
  return res.json();
};

function VideoList() {
  const { isFetchingNextPage, fetchNextPage, hasNextPage, isLoading, data } =
    useInfiniteQuery("videoList", fetchVideos, {
      getNextPageParam: lastPage => {
        if ("nextPageToken" in lastPage) return lastPage.nextPageToken;
        return undefined;
      },
    });

  const handleScroll = event => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    if (scrollHeight - scrollTop <= clientHeight * 2 && !isFetchingNextPage) {
      console.log("fetching next page...");
      if (hasNextPage) fetchNextPage();
    }
  };

  if (isLoading) return <h1>Loading....</h1>;

  return (
    // <div className="bg-black bg-opacity-90 fixed top-14 flex justify-around gap-10">
    // <div className="pt-8 pb-16 bg-black bg-opacity-80 fixed top-14 flex-wrap overflow-auto h-full left-16 px-12 flex justify-start gap-4">
    <div
      onScroll={handleScroll}
      className='p-8 pb-14 w-screen h-full overflow-auto bg-pdark 
    fixed top-14 left-18 grid lg:grid-cols-4 md:grid-cols-2 gap-y-4'>
      {data?.pages.map(page => (
        <React.Fragment key={page.nextPageToken}>
          {page.items.map(item => (
            <Link
              to={item.id}
              state={{
                title: item.snippet.title,
                videoId: item.id,
                channelId: item.snippet.channelId,
                channelTitle: item.snippet.channelTitle,
                publishedDate: item.snippet.publishedAt,
                description: item.snippet.description,
              }}
              key={item.id}>
              <Video
                title={item.snippet.title}
                videoId={item.id}
                channelId={item.snippet.channelId}
                publishedDate={item.snippet.publishedAt}
                channelTitle={item.snippet.channelTitle}
                imageUrl={item.snippet.thumbnails.medium.url}
              />
            </Link>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default VideoList;
