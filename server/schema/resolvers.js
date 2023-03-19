const { userList, movieList } = require('../fakeData');

const resolvers = {
  Query: {
    users: () =>
      userList ? { users: userList } : { message: 'There was an error!' }, //return the list as an object or error message
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
  //UserResult needs to be of a separate type to handle union values.
  UserResult: {
    //This is used in union type to determine what to return. If the op was successful, return 'UserSuccess', which means it will
    // return the type UserSuccess, which is a list of users. If it fails, it will return the type 'UserError'.
    //if there is any other error, return null. Handle accordingly on frontend.
    __resolveType(obj) {
      if (obj.users) return 'UserSuccess';
      if (obj.message) 'UserError';
      return null;
    },
  },
};

module.exports = { resolvers };
