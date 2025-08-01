import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";

function TvDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      className="relative w-screen min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-black/70 px-[5%] py-4 overflow-y-auto">
        {/* Navigation */}
        <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
          <Link
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] mr-6 ri-arrow-left-line"
          ></Link>
          <a target="_blank" href={info.detail.homepage}>
            <i className="hover:text-white ri-external-link-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="ri-earth-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          >
            imdb
          </a>
        </nav>

        {/* Poster & Details */}
        <div className="w-full flex flex-col md:flex-row items-start mt-4 gap-6">
          <img
            className="shadow-lg h-[40vh] w-auto object-cover rounded"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt=""
          />

          <div className="text-white md:ml-[5%] w-full md:w-[70%]">
            <h1 className="text-3xl md:text-4xl font-black">
              {info.detail.original_title ||
                info.detail.name ||
                info.detail.title ||
                info.detail.original_name}
              <small className="text-xl font-bold text-zinc-200 ml-2">
                ({info.detail.first_air_date.split("-")[0]})
              </small>
            </h1>

            <div className="mt-3 mb-3 flex flex-wrap items-center gap-4 text-sm md:text-base">
              <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[7vh] h-[7vh] flex justify-center items-center">
                {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
              </span>
              <h1 className="font-semibold text-xl leading-6">User Score</h1>
              <h1>{info.detail.first_air_date}</h1>
              <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            </div>

            <h1 className="text-base font-bold italic text-zinc-200">
              {info.detail.tagline}
            </h1>

            <h1 className="text-xl mt-3 mb-1 font-bold">Overview</h1>
            <p>{info.detail.overview}</p>

            <h1 className="text-xl mt-3 mb-1 font-bold">Movie Translated</h1>
            <p className="mb-5">{info.translations.join(" , ")}</p>

            <Link
              className="inline-block w-fit mb-8 py-3 px-6 bg-[#6556CD] rounded-lg flex items-center text-white hover:bg-[#574bc4] transition"
              to={`${pathname}/trailer`}
            >
              <i className="text-xl ri-play-fill mr-2 font-bold"></i>
              Play Trailer
            </Link>
          </div>
        </div>

        {/* Watch Providers */}
        <div className="w-full flex flex-wrap justify-start gap-6 mt-6 text-white">
          {info.watchprovider?.flatrate && (
            <div className="flex items-center gap-3">
              <h1>Available on Platforms</h1>
              {info.watchprovider.flatrate.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}
          {info.watchprovider?.rent && (
            <div className="flex items-center gap-3">
              <h1>Available on Rent</h1>
              {info.watchprovider.rent.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}
          {info.watchprovider?.buy && (
            <div className="flex items-center gap-3">
              <h1>Available to Buy</h1>
              {info.watchprovider.buy.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}
        </div>

        {/* Seasons */}
        <h1 className="mt-10 text-3xl font-bold text-white">
          <hr className="my-8 bg-zinc-500 border-none h-[2px]" />
          Seasons
        </h1>
        <div className="w-full flex overflow-x-auto gap-6 mb-5 pb-4">
          {info.detail.seasons.length > 0 ? (
            info.detail.seasons.map((s, i) => (
              <div className="w-[150px] shrink-0" key={i}>
                <img
                  className="shadow-lg h-[30vh] w-full object-cover rounded"
                  src={
                    s.poster_path
                      ? `https://image.tmdb.org/t/p/original/${s.poster_path}`
                      : "/noimage.jpg"
                  }
                  alt={s.name}
                />
                <h1 className="text-lg text-zinc-300 mt-2 font-semibold truncate">
                  {s.name}
                </h1>
              </div>
            ))
          ) : (
            <h1 className="mt-5 text-white text-3xl font-black text-center">
              Nothing to show
            </h1>
          )}
        </div>

        {/* Recommendations */}
        <h1 className="mt-10 text-3xl font-bold text-white">
          <hr className="my-8 bg-zinc-500 border-none h-[2px]" />
          Recommendations & Similar Stuff
        </h1>
        <HorizontalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
        <Outlet />
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default TvDetails;
