import s from "./MovieDetailsPage.module.css";
import { Suspense } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { fetchMovieById } from "../../services/api.js";
import clsx from "clsx";
import BackLink from "../../components/BackLink/BackLink.jsx";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [year, setYear] = useState(0);
  const [genres, setGenres] = useState([]);

  const location = useLocation();
  const backLink = useRef(location.state ?? "/movies");

  useEffect(() => {
    if (!movieId) return;
    const abortController = new AbortController();

    const getData = async () => {
      try {
        const data = await fetchMovieById(movieId, abortController.signal);
        setMovie(data);
        setYear(data.release_date.split("-")[0]);
        setGenres(data.genres);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.log(error);
        }
      }
    };
    getData();
    return () => {
      abortController.abort();
    };
  }, [movieId]);

  const setActiveLink = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <div className={s.details}>
      <BackLink to={backLink.current}>Go Back</BackLink>
      <div className={s.container}>
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : defaultImg
          }
          alt={movie.title}
          className={s.img}
        />
        <div>
          <h2>
            {movie.title} ({year})
          </h2>
          <p>User Score: {Math.round(movie.vote_average * 10)}/100%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={s.moreInfo}>
        <h3>Additional information</h3>
        <nav className={s.nav}>
          <NavLink to="cast" className={setActiveLink}>
            Cast
          </NavLink>
          <NavLink to="reviews" className={setActiveLink}>
            Reviews
          </NavLink>
        </nav>
        <Suspense fallback={<p>Loading subpage..</p>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
