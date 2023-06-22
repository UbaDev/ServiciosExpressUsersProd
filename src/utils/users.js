require("dotenv").config();

//Varibles de entorno con env
const users = [
  {
    id: process.env.USERNAME,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    fullname: process.env.FULLNAME,
  },
];
//Validación
const getUser = (username, password) => {
  const user = users.find((user) => user.username === username);

  if (!user || user.password !== password) {
    throw new Error("Credenciales invalidas");
  }

  return user;
};

module.exports = { getUser };
