import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

function Home() {
  document.title = "Homepage";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <Sidenav />
      <div className="w-full md:w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />

        {/* Trending title and filter dropdown */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-5 py-4 gap-3 md:gap-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-400">
            Trending
          </h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Home;
