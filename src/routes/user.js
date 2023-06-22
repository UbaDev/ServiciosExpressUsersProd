const express = require("express");
const userSchema = require("../models/user");
const { getCredentials, getToken } = require("../utils/headers.js");
const {
  signToken,
  verifyToken,
  validateExpiration,
} = require("../utils/token.js");
const { getUser } = require("../utils/users.js");

const router = express.Router();

router.get("/private", (req, res) => {
  try {
    const token = getToken(req);
    const payload = verifyToken(token);
    validateExpiration(payload);
    res.send("Soy un EndPoint privado mongo");
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

router.post("/token", (req, res) => {
  try {
    const { username, password } = getCredentials(req);
    const user = getUser(username, password);
    const token = signToken(user);
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//Crear usuarios
router.post("/users", (req, res) => {
  const token = getToken(req);
  const payload = verifyToken(token);
  validateExpiration(payload);
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Obtener usuarios
router.get("/users", (req, res) => {
  const token = getToken(req);
  const payload = verifyToken(token);
  validateExpiration(payload);
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Obtener usuarios por ID
router.get("/users/:id", (req, res) => {
  const token = getToken(req);
  const payload = verifyToken(token);
  validateExpiration(payload);
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Actualizar  usuario por ID
router.put("/users/:id", (req, res) => {
  const token = getToken(req);
  const payload = verifyToken(token);
  validateExpiration(payload);
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Eliminar usuarios por ID

router.delete("/users/:id", (req, res) => {
  const token = getToken(req);
  const payload = verifyToken(token);
  validateExpiration(payload);
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
