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
      className="w-[80%] h-[10vh] relative flex mx-auto items-center"
    >
      <i className="text-zinc-400 text-2xl ri-search-line"></i>
      <input
        value={query}
        onChange={(e) => setquery(e.target.value)}
        className="bg-transparent text-zinc-200 w-[50%] mx-10 p-3 text-xl outline-none border-none"
        type="text"
        placeholder="Search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => {
            setquery("");
            setsearches([]);
          }}
          className="text-zinc-400 text-2xl ri-close-fill right-0 cursor-pointer"
        ></i>
      )}

      {query.length > 0 && searches.length > 0 && (
        <div className="z-[100] w-[50%] max-h-[50vh] bg-zinc-200 absolute top-[100%] left-[5%] overflow-auto shadow-xl rounded">
          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="hover:text-black hover:bg-zinc-300 duration-200 font-semibold text-zinc-600 w-[100%] p-8 flex items-center justify-start border-b-2 border-zinc-100"
            >
              <img
                className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span>
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
