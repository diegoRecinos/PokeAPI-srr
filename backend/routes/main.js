const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/search', async (req, res) => {
    const pokemonName = req.body.pokemonName.toLowerCase();
    
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemonData = response.data;
        res.json(pokemonData); // Send the data back to the client  
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Pokemon not found' });
    }
});

module.exports = router;
