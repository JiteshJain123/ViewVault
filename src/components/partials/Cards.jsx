import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

function Cards({ data, title }) {
  return (
    <div className="w-full h-full bg-[#1F1E24] px-[5%] py-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
        {data.map((c, i) => (
          <Link
            to={`/${c.media_type || title}/details/${c.id}`}
            className="relative"
            key={i}
          >
            <img
              className="w-full h-[30vh] sm:h-[35vh] md:h-[38vh] lg:h-[35vh] object-cover rounded-md shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
              src={
                c.poster_path || c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      c.poster_path ||
                      c.backdrop_path ||
                      c.profile_path
                    }`
                  : noimage
              }
              alt="poster"
            />
            <h1 className="text-base sm:text-lg text-zinc-300 mt-2 font-medium line-clamp-2">
              {c.original_title || c.name || c.title || c.original_name}
            </h1>
            {c.vote_average && (
              <div className="absolute right-[-5%] bottom-[20%] rounded-full text-sm sm:text-base font-semibold bg-yellow-600 text-white w-[6vh] h-[6vh] flex justify-center items-center">
                {(c.vote_average * 10).toFixed()} <sup>%</sup>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Cards;
