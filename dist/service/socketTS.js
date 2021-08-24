"use strict";

var socketIo = require('socket.io');

var _require = require('../utils/user'),
    addUser = _require.addUser,
    getCurrentUser = _require.getCurrentUser,
    getUsers = _require.getUsers;

var _require2 = require('../utils/messages'),
    formatMessages = _require2.formatMessages;

var lproductos = [];
var data = {
  username: undefined,
  text: undefined
}; //export const initWsServer = (server) => {

initWsServer = function initWsServer(server) {
  var io = socketIo(server);
  io.on('connection', function (socket) {
    console.log('Un cliente se a conectado'); // Agrega un nuevo producto

    socket.on('new-product', function (data) {
      if (!data) return;
      console.log('lproiducto ->', lproductos);
      lproductos.push(data); // Envia el mesnaje a todos

      io.emit('addNewProduct', lproductos);
    });
    socket.on('askData', function () {
      socket.emit('addNewProduct', lproductos);
    });
    socket.on('connectUser', function () {
      var user = getCurrentUser(socket.client.id);
      if (!user) return;
      console.log('connectUser ----->', user);
      socket.join(user); // Obtiene todos los usuarios

      var usersInfo = {
        users: getUsers()
      };
      socket.broadcast.emit('message', formatMessages(usersInfo));
    });
    socket.on('chatMessage', function (msg, username) {
      console.log('chatMessage ->', socket.client.id, ' msg -->', msg, '---usuario', username);
      addUser(socket.client.id, username);
      var user = getCurrentUser(socket.client.id);
      console.log('getCurrentUser useer-->', user);
      data.username = user.username;
      data.text = msg;
      console.log('DATA --> ', data);
      io.emit('message', formatMessages(data));
    });
  });
  return io;
};

module.exports = {
  initWsServer: initWsServer
};