const pokemonOl = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMore");
const limit = 5;
let offSet = 0;

function redirectDetails(order) {
  window.location.href = `pokemon-detail.html?order=${order}`;
}

function loadPokemonItens(offSet, limit) {
  pokeApi.getPokemon(offSet, limit).then((pokemonList = []) => {
    const newHtml = pokemonList
      .map(
        (pokemon) =>
          `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
        <ol class="types">
        ${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                <button class="details-button ${
                  pokemon.type
                }" onclick="redirectDetails(${
            pokemon.number
          })">Show details</button>
                </li>
                `
      )
      .join("");

    pokemonOl.innerHTML += newHtml;
  });
}

loadPokemonItens(offSet, limit);

loadMoreButton.addEventListener("click", () => {
  offSet += limit;
  loadPokemonItens(offSet, limit);
});
