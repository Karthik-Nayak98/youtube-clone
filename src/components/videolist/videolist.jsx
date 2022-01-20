import React from "react";
import { Link } from "react-router-dom";

import Video from "../video/video";
import { VIDEOS_API } from "../../constants/apiUrl";
import { useInfiniteYouTubeQuery } from "../../hooks/useInfiniteYouTubeQuery";
import { useScroll } from "../../hooks/useScroll";

function VideoList() {
  const videoList = useInfiniteYouTubeQuery("videoList", VIDEOS_API, {
    part: "snippet,contentDetails,statistics",
    maxResults: 20,
    chart: "mostPopular",
    regionCode: "IN",
  });

  const scroll = useScroll(videoList);

  if (videoList.isLoading) return <h1>Loading....</h1>;

  return (
    <div
      onScroll={scroll}
      className='p-8 pb-14 w-screen h-full overflow-auto bg-pdark 
    fixed top-14 flex flex-wrap items-center justify-center gap-4 md:justify-around'>
      {videoList?.data?.pages.map((page, index) => (
        <React.Fragment key={index}>
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
