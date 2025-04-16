import s from './Form.module.css'

function Form({handleChangeQuery}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const newQuery = e.target.elements.query.value;

        if (newQuery.trim() === '') {
            console.error('Please enter a valid query.');
            e.target.reset();
            return;
        }
        handleChangeQuery(newQuery);
        e.target.reset();
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search movies"
                name="query"
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default Form;