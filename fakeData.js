const userList = [
  {
    id: 1,
    name: 'Damodar Hegde',
    username: 'damodarh',
    age: 26,
    nationality: 'INDIAN',
    friends: [
      {
        id: 2,
        name: 'Jane Smith',
        username: 'janeSmith',
        age: 22,
        nationality: 'AMERICAN',
      },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janeSmith',
    age: 22,
    nationality: 'AMERICAN',
  },
  {
    id: 3,
    name: 'Sage',
    username: 'sage123',
    age: 32,
    nationality: 'CHINESE',
  },
  {
    id: 4,
    name: 'Kill Joy',
    username: 'kJoy',
    age: 21,
    nationality: 'GERMAN',
  },
  {
    id: 5,
    name: 'Chamber',
    username: 'chamber123',
    age: 30,
    nationality: 'JAPANESE',
  },
];

const movieList = [
    {
        id: 1,
        name: 'Inception',
        yearOfPublication: 2010,
        isInTheatres: false
    },
    {
        id: 2,
        name: 'Interstellar',
        yearOfPublication: 2014,
        isInTheatres: true
    },
    {
        id: 3,
        name: 'Avengers Endgame',
        yearOfPublication: 2019,
        isInTheatres: true
    },

]

module.exports = { userList, movieList };
