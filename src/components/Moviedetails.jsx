import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";

function Moviedetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-full min-h-screen px-[5%] sm:px-[10%] overflow-x-hidden"
    >
      {/* Navigation */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
        <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD] mr-6 ri-arrow-left-line"></Link>
        <a target="_blank" href={info.detail.homepage}><i className="hover:text-white ri-external-link-fill"></i></a>
        <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className="ri-earth-fill"></i></a>
        <a target="_blank" href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}>imdb</a>
      </nav>

      {/* Poster & Details */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
          alt=""
        />

        <div className="content md:ml-[5%] text-white mt-6 md:mt-0">
          <h1 className="text-3xl md:text-4xl font-black">
            {info.detail.original_title || info.detail.name || info.detail.title || info.detail.original_name}
            <small className="text-xl md:text-2xl font-bold text-zinc-200 ml-2">
              ({info.detail.release_date?.split("-")[0]})
            </small>
          </h1>

          <div className="mt-3 mb-3 flex flex-wrap items-center gap-3 md:gap-x-4 text-sm md:text-base">
            <span className="rounded-full text-base md:text-xl font-semibold bg-yellow-600 text-white w-[6vh] h-[6vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="font-semibold leading-6">User Score</h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-base font-bold italic text-zinc-200">{info.detail.tagline}</h1>
          <h1 className="text-xl mt-3 mb-1 font-bold">Overview</h1>
          <p>{info.detail.overview}</p>
          <h1 className="text-xl mt-3 mb-1 font-bold">Movie Translated</h1>
          <p className="mb-5">{info.translations.join(", ")}</p>

          <Link
            className="w-fit md:w-[22%] mb-8 py-3 px-6 bg-[#6556CD] rounded-lg flex items-center"
            to={`${pathname}/trailer`}
          >
            <i className="text-xl ri-play-fill mr-3 font-bold"></i> Play Trailer
          </Link>
        </div>
      </div>

      {/* Platform Availability */}
      <div className="w-full flex flex-col md:flex-row justify-evenly mt-6 gap-y-6 text-white">
        {info.watchprovider?.flatrate && (
          <div className="flex gap-x-4 items-center">
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
          <div className="flex gap-x-4 items-center">
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
          <div className="flex gap-x-4 items-center">
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

      {/* Recommendations */}
      <h1 className="mt-10 text-3xl font-bold text-white">
        <hr className="my-8 bg-zinc-500 border-none h-[2px]" />
        Recommendations & Similar Stuff
      </h1>
      <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default Moviedetails;
