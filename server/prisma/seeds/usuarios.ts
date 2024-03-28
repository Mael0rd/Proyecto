import { Role } from "@prisma/client";
export const usuarios = [
  //Usuario 1
  {
    nombre: "Luis",
    apellidos: "Alberto Monge",
    correo: "luis.monge@example.com",
    password: "123456",
    role: Role.ADMIN,
  },
  {
    nombre: "Franklin",
    apellidos: "Chang Diaz",
    correo: "fran.chan@example.com",
    password: "123456",
    role: Role.ADMIN,
  },
  {
    nombre: "Laura",
    apellidos: "Chinchilla",
    correo: "Lau.chin@example.com",
    password: "123456",
    role: Role.ADMIN,
  },
];
