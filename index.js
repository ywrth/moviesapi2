const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const express = require('express');
const app = express()
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true })

let users = [
  {
    id: 1,
    name: 'Kim',
    favoriteMovies: []
  },
  {
    id: 2,
    name: 'Joe',
    favoriteMovies: ['The Hours']
  }
]

let topMovies = [
  {
    Title: 'Banshees of Inisherin',
    Description:
      'Set on a remote island off the west coast of Ireland, THE BANSHEES OF INISHERIN follows lifelong friends Padraic (Colin Farrell) and Colm (Brendan Gleeson), who find themselves at an impasse when Colm unexpectedly puts an end to their friendship.',
    Genre: {
      Name: 'Comedy',
      Description:
        "Comedy films are 'make em laugh' films designed to elicit laughter from the audience. Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment. The comedy genre humorously exaggerates the situation, the language, action, and characters."
    },
    Director: {
      Name: 'Martin McDonagh',
      Bio: 'British-Irish playwright and filmmaker. He is known for his absurdist black humour which often challenges the modern theatre aesthetic.',
      Birth: 1970.0
    },

    ImageURL:
      'https://i0.wp.com/filmpluskritik.com/wp-content/uploads/2023/01/the-banshees-of-inisherin-007_BOI_16149_C_rgb.jpg?resize=1536%2C964&ssl=1',
    Featured: false
  },

  {
    Title: 'Nomadland',
    Description:
      'A woman in her sixties, after losing everything in the Great Recession, embarks on a journey through the American West, living as a van-dwelling modern-day nomad.',
    Genre: {
      Name: 'Drama',
      Description:
        'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
    },
    Director: {
      Name: 'Chloé Zhao',
      Bio: 'Chinese-born filmmaker. She is known primarily for her work on independent films. Her debut feature film, Songs My Brothers Taught Me, premiered at Sundance Film Festival to critical acclaim and earned a nomination for the Independent Spirit Award for Best First Feature',
      Birth: 1982.0
    },
    ImageURL:
      'https://variety.com/wp-content/uploads/2020/08/nomadland-francis-mcdormand.jpg?w=1000&h=563&crop=1',
    Featured: false
  },

  {
    Title: 'The Hours',
    Description:
      'The story of three women searching for more potent, meaningful lives. Each is alive at a different time and place, all are linked by their yearnings and their fears.',
    Genre: {
      Name: 'Drama',
      Description:
        'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
    },
    Director: {
      Name: 'Stephen Daldry',
      Bio: 'Stephen David Daldry CBE is an English director and producer of film, theatre, and television. He has won three Tony Awards for his work on Broadway and an Olivier Award for his work in the West End. ',
      Birth: 1960.0
    },
    ImageURL:
      'https://decider.com/wp-content/uploads/2017/12/the-hours-lead-2.jpg?quality=75&strip=all&w=1284&h=856&crop=1',
    Featured: false
  },
  {
    Title: 'Billy Elliot',
    Description:
      'Set in County Durham in North East England during the 1985 miners strike, the film is about a working-class boy who discovers a passion for ballet.',
    Genre: {
      Name: 'Drama',
      Description:
        'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
    },
    Director: {
      Name: 'Stephen Daldry',
      Bio: 'Stephen David Daldry CBE is an English director and producer of film, theatre, and television. He has won three Tony Awards for his work on Broadway and an Olivier Award for his work in the West End. ',
      Birth: 1960.0
    },
    ImageURL:
      'https://cdn-a.prisma.de/cdn/img/default/14/134329_3f90668d096d815a7751002bcdc7c010_1280re0.jpg',
    Featured: false
  },
  {
    Title: 'Get Out',
    Description:
      'The plot follows a young black man (Kaluuya), who uncovers shocking secrets when he meets the family of his white girlfriend (Williams).',
    Genre: {
      Name: 'Thriller',
      Description:
        'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
    },
    Director: {
      Name: 'Jordan Peele',
      Bio: 'American actor, comedian, and filmmaker. He is best known for his film and television work in the comedy and horror genres. Peele started his career in sketch comedy before transitioning his career as a writer and director of psychological horror and satirical films.',
      Birth: 1979.0
    },
    ImageURL:
      'https://vaguevisages.com/wp-content/uploads/2017/03/Get-Out-Essay-Movie-Film-One.jpg',
    Featured: false
  },
  {
    Title: 'Se7en',
    Description:
      'Set in an unnamed, crime-ridden city, plot follows disenchanted, near-retirement detective William Somerset (Freeman) and his newly transferred partner David Mills (Pitt) as they attempt to stop a serial killer before he can complete a series of murders based on the seven deadly sins.',
    Genre: {
      Name: 'Psychological thriller',
      Description:
        'The psychological thriller is a subgenre of thriller that explores the psychology of its characters, who are often unstable. What makes a thriller psychological is that the biggest questions revolve around the minds and behavior.'
    },
    Director: {
      Name: 'David Fincher',
      Bio: 'American filmmaker. His films, most of which are psychological thrillers, have collectively grossed over $2.1 billion worldwide and have received 40 Academy Award nominations; this includes three Best Director nominations for him',
      Birth: '1962.0'
    },
    ImageURL:
      'https://images.squarespace-cdn.com/content/v1/5233347fe4b00c95cda9e5d6/1411688739305-QQN2IN2XU3SPVAJBHQ91/image-asset.jpeg?format=1000w',
    Featured: false
  },
  {
    Title: 'Fight Club',
    Description:
      'The two bored men form an underground club with strict rules and fight other men who are fed up with their mundane lives. Their perfect partnership frays when Marla (Helena Bonham Carter), a fellow support group crasher',
    Genre: {
      Name: 'Thriller',
      Description:
        'A thriller is a type of mystery with a few key differences. As its name suggests, thrillers tend to be action-packed, page-turners with moments full of tension, anxiety, and fear. Without fail, they are plot-driven stories with plenty of plot twists.'
    },
    Director: {
      Name: 'David Fincher',
      Bio: 'American filmmaker. His films, most of which are psychological thrillers, have collectively grossed over $2.1 billion worldwide and have received 40 Academy Award nominations; this includes three Best Director nominations for him',
      Birth: '1962.0'
    },
    ImageURL:
      'https://ychef.files.bbci.co.uk/1600x900/p07h2zhs.webp',
    Featured: false
  },
  {
    Title: 'Paprika',
    Description:
      'Dr. Atsuko Chiba works as a scientist by day and, under the code name "Paprika," is a dream detective at night. Atsuko and her colleagues are working on a device called the DC Mini, which is intended to help psychiatric patients, but in the wrong hands it could destroy minds.',
    Genre: {
      Name: 'Anime',
      Description:
        'English-language dictionaries typically define anime, as "a style of Japanese animation" or as "a style of animation originating in Japan". Other definitions are based on origin, making production in Japan a requisite for a work to be considered "anime"'
    },
    Director: {
      Name: 'Satoshi Kon',
      Bio: 'Satoshi Kon was a Japanese film director, animator, screenwriter and manga artist from Sapporo, Hokkaido and a member of the Japanese Animation Creators Association',
      Birth: '1963.0'
    },
    ImageURL:
      'https://assets.mubicdn.net/images/film/3118/image-w856.jpg?1522943847',
    Featured: false
  },
  {
    Title: 'Into the wild',
    Description:
      'Into the Wild tells the true story of the journey of 24-year-old Christopher McCandless into Alaska\'s Denali National Park and Preserve, where he starved to death in an abandoned bus after spending four months foraging and hunting game.',
    Genre: {
      Name: 'Drama',
      Description:
        'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone',
    },
    Director: {
      Name: 'Sean Penn',
      Bio: 'Sean Justin Penn is an American actor and film director. He has won Academy Awards for his roles in the mystery drama Mystic River and the biopic Milk.',
      Birth: '1960.0'
    },
    ImageURL:
      'https://static.kino.de/a6/23/89/8dfdcd159012f2a807948755f0_A2EzOGQxMGY4OTdm_imago0098073465h.jpg',
    Featured: false
  },
  {
    Title: 'Notting Hill',
    Description:
      'William, a British bookseller, meets and falls in love with Anna, a high-profile American actress. However, their relationship goes through many problems due to their different social statuses.',
    Genre: {
      Name: 'Romantic comedy',
      Description:
        'Romantic comedy is a subgenre of comedy and slice of life fiction, focusing on lighthearted, humorous plot lines centered on romantic ideas, such as how true love is able to surmount most obstacles.',
    },
    Director: {
      Name: 'Roger Michell',
      Bio: 'Roger Michell was a South African-born British theatre, television and film director. He was best known for directing films such as Notting Hill and Venus, as well as the 1995 made-for-television film Persuasion',
      Birth: '1956.0'
    },
    ImageURL:
      'https://i.guim.co.uk/img/media/d117ef88eeec88406021f7122e95ae7fc4a1d7a7/0_0_2673_1604/master/2673.jpg?width=1200&quality=85&auto=format&fit=max&s=8b3463c5a925388c9b8889264d54b8d3',
    Featured: false
  }
]

// CREATE user
//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/

app.post('/users', async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});


// GET ALL USERS

app.get('/users', async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET A USER BY USERNAME

app.get('/users/:Username', async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// UPDATE user by USERNAME

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })

});

// Add a movie to a user's list of favorites

app.post('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(Error + err);
  });
});

// CREATE movie
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params

  let user = users.find(user => user.id == id)

  if (user) {
    user.favoriteMovies.push(movieTitle)
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`)
  } else {
    res.status(400).send('no such user')
  }
})

// DELETE movie
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params

  let user = users.find(user => user.id == id)

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      title => title !== movieTitle
    )
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`)
  } else {
    res.status(400).send('no such user')
  }
})

// Delete a user by username
app.delete('/users/:Username', async (req, res) => {
  await Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


//READ the list of all movies to the users (CRUD)
app.get('/movies', (req, res) => {
  res.status(200).json(topMovies)
})

//READ
app.get('/movies/:title', (req, res) => {
  const { title } = req.params
  const movie = topMovies.find(movie => movie.Title === title)

  if (movie) {
    res.status(200).json(movie)
  } else {
    res.status(404).send('no such movie')
  }
})

//READ genre
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params
  const genre = topMovies.find(movie => movie.Genre.Name === genreName).Genre

  if (genre) {
    res.status(200).json(genre)
  } else {
    res.status(404).send('no such genre')
  }
})

//READ director
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params
  const director = topMovies.find(
    movie => movie.Director.Name === directorName
  ).Director

  if (director) {
    res.status(200).json(director)
  } else {
    res.status(404).send('no such director')
  }
})

// error-handling

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message || 'Houston, we have a problem!' });
};

app.use(errorHandler);

app.get('/error', (req, res) => {
  next(new Error('Testing error handling'));
});

// middleware timestamp/morgan
let requestTime = (req, res, next) => {
  req.requestTime = Date.now()
  next()
}

app.use(morgan('combined'))
app.use(requestTime)

app.get('/', (req, res) => {
  let responseText = 'My absolute favorite movies ever!'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
})

app.use(express.static('public'))

app.get('/bio', (req, res) => {
  res.send('Lorem ipsum')
})

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.')
})
