import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";

function PersonDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="w-screen min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="h-[10vh] w-full px-5 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="flex flex-col lg:flex-row px-5 md:px-[10%]">
        {/* Left section */}
        <div className="lg:w-[25%] w-full">
          <img
            className="mx-auto h-[35vh] w-[180px] object-contain shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />

          <hr className="mt-6 mb-3 bg-zinc-500 border-none h-[2px]" />

          <div className="text-2xl flex gap-x-5 justify-center lg:justify-start">
            <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
              <i className="ri-earth-fill"></i>
            </a>
            <a target="_blank" href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a target="_blank" href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
              <i className="ri-instagram-fill"></i>
            </a>
            <a target="_blank" href={`https://x.com/${info.externalid.twitter_id}`}>
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          <div className="mt-6 text-zinc-300 space-y-2">
            <h1 className="text-2xl font-semibold">Personal Info</h1>
            <p><strong>Popular For:</strong> {info.detail.known_for_department}</p>
            <p><strong>Gender:</strong> {info.detail.gender === 1 ? "Female" : "Male"}</p>
            <p><strong>Birthday:</strong> {info.detail.birthday}</p>
            <p><strong>Deathday:</strong> {info.detail.deathday ? info.detail.deathday : "Still Alive"}</p>
            <p><strong>Place Of Birth:</strong> {info.detail.place_of_birth}</p>
            <p><strong>Also Known As:</strong> 
              {info.detail.also_known_as.length > 0
                ? info.detail.also_known_as.join(", ")
                : "No Other Names"}
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="lg:w-[75%] w-full lg:ml-10 mt-10 lg:mt-0">
          <h1 className="text-4xl md:text-6xl font-black text-zinc-200">
            {info.detail.name || info.detail.original_name}
          </h1>

          <h2 className="text-xl mt-4 font-semibold text-zinc-400">Biography</h2>
          <p className="mt-3 text-zinc-400">{info.detail.biography}</p>

          <h2 className="mt-8 text-lg font-semibold text-zinc-400">Known For</h2>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="flex flex-col md:flex-row justify-between mt-10">
            <h2 className="text-xl font-semibold text-zinc-400 mb-2 md:mb-0">Acting</h2>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>

          <div className="list-disc text-zinc-400 w-full max-h-[50vh] overflow-y-scroll mt-5 shadow-xl shadow-[rgba(255,255,255,0.3)] p-5 border border-zinc-700 custom-scroll">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white p-5 duration-300 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span>{c.original_title || c.name || c.title || c.original_name}</span>
                  {c.character && (
                    <span className="block ml-5 mt-2">
                      Character Name : {c.character}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>

      {/* Add black spacer at bottom to allow scrolling */}
      <div className="h-[15vh] w-full bg-black"></div>
    </div>
  ) : (
    <Loading />
  );
}

export default PersonDetails;
