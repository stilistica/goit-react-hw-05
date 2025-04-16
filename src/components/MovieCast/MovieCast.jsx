import s from './MovieCast.module.css'
import {useEffect, useState} from "react";
import {fetchCast} from "../../services/api.js";
import {useParams} from "react-router-dom";

function MovieCast() {
    const {movieId} = useParams();
const [cast, setCast] = useState([]);

useEffect(() => {
    const abortController = new AbortController();
    if (!movieId) return;
    const getData = async () => {
        try {
            const data = await fetchCast(movieId, abortController.signal);
            setCast(data.cast);
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

    const defaultImg =
        "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";


    return (
        <ul>
            {cast.slice(0, 5).map(actor => (
                <li key={actor.id}>
                    <img
                        src={
                            actor.profile_path
                                ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                                : defaultImg}
                        alt={actor.name}
                        className={s.img}
                    />
                    <p>{actor.name}</p>
                    <p>Character: {actor.character}</p>
                </li>
            ))}
        </ul>
    );
}

export default MovieCast;