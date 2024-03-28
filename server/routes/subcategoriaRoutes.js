const express = require("express");
const router = express.Router();

// Controlador con las acciones de las rutas
const subcategoriaController = require("../controllers/subcategoriaController");

// Rutas de subcategorias
// locahost:3000/subcategoria/
router.get("/", subcategoriaController.get);
router.get("/:id", subcategoriaController.getById);

module.exports = router;

