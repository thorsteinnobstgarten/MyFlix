const express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan');
uuid = require('uuid')

const app = express();

app.use(bodyParser.json());



let movies = [
    {
        "Title":"House",
        "Director": {
            "Name":"Peter Meier"
       },
        "Genre": {
            "Name":"Horror"
        } 
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
        genre: 'Thriller film',
        movieID: 2
    },
    {
        title: 'Dumb and Dumber',
        director: 'Peter Farrelly',
        genre:  'Buddy film',
        movieID: "0001"
    }
];

let users = [
    {
        id: 1,
        name: "Kim",
        favoriteMovies: []
    }
]

app.use(express.static('public'));

app.use(morgan('common'));

app.get('/', (req, res) => {
    res.send('Welcome to my movie page!');
});

app.get('/movies', (req, res) => {
   res.status(200).json(movies);
});

app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }
});

app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName );

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre')
    }
});

app.get('/movies/director/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName );

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such genre')
    }
    
    
});

app.post('/movies', (req, res) => {
    const newMovie = req.body;

    if(newMovie.title) {
        newMovie.id = uuid.v4();
        movies.push(newMovie);
        res.status(201).send(newMovie);
    } else {
        res.status(400).send('movies need titles')
    }
});

app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('users need names')
  }
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user)
    } else {
        res.status(400).send('no such user')
    }
});

app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('no such user')
    }
    });

app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle );
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
      res.status(400).send('no such user')
    }
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
    users = users.filter( user => user.id != id );
    res.status(200).send(`user ${id} has been deleted`);
    } else {
      res.status(400).send('no such user')
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

