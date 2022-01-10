export const durationFormatter = (duration) => {
  const array = duration.match(/\d+/g);
  const len = array.length - 1;
  if (array[len].length === 1) array[len] = `0${array[len]}`;
  return array.join(':');
};

export const likesFormatter = (likes) => {
  if (likes > 999 && likes < 1000000) return `${(likes / 1000).toFixed(0)}K`;
  if (likes > 1000000 && likes < 1000000000)
    return `${(likes / 1000000).toFixed(1)}M`;
  if (likes > 1000000000) return `${(likes / 1000000000).toFixed(1)}B`;

  return likes;
};
