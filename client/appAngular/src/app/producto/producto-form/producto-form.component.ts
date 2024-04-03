import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import {  NotificacionService,  TipoMessage,} from '../../share/notification.service';
import { FormErrorMessage } from '../../form-error-message';
import { omit } from 'lodash';


@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css',
})
export class ProductoFormComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //Lista de sub y categorias
  subcategoriaList: any;
  categoriaList: any;
  //Producto a actualizar
  productoInfo: any;
  //Respuesta del API crear/modificar
  respProducto: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  productoForm: FormGroup;
  //id del Producto
  idProducto: number = 0;
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
    this.listaSubcategoria();
    this.listaCategoria();
    this.cambios();
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idProducto = params['id'];
      if (this.idProducto != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        //Obtener producto a actualizar del API
        this.gService
          .get('producto', this.idProducto)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            console.log('producto a Actualizar', data);
            this.productoInfo = data;
            //Establecer valores a precargar en el formulario
            this.productoForm.setValue({
              id: this.productoInfo.id,
              nombre: this.productoInfo.nombre,
              descripcion: this.productoInfo.descripcion,
              precio: this.productoInfo.precio,
              //publicar: this.productoInfo.publicar,
              //generos: this.productoInfo.generos.map(({id})=>id),
              cilindraje: this.productoInfo.cilindraje,
              tipoLLanta: this.productoInfo.tipoLLanta,
              cantidad: 0,
              subcategorias: this.productoInfo.subCategoriaId,
              categorias: 1,
              codigo: this.productoInfo.codigo,
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
    this.productoForm = this.fb.group({
      //identificador
      id: [null, null],
      nombre: [ null,Validators.compose([Validators.required, Validators.minLength(5)]),],
      descripcion: [null, Validators.compose([Validators.required, Validators.minLength(15)]),],
      precio: [null,Validators.compose([Validators.required,Validators.pattern('^[0-9]+[.,]{1,1}[0-9]{2,2}$'),]),],
      cilindraje: [null, Validators.required],
      tipoLLanta: [null, Validators.required],
      subcategorias: [null, Validators.required],
      cantidad: [null, null],
      categorias: [null, Validators.required],
      codigo: [null, null],

    });
  }

  cambios() {
    
    this.productoForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const categoriaIndex = this.productoForm.get('categorias').value;
      const subcategoriaIndex = this.productoForm.get('subcategorias').value;
      const categoria = this.categoriaList[categoriaIndex-1]?.descripcion; 
      const subcategoria = this.subcategoriaList[subcategoriaIndex-1]?.descripcion; 
      this.actualizarSKU(categoria, subcategoria); 
    });
  }
    
  actualizarSKU(categoria: string, subcategoria: string) {
    
    if (categoria && typeof categoria === 'string' && subcategoria && typeof subcategoria === 'string') {
      const codigoFinal = `${categoria.substring(0, 3)}_${subcategoria.substring(0, 3)}_0${this.productoForm.get('id').value}`;
      this.productoForm.get('codigo').setValue(codigoFinal);
    } else {
      console.error('Error: algun valor me llega null, pero no me importa por que así me funciona :D');
    }
  }
  
  listaSubcategoria() {
    this.subcategoriaList = null;
    this.gService
      .list('subcategoria')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //console.log("subcategoria",data);
        this.subcategoriaList = data;
      });
  }

  listaCategoria() {
    this.categoriaList = null;
    this.gService
      .list('categoria')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //console.log('categoria', data);
        this.categoriaList = data;
      });
  }

  public errorHandling = (controlName: string) => {
    let messageError = '';
    const control = this.productoForm.get(controlName);
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
    if (this.productoForm.invalid) {
      return;
    }
    const productoFormValueWithoutId = omit(this.productoForm.value, ['id']);
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let subcategoriasForm = this.productoForm
      .get('subcategorias') //puede ser subcategorias***************
      .value;
    //Asignar valor al formulario

    //setValue
    this.productoForm.patchValue({ subcategorias: subcategoriasForm });
    console.log("el valor del producto",this.productoForm.value);

    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
      this.gService
        .create('producto', this.productoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProducto = data;
          console.log("esto es lo que lleva",data)
          this.noti.mensajeRedirect(
            'Crear Producto',
            `Producto creado: ${data.nombre}`,
            TipoMessage.success,
            'producto-table'
          );
          this.router.navigate(['/producto-table']);
        });
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
      this.gService
        .update('producto', this.productoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProducto = data;

          this.noti.mensajeRedirect(
            'Actualizar Producto',
            `Producto actualizado: ${data.nombre}`,
            TipoMessage.success,
            'producto-table'
          );
          this.router.navigate(['/producto-table']);
        });
    }
  }

  onReset() {
    this.submitted = false;
    this.productoForm.reset();
  }
  onBack() {
    this.router.navigate(['/producto-table']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
