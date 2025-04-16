import s from './MovieDetailsPage.module.css'
import {NavLink, Outlet, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchMovieById} from "../../services/api.js";
import clsx from "clsx";

function MovieDetailsPage() {
    const {movieId} = useParams();
    const [movie, setMovie] = useState({});
    const [year, setYear] = useState(0);
    const [genres, setGenres] = useState([]);


    useEffect(() => {
        const abortController = new AbortController();
        if (!movieId) return;
        const getData = async () => {
            try {
                const data = await fetchMovieById(movieId, abortController.signal);
                setMovie(data)
                setYear(data.release_date.split('-')[0]);
                setGenres(data.genres)
            } catch (error) {
                if (error.code !== 'ERR_CANCELED') {
                    console.log(error)
                }
            }
        }
        getData();
        return () => {
            abortController.abort();
        };
    }, [movieId]);

    const setActiveLink = ({isActive}) => {
        return clsx(s.link, isActive && s.active)
    }
    const defaultImg =
        "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

    return (
        <div>
            <button>Go Back</button>
            <div className={s.container}>
                <img src={
                    movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                        : defaultImg}
                     alt={movie.title}
                     className={s.img}/>
                <div>
                    <h2>{movie.title} ({year})</h2>
                    <p>User Score: {Math.round(movie.vote_average * 10)}/100%</p>
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                    <h3>Genres</h3>
                    <ul>
                        {genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
                    </ul>
                </div>
            </div>
            <div>
                <p>Additional information</p>
                <nav>
                    <NavLink to='cast' className={setActiveLink}>Cast</NavLink>
                    <NavLink to='reviews' className={setActiveLink}>Reviews</NavLink>
                </nav>
                <Outlet/>
            </div>
        </div>
    );
}

export default MovieDetailsPage;