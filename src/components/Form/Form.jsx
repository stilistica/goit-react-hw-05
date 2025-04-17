import s from './Form.module.css'

function Form({handleChangeQuery}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const newQuery = e.target.elements.query.value.trim();

        if (newQuery.trim() === '') {
            alert('Please enter a valid query.');
            e.target.reset();
            return;
        }
        handleChangeQuery(newQuery);
        e.target.reset();
    }
    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <input
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search movies"
                name="query"
                className={s.input}
            />
            <button type="submit" className={s.btn}>Submit</button>
        </form>
    );
}

export default Form;