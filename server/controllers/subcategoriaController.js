const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener subcategorias
module.exports.get = async (request, response, next) => {
  const subcategorias = await prisma.subCategoria.findMany(
    );
  response.json(subcategorias);
};

// Obtener subcategoria por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const subcategoria = await prisma.subCategoria.findUnique({
    where: { id: id },
    //include: {categoriaId: true},
  });
  response.json(subcategoria);
};
