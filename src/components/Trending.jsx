import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false); // for mobile

  document.title = "Trending " + category.toUpperCase();

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (trending.length === 0) {
      GetTrending();
    } else {
      setpage(1);
      settrending([]);
      GetTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen min-h-screen">
      {/* Header section */}
      <div className="px-[5%] py-4 w-full flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-2xl font-semibold text-zinc-400">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556CD] mr-4 ri-arrow-left-line"
            ></i>
            Trending
          </h1>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-zinc-400 text-2xl"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <i className="ri-menu-line"></i>
          </button>
        </div>

        {/* Mobile Search Bar (Only visible on mobile) */}
        <div className="block md:hidden w-full mt-4">
          <Topnav />
        </div>

        {/* Desktop dropdowns + Topnav */}
        <div className="hidden md:flex items-center w-full md:w-[80%] mt-4 md:mt-0">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>

        {/* Mobile dropdowns */}
        {showDropdown && (
          <div className="flex flex-col md:hidden mt-4 gap-2">
            <Dropdown
              title="Category"
              options={["movie", "tv", "all"]}
              func={(e) => {
                setcategory(e.target.value);
                setShowDropdown(false);
              }}
            />
            <Dropdown
              title="Duration"
              options={["week", "day"]}
              func={(e) => {
                setduration(e.target.value);
                setShowDropdown(false);
              }}
            />
          </div>
        )}
      </div>

      {/* Cards list with Infinite Scroll */}
      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h1 className="text-center text-zinc-500 py-4">Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Trending;
