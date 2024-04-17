const express = require("express");
const router = express.Router();

// Controlador con las acciones de las rutas
const ordenController = require("../controllers/ordenController");

// Rutas de ordenes
// locahost:3000/orden/
router.get("/", ordenController.get);
router.post("/", ordenController.create);
router.get("/getGrafico", ordenController.getGrafico);
router.get("/:id", ordenController.getById);

module.exports = router; 