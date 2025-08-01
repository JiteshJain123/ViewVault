import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import Notfound from "../NotFound";

function Trailer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.9)] z-[100] overflow-y-auto flex items-center justify-center p-4">
      {/* Close Icon */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 text-white text-3xl hover:text-[#6556CD] z-[101]"
      >
        <i className="ri-close-fill"></i>
      </button>

      {/* Trailer or Notfound GIF */}
      <div className="w-full max-w-[90%] md:max-w-[70%] aspect-video flex items-center justify-center">
        {ytvideo ? (
          <ReactPlayer
            controls={true}
            width="100%"
            height="100%"
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          />
        ) : (
          <Notfound />
        )}
      </div>
    </div>
  );
}

export default Trailer;
