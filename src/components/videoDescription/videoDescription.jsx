import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import {
  formatDate,
  likesFormatter,
  numberWithCommas,
} from "../../utils/utility";

function VideoDescription({
  title,
  description,
  publishedDate,
  channelTitle,
  viewCount,
  likeCount,
  imageUrl,
  subscriberCount,
}) {
  const [showMoreLess, setShowMoreLess] = useState(false);
  return (
    <div>
      <div className='text-white mt-5'>
        <p className='font-medium text-sm md:text-lg'>{title}</p>
        <div className='flex justify-between text-light'>
          <div>
            <span className='text-xs md:text-sm'>
              {numberWithCommas(viewCount)} views
            </span>
            <span className='text-xs md:text-xl'> &#183; </span>
            <span className='text-xs md:text-sm'>
              {formatDate(publishedDate)}
            </span>
          </div>
          <div>
            <span className='mt-1 flex items-center text-sm sm:text-base text-white font-medium'>
              <AiOutlineLike className='inline text-xl md:text-2xl' />
              {likesFormatter(likeCount)}
            </span>
          </div>
        </div>
      </div>
      <hr className='my-3' />
      <div className='my-4 px-3 flex items-center justify-between text-white'>
        <figure className='flex items-center gap-3'>
          <img
            className='mt-1 sm:ml-2 w-8 h-8 sm:w-14 sm:h-14 rounded-full'
            src={imageUrl}
            alt={channelTitle}
          />
          <span>
            <p className='text-xs sm:text-sm font-medium'>{channelTitle}</p>
            <p className='text-xxs sm:text-xs text-light'>
              {likesFormatter(subscriberCount)} subscribers
            </p>
          </span>
        </figure>
        <button className='px-2 sm:px-4 bg-yred rounded-sm text-xxs sm:text-sm h-6 sm:h-10 tracking-wide font-medium uppercase'>
          Subscribe
        </button>
      </div>
      <div className='text-white text-sm w-full  md:w-2/3 px-5'>
        {showMoreLess ? description : description.substring(0, 225)}
      </div>
      <button
        className='uppercase text-xs font-medium mt-4 px-5 text-light'
        onClick={() => setShowMoreLess(!showMoreLess)}>
        {showMoreLess ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}

export default VideoDescription;
