const express = require("express");
const router = express.Router();

// Controlador con las acciones de las rutas
const bodegaController = require("../controllers/bodegaController");

// Rutas de bodegas
// locahost:3000/bodega/
router.get("/", bodegaController.get);
router.get("/:id", bodegaController.getById);

module.exports = router;