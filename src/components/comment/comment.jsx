import React from "react";
import formatDistance from "date-fns/formatDistance";

function Comment({ authorImageUrl, authorName, publishedAt, comment }) {
  return (
    <div className='text-sm text-white my-5'>
      <div className='flex gap-3'>
        <figure>
          <img
            className='w-10 h-10 rounded-full'
            src={authorImageUrl}
            alt={authorName}
          />
        </figure>
        <div>
          <p className='flex items-center gap-4 text-white'>
            <span className='font-medium'>{authorName}</span>
            <span className='text-light text-xs'>
              {formatDistance(new Date(Date.parse(publishedAt)), new Date(), {
                addsuffix: true,
              })}{" "}
              ago
            </span>
          </p>
          <p
            dangerouslySetInnerHTML={{
              __html: comment,
            }}></p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
