import React from 'react';
import { useQuery } from 'react-query';
import { IoEyeSharp } from 'react-icons/io5';
import PropTypes from 'prop-types';

import { CHANNEL_API } from '../../constants/apiUrl';
import { durationFormatter, likesFormatter } from '../../utils/utility';

const fetcher = async (channelId) => {
  const params = new URLSearchParams({
    part: 'snippet,contentDetails,statistics',
    id: channelId,
    key: process.env.REACT_APP_YOUTUBE_API
  });

  const url = `${CHANNEL_API}?${params.toString()}`;
  const res = await fetch(url);
  return res.json();
};

function Video({
  title,
  videoId,
  imageUrl,
  channelTitle,
  channelId = false,
  viewCount = 0,
  duration
}) {
  const { isLoading, isError, error, data } = useQuery(
    ['videoDetails', channelId],
    () => fetcher(channelId),
    {
      enabled: channelId !== undefined
    }
  );

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error: {error}...</h1>;

  return (
    <div key={videoId} className="w-64 h-56">
      <div className="relative">
        <img src={imageUrl} alt={title} />
        <p className="absolute right-1 bottom-1 text-sm bg-black px-1 text-white">
          {durationFormatter(duration)}
        </p>
      </div>
      <div className="mt-2 flex gap-2">
        <figure className="w-1/6">
          <img
            className="mt-1 ml-2 w-10 h-10 rounded-full"
            src={
              data
                ? data.items[0].snippet.thumbnails.medium.url
                : 'https://yt3.ggpht.com/ytc/AKedOLRsqH73YYBdxwhl7UveWazVoX4g2OSnsDVOSEy5=s88-c-k-c0x00ffffff-no-rj'
            }
            alt={title}
          />
        </figure>
        <div className="w-5/6 px-2 text-gray-100">
          <p className="mt-1 h-6 text-left text-white font-semibold text-sm overflow-hidden">
            {title}
          </p>
          <p className="text-left text-xs">{channelTitle}</p>
          <p className="mt-1 text-left text-xs flex gap-1 items-center">
            <IoEyeSharp className="inline text-gray-400 text-sm" />
            {likesFormatter(viewCount)} views
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
  videoId: PropTypes.string.isRequired,
  channelId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  imageUrl: PropTypes.string.isRequired,
  viewCount: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired
};
