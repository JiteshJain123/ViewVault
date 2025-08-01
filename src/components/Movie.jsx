import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";

function Movie() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false); // for mobile dropdowns

  document.title = "Movies " + category.toUpperCase();

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setmovie((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      GetMovie();
    } else {
      setpage(1);
      setmovie([]);
      GetMovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movie.length > 0 ? (
    <div className="w-screen min-h-screen">
      {/* Header */}
      <div className="px-[5%] py-4 w-full flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-2xl font-semibold text-zinc-400">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556CD] mr-4 ri-arrow-left-line"
            ></i>
            Movies
            <small className="ml-2 text-sm text-zinc-600">({category})</small>
          </h1>

          {/* Hamburger Menu (Mobile) */}
          <button
            className="md:hidden text-zinc-400 text-2xl"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <i className="ri-menu-line"></i>
          </button>
        </div>

        {/* Mobile Topnav */}
        <div className="block md:hidden w-full mt-4">
          <Topnav />
        </div>

        {/* Desktop Topnav + Dropdown */}
        <div className="hidden md:flex items-center w-full md:w-[80%] mt-4 md:mt-0">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>

        {/* Mobile Dropdowns */}
        {showDropdown && (
          <div className="flex flex-col md:hidden mt-4 gap-2">
            <Dropdown
              title="Category"
              options={["popular", "top_rated", "upcoming", "now_playing"]}
              func={(e) => {
                setcategory(e.target.value);
                setShowDropdown(false);
              }}
            />
          </div>
        )}
      </div>

      {/* Cards Grid with Infinite Scroll */}
      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovie}
        hasMore={hasMore}
        loader={<h1 className="text-center text-zinc-500 py-4">Loading...</h1>}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Movie;
