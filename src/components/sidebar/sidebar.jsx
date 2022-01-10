import React from 'react';
import { Link } from 'react-router-dom';

import { CgPlayList } from 'react-icons/cg';
import { MdHome, MdSubscriptions } from 'react-icons/md';
import { AiFillLike } from 'react-icons/ai';

function SideBar() {
  return (
    <div className="h-screen bg-gray-900 text-white">
      <ul className="pt-4 px-1 flex flex-col justify-center gap-5">
        <Link to="/" className="flex flex-col justify-center items-center">
          <MdHome className="text-2xl" />
          <p className="text-xxs">Home</p>
        </Link>
        <Link
          to="/playlist"
          className="flex flex-col justify-center items-center"
        >
          <CgPlayList className="text-3xl" />
          <p className="text-xxs">Playlist</p>
        </Link>
        <Link
          to="/subscribe"
          className="flex flex-col justify-center items-center"
        >
          <MdSubscriptions className="text-xl" />
          <p className="text-xxs">Subscription</p>
        </Link>
        <Link to="/liked" className="flex flex-col justify-center items-center">
          <AiFillLike className="text-2xl" />
          <p className="text-xxs">Liked Videos</p>
        </Link>
      </ul>
    </div>
  );
}

export default SideBar;

<div> Home</div>;
