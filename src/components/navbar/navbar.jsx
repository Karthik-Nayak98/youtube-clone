import React, { useState, useContext } from "react";
import { AiFillYoutube, AiOutlineSearch } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/authcontext";
import { useEffect } from "react/cjs/react.development";
import { useLogin } from "../../hooks/useLogin";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [search, setSearch] = useState("");
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const { signIn } = useLogin();
  const { signOut } = useLogout();

  useEffect(() => {
    console.log("context", user);
  }, [user]);

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    navigate(`/results?search_query=${search}`);
  };

  return (
    <div
      className='w-full fixed top-0 left-0 px-4 flex justify-between items-center flex-grow-1 
    bg-sdark text-white border-b border-light'>
      <figure className='flex items-center justify-center gap-2'>
        <Link to='/'>
          <div className='flex gap-2'>
            <span className='hidden lg:inline-block font-semibold text-xl'>
              YouTube
            </span>{" "}
            <AiFillYoutube className='text-3xl text-yred' />
          </div>
        </Link>
      </figure>
      <form onSubmit={handleSearch} className='flex items-center w-1/2'>
        <input
          onChange={handleChange}
          placeholder='Search'
          type='search'
          className='w-full my-2 p-2 bg-pdark border border-white'
        />
        <button
          type='submit'
          className='w-20 py-2 border bg-tdark border-white text-white'>
          <AiOutlineSearch className='text-2xl mx-auto' />
        </button>
      </form>

      {!user?.accessToken ? (
        <button
          onClick={signIn}
          className='flex items-center gap-2 text-sm font-semibold tracking-wide border border-yblue rounded p-2 uppercase text-yblue'>
          <BiUserCircle size='1.4rem' className='hidden lg:inline text-yblue' />
          Sign In
        </button>
      ) : (
        <button onClick={signOut}>
          <img
            className='w-10 h-10 rounded-full'
            src={sessionStorage.getItem("image")}
            alt={user?.name}
          />
        </button>
      )}
    </div>
  );
}

export default Navbar;
