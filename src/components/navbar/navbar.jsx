import React, { useState } from 'react';
import { AiFillYoutube, AiOutlineSearch } from 'react-icons/ai';

function Navbar() {
  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(search);
  };

  return (
    <div className="w-full fixed top-0 px-4 flex justify-between items-center flex-grow-1 bg-gray-900 text-white">
      <figure className="flex items-center justify-center gap-2">
        <span className="font-semibold text-xl">YouTube</span>{' '}
        <AiFillYoutube className="text-3xl text-red-600" />
      </figure>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          onChange={handleChange}
          placeholder="Search"
          type="search"
          className="w-96 my-2 p-2 bg-black bg-opacity-30 border border-white"
        />
        <button
          type="submit"
          className="w-16 py-2 border bg-gray-800 border-white  text-white"
        >
          <AiOutlineSearch className="text-2xl mx-auto" />
        </button>
      </form>
      <p>Login</p>
    </div>
  );
}

export default Navbar;
