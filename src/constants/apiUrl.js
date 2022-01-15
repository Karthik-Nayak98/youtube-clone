export const BASE_URL = `https://youtube.googleapis.com/youtube/v3`;
const VIDEOS_API = `${BASE_URL}/videos`;
const SUBSCRIPTION_API = `${BASE_URL}/subscriptions`;
const CHANNEL_API = `${BASE_URL}/channels`;
const SEARCH_API = `${BASE_URL}/search`;
const COMMENT_THREAD_API = `${BASE_URL}/commentThreads`;

export default BASE_URL;
export {
  VIDEOS_API,
  SUBSCRIPTION_API,
  SEARCH_API,
  CHANNEL_API,
  COMMENT_THREAD_API,
};
