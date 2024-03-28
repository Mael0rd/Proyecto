const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener bodegas
module.exports.get = async (request, response, next) => {
  const bodegas = await prisma.bodega.findMany();
  response.json(bodegas);
};

// Obtener bodega por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const bodega = await prisma.bodega.findUnique({
    where: { id: id },
  });
  response.json(bodega);
};

//Crear una bodega //no se si funciona aun porque no logre hacer la consulta en postman
module.exports.create = async (request, response, next) => {
    let body = request.body;
    const nuevaBodega = await prisma.bodega.create({
        data: {
            nombre: body.nombre,
            dimensiones: body.dimensiones,
            capacidad: parseInt(body.capacidad),
            seguro: body.seguro,
            ubicacionId: bodega.ubicacionId,
        },
        usuarios: {
            connect: bodega.usuarios.map((usuarios) => ({ id: usuarios })),
        },
        productos:{
            connect: bodega.productos.map((productos) => ({ id: productos })),
        }
    });

    response.json(nuevaBodega);
}
