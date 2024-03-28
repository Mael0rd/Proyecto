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
