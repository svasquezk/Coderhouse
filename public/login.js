
const  user =  '../src/routers/user';


const login = (e) => {
    const user = document.getElementById('username').value;
    const form = document.getElementById("login-form").action = "/api/user/login?username="+user;

    const data = document.getElementById("login-form").submit();

  } 
    