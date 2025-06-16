
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Sidenav() {


  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-400 p-8">
      <h1 className="text-2xl text-white font-bold">
        <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
        <span className="text-2xl">ViewVault</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3 mb-3">
        <h1 className="text-white font-semibold text-xl mt-8 mb-3">
          New Feeds
        </h1>
        <Link to="/trending" className="hover:bg-[#6556CD] p-3 hover:text-white rounded-lg duration-300 text-base">
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link to="/popular" className="hover:bg-[#6556CD] p-3 hover:text-white rounded-lg duration-300 text-base">
          <i className="mr-1 ri-bard-fill"></i> Popular
        </Link>
        <Link to="/movie" className="hover:bg-[#6556CD] p-3 hover:text-white rounded-lg duration-300 text-base">
          <i className="mr-1 ri-movie-fill"></i> Movies
        </Link>
        <Link to="/tv" className="hover:bg-[#6556CD] p-3 hover:text-white rounded-lg duration-300 text-base">
          <i className="mr-1 ri-tv-2-fill"></i> TV Shows
        </Link>
        <Link to="/person" className="hover:bg-[#6556CD] p-3 hover:text-white rounded-lg duration-300 text-base">
          <i className="mr-1 ri-team-fill"></i> People
        </Link>
      </nav>
      {/* <hr className="border-none h-[1px] bg-zinc-400"/>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3 mb-3">
        <h1 className="text-white font-semibold text-xl mt-5 mb-3">
          Website Information
        </h1>
        <Link className="hover:bg-[#6556CD] p-3 hover:text-white rounded-lg duration-300 text-base">
          <i className="mr-1 ri-information-fill"></i> About App
        </Link>
        <Link className="hover:bg-[#6556CD] p-3 hover:text-white rounded-lg duration-300 text-base">
          <i className="mr-1 ri-phone-fill"></i> Contact Us
        </Link>
      </nav> */}
    </div>
  );
}

export default Sidenav;
