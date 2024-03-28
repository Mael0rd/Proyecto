import { PrismaClient } from "@prisma/client";
import { subcategorias } from "./seeds/subcategorias";
import { categorias } from "./seeds/categorias";
import { usuarios } from "./seeds/usuarios";
import { bodegas } from "./seeds/bodegas";
import { proovedores } from "./seeds/proovedores";

const prisma = new PrismaClient();
  async function main() {
  //bodegas
  await prisma.bodega.createMany({
    data: bodegas,
  });
  //proovedores
  await prisma.proovedor.createMany({
    data: proovedores,
  });
  //usuarios
  await prisma.usuario.createMany({
    data: usuarios,
  });
  //subcategorias
  await prisma.subCategoria.createMany({
    data: subcategorias,
  });
  //categorias
  await prisma.categoria.createMany({
    data: categorias,
  });
  //Productos
  await prisma.producto.create({
    //instancia Producto 1
    data: {
      codigo: "GAS_TRA_200",
      nombre: "Honda Tornado 200",
      descripcion: "Motocicleta doble proposito",
      precio: 1500000,
      cilindraje: "200cc",
      cantidad: 10,
      tipoLLanta: "Radial",
      subCategoria: {
        connect: { id: 2 },
      },
    },
  });

  await prisma.producto.create({
    //instancia Producto 2
    data: {
      codigo: "GAS_BIC_099",
      nombre: "Formula 99CC",
      descripcion: "Motocicleta doble proposito",
      precio: 500000,
      cilindraje: "99cc",
      cantidad: 10,
      tipoLLanta: "Tubular",
      subCategoria: {
        connect: { id: 4 }, //¿como ingreso a categoria?
      },
    },
  });
  await prisma.producto.create({
    //instancia Producto 3
    data: {
      codigo: "GAS_MOT_390",
      nombre: "KTM Duke",
      descripcion: "Motocicleta pistera de cilindraje medio",
      precio: 4000000,
      cilindraje: "390 cc",
      cantidad: 10,
      tipoLLanta: "Tubular",
      subCategoria: {
        connect: { id: 4 }, //¿como ingreso a categoria?
      },
    },
  });
  await prisma.producto.create({
    //instancia Producto 4
    data: {
      codigo: "GAS_PIS_1000",
      nombre: "BMW Motorrad ",
      descripcion: "Motocicleta pistera de cilindraje alto",
      precio: 40000000,
      cilindraje: "1000 cc",
      cantidad: 10,
      tipoLLanta: "Radial",
      subCategoria: {
        connect: { id: 4 }, //¿como ingreso a categoria?
      },
    },
  });

  //Inventario
  await prisma.inventario.create({
    //instancia inventario 1 
    data: {
      bodegaId: 1,
      productoId: 3,
      usuarioregistraId: 2,
      usuarioActualizaId: 2,
      cantMax: 10,
      cantMin: 1,
      cantStock: 3, //como accedo a los datos que ya tiene Producto arriba?
    },
  });

  await prisma.inventario.create({
    //instancia inventario 2
    data: {
      bodegaId: 2,
      productoId: 1,
      usuarioregistraId: 2,
      usuarioActualizaId: 2,
      cantMax: 10,
      cantMin: 1,
      cantStock: 1, //como accedo a los datos que ya tiene Producto arriba?
    },
  });
  await prisma.inventario.create({
    //instancia inventario 3
    data: {
      bodegaId: 1,
      productoId: 2,
      usuarioregistraId: 3,
      usuarioActualizaId: 3,
      cantMax: 7,
      cantMin: 1,
      cantStock: 2, //como accedo a los datos que ya tiene Producto arriba?
    },
  });
  await prisma.inventario.create({
    //instancia inventario 3
    data: {
      bodegaId: 3,
      productoId: 2,
      usuarioregistraId: 1,
      usuarioActualizaId: 1,
      cantMax: 7,
      cantMin: 1,
      cantStock: 4, //como accedo a los datos que ya tiene Producto arriba?
    },
  });
  await prisma.inventario.create({
    //instancia inventario 3
    data: {
      bodegaId: 2,
      productoId: 2,
      usuarioregistraId: 2,
      usuarioActualizaId: 2,
      cantMax: 7,
      cantMin: 1,
      cantStock: 4, //como accedo a los datos que ya tiene Producto arriba?
    },
  });
  await prisma.inventario.create({
    //instancia inventario 3
    data: {
      bodegaId: 2,
      productoId: 2,
      usuarioregistraId: 2,
      usuarioActualizaId: 2,
      cantMax: 6,
      cantMin: 1,
      cantStock: 4, //como accedo a los datos que ya tiene Producto arriba?
    },
  });


  //ordenes´// en la base sale como Orden
  //orden 1
  await prisma.ordenCompra.create({
    data: {
      proovedor: { connect: { id: 1 } },
      bodega: { connect: { id: 1, nombre: 'Bodega el Coyol' } },
      usuario: { connect: { id: 1, nombre: 'Luis' } },
      cantidad: 1,
      productos: {
        createMany:{
          data: [
            {cantidad: 10, productoId: 1},
            {cantidad: 12, productoId: 2},
            {cantidad: 13, productoId: 3},
          ]
        }
      }

    },
    include: { productos: true },
  });
  //orden 2
  await prisma.ordenCompra.create({
    data: {
      proovedor: { connect: { id: 2 } },
      bodega: { connect: { id: 1, nombre: 'Bodega el Coyol' } },
      usuario: { connect: { id: 2} },
      cantidad: 3,
      productos: {
        createMany:{
          data: [
            {cantidad: 3, productoId: 4},
            {cantidad: 2, productoId: 2},
            {cantidad: 2, productoId: 1}
          ]
        }
      }

    },
    include: { productos: true },
  });
  //orden 3
  await prisma.ordenCompra.create({
    data: {
      proovedor: { connect: { id: 1 } },
      bodega: { connect: { id: 2 } },
      usuario: { connect: { id: 3 } },
      cantidad: 1,
      productos: {
        createMany:{
          data: [
            {cantidad: 7, productoId: 3},
            {cantidad: 5, productoId: 2},
            {cantidad: 4, productoId: 1}
          ]
        }
      }

    },
    include: { productos: true },
  });
  //orden 4
  await prisma.ordenCompra.create({
    data: {
      proovedor: { connect: { id: 1 } },
      bodega: { connect: { id: 3} },
      usuario: { connect: { id: 2 } },
      cantidad: 2,
      productos: {
        createMany:{
          data: [
            {cantidad: 5, productoId: 1},
            {cantidad: 2, productoId: 4},
            {cantidad: 1, productoId: 3},
          ]
        }
      }

    },
    include: { productos: true },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
