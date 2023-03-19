const { userList, movieList } = require('../fakeData');

const resolvers = {
  Query: {
    users: () => userList,
    user: (_, args) => userList.find((user) => user.id === Number(args.id)),
    movies: () => movieList,
    movie: (_, args) => movieList.find((movie) => movie.name === args.name),
  },
  User: {
    favoriteMovies: () =>
      movieList.filter((movie) => movie.yearOfPublication > 2010),
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = userList[userList.length - 1].id;
      user.id = lastId + 1;
      userList.push(user);
      return user;
    },
    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      userList.forEach((user) => {
        if (user.id === Number(id)) user.username = newUsername;
      });
      return userList.find((user) => user.id === Number(id));
    },
    deleteUser: (parent, args) => {
      let user = userList.filter((user) => user.id === Number(args.id));
      userList.splice(userList.indexOf(user, 1));
      return null;
    },
  },
};

module.exports = { resolvers };
