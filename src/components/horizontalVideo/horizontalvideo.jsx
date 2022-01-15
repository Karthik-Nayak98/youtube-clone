import React from "react";
import { useQuery } from "react-query";
import formatDistance from "date-fns/formatDistance";
import PropTypes from "prop-types";

import { VIDEOS_API } from "../../constants/apiUrl";
import { durationFormatter, likesFormatter } from "../../utils/utility";
import { useEffect } from "react/cjs/react.development";

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

function HorizontalVideo({
  title,
  videoId,
  imageUrl,
  channelTitle,
  publishedDate,
}) {
  const videoDetails = useQuery(
    ["videoDetails", VIDEOS_API, videoId],
    () => fetcher(VIDEOS_API, videoId),
    {
      enabled: videoId !== undefined,
    }
  );

  // useEffect(() => {
  //   console.log("videoDetails", videoDetails);
  // }, [videoDetails]);

  if (videoDetails.isLoading) return <h1>Loading...</h1>;
  //   if (isError) return <h1>Error: {error}...</h1>;

  return videoDetails.data.items.length ? (
    <div key={videoId} className='w-11/12 mb-3 flex items-start'>
      <div className='relative w-1/2'>
        <img className='w-full' src={imageUrl} alt={title} />
        <p className='absolute right-1 bottom-1 text-sm bg-black px-1 text-white'>
          {console.log(videoDetails.data.items[0])}
          {durationFormatter(
            videoDetails.data
              ? videoDetails.data.items[0].contentDetails.duration
              : "PTM0S0"
          )}
        </p>
      </div>
      <div className='mt-2 w-1/2 flex gap-2'>
        <div className='px-2 text-light font-medium'>
          <p className='text-left text-white text-sm font-semibold line-clamp-2'>
            {title}
          </p>
          <p className='mt-1 text-left text-xs'>{channelTitle}</p>
          <p className='text-left text-xs flex gap-1 items-center'>
            {likesFormatter(
              videoDetails.data
                ? videoDetails.data.items[0].statistics.viewCount
                : 0
            )}{" "}
            views
            <span className='text-lg'>&#183;</span>
            {formatDistance(Date.parse(publishedDate), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  ) : null;
}

export default HorizontalVideo;

HorizontalVideo.propTypes = {
  title: PropTypes.string.isRequired,
  channelTitle: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  // channelId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  imageUrl: PropTypes.string.isRequired,
};
