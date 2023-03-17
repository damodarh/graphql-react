const { userList, movieList } = require('../fakeData');

const resolvers = {
  Query: {
    users: () => userList,
    user: (_, args) => userList.find((user) => user.id === Number(args.id)),
    movies: () => movieList,
    movie: (_, args) => movieList.find((movie) => movie.name === args.name),
  },
  User: {
    favoriteMovies: () => movieList.filter(movie => movie.yearOfPublication > 2010),
  }
};

module.exports = { resolvers };
