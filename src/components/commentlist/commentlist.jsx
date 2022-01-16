import React from "react";
import Comment from "../comment/comment";

function CommentList({ comments }) {
  return (
    <div>
      {comments.data?.pages.map(page => (
        <React.Fragment key={page.nextPageToken}>
          {page.items.map(item => (
            <Comment
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
      ))}
    </div>
  );
}

export default CommentList;
