const Productos=require('../models/Productos');
const multer=require('multer');
const shortid=require('shortid');

const configuracionMulter = {
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "../../uploads/");
      },
      filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        cb(null, `${shortid.generate()}.${extension}`);
      },
    })),
    fileFilter(req, file, cb) {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
      } else {
        cb(new Error("Formato no valido"));
      }
    },
  };

  const upload = multer(configuracionMulter).single("imagen");
//Sube un archivo
exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error });
    }
    return next();
  });
};
//Nuevo producto
exports.nuevoPoducto = async (req, res, next) => {
    const producto = new Productos(req.body);
    try {
      if (req.file.filename) {
        producto.imagen = req.file.filename;
      }
      await producto.save();
      res.json({ mensaje: "El producto se a creado exitosamente" });
    } catch (error) {
      console.log(error);
      res.json({ mensaje: "Hubo un error" });
      next();
    }
  };
  //Mostrar todos los productos
  exports.mostrarProductos = async (req, res, next) => {
    try {
      const productos = await Productos.find({}, { __v: 0 });
      res.json(productos);
    } catch (error) {
      console.log(error);
      res.json({ mensaje: "Hubo un error" });
      next();
    }
  };
  //Mostrar produco
  exports.mostrarProducto = async (req, res, next) => {
    try {
      const producto = await Productos.findById(req.params.idProducto);
      if (!producto) {
        res.json({ mensaje: "El producto no existe" });
        return next();
      }
      res.json(producto);
    } catch (error) {
      console.log(error);
      res.json(error);
      next();
    }
  };
  //Actualizar producto
  exports.actualizarProducto = async (req, res, next) => {
    try {
      //construimos un nuevo producto
      let nuevoProducto = req.body;
      //verificar si hay una imagen nueva
      if (req.file) {
        nuevoProducto.imagen = req.file.filename;
      } else {
        let productoAnterior = await Productos.findById(req.params.idProducto);
        nuevoProducto.imagen = productoAnterior.imagen;
      }
      let producto = await Productos.findOneAndUpdate(
        { _id: req.params.idProducto },
        nuevoProducto,
        {
          new: true,
        }
      );
      res.json(producto);
    } catch (error) {
      console.log(error);
      next();
    }
  };
  //Eliminar producto
  exports.eliminarProducto = async (req, res, next) => {
    try {
      await Productos.findOneAndDelete({ _id: req.params.idProducto });
      res.json({ mensaje: "El producto se ha eliminado correctamente" });
    } catch (error) {
      console.log(error);
      res.json(error);
      next();
    }
  };
  