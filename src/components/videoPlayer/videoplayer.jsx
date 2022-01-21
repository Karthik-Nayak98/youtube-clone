import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { useLocation, useParams } from "react-router-dom";

import {
  CHANNEL_API,
  COMMENT_THREAD_API,
  SEARCH_API,
  VIDEOS_API,
} from "../../constants/apiUrl";
import { numberWithCommas } from "../../utils/utility";
import { client } from "../../index";

import { AuthContext } from "../../context/authcontext";
import RelatedVideo from "../relatedvideo/relatedvideo";
import VideoDescription from "../videoDescription/videoDescription";
import CommentList from "../commentlist/commentlist";

import { useYouTubeQuery } from "../../hooks/useYouTubeQuery";
import { useInfiniteYouTubeQuery } from "../../hooks/useInfiniteYouTubeQuery";
import { useLogin } from "../../hooks/useLogin";
import { useScroll } from "../../hooks/useScroll";

function VideoPlayer() {
  const param = useParams();
  const [comment, setComment] = useState();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  console.log(user);
  const {
    description,
    videoId = false,
    publishedDate,
    channelTitle,
    channelId = false,
    title,
  } = location.state;

  const videoDetails = useYouTubeQuery("videoDetails", VIDEOS_API, videoId);
  const channelDetails = useYouTubeQuery(
    "channelDetails",
    CHANNEL_API,
    channelId
  );

  // Fetches the toplevel comment for the current video.
  const comments = useInfiniteYouTubeQuery("commentList", COMMENT_THREAD_API, {
    part: "snippet",
    videoId: videoId,
  });

  // Fetches the video related to the current videoId
  const relatedVideo = useInfiniteYouTubeQuery("relatedVideo", SEARCH_API, {
    part: "snippet",
    maxResults: 20,
    relatedToVideoId: videoId,
    type: "video",
  });

  // Mutation for post request
  const mutation = useMutation(
    async requestOptions => {
      const params = new URLSearchParams({
        part: "snippet",
        key: process.env.REACT_APP_YOUTUBE_API,
      });

      const url = `${COMMENT_THREAD_API}?${params.toString()}`;

      const response = await fetch(url, requestOptions);
      return await response.json();
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          client.invalidateQueries([
            "commentList",
            COMMENT_THREAD_API,
            {
              part: "snippet",
              videoId: videoId,
            },
          ]);
          client.invalidateQueries(["videoDetails", VIDEOS_API, videoId]);
        }, 10000);
        setComment("");
      },
    },
    {
      onError: err => {
        console.log("comment error", err);
      },
    }
  );

  // Posts comment on button click
  const handlePostComment = event => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
      body: JSON.stringify({
        snippet: {
          videoId: videoId,
          topLevelComment: {
            snippet: {
              textOriginal: comment,
              authorDisplayName: user?.name,
              authorProfileImageUrl: user?.image,
            },
          },
        },
      }),
    };

    mutation.mutate(requestOptions);
  };

  const { signIn } = useLogin();
  const commentScroll = useScroll(comments);
  const relatedVideoScroll = useScroll(relatedVideo);

  return (
    <div
      onScroll={event => {
        commentScroll(event);
        relatedVideoScroll(event);
      }}
      className='bg-pdark fixed top-14 w-screen overflow-auto h-screen'>
      <iframe
        className='mx-auto my-4'
        width='80%'
        height='75%'
        src={`https://www.youtube.com/embed/${param.videoId}?=0&autoplay=1&disablekb=1&modestbranding=0`}
        frameBorder={1}
        title='youtube video'
      />
      <div className='flex flex-col md:flex-row'>
        {/* Video Description */}
        <div className='w-full md:w-1/2 lg:w-2/3 p-6 overflow-auto'>
          <VideoDescription
            publishedDate={publishedDate}
            description={description}
            title={title}
            channelTitle={channelTitle}
            viewCount={
              videoDetails.data
                ? videoDetails.data.items[0].statistics.viewCount
                : 0
            }
            likeCount={
              videoDetails.data
                ? videoDetails.data?.items[0].statistics.likeCount
                : 0
            }
            imageUrl={
              channelDetails.data
                ? channelDetails.data.items[0].snippet.thumbnails.default.url
                : 0
            }
            subscriberCount={
              channelDetails.data
                ? channelDetails.data.items[0].statistics.subscriberCount
                : 0
            }
          />
          <hr className='my-3' />
          {/* Comment Container */}
          <div>
            <p className='flex items-center text-white font-medium'>
              {numberWithCommas(
                videoDetails.data
                  ? videoDetails.data.items[0].statistics.commentCount
                  : 0
              )}{" "}
              comments
            </p>
            <form className='relative mb-10' onSubmit={handlePostComment}>
              <input
                className='text-white bg-pdark border-b outline-none border-light p-2 mt-3 w-full focus:border-white focus:border-b-2'
                type='text'
                placeholder='Add a comment'
                value={comment}
                onChange={event => setComment(event.target.value)}
                onFocus={!user?.accessToken ? signIn : null}
              />
              <button
                disabled={!comment}
                className={`float-right px-4 mb-20 py-2 mt-2 uppercase rounded font-medium text-sm ${
                  comment ? "bg-blue-600 text-pdark" : "bg-sdark text-light"
                }`}>
                Comment
              </button>
            </form>

            <CommentList comments={comments} />
          </div>
        </div>

        {/* Related Videos */}
        <div className='w-full md:w-1/2 lg:w-1/3 p-sdark md:px-12 pt-8 pb-14 overflow-auto'>
          <RelatedVideo relatedVideo={relatedVideo} />
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
