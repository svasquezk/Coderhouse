let users = [];

 const addUser = (id, username) => {
    const user = {
      id,
      username
    };
  
    users.push(user);
  };
  

  const getCurrentUser = (id) => {
    return users.find((aUser) => aUser.id === id);
  };

  const getUsers = () => {
    return users;
  }


  module.exports = {
    addUser,
    getCurrentUser,
    getUsers
  }
  