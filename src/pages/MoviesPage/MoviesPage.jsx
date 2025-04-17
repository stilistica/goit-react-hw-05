import s from "./MoviesPage.module.css";
import { useEffect, useState } from "react";
import { fetchSearchMovie } from "../../services/api.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import Form from "../../components/Form/Form.jsx";
import { useSearchParams } from "react-router-dom";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;
    const abortController = new AbortController();
    const getData = async () => {
      try {
        const results = await fetchSearchMovie(
          query,
          page,
          abortController.signal
        );
        setMovies((prev) => [...prev, ...results]);
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
  }, [query, page]);

  const handleChangeQuery = (newQuery) => {
    setSearchParams({ query: newQuery });
    setMovies([]);
  };
  return (
    <div className={s.container}>
      <Form handleChangeQuery={handleChangeQuery} />
      <MovieList movies={movies} />
      {query !== "" && <LoadMoreBtn page={page} setPage={setPage} />}
    </div>
  );
}

export default MoviesPage;
