const express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan');
uuid = require('uuid')

const app = express();

app.use(bodyParser.json());



let movies = [
    {
        title: 'The Witch',
        director: 'Robert Eggers',
        genre: 'Folk Horror'
    },
    {
        title: 'Sicario',
        director: 'Denis Villeneuve',
        genre: 'Action-thriller'
    },
    {
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        genre: 'Crime film'
    },
    {
        title: 'Full Metal Jacket',
        director: 'Stanley Kubrick',
        genre: 'War drama'
    },
    {
        title: 'Casino',
        director: 'Martin Scorsese',
        genre: 'Epic crime'
    },
    {
        title: 'Dead Man\'s Shoes',
        director: 'Shane Meadows',
        genre:'Psychological thriller'
    },
    {
        title: 'Blue Ruin',
        director: 'Jeremy Saulnier',
        genre: 'Thriller film'
    },
    {
        title: 'Dumb and Dumber',
        director: 'Peter Farrelly',
        genre: 'Buddy film'
    }
];

let users = [
    {
        username: 'Peter Müller',
        id: 2,
        favorites: [] 
    }
];

app.use(express.static('public'));

app.use(morgan('common'));

app.get('/', (req, res) => {
    res.send('Welcome to my movie page!');
});

app.get('/movies', (req, res) => {
    res.send(movies)
});

app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) =>  
    { return movie.title === req.params.title }));
});

app.get('/movies/genre/:name', (req, res) => {
    res.json(movies.find((movie) =>
    { return movie.genre === req.params.name}));
});

app.get('/movies/director/:name', (req, res) => {
    res.json(movies.find((movie) =>
    { return movie.director === req.params.name}));
});

app.post('/movies', (req, res) => {
    let newMovie = req.body;

    if(!newMovie.title) {
        const message = 'Missing title in request body';
        res.status(400).send(message);
    } else {
        newMovie.id = uuid.v4();
        movies.push(newMovie);
        res.status(201).send(newMovie);
    }
});

app.post('/users', (req, res) => {
    let newUser = req.body;

    if (!newUser.username) {
        const message = 'Missing username in request body';
        res.status(400).send(message);
    } else {
        newUser.id = uuid.v4();
        users.push(newUser);
        rest.status(201).send(newUser);
    }
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

