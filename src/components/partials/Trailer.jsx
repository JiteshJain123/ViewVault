import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import Notfound from "../NotFound";
function Trailer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return(
    <div className="bg-[rgba(0,0,0,0.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#6556CD] mr-6 ri-close-fill text-3xl text-white right-[5%] top-[5%]"
      ></Link>
       {ytvideo ? <ReactPlayer
       controls={true}
        height={620}
        width={1100}
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
      /> : <Notfound />}      
    </div>
  )
}
export default Trailer;
