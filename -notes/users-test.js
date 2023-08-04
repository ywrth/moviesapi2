//test

var user1 = {
    Name: "Maria Suarez",
    Username: "m.suarez",
    Password: "test123",
    Email:"m.suarez@gmail.com",
    Birthday: "09/10/1990",
    FavoriteMovies: [ 
      ObjectId("64be3a0ef7ee369bfd2b4afb"),
        ObjectId("64be3a04f7ee369bfd2b4afa"),
        ObjectId("64be39f0f7ee369bfd2b4af8")]
  }
  
  db.users.insertOne(user1)

  db.users.updateOne(
    { _id: ObjectId("64be3cdcf7ee369bfd2b4afc") }, // Filter to find the specific document
    {
      $set: {
        Name: "Maria Smith", // Updated Name
        Email: "maria.smith@gmail.com" // Updated Email
      }
    }
  )


var userId = ObjectId("64be3cdcf7ee369bfd2b4afc");

var favoriteMovieIds = [
  ObjectId("64be3a0ef7ee369bfd2b4afb"),
  ObjectId("64be3a04f7ee369bfd2b4afa"),
  ObjectId("64be39f0f7ee369bfd2b4af8"),
];

db.users.updateOne(
  { _id: userId }, 
  {
    $set: {
      FavoriteMovies: favoriteMovieIds,
    }
  }
);

var user2 = {
  Name: "Angelo Priest",
  Username: "m.suarez",
  Password: "test123",
  Email:"m.suarez@gmail.com",
  Birthday: "09/10/1990",
  FavoriteMovies: [ 
    ObjectId("64be3a0ef7ee369bfd2b4afb"),
      ObjectId("64be3a04f7ee369bfd2b4afa"),
      ObjectId("64be39f0f7ee369bfd2b4af8")]
}

db.users.insertOne(user2)

var user3 = {
    Name: "Margaret Cho",
    Username: "cho-cho-cho",
    Password: "test456",
    Email: "emmy.cho@gmail.com",
    Birthday: "12/10/1978",
    FavoriteMovies: [
      ObjectId("64be39d8f7ee369bfd2b4af5"),
      ObjectId("64be39e0f7ee369bfd2b4af6")
    ]
  };
  

  db.users.insertOne(user3);


  // Assuming you have the ObjectId of the user you want to update
var userId = ObjectId("64be405cf7ee369bfd2b4afe");

// Perform the update operation to set the new date format for the birthday
db.users.updateOne(
  { _id: userId }, // Filter to find the specific user document
  {
    $set: {
      Birthday: new Date("1978-12-10")
    }
  }
);

var user5 = {
    Name: "Johanne Larsen",
    Username: "jbl.heart",
    Password: "ohiboka1",
    Email: "jbl@gmail.com",
    Birthday: "1991-07-09",
    FavoriteMovies: [
      ObjectId("64be39f0f7ee369bfd2b4af8"),
      ObjectId("64be39f9f7ee369bfd2b4af9")
    ]
  };
  

  db.users.insertOne(user5);

  var user2 = {
    Name: "Angelo Priest",
    Username: "aprie",
    Password: "logmein1",
    Email: "angel.p@gmail.com",
    Birthday: "1999-01-12",
    FavoriteMovies: [
      ObjectId("64be3a0ef7ee369bfd2b4afb"),
      ObjectId("64be39f0f7ee369bfd2b4af8")
    ]
  };
  

  db.users.insertOne(user2);



  //////////////////////////////////////////////////

  [
    {
      _id: ObjectId("64be3cdcf7ee369bfd2b4afc"),
      Name: 'Maria Suarez',
      Username: 'm.suarez',
      Password: 'test123',
      Email: 'm.suarez@gmail.com',
      Birthday: ISODate("1990-09-10T00:00:00.000Z"),
      FavoriteMovies: [
        ObjectId("64be3a0ef7ee369bfd2b4afb"),
        ObjectId("64be3a04f7ee369bfd2b4afa"),
        ObjectId("64be39f0f7ee369bfd2b4af8")
      ]
    },
    {
      _id: ObjectId("64be4015f7ee369bfd2b4afd"),
      Name: 'John Poe',
      Username: 'john.dope',
      Password: 'test456',
      Email: 'john.poe@gmail.com',
      Birthday: ISODate("1970-01-01T00:00:00.000Z"),
      FavoriteMovies: [
        ObjectId("64be3903f7ee369bfd2b4af2"),
        ObjectId("64be39aef7ee369bfd2b4af3")
      ]
    },
    {
      _id: ObjectId("64be405cf7ee369bfd2b4afe"),
      Name: 'Margaret Cho',
      Username: 'cho-cho-cho',
      Password: 'test456',
      Email: 'emmy.cho@gmail.com',
      Birthday: ISODate("1978-12-10T00:00:00.000Z"),
      FavoriteMovies: [
        ObjectId("64be39d8f7ee369bfd2b4af5"),
        ObjectId("64be39e0f7ee369bfd2b4af6")
      ]
    },
    {
      _id: ObjectId("64be4250f7ee369bfd2b4aff"),
      Name: 'Johanne Larsen',
      Username: 'jbl.heart',
      Password: 'ohiboka1',
      Email: 'jbl@gmail.com',
      Birthday: '1991-07-09',
      FavoriteMovies: [
        ObjectId("64be39f0f7ee369bfd2b4af8"),
        ObjectId("64be39f9f7ee369bfd2b4af9")
      ]
    },
    {
      _id: ObjectId("64be435ef7ee369bfd2b4b00"),
      Name: 'Marco Deutschland',
      Username: 'm-d-m',
      Password: 'passssss1111',
      Email: 'marky-mark@gmail.com',
      Birthday: '1980-07-07',
      FavoriteMovies: [
        ObjectId("64be3a0ef7ee369bfd2b4afb"),
        ObjectId("64be39e8f7ee369bfd2b4af7")
      ]
    }
  ]
  


var userIdToUpdate = ObjectId("64be4015f7ee369bfd2b4afd"); 
var movieIdToAddToFavorites = ObjectId("64be39e8f7ee369bfd2b4af7");

db.users.updateOne(
  { _id: userIdToUpdate }, 
  { $addToSet: { FavoriteMovies: movieIdToAddToFavorites } }
);

///////////////////////////

[
    {
      _id: ObjectId("64be3cdcf7ee369bfd2b4afc"),
      Name: 'Maria Suarez',
      Username: 'm.suarez',
      Password: 'test123',
      Email: 'm.suarez@gmail.com',
      Birthday: ISODate("1990-09-10T00:00:00.000Z"),
      FavoriteMovies: [
        ObjectId("64be3a0ef7ee369bfd2b4afb"),
        ObjectId("64be3a04f7ee369bfd2b4afa"),
        ObjectId("64be39f0f7ee369bfd2b4af8")
      ]
    },
    {
      _id: ObjectId("64be4015f7ee369bfd2b4afd"),
      Name: 'John Poe',
      Username: 'john.dope',
      Password: 'test456',
      Email: 'john.poe@gmail.com',
      Birthday: ISODate("1970-01-01T00:00:00.000Z"),
      FavoriteMovies: [
        ObjectId("64be3903f7ee369bfd2b4af2"),
        ObjectId("64be39aef7ee369bfd2b4af3"),
        ObjectId("64be39e8f7ee369bfd2b4af7")
      ]
    },
    {
      _id: ObjectId("64be4250f7ee369bfd2b4aff"),
      Name: 'Johanne Larsen',
      Username: 'jbl.heart',
      Password: 'ohiboka1',
      Email: 'jbl@gmail.com',
      Birthday: '1991-07-09',
      FavoriteMovies: [
        ObjectId("64be39f0f7ee369bfd2b4af8"),
        ObjectId("64be39f9f7ee369bfd2b4af9")
      ]
    },
    {
      _id: ObjectId("64be435ef7ee369bfd2b4b00"),
      Name: 'Marco Deutschland',
      Username: 'm-d-m',
      Password: 'passssss1111',
      Email: 'marky-mark@gmail.com',
      Birthday: '1980-07-07',
      FavoriteMovies: [
        ObjectId("64be3a0ef7ee369bfd2b4afb"),
        ObjectId("64be39e8f7ee369bfd2b4af7")
      ]
    },
    {

    

     // _id: ObjectId("64c348177d75f984a94efc8c")

  var user2 = {
    Name: "Angelo Priest",
    Username: "aprie",
    Password: "logmein1",
    Email:"angel.p@gmail.com",
    Birthday: "1999-01-12",
    FavoriteMovies: [ 
      ObjectId("64be3a0ef7ee369bfd2b4afb"),
      ObjectId("64be39f0f7ee369bfd2b4af8")
    ]
  }
  
  db.users.insertOne(user2)



  // _id: ObjectId("64c349d27d75f984a94efc8d")

  var user3 = {
    Name: "Marco Deutschland",
    Username: "m-d-m",
    Password: "passssss1111",
    Email: "angel.p@gmail.com",
    Birthday: "1999-01-12",
    FavoriteMovies: [
      ObjectId("64be3a0ef7ee369bfd2b4afb"),
      ObjectId("64be39f0f7ee369bfd2b4af8")
    ]
  };
  
  db.users.insertOne(user3);
  
    // _id: ObjectId("64c34a3d7d75f984a94efc8e")

    var user4 = {
      Name: 'Johanne Larsen',
      Username: 'jbl.heart',
      Password: 'ohiboka1',
      Email: 'jbl@gmail.com',
      Birthday: '1991-07-09',
      FavoriteMovies: [
        ObjectId("64be39f0f7ee369bfd2b4af8"),
        ObjectId("64be39f9f7ee369bfd2b4af9")
      ]
    };
    
    db.users.insertOne(user4);


  // _id: ObjectId("64c34a9d7d75f984a94efc8f")

        var user5 = {
          Name: 'John Poe',
          Username: 'john.dope',
          Password: 'test456',
          Email: 'john.poe@gmail.com',
          Birthday: '1989-05-12',
          FavoriteMovies: [
            ObjectId("64be3903f7ee369bfd2b4af2"),
            ObjectId("64be39aef7ee369bfd2b4af3"),
            ObjectId("64be39e8f7ee369bfd2b4af7")
          ]
        };
        
        db.users.insertOne(user5);
  

        mongoimport --uri mongodb+srv://HotPotatoesAdmin:Admin1234@hotpotatoes.btu6v8q.mongodb.net/HotPotatoes --collection movies --type json --file /Users/ywrth/movies.movies.json

        //Users/ywrth/Desktop/movies.movies.json

        mongoexport --uri mongodb+srv://HotPotatoesAdmin:Admin1234@hotpotatoes.btu6v8q.mongodb.net/HotPotatoes --collection movies --type json> --out /Users/ywrth/movies.movies.json

        mongoimport --uri mongodb+srv://HotPotatoesAdmin:Admin1234@hotpotatoes.btu6v8q.mongodb.net/HotPotatoes --collection movies --type json --file /Users/ywrth/movies.users.json;



