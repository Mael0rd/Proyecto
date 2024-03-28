const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener ordenes
module.exports.get = async  (request, response, next) => {
  const ordenes = await prisma.ordenCompra.findMany({
    include: { 
      proovedor: true,
      bodega: true,
      usuario: true,
      productos: {
        select:{
          cantidad: true,
          productoId: true,
          producto: true,
        }
      },
    }
  });
  response.json(ordenes);
};


module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const orden = await prisma.ordenCompra.findUnique({
    where: { id: id },
    include: { 
      proovedor: true,
      bodega: true,
      usuario: true,
      productos: {
        select:{
          cantidad: true,
          productoId: true,
          producto: true,
        }
      },
    }      
  });
  response.json(orden);
};
