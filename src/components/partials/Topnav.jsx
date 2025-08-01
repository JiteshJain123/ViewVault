import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpg";

function Topnav() {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  const dropdownRef = useRef(null);

  const Getsearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      Getsearches();
    } else {
      setsearches([]);
    }
  }, [query]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setquery("");
        setsearches([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="w-full max-w-4xl px-4 py-3 flex items-center gap-3 mx-auto relative"
    >
      {/* Search Icon */}
      <i className="text-zinc-400 text-xl ri-search-line"></i>

      {/* Search Input */}
      <input
        value={query}
        onChange={(e) => setquery(e.target.value)}
        type="text"
        placeholder="Search anything..."
        className="flex-1 bg-transparent text-zinc-200 placeholder:text-zinc-400 text-base sm:text-lg px-2 py-2 outline-none border-none"
      />

      {/* Clear Button */}
      {query.length > 0 && (
        <i
          onClick={() => {
            setquery("");
            setsearches([]);
          }}
          className="text-zinc-400 text-xl ri-close-fill cursor-pointer"
        ></i>
      )}

      {/* Dropdown Results */}
      {query.length > 0 && searches.length > 0 && (
        <div className="z-[100] w-full max-w-4xl max-h-[50vh] bg-zinc-200 absolute top-full left-0 mt-2 overflow-auto shadow-xl rounded">
          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="hover:text-black hover:bg-zinc-300 duration-200 font-semibold text-zinc-600 w-full p-4 sm:p-5 flex items-center justify-start border-b border-zinc-100"
            >
              <img
                className="w-16 h-16 sm:w-[10vh] sm:h-[10vh] object-cover rounded mr-4 shadow-md"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span className="text-sm sm:text-base line-clamp-1">
                {s.original_title || s.name || s.title || s.original_name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Topnav;
