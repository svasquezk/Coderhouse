const socketIo = require('socket.io');
const { addUser, getCurrentUser, getUsers } = require('../utils/user');
const { formatMessages } = require('../utils/messages');

const lproductos = [];
const data = {
    username: undefined,
    text: undefined,
};

export const initWsServer = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('Un cliente se a conectado');
        // Agrega un nuevo producto
        socket.on('new-product', (data) => {
            if(!data) return;
            console.log('lproiducto ->', lproductos);
            lproductos.push(data);

            // Envia el mesnaje a todos
            io.emit('addNewProduct', lproductos)
        });

        socket.on('askData', () =>  {
            socket.emit('addNewProduct', lproductos);
        })

        socket.on('connectUser', () => {
            const user = getCurrentUser(socket.client.id);
            if(!user) return;
            console.log('connectUser ----->', user);
            socket.join(user);

            // Obtiene todos los usuarios
            const usersInfo = {
                users: getUsers()
            };
            socket.broadcast.emit('message', formatMessages(usersInfo));
        })


        socket.on('chatMessage', (msg, username) => {
            console.log('chatMessage ->', socket.client.id,' msg -->', msg, '---usuario', username);
            addUser(socket.client.id,username);

            const user = getCurrentUser(socket.client.id);
            console.log('getCurrentUser useer-->', user);
            data.username = user.username;
            data.text = msg;

            console.log('DATA --> ', data);
            io.emit('message', formatMessages(data));
        })
    });

    return io;
}