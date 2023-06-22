const express = require("express");
const prodSchema = require("../models/prod");
const router = express.Router();

router.post("/prod", (req, res) => {
  const prod = prodSchema(req.body);
  prod
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

//Obtener usuarios
router.get("/prod", (req, res) => {
  prodSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Obtener usuarios por ID
router.get("/prod/:id", (req, res) => {
  const { id } = req.params;
  prodSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//Actualizar  usuario por ID
router.put("/prod/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;
  prodSchema
    .updateOne({ _id: id }, { $set: { nombre, descripcion, precio } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Eliminar usuarios por ID
router.delete("/prod/:id", (req, res) => {
  const { id } = req.params;
  prodSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
