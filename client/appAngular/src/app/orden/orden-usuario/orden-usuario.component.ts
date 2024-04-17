import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../share/cart.service';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../share/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorMessage } from '../../form-error-message';


@Component({
  selector: 'app-orden-usuario',
  templateUrl: './orden-usuario.component.html',
  styleUrl: './orden-usuario.component.css'
})
export class OrdenUsuarioComponent implements OnInit  {
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Nombre del formulario
  ordenForm: FormGroup;
  //Listas
  bodegaList: any;
  proovedorList: any;
  usuarioList: any;
  //Variables
  total = 0;
  fecha = Date.now();
  qtyItems = 0;

  //Tabla
  displayedColumns: string[] = [
    'producto',
    'precio',
    'cantidad',
    'subtotal',
    'acciones',
  ];

  dataSource = new MatTableDataSource<any>();
  
  constructor(
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private router: Router,
    private fb: FormBuilder,
    
  ) {
    this.listausuario();
    this.formularioReactive();
    this.listabodega();
    this.listaproovedor();
    
  }

  ngOnInit(): void {
    
    this.cartService.currentDataCart$.subscribe((data) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.total = this.cartService.getTotal();

  }

  formularioReactive() {
    this.ordenForm = this.fb.group({
      bodegas: [null, Validators.required],
      proovedores: [null, Validators.required],
      //usuarios: [null, Validators.required],
    });
  }

  public errorHandling = (controlName: string) => {
    let messageError = '';
    const control = this.ordenForm.get(controlName);
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

  listabodega(){
    this.bodegaList=null;
    this.gService
      .list('bodega')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //console.log("bodega",data);
        this.bodegaList = data;
      });
  }

  listausuario(){
    this.usuarioList=null;
    this.gService
      .list('usuario')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log("usuario",data);
        this.usuarioList = data;
      });
  }

  listaproovedor(){
    this.proovedorList=null;
    this.gService
      .list('proovedor')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
       // console.log("proovedor",data);
        this.proovedorList = data;
      });
  }

  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total = this.cartService.getTotal();
    console.log(item);
    /*  this.noti.mensaje('Orden',
    'Cantidad actualizada: '+item.cantidad,
    TipoMessage.info) */
  }

  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total = this.cartService.getTotal();
    this.noti.mensaje('Orden', 'Producto eliminado', TipoMessage.warning);
  }
  registrarOrden() {
    if (this.ordenForm.invalid) {
      return;
    }
    if (this.cartService.getItems != null) {
      //Obtener los items del carrito de compras
      let itemsCarrito = this.cartService.getItems; 
      //Armar la estructura de la tabla intermedia
      //[{'videojuegoId':valor, 'cantidad':valor}]
      let detalles = itemsCarrito.map((x) => ({
        ['productoId']: x.idItem,
        ['cantidad']: x.cantidad,
      }))
      let bodegasForm = this.ordenForm.get('bodegas').value;
      let proovedoresForm = this.ordenForm.get('proovedores').value;
      //let usuariosForm = this.ordenForm.get('usuarios').value;
      //console.log("antes de mandar a api proovedores",proovedoresForm);
      //Datos para el API
      let infoOrden = {
        fechaOrden: new Date(this.fecha),
        productos: detalles,
        cantidad: 1,
        bodegaId: bodegasForm,
        proovedorId: proovedoresForm,
      };
      console.log(infoOrden);
      this.gService.create('orden', infoOrden).subscribe((respuesta: any) => {
        this.noti.mensaje(
          'Orden',
          'Orden registrada #' + respuesta.id,
          TipoMessage.success
        );
        this.cartService.deleteCart();
        this.total = this.cartService.getTotal();
        console.log(respuesta);
      });
    } else {
      this.noti.mensaje(
        'Orden',
        'Agregue productos a la orden',
        TipoMessage.warning
      );
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}