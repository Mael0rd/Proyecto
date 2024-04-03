import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormErrorMessage } from '../../form-error-message';
import { GenericService } from '../../share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from '../../share/notification.service';

@Component({
  selector: 'app-inventario-form',
  templateUrl: './inventario-form.component.html',
  styleUrl: './inventario-form.component.css',
})
export class InventarioFormComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //Lista de sub y categorias
  productoList: any;
  bodegaList: any;
  usuarioList: any;
  //Inventario a actualizar
  inventarioInfo: any;
  //Respuesta del API crear/modificar
  respInventario: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  inventarioForm: FormGroup;
  //id del Inventario
  idInventario: number = 0;
  //Sí es crear
  isCreate: boolean = true;
  //Usuario que actualiza
  usuarioActualiza: number = 2;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private gService: GenericService,
    private noti: NotificacionService
  ) {
    this.productoList = [];
    this.bodegaList = [];
    this.usuarioList = [];
    this.formularioReactive();
  }

  ngAfterViewInit(): void {
    this.listaBodegas();
    this.listaProductos();
    this.listaUsuarios();
  }

  ngOnInit(): void {
    // Verificar si se envió un ID por parámetro para crear el formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idInventario = params['id'];
      if (this.idInventario != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';

        // Obtener inventario a actualizar del API
        this.gService
          .get('inventario', { id: this.idInventario }) // Ajustar la URL y el filtro según la ruta de tu API y el filtro requerido para obtener un solo inventario por ID
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            console.log('Inventario a actualizar', data);
            this.inventarioInfo = data; 

            // Establecer valores a precargar en el formulario
            this.inventarioForm.setValue({
              id: this.inventarioInfo.id,
              bodegaId: this.inventarioInfo.bodegaId,
              productoId: this.inventarioInfo.productoId, 
              cantStock: this.inventarioInfo.cantStock,
              cantMin: this.inventarioInfo.cantMin,
              cantMax: this.inventarioInfo.cantMax,
              usuarioregistraId: this.inventarioInfo.usuarioregistraId,
              usuarioActualizaId: this.inventarioInfo.usuarioActualizaId,
            });
          });
      }
    });
  }

  listaBodegas() {
    this.bodegaList = null;
    this.gService
      .list('bodega')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('bodega', data);
        this.bodegaList = data;
      });
  }

  listaProductos() {
    this.productoList = null;
    this.gService
      .list('producto')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('producto', data);
        this.productoList = data;
      });
  }

  listaUsuarios() {
    this.usuarioList = null;
    this.gService
      .list('usuario')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('usuario', data);
        this.usuarioList = data;  
      });
  }
  

  getUsuarioActualiza(): { id: number, nombre: string } {
    if (this.usuarioActualiza && this.usuarioList) {
      const usuario = this.usuarioList.find(user => user.id === this.usuarioActualiza);
      if (usuario) {
        return { id: usuario.id, nombre: usuario.nombre };
      }
    }
    return { id: null, nombre: 'Usuario desconocido' }; // o cualquier otro valor predeterminado
  }
  
   minMaxValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const cantMin = control.get('cantMin').value;
    const cantMax = control.get('cantMax').value;
  
    if (cantMin !== null && cantMax !== null && cantMin >= cantMax) {
      return { 'minGreaterThanMax': true };
    }
    return null;
  }
  
  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.inventarioForm = this.fb.group({
      //identificador
      id: [null, null],

      bodegaId: [null, Validators.required],
      productoId: [null, Validators.required],

      cantStock: [null, Validators.compose([Validators.required, Validators.minLength(2)]),],
      cantMin: [null, Validators.required],
      cantMax: [null, Validators.compose([Validators.required, Validators.minLength(2)]),],

      usuarioregistraId: [null, null],
      usuarioActualizaId: [null, null],
    }, { validator: this.minMaxValidator });
  }

  public errorHandling = (controlName: string) => {
    let messageError = '';
    const control = this.inventarioForm.get(controlName);
    if (control.errors) {
      for (const message of FormErrorMessage) {
        if (
          control &&
          control.errors[message.forValidator] &&
          message.forControl == controlName
        ) {
          messageError = message.text;
        }
      }
      return messageError;
    } else {
      return false;
    }
  };

  submitProducto(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.inventarioForm.invalid) {
      return;
    }
    //Obtener id bodega y productos del Formulario
    let bodegaIdForm = this.inventarioForm.get('bodegaId').value;
    let productoIdForm = this.inventarioForm.get('productoId').value;

    
    //Obtener el id de usuario
    let usuarioActualizaIdForm = this.getUsuarioActualiza().id;
    //Asignar valor al formulario

    //setValue
    this.inventarioForm.patchValue
    ({ 
      bodegaId: bodegaIdForm,
      productoId: productoIdForm,
      usuarioActualizaId: usuarioActualizaIdForm 
    });
    

    console.log('el valor del producto', this.inventarioForm.value);

    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
      this.gService
        .create('inventario', this.inventarioForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respInventario = data;
          console.log("submit",data)
          this.noti.mensajeRedirect(
            'Crear Inventario',
            `Inventario creado`, //`Inventario creado: ${data.nombre}`,
            TipoMessage.success,
            'inventario/2'
          );
          this.router.navigate(['/inventario/2']);
        });
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
      this.gService
        .update('inventario', this.inventarioForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respInventario = data;

          this.noti.mensajeRedirect(
            'Actualizar Producto',
            `Inventario actualizado: ${data.nombre}`,
            TipoMessage.success,
            'inventario/2'
          );
          this.router.navigate(['/inventario/2']);
        });
    }
  }

  onReset() {
    this.submitted = false;
    this.inventarioForm.reset();
  }
  onBack() {
    this.router.navigate(['/inventario/2']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
