const dotEnv = require("dotenv"); 
const express = require("express"); 
const { PrismaClient } = require("@prisma/client"); 
const { request, response } = require("express"); 
const cors = require("cors"); 
const logger = require("morgan"); 
//const { usuarios } = require("./prisma/seeds/usuarios");
const app = express(); 
const prism = new PrismaClient(); 
 
//---Archivos de rutas--- 
 const usuariosRoutes=require("./routes/usuarioRoutes")
 const categoriasRoutes = require("./routes/categoriaRoutes");
 const subcategoriasRoutes = require("./routes/subcategoriaRoutes");
 const bodegasRoutes = require("./routes/bodegaRoutes");
 const ordenesRoutes = require("./routes/ordenRoutes");
 const productosRoutes = require("./routes/productoRoutes");
 const inventariosRoutes = require("./routes/inventarioRoutes");
 const proovedoresRoutes = require("./routes/proovedorRoutes");
 
 
// Acceder a la configuracion del archivo .env 
dotEnv.config(); 
 
// Puero que escucha por defecto 300 o definido .env 
const port = process.env.PORT || 3000; 
 
// Middleware CORS para aceptar llamadas en el servidor 
app.use(cors()); 
// Middleware para loggear las llamadas al servidor 
app.use(logger("dev")); 
 
// Middleware para gestionar Requests y Response json 
app.use(express.json()); 
app.use( 
  express.urlencoded({ 
    extended: true, 
  }) 
); 
 
//---- Definir rutas ----  
app.use('/usuario/', usuariosRoutes);
app.use("/categoria/", categoriasRoutes);
app.use("/subcategoria/", subcategoriasRoutes);
app.use("/bodega/", bodegasRoutes);
app.use("/orden/", ordenesRoutes);
app.use("/producto/", productosRoutes);
app.use("/inventario/", inventariosRoutes);
app.use("/proovedor/", proovedoresRoutes);

 
// Servidor 
app.listen(port, () => {  
    console.log(`http://localhost:${port}`); 
    console.log("Presione CTRL-C para deternerlo\n"); 
    }); 
    