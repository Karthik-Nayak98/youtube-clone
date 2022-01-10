import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import SideBar from '../sidebar/sidebar';
import Video from '../video/video';

import { VIDEOS_API } from '../../constants/apiUrl';

const fetchVideos = async ({ pageParam = '' }) => {
  const params = new URLSearchParams({
    part: 'snippet,contentDetails,statistics',
    maxResults: 20,
    chart: 'mostPopular',
    pageToken: pageParam,
    key: process.env.REACT_APP_YOUTUBE_API
  });

  const url = `${VIDEOS_API}?${params.toString()}`;
  const res = await fetch(url);
  return res.json();
};

function VideoList() {
  const videoContainer = useRef('');

  const { isFetchingNextPage, fetchNextPage, hasNextPage, isLoading, data } =
    useInfiniteQuery('videoList', fetchVideos, {
      getNextPageParam: (lastPage) => {
        if ('nextPageToken' in lastPage) return lastPage.nextPageToken;
        return undefined;
      }
    });

  useEffect(() => {
    if (!videoContainer.current) return undefined;

    const element = videoContainer.current;
    const handleScroll = (event) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target;
      if (scrollHeight - scrollTop <= clientHeight * 4 && isFetchingNextPage) {
        console.log('fetching next page...');
        if (hasNextPage) fetchNextPage();
      }
    };

    element.addEventListener('scroll', handleScroll);
    return () => element.removeEventListener('scroll', handleScroll);
  });

  if (isLoading) return <h1>Loading....</h1>;

  return (
    <div className="bg-black bg-opacity-90 fixed top-14 flex justify-around gap-10">
      <SideBar />
      <div
        ref={videoContainer}
        className="mt-5 h-screen flex justify-start gap-4 flex-wrap overflow-auto"
      >
        {data?.pages.map((page) => (
          <React.Fragment key={page.nextPageToken}>
            {page.items.map((item) => (
              <Video
                key={item.id}
                title={item.snippet.title}
                videoId={item.id}
                channelId={item.snippet.channelId}
                channelTitle={item.snippet.channelTitle}
                imageUrl={item.snippet.thumbnails.medium.url}
                duration={item.contentDetails.duration}
                viewCount={item.statistics.viewCount}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default VideoList;

//  <div key={video.id} className="w-72 h-56"> <div className="relative"> <img src={video.snippet.thumbnails.medium.url}
//         alt={video.snippet.title}
//       />
//       <p className="absolute right-1 bottom-1 text-sm bg-black px-1 text-white">
//         {durationFormatter(video.contentDetails.duration)}
//       </p>
//     </div>
//     {/* <iframe
//       width="100%"
//       height="70%"
//       src={`https://www.youtube.com/embed/${video.id}`}
//       title={video.snippet.title}
//     /> */}
//     <div className="mt-2 flex gap-2">
//       <figure className="w-1/6">
//         <img
//           className="mt-1 ml-2 w-10 h-10 rounded-full"
//           src="https://yt3.ggpht.com/ytc/AKedOLRsqH73YYBdxwhl7UveWazVoX4g2OSnsDVOSEy5=s88-c-k-c0x00ffffff-no-rj"
//           // src={channelDetails[index]}
//           alt="channel-banner"
//         />
//       </figure>
//       <div className="w-5/6 px-2 text-gray-100">
//         <p className="mt-1 h-6 text-left text-white font-semibold text-sm overflow-hidden">
//           {video.snippet.title}
//         </p>
//         <p className="text-left text-xs">
//           {video.snippet.channelTitle}
//         </p>
//         <p className="mt-1 text-left text-xs flex gap-1 items-center">
//           <IoEyeSharp className="inline text-gray-400 text-sm" />
//           {likesFormatter(video.statistics.viewCount)} views
//         </p>
//       </div>
//     </div>
//   </div>

// useEffect(() => { list.items.forEach((listitem) => {
//     fetch( `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${listitem.snippet.channelId}&key=${process.env.REACT_APP_YOUTUBE_API}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data.items);
//         // // setChannelDetails([
//         //   ...channelDetails,
//         //   data.items[0].snippet.thumbnails.default.url
//         // ]);
//         //     const item = {
//         //       ...listitem,
//         //       channelUrl: data.items[0].snippet.thumbnails.default.url
//         //     };
//         // setVideoList({ ...list, listitem: item });
//       })
//       .catch((err) => console.log(err));
//   });
// });

// useEffect(() => {
//   const observer = new IntersectionObserver(
//     (entries) =>
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           console.log('intersecting');
//           fetchNextPage(nextPageToken);
//         }
//       }),
//     options
//   );
//   const el = loadButton && loadButton.current;
//   if (!el) return el;

//   observer.observe(el);
//   return () => {
//     observer.unobserve(el);
//   };
// }, [loadButton.current, hasNextPage]);

// useEffect(() => {
//   if (data) {
//     setVideoList(data.items);
//     setNextPageToken(data.nextPageToken);
//   }
// }, [data]);

// useEffect(() => {
// const handleScroll = (event) => {
//   const { scrollHeight, scrollTop, clientHeight } =
//     event.target.scrollingElement;
//   if (scrollHeight - scrollTop <= clientHeight * 1.5) {
//     console.log('hi');
//     fetchNextPage();
//   }
// };
// videoButton.current.addEventListener('Scroll', handleScroll);
// return () => videoButton.removeEventListener('Scroll', handleScroll);
// });
