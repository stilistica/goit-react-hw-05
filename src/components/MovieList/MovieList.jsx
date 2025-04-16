import s from './MovieList.module.css'
import {Link} from "react-router-dom";

function MovieList({movies}) {
    return (
        <div>
            <ul>
                {movies.map(movie =>
                    <li key={movie.id}>
                        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                    </li>)}
            </ul>
        </div>
    );
}

export default MovieList;