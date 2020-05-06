const Clientes = require("../models/Clientes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Crear un nuevo ciente
exports.nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body);
  cliente.password = await bcrypt.hash(req.body.password, 12);
  try {
    await cliente.save();
    res.json({ mensje: "Cliente creado correctamente" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error" });
  }
};
//Mostrar todos los cleintes
exports.mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({}, { password: 0 });
    res.json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
};
//Mostrar un solo cliente
exports.mostrarCliente = async (req, res, next) => {
  try {
    const cliente = await Cliente.findById(req.params.idCliente, {
      password: 0,
    });
    if (!cliente) {
      res.json({ mensaje: "El cliente no existe" });
      return next();
    }
    res.json(cliente);
  } catch (error) {
    res.json({ mensaje: "Hubo un error" });
  }
};

//Actualizar un cliente
exports.actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findOneAndUpdate(
      { _id: req.params.idCliente },
      req.body,
      { new: true }
    );
    res.json(cliente);
  } catch (error) {
    console.log(error);
    res.json(error);
    next();
  }
};
//Eliminar un cliente
exports.eliminarCliente = async (req, res, next) => {
  try {
    await Clientes.findOneAndDelete({ _id: req.params.idCliente });
    res.json({ mensaje: "El cliente se ha eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.json(error);
    next();
  }
};

//autenticacion del cliente
exports.autenticarCliente = async (req, res, next) => {
  const { email, password } = req.body;
  const cliente = await Clientes.findOne({ email });
  if (!cliente) {
    await res.status(401).json({
      mensaje: "Ese cliente no existe",
    });
    next();
  } else {
    if (!bcrypt.compareSync(password, cliente.password)) {
      await res.status(401).json({
        mensaje: "Password incorrecto",
      });
      next();
    } else {
      const token = jwt.sign(
        {
          email: cliente.email,
          nombre: usuario.nombre,
          _id: usuario._id,
        },
        "LLAVESECRETA",
        {
          expiresIn: "2h",
        }
      );
      res.json({ token, id: cliente._id });
    }
  }
};
