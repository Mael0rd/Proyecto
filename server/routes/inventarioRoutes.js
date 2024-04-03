const express = require("express");
const router = express.Router();

// Controlador con las acciones de las rutas
const inventarioController = require("../controllers/inventarioController");

// Rutas de inventarios

router.get("/:usuarioregistraId", inventarioController.getByUsuario);
router.get("/detalle/:id", inventarioController.getById);
router.post("/", inventarioController.create);
router.put('/:id', inventarioController.update)



module.exports = router;