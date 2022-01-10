// const VIDEOS_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&maxResutls=20&chart=mostPopular&key=${process.env.REACT_APP_YOUTUBE_API}`;
export const BASE_URL = `https://youtube.googleapis.com/youtube/v3`;
const VIDEOS_API = `${BASE_URL}/videos`;
const SUBSCRIPTION_API = `${BASE_URL}/subscriptions`;
const CHANNEL_API = `${BASE_URL}/channels`;

// const VIDEO_DETAILS = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=jR4AG5LdKYE&key=${process.env.REACT_APP_YOUTUBE_API}`

// export const CHANNEL_API = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API}`;

export default BASE_URL;
export { VIDEOS_API, SUBSCRIPTION_API, CHANNEL_API };
