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

// Obtener ordenes para el grafico
module.exports.getGrafico = async (request, response, next) => {
  try {
    const ordenes = await prisma.ordenCompra.findMany({
      include: {
        proovedor: true,
        bodega: true,
        productos: true
        
      },
    });

    // Funcion para calcular la cantidad total de productos
    const calcularCantidadTotal = (productos) => {
      return productos.reduce((total, producto) => total + producto.cantidad, 0);
    };

    // Mapear las ordenes de compra para agregar la cantidad total de productos
    const ordenesConCantidad = ordenes.map(orden => {
      const cantidadTotal = calcularCantidadTotal(orden.productos);
      return { orden, cantidadTotal };
    });  

    response.json(ordenesConCantidad);
  } catch (error) {
    next(error);
  }
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

//Crear
module.exports.create = async (request, response, next) => {
  let infoOrden=request.body;
  const newProducto =await prisma.ordenCompra.create({
    data:{
      fechaCreacion:infoOrden.fechaOrden,
      proovedorId:infoOrden.proovedorId, //falta este
      bodegaId:infoOrden.bodegaId, //falta este
      fechaRecibida:infoOrden.fechaOrden,
      usuarioId:2,
      cantidad:1,
      productos:{
        createMany:{          
          data: infoOrden.productos 
        }
      }  
    }         
  }) 
  response.json(newProducto) 
}
 