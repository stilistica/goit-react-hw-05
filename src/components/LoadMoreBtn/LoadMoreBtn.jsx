import s from './LoadMoreBtn.module.css'

function LoadMoreBtn({page, setPage}) {
    const onClickLoadMore = () => {
        setPage(page + 1);
    };
    return (
        <button onClick={onClickLoadMore}>
            Load More
        </button>
    );
}

export default LoadMoreBtn;