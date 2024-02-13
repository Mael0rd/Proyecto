import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  //usuarios

  await prisma.usuario.create({
    data: {
        nombre: "Lorenzo",
        apellidos: "Rodriguez Herrera",
        correo: "lvr.lord@example.com",
        password: "123456",
        rol: {
          create: {
            descripcion: "Administrador",
          },
        },
        // Asegúrate de proporcionar un valor para trasladoId
        //traslados: 1, // Aquí debes proporcionar el valor correcto para trasladoId
      },
    });
    
  
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });