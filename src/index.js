// Cargar variables de entorno
require("@babel/register");
const express = require("express");
const getCredentials = require("./utils/headers.js");
const signToken = require("./utils/token.js");
const getUser = require("./utils/users.js");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/user.js");
const prodRoutes = require("./routes/prod.js");
const MONGODB_URI = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;


app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", prodRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => console.log(err));

app.post("/token", (req, res) => {
  try {
    const { username, password } = getCredentials(req);
    const user = getUser(username, password);
    const token = signToken(user);

    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hola desde mi API");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
