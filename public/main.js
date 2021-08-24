// Abre canal de comunicación
const socket = io.connect('http://localhost:8080', { forceNew: true });

// Cuando arrancamos pedimos la data que hay actualmente enviando un socket
socket.emit('askData');
socket.emit('connectUser');

// Variables del chat
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const msj = document.getElementById('msg');
const username = document.getElementById('username');



// Agrega un nuevo producto
const addproduct = (e) => {
    const prod = {
        title : document.getElementById('title').value,
        price : document.getElementById('price').value,
        thumbnail : document.getElementById('thumbnail').value,
    };

    socket.emit('new-product', prod);
    return false;
}

// Muestra lista de productos
const renderTablaProd = (lprod) => {
  // Grab the template script
 var theTemplateScript = document.querySelector("#address-template").innerHTML;

  // Compile the template
 var theTemplate = Handlebars.compile(theTemplateScript);

 // Define our data object
 var context={
   "lprod": lprod
 };

 // Pass our data to the template
 var theCompiledHtml = theTemplate(context);

 // Add the compiled html to the page
 document.querySelector('#content-placeholder').innerHTML = theCompiledHtml;
}


socket.on('addNewProduct', (lProduct) => {
    renderTablaProd(lProduct);
});


// ******************** Canal de Chat ********************
// *******************************************************

// Message submit al hacer click en el boton enviar mensaje
chatForm.addEventListener('submit', (e) => {

  if(username.value === '') {
    alert(JSON.stringify('Ingrese un Usuario'));
    return;
  }
  e.preventDefault();
  //Emit Message to the server
  socket.emit('chatMessage', msg.value, username.value);

  //Clear submitted message
  msg.value = '';
});

socket.on('message', (data) => {
  // add the message to the chat Window
  outputMessage(data);
  // Automatically scroll down to the last message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Agrego el mensaje al chat
const outputMessage = (menssage) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
  <p class="meta font-italic">${menssage.username}<span> [${menssage.time}]</spam></p>
  <p class="text">${menssage.text}</p>`
  chatMessages.appendChild(div);
}

// Primera conexion
socket.on('connectUser', (users) => {
  outputUsers(users);
})

const outputUsers = (users) => {
  const arrayofUsers = users.map((aUser) => `<li>${aUser.username}</li>`);
  chatMessages.innerHTML = arrayofUsers.join('');
}

  