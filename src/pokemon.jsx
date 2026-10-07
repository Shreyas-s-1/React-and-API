import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const Api = "https://pokeapi.co/api/v2/pokemon?limit=124";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(Api);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (cur) => {
        const res = await fetch(cur.url);
        const data = await res.json();
        return data;
      });

      const detailedResponse = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
            {searchData.map((cur) => {
              return <PokemonCards key={cur.id} pokemonData={cur} />;
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
