import React from 'react';
import './PokeCard.css';

const PokeCard = (props) => {
    return (
        <div className='poke-card'>
            <img src={props.image} alt={props.name} />
            <h3>{props.name}</h3>
            <ul>
                {props.types.map((type) => (
                    <li key={type} className={type}>{type}</li>
                ))}
            </ul>
        </div>
    )
}

export default PokeCard 