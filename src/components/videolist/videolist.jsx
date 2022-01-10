import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import SideBar from "../sidebar/sidebar";
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
    <div className="bg-black bg-opacity-90 fixed top-14 flex justify-around gap-10">
      <SideBar />
      {/* <InfiniteScroll
        dataLength={data.pages[0].pageInfo.resultsPerPage}
        hasMore={isFetchingNextPage}
        next={fetchNextPage}
        loader={<div>Loading....</div>}> */}
      <div
        onScroll={handleScroll}
        className="mt-5 h-screen flex justify-start gap-4 flex-wrap overflow-auto">
        {data?.pages.map(page => (
          <React.Fragment key={page.nextPageToken}>
            {page.items.map(item => (
              <Video
                key={item.id}
                title={item.snippet.title}
                videoId={item.id}
                channelId={item.snippet.channelId}
                channelTitle={item.snippet.channelTitle}
                imageUrl={item.snippet.thumbnails.medium.url}
                duration={item.contentDetails.duration}
                viewCount={item.statistics.viewCount}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default VideoList;
