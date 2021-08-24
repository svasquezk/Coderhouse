"use strict";

var users = [];

var addUser = function addUser(id, username) {
  var user = {
    id: id,
    username: username
  };
  users.push(user);
};

var getCurrentUser = function getCurrentUser(id) {
  return users.find(function (aUser) {
    return aUser.id === id;
  });
};

var getUsers = function getUsers() {
  return users;
};

module.exports = {
  addUser: addUser,
  getCurrentUser: getCurrentUser,
  getUsers: getUsers
};