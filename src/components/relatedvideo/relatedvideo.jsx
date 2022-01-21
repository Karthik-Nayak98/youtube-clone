import React from "react";
import { Link } from "react-router-dom";

import HorizontalVideo from "../horizontalVideo/horizontalvideo";

function RelatedVideo({ relatedVideo, queryParam = "" }) {
  return (
    <React.Fragment>
      {relatedVideo.data?.pages.map(page => (
        <React.Fragment key={page.nextPageToken}>
          {page.items.map((item, index) => (
            <Link
              key={item.id.videoId}
              to={`/${item.id.videoId}`}
              state={{
                title: item.snippet?.title || "test",
                videoId: item.id.videoId || "eIho2S0ZahI",
                channelId:
                  item.snippet?.channelId || "UCAuUUnT6oDeKwE6v1NGQxug",
                description: item.snippet?.description || "test",
                channelTitle: item.snippet?.channelTitle || "test",
                publishedDate:
                  item.snippet?.publishedAt || "2014-06-27T14:18:00Z",
              }}>
              <HorizontalVideo
                title={item?.snippet?.title || "test"}
                videoId={item?.id.videoId || "eIho2S0ZahI"}
                channelTitle={item?.snippet?.channelTitle || "test"}
                imageUrl={
                  item?.snippet?.thumbnails.medium.url ||
                  "https://i.ytimg.com/vi/eIho2S0ZahI/mqdefault.jpg"
                }
                publishedDate={
                  item?.snippet?.publishedAt || "2014-06-27T14:18:00Z"
                }
                description={item?.snippet?.description || "test"}
                queryParam={queryParam}
              />
            </Link>
          ))}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

export default RelatedVideo;
