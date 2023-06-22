const mongoose = require("mongoose");

const prodSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Prod", prodSchema);
