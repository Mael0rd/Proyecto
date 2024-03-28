const express = require("express");
const router = express.Router();

// Controlador con las acciones de las rutas
const proovedorController = require("../controllers/proovedorController");

// Rutas de subcategorias
// locahost:3000/subcategoria/
router.get("/", proovedorController.get);
router.get("/:id", proovedorController.getById);
router.post("/", proovedorController.create);
router.put('/:id', proovedorController.update)

module.exports = router;

