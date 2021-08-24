"use strict";

var moment = require('moment');

var formatMessages = function formatMessages(data) {
  debugger;
  var username = data.username,
      text = data.text;
  return {
    username: username,
    text: text,
    time: moment().format('DD/MM/YYYY hh:mm:ss')
  };
};

module.exports = {
  formatMessages: formatMessages
};