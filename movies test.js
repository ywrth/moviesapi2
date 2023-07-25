var movie1 = 
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
}

  db.movies.insertOne(movie1)

  var movie2 = 
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
  }

  db.movies.insertOne(movie2)

  var movie3 = 
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
  }

  db.movies.insertOne(movie3)

  var movie4 = 
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
  }

  db.movies.insertOne(movie4)

  var movie5 = 
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
  }

  db.movies.insertOne(movie5)

  var movie6 = 
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
  }

  db.movies.insertOne(movie6)

  var movie7 = 
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
  }

  db.movies.insertOne(movie7)

  var movie8 = 
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
  }

  db.movies.insertOne(movie8)

  var movie9 = 
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
  }

  db.movies.insertOne(movie9)

  var movie10 = 
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
  }

  db.movies.insertOne(movie10)


  ///////////////////////////


  _id: ObjectId("64be3903f7ee369bfd2b4af2"),
  Title: 'Banshees of Inisherin',
  Description: 'Set on a remote island off the west coast of Ireland, THE BANSHEES OF INISHERIN follows lifelong friends Padraic (Colin Farrell) and Colm (Brendan Gleeson), who find themselves at an impasse when Colm unexpectedly puts an end to their friendship.',
  Genre: {
    Name: 'Comedy',
    Description: "Comedy films are 'make em laugh' films designed to elicit laughter from the audience. Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment. The comedy genre humorously exaggerates the situation, the language, action, and characters."
  },
  Director: {
    Name: 'Martin McDonagh',
    Bio: 'British-Irish playwright and filmmaker. He is known for his absurdist black humour which often challenges the modern theatre aesthetic.',
    Birth: 1970
  },
  ImageURL: 'https://i0.wp.com/filmpluskritik.com/wp-content/uploads/2023/01/the-banshees-of-inisherin-007_BOI_16149_C_rgb.jpg?resize=1536%2C964&ssl=1',
  Featured: false
},
{
  _id: ObjectId("64be39aef7ee369bfd2b4af3"),
  Title: 'Nomadland',
  Description: 'A woman in her sixties, after losing everything in the Great Recession, embarks on a journey through the American West, living as a van-dwelling modern-day nomad.',
  Genre: {
    Name: 'Drama',
    Description: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
  },
  Director: {
    Name: 'Chloé Zhao',
    Bio: 'Chinese-born filmmaker. She is known primarily for her work on independent films. Her debut feature film, Songs My Brothers Taught Me, premiered at Sundance Film Festival to critical acclaim and earned a nomination for the Independent Spirit Award for Best First Feature',
    Birth: 1982
  },
  ImageURL: 'https://variety.com/wp-content/uploads/2020/08/nomadland-francis-mcdormand.jpg?w=1000&h=563&crop=1',
  Featured: false
},
{
  _id: ObjectId("64be39c3f7ee369bfd2b4af4"),
  Title: 'The Hours',
  Description: 'The story of three women searching for more potent, meaningful lives. Each is alive at a different time and place, all are linked by their yearnings and their fears.',
  Genre: {
    Name: 'Drama',
    Description: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
  },
  Director: {
    Name: 'Stephen Daldry',
    Bio: 'Stephen David Daldry CBE is an English director and producer of film, theatre, and television. He has won three Tony Awards for his work on Broadway and an Olivier Award for his work in the West End. ',
    Birth: 1960
  },
  ImageURL: 'https://decider.com/wp-content/uploads/2017/12/the-hours-lead-2.jpg?quality=75&strip=all&w=1284&h=856&crop=1',
  Featured: false
},
{
  _id: ObjectId("64be39d8f7ee369bfd2b4af5"),
  Title: 'Billy Elliot',
  Description: 'Set in County Durham in North East England during the 1985 miners strike, the film is about a working-class boy who discovers a passion for ballet.',
  Genre: {
    Name: 'Drama',
    Description: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
  },
  Director: {
    Name: 'Stephen Daldry',
    Bio: 'Stephen David Daldry CBE is an English director and producer of film, theatre, and television. He has won three Tony Awards for his work on Broadway and an Olivier Award for his work in the West End. ',
    Birth: 1960
  },
  ImageURL: 'https://cdn-a.prisma.de/cdn/img/default/14/134329_3f90668d096d815a7751002bcdc7c010_1280re0.jpg',
  Featured: false
},
{
  _id: ObjectId("64be39e0f7ee369bfd2b4af6"),
  Title: 'Get Out',
  Description: 'The plot follows a young black man (Kaluuya), who uncovers shocking secrets when he meets the family of his white girlfriend (Williams).',
  Genre: {
    Name: 'Thriller',
    Description: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
  },
  Director: {
    Name: 'Jordan Peele',
    Bio: 'American actor, comedian, and filmmaker. He is best known for his film and television work in the comedy and horror genres. Peele started his career in sketch comedy before transitioning his career as a writer and director of psychological horror and satirical films.',
    Birth: 1979
  },
  ImageURL: 'https://vaguevisages.com/wp-content/uploads/2017/03/Get-Out-Essay-Movie-Film-One.jpg',
  Featured: false
},
{
  _id: ObjectId("64be39e8f7ee369bfd2b4af7"),
  Title: 'Se7en',
  Description: 'Set in an unnamed, crime-ridden city, plot follows disenchanted, near-retirement detective William Somerset (Freeman) and his newly transferred partner David Mills (Pitt) as they attempt to stop a serial killer before he can complete a series of murders based on the seven deadly sins.',
  Genre: {
    Name: 'Psychological thriller',
    Description: 'The psychological thriller is a subgenre of thriller that explores the psychology of its characters, who are often unstable. What makes a thriller psychological is that the biggest questions revolve around the minds and behavior.'
  },
  Director: {
    Name: 'David Fincher',
    Bio: 'American filmmaker. His films, most of which are psychological thrillers, have collectively grossed over $2.1 billion worldwide and have received 40 Academy Award nominations; this includes three Best Director nominations for him',
    Birth: '1962.0'
  },
  ImageURL: 'https://images.squarespace-cdn.com/content/v1/5233347fe4b00c95cda9e5d6/1411688739305-QQN2IN2XU3SPVAJBHQ91/image-asset.jpeg?format=1000w',
  Featured: false
},
{
  _id: ObjectId("64be39f0f7ee369bfd2b4af8"),
  Title: 'Fight Club',
  Description: 'The two bored men form an underground club with strict rules and fight other men who are fed up with their mundane lives. Their perfect partnership frays when Marla (Helena Bonham Carter), a fellow support group crasher',
  Genre: {
    Name: 'Thriller',
    Description: 'A thriller is a type of mystery with a few key differences. As its name suggests, thrillers tend to be action-packed, page-turners with moments full of tension, anxiety, and fear. Without fail, they are plot-driven stories with plenty of plot twists.'
  },
  Director: {
    Name: 'David Fincher',
    Bio: 'American filmmaker. His films, most of which are psychological thrillers, have collectively grossed over $2.1 billion worldwide and have received 40 Academy Award nominations; this includes three Best Director nominations for him',
    Birth: '1962.0'
  },
  ImageURL: 'https://ychef.files.bbci.co.uk/1600x900/p07h2zhs.webp',
  Featured: false
},
{
  _id: ObjectId("64be39f9f7ee369bfd2b4af9"),
  Title: 'Paprika',
  Description: 'Dr. Atsuko Chiba works as a scientist by day and, under the code name "Paprika," is a dream detective at night. Atsuko and her colleagues are working on a device called the DC Mini, which is intended to help psychiatric patients, but in the wrong hands it could destroy minds.',
  Genre: {
    Name: 'Anime',
    Description: 'English-language dictionaries typically define anime, as "a style of Japanese animation" or as "a style of animation originating in Japan". Other definitions are based on origin, making production in Japan a requisite for a work to be considered "anime"'
  },
  Director: {
    Name: 'Satoshi Kon',
    Bio: 'Satoshi Kon was a Japanese film director, animator, screenwriter and manga artist from Sapporo, Hokkaido and a member of the Japanese Animation Creators Association',
    Birth: '1963.0'
  },
  ImageURL: 'https://assets.mubicdn.net/images/film/3118/image-w856.jpg?1522943847',
  Featured: false
},
{
  _id: ObjectId("64be3a04f7ee369bfd2b4afa"),
  Title: 'Into the wild',
  Description: "Into the Wild tells the true story of the journey of 24-year-old Christopher McCandless into Alaska's Denali National Park and Preserve, where he starved to death in an abandoned bus after spending four months foraging and hunting game.",
  Genre: {
    Name: 'Drama',
    Description: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone'
  },
  Director: {
    Name: 'Sean Penn',
    Bio: 'Sean Justin Penn is an American actor and film director. He has won Academy Awards for his roles in the mystery drama Mystic River and the biopic Milk.',
    Birth: '1960.0'
  },
  ImageURL: 'https://static.kino.de/a6/23/89/8dfdcd159012f2a807948755f0_A2EzOGQxMGY4OTdm_imago0098073465h.jpg',
  Featured: false
},
{
  _id: ObjectId("64be3a0ef7ee369bfd2b4afb"),
  Title: 'Into the wild',
  Description: "Into the Wild tells the true story of the journey of 24-year-old Christopher McCandless into Alaska's Denali National Park and Preserve, where he starved to death in an abandoned bus after spending four months foraging and hunting game.",
  Genre: {
    Name: 'Drama',
    Description: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone'
  },
  Director: {
    Name: 'Sean Penn',
    Bio: 'Sean Justin Penn is an American actor and film director. He has won Academy Awards for his roles in the mystery drama Mystic River and the biopic Milk.',
    Birth: '1960.0'
  },
  ImageURL: 'https://static.kino.de/a6/23/89/8dfdcd159012f2a807948755f0_A2EzOGQxMGY4OTdm_imago0098073465h.jpg',
  Featured: false
}
]