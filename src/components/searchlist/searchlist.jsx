import React from "react";
import { useSearchParams } from "react-router-dom";

import { SEARCH_API } from "../../constants/apiUrl";
import { useInfiniteYouTubeQuery } from "../../hooks/useInfiniteYouTubeQuery";
import { useScroll } from "../../hooks/useScroll";
import RelatedVideo from "../relatedvideo/relatedvideo";

function SearchList() {
  const [searchParam] = useSearchParams();
  const result = searchParam.get("search_query");

  const searchList = useInfiniteYouTubeQuery("searchQuery", SEARCH_API, {
    part: "snippet",
    maxResults: 20,
    type: "video",
    q: result,
  });

  const scroll = useScroll(searchList);

  return (
    <div
      onScroll={scroll}
      className='p-8 pb-14 w-screen h-full overflow-auto bg-pdark 
    fixed top-14'>
      <RelatedVideo relatedVideo={searchList} queryParam={result} />
    </div>
  );
}

export default SearchList;
