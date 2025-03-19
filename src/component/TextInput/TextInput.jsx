import './TextInput.css'

function TextInput({ onChange }) {
    return(
        <div className='container-input'>
            <label className='text-input'>Name:</label>
            <input className='input' type="text" onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
}
export default TextInput;
