const { userList } = require('../fakeData');

const resolvers = {
  Query: {
    users() {
      return userList;
    },
  },
};

module.exports = { resolvers };
