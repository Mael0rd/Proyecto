const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

//Listar todos los usuarios
module.exports.get =async (request,response, next)=>{
    const usuarios= await prisma.usuario.findMany({
       orderBy:{
        nombre:'asc'
       } 
    })
    response.json(usuarios)
}

//Obtener por Id
//localhost:3000/usuario/1
module.exports.getById = async (request, response, next) => {
    //Parámetro con el id del usuario
    let idUsuario=parseInt(request.params.id)
    const usuario=await prisma.usuario.findUnique({
        where: { id: idUsuario }
        // ,include:{
        //     generos:true
        // }
    })
    response.json(usuario)

}

//Crear un usuario
module.exports.create = async (request, response, next) => {
    let body=request.body;
    const nuevoUsuario= await prisma.usuario.create({
        data:{
           nombre: body.nombre,
           apellidos: body.apellidos,
           correo: body.correo,
           password: body.password,
           role: body.role //recuerde que este es un Enum, verifique si funciona así
        }
    })
    response.json(nuevoUsuario)
}

//Actualizar un usuario
module.exports.update = async (request, response, next) => {
    let usuario = request.body;
    let idUsuario = parseInt(request.params.id);
    //Obtener usuario viejo
    const usuarioViejo = await prisma.usuario.findUnique({
      where: { id: idUsuario },
   
    });
    const newUsuario = await prisma.usuario.update({
        where: {
          id: idUsuario,
        },
        data: {
          nombre: usuario.nombre,
          apellidos: usuario.apellidos,
          correo: usuario.correo,
          password: usuario.password,
          role: usuario.role,
        
        },
      });
      response.json(newUsuario);
    };