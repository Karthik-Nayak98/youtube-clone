export const durationFormatter = (duration = "PTM0S0") => {
  const array = duration.match(/\d+/g);
  if (array.length === 3) {
    if (array[1].length === 1) array[1] = `0${array[1]}`;
    if (array[2].length === 1) array[2] = `0${array[2]}`;
  }
  if (array.length === 2) if (array[1].length === 1) array[1] = `0${array[1]}`;

  if (array.length === 1)
    if (array[0].length === 1 && duration.indexOf("M") > -1)
      array[0] = `${array[0]}:00`;
    else if (array[0].length === 1 && duration.indexOf("H") > -1)
      array[0] = `${array[0]}:00:00`;
    else array[0] = `0:${array[0]}`;

  return array.join(":");
};

export const formatDate = publishedDate => {
  const newDate = new Date(publishedDate);
  const date = newDate.getDate();
  const year = newDate.getFullYear();
  const month = newDate.toLocaleString("default", { month: "short" });

  return `${month} ${date}, ${year}`;
};

export const numberWithCommas = (number = 0) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const likesFormatter = (likes = 0) => {
  if (likes > 999 && likes < 1000000) return `${(likes / 1000).toFixed(0)}K`;
  if (likes > 1000000 && likes < 1000000000)
    return `${(likes / 1000000).toFixed(1)}M`;

  if (likes > 1000000000) return `${(likes / 1000000000).toFixed(1)}B`;

  return likes;
};
