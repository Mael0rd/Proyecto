const express = require("express");
const router = express.Router();

// Controlador con las acciones de las rutas
const ordenController = require("../controllers/ordenController");

// Rutas de ordenes
// locahost:3000/orden/
router.get("/", ordenController.get);
router.get("/:id", ordenController.getById);

module.exports = router;