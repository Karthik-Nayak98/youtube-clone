import React, { useLayoutEffect, useState } from "react";
import Comment from "../comment/comment";

function CommentList({ comments }) {
  const [showComments, setShowComments] = useState(false);

  useLayoutEffect(() => {
    if (window.innerWidth >= 768) {
      setShowComments(true);
    }
  });

  return (
    <div className='mb-10'>
      {showComments
        ? comments.data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.items.map((item, i) => (
                <Comment
                  key={i}
                  authorName={
                    item.snippet.topLevelComment.snippet.authorDisplayName
                  }
                  authorImageUrl={
                    item.snippet.topLevelComment.snippet.authorProfileImageUrl
                  }
                  publishedAt={item.snippet.topLevelComment.snippet.publishedAt}
                  comment={item.snippet.topLevelComment.snippet.textDisplay}
                />
              ))}
            </React.Fragment>
          ))
        : null}
      <button
        className='md:hidden uppercase text-xs font-medium mt-4 mb-4 md:px-5 text-light'
        onClick={() => setShowComments(!showComments)}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
    </div>
  );
}

export default CommentList;
