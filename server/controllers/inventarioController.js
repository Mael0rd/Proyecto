const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener inventarios
module.exports.get = async (response) => {
  const inventarios = await prisma.inventario.findMany({
    //include: { usuario: true },
  });
  response.json(inventarios);
};

// Obtener inventarios por Id de usuario
module.exports.getByUsuario = async (request, response, next) => {
  let usuarioId = parseInt(request.params.usuarioregistraId);
  const inventarios = await prisma.inventario.findMany({
    where: { usuarioregistraId: usuarioId },
    orderBy: { bodegaId: "asc" },
    include: {
      bodega: true,
      producto: true,
    },
  });
  response.json(inventarios);
};

// Obtener inventarios por Id de inventario
module.exports.getById = async (request, response) => {
  let id = parseInt(request.params.id);
  const inventario = await prisma.inventario.findUnique({
    where: { id: id },
    include: {
      bodega: true,
      producto: true,
    },
  });
  response.json(inventario);
}; 

// Crear un inventario
module.exports.create = async (request, response, next) => {
  try {
    let inventario = request.body; 
    
    const createInventario = await prisma.inventario.create({
      data: {
        bodegaId: inventario.bodegaId,
        productoId: inventario.productoId,
        cantStock: parseInt(inventario.cantStock),
        cantMin: parseInt(inventario.cantMin),
        cantMax: parseInt(inventario.cantMax),
        usuarioregistraId: parseInt(inventario.usuarioregistraId),
        usuarioActualizaId: parseInt(inventario.usuarioActualizaId),
      },
    }); 
    response.json(createInventario);
  } catch (error) {
    next(error);
  }
};


// Actualizar un inventario
module.exports.update = async (request, response, next) => {
  try {
    let inventario = request.body;
    let idInventario = parseInt(request.params.id);

    // Obtener inventario viejo
    const inventarioViejo = await prisma.inventario.findUnique({
      where: { id: idInventario },
    });
 
    // Verificar si el inventario existe
    if (!inventarioViejo) {
      return response.status(404).json({ error: 'Inventario no encontrado' });
    } 
    
    // Actualizar el inventario
    const updatedInventario = await prisma.inventario.update({
      where: {
        id: idInventario,
      },
      data: {
        bodegaId: inventario.bodegaId,
        productoId: inventario.productoId,
        cantStock: parseInt(inventario.cantStock),
        cantMin: parseInt(inventario.cantMin),
        cantMax: parseInt(inventario.cantMax),
        usuarioregistraId: parseInt(inventario.usuarioregistraId),
        usuarioActualizaId: parseInt(inventario.usuarioActualizaId),
      },
    });

    response.json(updatedInventario);
  } catch (error) {
    next(error);
  }
};

