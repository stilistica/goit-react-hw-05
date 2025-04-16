import s from './MovieReviews.module.css'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchCast, fetchReviews} from "../../services/api.js";

function MovieReviews() {
    const {movieId} = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        if (!movieId) return;
        const getData = async () => {
            try {
                const data = await fetchReviews(movieId, abortController.signal);
                setReviews(data.results);
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
    return (
        <ul>
            {reviews.length > 0
                ? reviews.slice(0, 5).map((review) => (
                    <li key={review.id}>
                        <h3>Author: {review.author}</h3>
                        <p>{review.content}</p>
                    </li>))
                : <p>We don't have any reviews for this movie</p>
            }
        </ul>
    );
}

export default MovieReviews;