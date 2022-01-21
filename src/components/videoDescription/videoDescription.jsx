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
        <p className='font-medium text-lg'>{title}</p>
        <div className='flex justify-between text-light'>
          <div>
            <span className='text-sm'>{numberWithCommas(viewCount)} views</span>
            <span className='text-xl'> &#183; </span>
            <span className='text-sm'>{formatDate(publishedDate)}</span>
          </div>
          <div>
            <span className='flex items-center text-white font-medium'>
              <AiOutlineLike className='inline text-2xl' />
              {likesFormatter(likeCount)}
            </span>
          </div>
        </div>
      </div>
      <hr className='my-3' />
      <div className='my-4 px-3 flex items-center justify-between text-white'>
        <figure className='flex items-center gap-3'>
          <img
            className='mt-1 ml-2 w-14 h-14 rounded-full'
            src={imageUrl}
            alt={channelTitle}
          />
          <span>
            <p className='text-sm font-medium'>{channelTitle}</p>
            <p className='text-xs text-light'>
              {likesFormatter(subscriberCount)} subscribers
            </p>
          </span>
        </figure>
        <button className='px-4 bg-yred rounded-sm text-sm h-10 tracking-wide font-medium uppercase'>
          Subscribe
        </button>
      </div>
      <div className='text-white w-2/3 px-5'>
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
