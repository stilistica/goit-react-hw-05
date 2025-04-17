import s from './MovieList.module.css'
import {Link, useLocation} from "react-router-dom";

function MovieList({movies}) {
    const location = useLocation()
    return (
        <div>
            <ul className={s.list}>
                {movies.map(movie =>
                    <li key={movie.id} className={s.item}>
                        <Link to={`/movies/${movie.id}`} state={location} className={s.title}>{movie.title}</Link>
                    </li>)}
            </ul>
        </div>
    );
}

export default MovieList;