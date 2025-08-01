import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidenav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger for mobile */}
      <div className="md:hidden p-4">
        <button
          className="text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="ri-menu-line"></i>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[75%] max-w-[300px] bg-black border-r-2 border-zinc-400 p-8 z-50 transition-transform duration-300 md:relative md:w-[20%] md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="md:hidden text-white text-2xl mb-4"
          onClick={() => setIsOpen(false)}
        >
          <i className="ri-close-line"></i>
        </button>

        <h1 className="text-2xl text-white font-bold">
          <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
          <span>ViewVault</span>
        </h1>
        <nav className="flex flex-col text-zinc-400 text-xl gap-3 mt-8">
          <h1 className="text-white font-semibold text-xl mb-3">New Feeds</h1>
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
      </div>
    </>
  );
}

export default Sidenav;
