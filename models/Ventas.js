const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ventasSchema = new Schema({
  usuario: { type: Schema.ObjectId, ref: "Clientes" },
  carrito: [
    {
      producto: [{ type: Schema.ObjectId, ref: "Productos" }],
      cantidad: { type: Number },
    },
  ],
  total: { type: Number }
});

module.exports = mongoose.model("Ventas", ventasSchema);
