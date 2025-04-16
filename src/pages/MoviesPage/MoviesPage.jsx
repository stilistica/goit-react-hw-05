import s from './MoviesPage.module.css'
import {useEffect, useState} from "react";
import {fetchSearchMovie} from "../../services/api.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import Form from '../../components/Form/Form.jsx'

function MoviesPage() {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])

    useEffect(() => {
        if (!query) return;
        const abortController = new AbortController();
        const getData = async () => {
            try {
                const results = await fetchSearchMovie(query, abortController.signal);
                setMovies(results);
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
    },[query]);

    const handleChangeQuery = (newQuery) => {
        setQuery(newQuery);
        setMovies([]);
    };
    return (
        <div>
            <Form handleChangeQuery={handleChangeQuery}/>
            <MovieList movies={movies}/>
        </div>
    );
}

export default MoviesPage;