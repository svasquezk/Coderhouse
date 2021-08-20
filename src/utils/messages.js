const moment = require('moment');

const formatMessages = (data) => {
    debugger
    const { username, text } = data;
    return {
        username, 
        text, 
        time: moment().format('DD/MM/YYYY hh:mm:ss')
    }
}

module.exports = {
    formatMessages
}