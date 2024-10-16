document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const saveButton = document.getElementById('saveButton');
    const pokemonData = document.getElementById('pokemonData');
    const savedPokemonCards = document.getElementById('savedPokemonCards');

    // Disable save button initially
    saveButton.disabled = true;

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const pokemonName = document.getElementById('pokemonName').value.toLowerCase();

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            const data = await response.json();
            displayPokemonData(data);
            saveButton.disabled = false; // Enable save button once data is displayed
        } catch (error) {
            alert(error.message); // Handle error, e.g., Pokémon not found
            saveButton.disabled = true; // Disable save button in case of error
        }
    });

    saveButton.addEventListener('click', () => {
        const pokemonName = document.getElementById('pokemonNameDisplay').textContent;
        const pokemonImage = document.getElementById('pokemonImage').src;
        const pokemonHeight = document.getElementById('pokemonHeight').textContent;
        const pokemonWeight = document.getElementById('pokemonWeight').textContent;
        const pokemonBaseExperience = document.getElementById('pokemonBaseExperience').textContent;

        // Ensure that there's data to save before creating the card
        if (pokemonName && pokemonImage) {
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
        } else {
            alert("No Pokémon data to save");
        }
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
