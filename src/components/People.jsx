import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";

function People() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "People ";

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setperson((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (person.length === 0) {
      GetPerson();
    } else {
      setpage(1);
      setperson([]);
      GetPerson();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return person.length > 0 ? (
    <div className="w-screen h-screen mt-5">
      {/* Header Section */}
      <div className="px-[5%] w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400 mb-4 sm:mb-0">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] mr-4 ri-arrow-left-line"
          ></i>
          People
        </h1>

        {/* Topnav and Dropdown */}
        <div className="flex items-center w-full sm:w-[80%]">
          <Topnav />
          {/* Category dropdown only for desktop */}
          <div className="hidden sm:block">
            <Dropdown
              title="Category"
              options={["popular"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Infinite Scroll */}
      <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default People;
