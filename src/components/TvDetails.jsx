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
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center top 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-[224vh] px-[10%]"
    >
      {/*Part-1 navigation */}
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

      {/*Part-2 Poster and details */}
      <div className="w-full flex">
        <img
          className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] text-white">
          <h1 className="text-4xl font-black">
            {info.detail.original_title ||
              info.detail.name ||
              info.detail.title ||
              info.detail.original_name}
            <small className="text-2xl font-bold text-zinc-200">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className=" mt-3 mb-3 flex items-center gap-x-4">
            <span className="rounded-full text-xl font-semibold bg-yellow-600 text-white w-[7vh] h-[7vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-2xl leading-6">
              User Score
            </h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
          </div>

          <h1 className="text-base font-bold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className="text-xl mt-3 mb-1 font-bold">Overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className="text-xl mt-3 mb-1 font-bold">Movie Translated</h1>
          <p className="mb-5">{info.translations.join(" , ")}</p>

          <Link
            className="w-[22%] mb-8 py-4 px-10 bg-[#6556CD] rounded-lg flex items-center "
            to={`${pathname}/trailer`}
          >
            <i className="text-xl ri-play-fill mr-3 font-bold"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/*Part-3 Available on Platforms */}
      <div className="w-[100%] flex justify-evenly mt-3">
        {info.watchprovider && info.watchprovider.flatrate && (
          <div className="flex gap-x-4 items-center text-white">
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
        {info.watchprovider && info.watchprovider.rent && (
          <div className="flex gap-x-4 items-center text-white">
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
        {info.watchprovider && info.watchprovider.buy && (
          <div className="flex gap-x-4 items-center text-white">
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

      {/*Part-4 Seasons */}
      <h1 className="mt-10 text-3xl font-bold text-white">
        <hr className="my-8 bg-zinc-500 border-none h-[2px]" />
        Seasons
      </h1>
      <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
        {info.detail.seasons.length > 0 ? info.detail.seasons.map((s, i) => (
          <div className="w-[15vh] mr-[11%]" key={i}>
            <img
              className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] min-w-[14vw] object-cover"
              src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
              alt=""
            />
            <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">
              {s.name}
            </h1>
          </div>
        )) : (<h1 className="mt-5 text-white text-3xl font-black text-center">Nothing to show</h1>)}
      </div>

      {/*Part-5 Recommendations and similar stuff */}
      <h1 className="mt-10 text-3xl font-bold text-white">
        <hr className="my-8 bg-zinc-500 border-none h-[2px]" />
        Recommendations & Similar Stuff
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default TvDetails;
