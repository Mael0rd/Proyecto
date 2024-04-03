export class ErrorMessage {
    constructor(
      public forControl: string,
      public forValidator: string,
      public text: string
    ) { }
  }
//Mensajes de errores de validación
export const FormErrorMessage = [
  new ErrorMessage('nombre', 'required', 'El Nombre es requerido'),
  new ErrorMessage('correo', 'required', 'El Correo es requerido'),
  new ErrorMessage('correo', 'pattern', 'El formato de correo es incorrecto'),
  new ErrorMessage('nombre', 'minlength', 'El nombre debe tener 3 carácteres mínimo'),
  new ErrorMessage('numeroTelefonico', 'required', 'El Teléfono es requerido'),
  new ErrorMessage('numeroTelefonico', 'pattern', 'El Teléfono solo lleva números'),
  new ErrorMessage('descripcion', 'required', 'La descripción es requerida'),
  new ErrorMessage('precio', 'required', 'El precio es requerido'),
  new ErrorMessage('precio', 'pattern', 'El precio solo acepta números con dos decimales'),
  new ErrorMessage('subcategorias', 'required', 'Es requerido que seleccione una subcategoria'),
  //new ErrorMessage('categorias', 'required', 'Es requerido que seleccione una categoria'),
  new ErrorMessage('tipoLLanta', 'required', 'Es requerido que indique un tipo de llanta'),
  new ErrorMessage('cilindraje', 'required', 'Es requerido que indique el cilindraje'),
  new ErrorMessage('direccionExacta', 'minlength', 'Indique una dirección más específica'),
  new ErrorMessage('direccionExacta', 'required', 'Es requerido que indique una dirección exacta'),
  new ErrorMessage('provincia', 'required', 'Es requerido que indique la provincia'),
  new ErrorMessage('canton', 'required', 'Es requerido que indique el canton'),
  new ErrorMessage('distrito', 'required', 'Es requerido que indique el distrito'),
  //Inventario
  new ErrorMessage('bodegaId', 'required', 'La bodega es requerida'),
  new ErrorMessage('productoId', 'required', 'El producto es requerido'),
  new ErrorMessage('cantStock', 'required', 'La cantidad en stock es requerida'),
  new ErrorMessage('cantMin', 'required', 'La cantidad mínima es requerida'),
  new ErrorMessage('cantMax', 'required', 'La cantidad máxima es requerida'),
  new ErrorMessage('usuarioregistraId', 'required', 'El usuario es requerido'),
  new ErrorMessage('usuarioActualizaId', 'required', 'El usuario es requerido'),
  
  
];