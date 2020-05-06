const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
  nombre: { type: String, trim: true },
  apellido: { type: String, trim: true },
  email: { type: String, trim: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Clientes", clienteSchema);
