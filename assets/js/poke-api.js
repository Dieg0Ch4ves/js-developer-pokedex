const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
  const moves = pokeDetail.moves.map((abi) => abi.move.name);
  const [move] = moves;
  pokemon.moves = moves;
  pokemon.move = move;
  const stats = pokeDetail.stats.map((stats) => ({
    name: stats.stat.name,
    baseStat: stats.base_stat,
  }));
  pokemon.stats = stats;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemon = (offSet = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${limit}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonBody) => {
      return jsonBody.results;
    })
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
    .catch((error) => {
      console.error(error);
    });
};

pokeApi.getPokemonByNumber = (number) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${number}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonBody) => {
      const pokemon = convertPokeApiDetailToPokemon(jsonBody);
      return pokemon;
    });
};
