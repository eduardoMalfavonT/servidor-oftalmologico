const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productosSchema = new Schema({
  nombre: { type: String },
  precio: { type: Number, trim: true },
  marca: { type: String, uppercase: true },
  estilo: { type: String },
  forma: { type: String, trim: true },
  tipoDeArmazon: { type: String },
  material:{type:String},
  categoria: { type: String },
  color: { type: String, trim: true },
  genero: { type: String, trim: true },
  disponibilidad:{type:Number},
  imagen: {type:String},
});

module.exports = mongoose.model("Productos", productosSchema);
