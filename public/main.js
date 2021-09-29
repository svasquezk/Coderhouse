// Abre canal de comunicación
// const socket = io.connect('http://localhost:8080', { forceNew: true });
// // Cuando arrancamos pedimos la data que hay actualmente enviando un socket
// socket.emit('askData');

const  user =  '../src/routers/user';


const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
const usuarioLog = urlParams.get('user');
console.log('--> ', usuarioLog);

var htmluser = `<div><strong>${usuarioLog}</strong></div>`;


document.getElementById('nomUserLog').innerHTML =  `Hola, ${usuarioLog.toString()} `

const salir = () => {

}

const addproduct = (e) => {
    const prod = {
        title : document.getElementById('title').value,
        price : document.getElementById('price').value,
        thumbnail : document.getElementById('thumbnail').value,
    };

    socket.emit('new-product', prod);
    return false;
}


const  render = (data) => {
    var html = data
      .map(function (elem, index) {
        return `<div>
                   <strong>${elem.title}</strong>:
                   <em>${elem.thumbnail}</em>
          </div>`;
      })
      .join(' ');
  
    document.getElementById('messages').innerHTML = html;
  }


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

