const express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan');
const app = express();

app.use(bodyParser.json());



let Movies = [
    {
        Title: 'The Witch',
        Director: 'Robert Eggers'
    },
    {
        Title: 'Sicario',
        Director: 'Denis Villeneuve'
    },
    {
        Title: 'Pulp Fiction',
        Director: 'Quentin Tarantino'
    },
    {
        Title: 'Full Metal Jacket',
        Director: 'Stanley Kubrick'
    },
    {
        Title: 'Casino',
        Director: 'Martin Scorsese'
    },
    {
        Title: 'Dead Man\'s Shoes',
        Director: 'Shane Meadows' 
    },
    {
        Title: 'Blue Ruin',
        Director: 'Jeremy Saulnier'
    },
    {
        Title: 'Dumb and Dumber',
        Director: 'Peter Farrelly'
    }
];

app.use(express.static('public'));

app.use(morgan('common'));

app.get('/', (req, res) => {
    res.send('Welcome to my movie page!');
});

app.get('/movies', (req, res) => {
    res.send('Successful GET request returns a list all movies')
});

app.get('/movies/:Title', (req, res) => {
    res.send('Successful GET request returning data on a single movie by title');
});

app.get('/movies/genre/:Name', (req, res) => {
    res.send('Successful GET request returning data on a genre by title');
});

app.get('/movies/director/:Name', (req, res) => {
    res.send('Successful GET request returning data on a director by name');
});

app.post('/movies', (req, res) => {
    res.send('Successful POST request allows users to add a movie to the database');
});

app.post('/users', (req, res) => {
    res.send('Successful POST request allows new users to register');
});

app.put('/users/:Username', (req, res) => {
    res.send('Successful PUT request allows users to update their user info');
});

app.post('/users/:id/:favorites', (req, res) => {
    res.send('Successful POST request allows users to add a movie to their favorites');
});

app.delete('/users/:id/:favorites', (req, res) => {
    res.send('Successful DELETE request allows users to remove a movie from their favorites');
});

app.delete('/users/:Username', (req, res) => {
    res.send('Successful DELETE request allows existing users to deregister');
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

