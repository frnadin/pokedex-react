import './Lista.css'

const Lista = (props) => {
    const handleChange = (e) => {
        props.onChange(e.target.value);
    };

    return (
        <div className='lista-suspensa'>
            <label className='label'>{props.label}</label>
            <select onChange={handleChange}>
                {props.item.map(item => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
        </div>
    )
}

export default Lista;
