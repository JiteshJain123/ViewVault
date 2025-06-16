import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDM0ZGYyNjY5NGFmNWFmYTk1ZDY1YjJiNjAxZjJmOSIsIm5iZiI6MTc0ODc2NzE3Ni42NDQsInN1YiI6IjY4M2MxMWM4YzhmYTQwYjI4MWYyYjI2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OepcL6crDK7tToFr19SBO__SKxMQNPsfBzxOLbDy1ok",
  },
});
export default instance;
