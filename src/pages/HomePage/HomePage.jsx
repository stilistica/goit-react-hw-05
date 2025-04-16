import s from './HomePage.module.css'
import {useEffect, useState} from "react";
import {fetchTrendingMovie} from "../../services/api.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const abortController = new AbortController();
        const getData = async () => {
            try {
                const getMovies = await fetchTrendingMovie(page, abortController.signal);
                setMovies(prev => [...prev, ...getMovies]);
            }
            catch (error) {
                if (error.code !== 'ERR_CANCELED') {
                    console.log(error)
                }
            }
        }
        getData();
        return () => {
            abortController.abort();
        };
    }, [page])
    return (
        <div className={s.container}>
            <h1 className={s.title}>Trending movies</h1>
            <MovieList movies={movies}/>
            <LoadMoreBtn page={page} setPage={setPage}/>
        </div>
    );
}

export default HomePage;