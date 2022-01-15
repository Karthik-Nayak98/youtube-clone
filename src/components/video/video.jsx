import React from "react";
import { useQuery } from "react-query";
import formatDistance from "date-fns/formatDistance";
import PropTypes from "prop-types";

import { CHANNEL_API, VIDEOS_API } from "../../constants/apiUrl";
import { durationFormatter, likesFormatter } from "../../utils/utility";

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

function Video({
  title,
  videoId = false,
  imageUrl,
  channelTitle,
  channelId = false,
  publishedDate,
}) {
  const channelDetail = useQuery(
    ["channelDetails", CHANNEL_API, channelId],
    () => fetcher(CHANNEL_API, channelId),
    {
      enabled: channelId !== undefined,
    }
  );

  const videoDetails = useQuery(
    ["videoDetails", VIDEOS_API, videoId],
    () => fetcher(VIDEOS_API, videoId),
    {
      enabled: videoId !== undefined,
    }
  );

  return (
    <div key={videoId} className='w-64 h-56 mb-2'>
      <div className='relative'>
        <img src={imageUrl} alt={title} />
        <p className='absolute right-1 bottom-1 text-sm bg-black px-1 text-white'>
          {durationFormatter(
            videoDetails.data
              ? videoDetails.data.items[0].contentDetails.duration
              : "PTM0S0"
          )}
        </p>
      </div>
      <div className='mt-2 flex gap-2'>
        <figure className='w-1/6'>
          <img
            className='mt-1 ml-2 w-10 h-10 rounded-full'
            src={
              channelDetail.data
                ? channelDetail.data.items[0].snippet.thumbnails.medium.url
                : "https://yt3.ggpht.com/ytc/AKedOLRsqH73YYBdxwhl7UveWazVoX4g2OSnsDVOSEy5=s88-c-k-c0x00ffffff-no-rj"
            }
            alt={title}
          />
        </figure>
        <div className='w-5/6 px-2 text-light font-medium'>
          <p className='mt-1 h-6 text-left text-white font-semibold text-sm overflow-hidden'>
            {title}
          </p>
          <p className='text-left text-xs'>{channelTitle}</p>
          <p className='mt-1 text-left text-xs flex gap-1 items-center'>
            {likesFormatter(videoDetails.data?.items[0].statistics.viewCount)}{" "}
            views
            <span className='text-lg'>&#183;</span>
            {formatDistance(new Date(Date.parse(publishedDate)), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Video;

Video.propTypes = {
  title: PropTypes.string.isRequired,
  channelTitle: PropTypes.string.isRequired,
  videoId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  channelId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  imageUrl: PropTypes.string.isRequired,
};
