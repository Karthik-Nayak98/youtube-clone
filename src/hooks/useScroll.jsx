export const useScroll = list => {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = list;
  return event => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    if (scrollHeight - scrollTop <= clientHeight * 2 && !isFetchingNextPage) {
      console.log("fetching next page...");
      if (hasNextPage) fetchNextPage();
    }
  };
};
