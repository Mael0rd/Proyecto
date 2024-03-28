import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../share/notification.service';
import { FormErrorMessage } from '../../form-error-message';

@Component({
  selector: 'app-proovedor-form',
  templateUrl: './proovedor-form.component.html',
  styleUrl: './proovedor-form.component.css'
})
export class ProovedorFormComponent {

  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';

  //Lista de sub y categorias aqui va direcciones y contactos
  contactosList: any;
  categoriaList: any;

  //Producto a actualizar
  proovedorInfo: any;
  //Respuesta del API crear/modificar
  respProducto: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  proovedorForm: FormGroup;
  //id del Producto
  idProovedor: number = 0;
  //Sí es crear
  isCreate: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private gService: GenericService,
    private noti: NotificacionService
  ) {
    this.formularioReactive();
    //this.listaSubcategoria();
    //this.listaCategoria();
    //this.cambios();
  }

  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idProovedor = params['id'];
      if (this.idProovedor != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        //Obtener proovedor a actualizar del API
        this.gService
          .get('proovedor', this.idProovedor)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            console.log('idProovedor a Actualizar', data);
            this.proovedorInfo = data;
            //Establecer valores a precargar en el formulario
            this.proovedorForm.setValue({
              id: this.proovedorInfo.id,
              nombre: this.proovedorInfo.nombre,
              correo: this.proovedorInfo.correo,
              numeroTelefonico: this.proovedorInfo.numeroTelefonico,
              //publicar: this.productoInfo.publicar,
              //generos: this.productoInfo.generos.map(({id})=>id),
              direccionExacta: this.proovedorInfo.direccionExacta,
              
            });
          });
        //[{id:5, nombre: valor, ..}]
        //[5,4]
      }
    });
  }

     //Crear Formulario
   formularioReactive() {
    //[null, Validators.required]
    this.proovedorForm = this.fb.group({
      //identificador
      id: [null, null],
      nombre: [ null,Validators.compose([Validators.required, Validators.minLength(2)]),],
      correo: [null, Validators.required],
      numeroTelefonico: [null, Validators.required],
      direccionExacta: [null, Validators.required],
     
    });
  }
  //mae tengo que revisar esta lista
  listaContactos() {
    this.contactosList = null;
    this.gService
      .list('contactos')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //console.log("contactos",data);
        this.contactosList = data;
      });
  }

  public errorHandling = (controlName: string) => {
    let messageError = '';
    const control = this.proovedorForm.get(controlName);
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
  
  submitProovedor(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.proovedorForm.invalid) {
      return;
    }
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    //let subcategoriasForm = this.proovedorForm
      //.get('subcategorias') //puede ser subcategorias***************
      //.value;
    //Asignar valor al formulario

    //setValue
    //this.proovedorForm.patchValue({ subcategorias: subcategoriasForm });
    //console.log("el valor del proovedor",this.proovedorForm.value);

    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
      this.gService
        .create('proovedor', this.proovedorForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProducto = data;
          console.log("esto es lo que lleva",data)
          this.noti.mensajeRedirect(
            'Crear Producto',
            `Producto creado: ${data.nombre}`,
            TipoMessage.success,
            'proovedor'
          );
          this.router.navigate(['/proovedor']);
        });
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
      this.gService
        .update('proovedor', this.proovedorForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProducto = data;

          this.noti.mensajeRedirect(
            'Actualizar Producto',
            `Producto actualizado: ${data.nombre}`,
            TipoMessage.success,
            'proovedor'
          );
          this.router.navigate(['/proovedor']);
        });
    }
  }

  onReset() {
    this.submitted = false;
    this.proovedorForm.reset();
  }
  onBack() {
    this.router.navigate(['/proovedor']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
