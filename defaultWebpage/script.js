document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const saveButton = document.getElementById('saveButton');
    const pokemonData = document.getElementById('pokemonData');
    const savedPokemonCards = document.getElementById('savedPokemonCards');

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();
        displayPokemonData(data);
    });

    saveButton.addEventListener('click', () => {
        const pokemonName = document.getElementById('pokemonNameDisplay').textContent;
        const pokemonImage = document.getElementById('pokemonImage').src;
        const pokemonHeight = document.getElementById('pokemonHeight').textContent;
        const pokemonWeight = document.getElementById('pokemonWeight').textContent;
        const pokemonBaseExperience = document.getElementById('pokemonBaseExperience').textContent;

        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.innerHTML = `
            <img src="${pokemonImage}" alt="${pokemonName}">
            <p>${pokemonName}</p>
            <p>${pokemonHeight}</p>
            <p>${pokemonWeight}</p>
            <p>${pokemonBaseExperience}</p>
        `;
        savedPokemonCards.appendChild(card);
    });

    function displayPokemonData(data) {
        document.getElementById('pokemonImage').src = data.sprites.front_default;
        document.getElementById('pokemonNameDisplay').textContent = data.name;
        document.getElementById('pokemonHeight').textContent = `Height: ${data.height}`;
        document.getElementById('pokemonWeight').textContent = `Weight: ${data.weight}`;
        document.getElementById('pokemonBaseExperience').textContent = `Base Experience: ${data.base_experience}`;
        document.getElementById('pokemonJson').textContent = JSON.stringify(data, null, 2);
    }
});