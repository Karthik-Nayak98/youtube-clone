import React from "react";
import formatDistance from "date-fns/formatDistance";
import PropTypes from "prop-types";

import { VIDEOS_API } from "../../constants/apiUrl";
import { durationFormatter, likesFormatter } from "../../utils/utility";
import { useYouTubeQuery } from "../../hooks/useYouTubeQuery";
function HorizontalVideo({
  title,
  videoId,
  imageUrl,
  channelTitle,
  publishedDate,
  description,
  queryParam,
}) {
  const videoDetails = useYouTubeQuery("videoDetails", VIDEOS_API, videoId);

  if (videoDetails.isLoading) return <h1>Loading...</h1>;
  //   if (isError) return <h1>Error: {error}...</h1>;

  return videoDetails.data.items.length ? (
    <div
      key={videoId}
      className='w-full mb-3 flex items-start flex-col sm:flex-row justify-center md:justify-between px-1 md:px-0'>
      <div className='relative'>
        <img className={"w-84 md:w-96"} src={imageUrl} alt={title} />
        <p className='absolute right-1 bottom-1 text-sm bg-black px-1 text-white'>
          {durationFormatter(
            videoDetails.data
              ? videoDetails.data.items[0].contentDetails.duration
              : "PTM0S0"
          )}
        </p>
      </div>
      <div className={`flex gap-2 ${queryParam.length ? "w-full" : "w-full"}`}>
        <div className='px-2 h-full text-light '>
          <p
            className={`${
              queryParam.length
                ? "text-sm md:text-sm lg:text-xl"
                : "text-xs md:text-sm"
            } text-left text-white font-normal line-clamp-2`}>
            {title}
          </p>
          <div>
            {queryParam.length ? (
              <>
                <p className='text-left text-xs'>{channelTitle}</p>
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
              </>
            ) : (
              <>
                <p className='text-left text-xxs md:text-xs flex gap-1 items-center'>
                  {likesFormatter(
                    videoDetails.data
                      ? videoDetails.data.items[0].statistics.viewCount
                      : 0
                  )}{" "}
                  views
                  <span className='text-xxs md:text-lg'>&#183;</span>
                  {formatDistance(Date.parse(publishedDate), new Date(), {
                    addSuffix: true,
                  })}
                </p>
                <p className='text-left text-xs'>{channelTitle}</p>
              </>
            )}
          </div>
          {queryParam.length ? (
            <p className='hidden md:block text-xs font-normal mt-3'>
              {description.substring(0, 150)}
            </p>
          ) : null}
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

// <img className='w-full' src={imageUrl} alt={title} />
