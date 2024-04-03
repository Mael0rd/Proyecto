const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener Proovedor
module.exports.get = async (request, response, next) => {
  const proovedores = await prisma.proovedor.findMany({
    //include: {contacto: true},
  });
  response.json(proovedores);
};

// Obtener proovedor por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const proovedor = await prisma.proovedor.findUnique({
    where: { id: id },
    //include: {categoriaId: true},
  });
  response.json(proovedor);
};

// Crear un proovedor
module.exports.create = async (request, response, next) => {
  try {
    let proovedor = request.body;
    const createProovedor = await prisma.proovedor.create({
      data: {
        nombre: proovedor.nombre,
        correo: proovedor.correo,
        numeroTelefonico: proovedor.numeroTelefonico,
        direccionExacta: proovedor.direccionExacta,
        provincia: proovedor.provincia,
        canton: proovedor.canton,
        distrito: proovedor.distrito,

      },
    });
    response.json(createProovedor);
  } catch (error) {
    next(error);
  }
};

//Actualizar un proovedor
module.exports.update = async (request, response, next) => {
  let proovedor = request.body;
  let idProovedor = parseInt(request.params.id);
  //Obtener producto viejo
  const productoViejo = await prisma.proovedor.findUnique({
    where: { id: idProovedor },
   
  });
  const newProovedor = await prisma.proovedor.update({
    where: {
      id: idProovedor,
    },
    data: {
        nombre: proovedor.nombre,
        correo: proovedor.correo,
        numeroTelefonico: proovedor.numeroTelefonico,
        direccionExacta: proovedor.direccionExacta,
        provincia: proovedor.provincia,
        canton: proovedor.canton,
        distrito: proovedor.distrito,      
    },
  });
  response.json(newProovedor);
};
