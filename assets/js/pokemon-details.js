const content = document.getElementById("pokemon-detail");

function getPokemonIdFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("order");
}

pokeApi.getPokemonByNumber(getPokemonIdFromUrl()).then((pokemon) => {
  const newHtml = `
      <div class="pokemon-card ${pokemon.type}">
        <div class="card-header">
          <h2>${pokemon.name} <span>#${pokemon.number}</span></h2>
          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <div class="card-details">
          <div>
            <h3 class="${pokemon.type}">TYPES</h3>
            <ul>
              ${pokemon.types
                .map((type) => `<li><p class="${type}">${type}</p></li>`)
                .join("")}
            </ul>
          </div>
          <div>
            <h3 class="${pokemon.type}">ATTACKS</h3>
            <ul>
              ${pokemon.moves
                .slice(0, 2)
                .map(
                  (move) => `
                <li><p class="${pokemon.type}">${move}</p></li>
                `
                )
                .join("")}
            </ul>
          </div>
          <div>
            <h3 class="${pokemon.type}">STATUS</h3>
            <ul>
              ${pokemon.stats
                .map(
                  (stat) =>
                    `<li><p class="${pokemon.type}">${stat.name}: ${stat.baseStat}</p></li>`
                )
                .join("")}
            </ul>
          </div>
        </div>
      </div> 
    `;
  content.innerHTML += newHtml;
});
