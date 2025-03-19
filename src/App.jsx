import './App.css'
import Title from './component/Title/Title'
import TextInput from './component/TextInput/TextInput'
import Lista from './component/Lista/Lista'
import PokeCard from './component/PokeCard/PokeCard';
import React, { useState } from 'react';
import axios from 'axios';
import Butao from './component/Butao/Butao';



function App() {

  const [pokemonSearch, setPokemonSearch] = useState([]);
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [pokemonName, setPokemonName] = useState('');

  const buscarInfoPokeRelacionado = async (pokemonName) => {
    if (!pokemonName.trim()) {
      console.error('Por favor, insira um nome de Pokémon!');
      return;
    }
  
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
      const todosPokemons = response.data.results;
  
      const pokemonsFiltrados = todosPokemons.filter(poke =>
        poke.name.includes(pokemonName.toLowerCase())
      );
  
      if (pokemonsFiltrados.length === 0) {
        console.log('Nenhum Pokémon encontrado D:');
        return;
      }
  
      // Busca info detalhada dos Pokémon filtrados
      const detalhesPromises = pokemonsFiltrados.map(poke => axios.get(poke.url));
      const detalhesResponses = await Promise.all(detalhesPromises);
      
      const detalhesPokemons = detalhesResponses.map(res => res.data);
  

      setPokemonInfo(detalhesPokemons);
      setPokemonSearch(pokesAnteriores => [...pokesAnteriores, ...detalhesPokemons]);
  
      console.log(detalhesPokemons);
  
    } catch (error) {
      console.error('Deu ruim ao buscar Pokémon relacionados D:', error);
    }
  };
  

  return (
    <>
      <Title />
      <div className='section-search'>
        <TextInput onChange={setPokemonName} />
        <Butao class={'butaoVerde'} onClick={() => { buscarInfoPokeRelacionado(pokemonName) }} name={'Search'}></Butao>
        <Butao class={'butaoVermelho'}onClick={() => { setPokemonSearch([]) }} name={'Clear'}></Butao>
      </div>

      <section className='poke-section'>
        {pokemonSearch.length > 0 ? (
          pokemonSearch.map(pokemon => (
            <PokeCard
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.front_default}
              types={pokemon.types.map(t => t.type.name)}
            />
          ))
        ) : (   
          <p>Nenhum Pokémon encontrado.</p>
        )}
      </section>
    </>
  )
}

export default App
