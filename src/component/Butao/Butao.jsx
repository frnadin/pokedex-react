import './Butao.css'

const Butao = (props) => {
    console.log(props.itens);
    
    return (
        <>
            <button className={props.class} onClick={props.onClick}>{props.name}</button>
        </>
    )
}

export default Butao;