const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener productos
module.exports.get = async (request, response, next) => {
  const productos = await prisma.producto.findMany({
    include: {
      subCategoria: true,
    },
  });
  response.json(productos);
};

// Crear un producto
module.exports.create = async (request, response, next) => {
  try {
    let producto = request.body;
    const createProducto = await prisma.producto.create({
      data: {
        codigo: producto.codigo,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: parseFloat(producto.precio),
        subCategoriaId: producto.subCategoriaId,
        cantidad: parseInt(producto.cantidad),
        cilindraje: producto.cilindraje,
        tipoLLanta: producto.tipoLLanta,
        cantidad: 0
        //subCategoria:producto.subCategoria
        // bodegas: {
        //   connect: producto.bodegas.map((bodega) => ({ id: bodega })),
        // },
      },
    }); 
        response.json(createProducto);
  } catch (error) {
    next(error);
  }
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const producto = await prisma.producto.findUnique({
    where: { id: id },
  });
  response.json(producto);
}; 

//Actualizar un producto
module.exports.update = async (request, response, next) => {
  let producto = request.body;
  let idProducto = parseInt(request.params.id);
  //Obtener producto viejo
  const productoViejo = await prisma.producto.findUnique({
    where: { id: idProducto },
    // include: {
    //   subCategorias: {
    //     select:{
    //       id:true
    //     }
    //   }
    // }
  }); 
  const newProducto = await prisma.producto.update({
    where: {
      id: idProducto,
    },
    data: {
      codigo: producto.codigo,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: parseFloat(producto.precio),
      subCategoriaId: producto.subCategoriaId,
      cantidad: parseInt(producto.cantidad),
      cilindraje: producto.cilindraje,
      tipoLLanta: producto.tipoLLanta,
      cantidad: 0,
      // subCategorias: {
      //   //Generos tiene que ser {id:valor}
      //   disconnect:productoViejo.subCategorias,
      //   connect: producto.subCategorias,
      // },
    },
  });
  response.json(newProducto);
};
