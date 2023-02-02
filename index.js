const express = require('express');
const app = express();
morgan = require('morgan');



let topMovies = [
    {
        title: 'The Witch',
        director: 'Robert Eggers'
    },
    {
        title: 'Uncut Gems',
        directors: 'Josh Safdie, Benny Safdie'
    },
    {
        title: 'Sicario',
        director: 'Denis Villeneuve'
    },
    {
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino'
    },
    {
        title: 'Full Metal Jacket',
        director: 'Stanley Kubrick'
    },
    {
        title: 'Casino',
        director: 'Martin Scorsese'
    },
    {
        title: 'Dead Man\'s Shoes',
        director: 'Shane Meadows' 
    },
    {
        title: 'Blue Ruin',
        director: 'Jeremy Saulnier'
    },
    {
        title: 'No Country for Old Men',
        directors: 'Joel Coen, Ethan Coen'
    },
    {
        title: 'Dumb and Dumber',
        director: 'Peter Farrelly'
    }
];

app.use(express.static('public'));

app.use(morgan('common'));

app.get('/', (req, res) => {
    res.send('Welcome to my movie page!');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

