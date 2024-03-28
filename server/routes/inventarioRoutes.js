const express = require("express");
const router = express.Router();

// Controlador con las acciones de las rutas
const inventarioController = require("../controllers/inventarioController");

// Rutas de inventarios

router.get("/:usuarioregistraId", inventarioController.getByUsuario);
router.get("/detalle/:id", inventarioController.getById);




module.exports = router;