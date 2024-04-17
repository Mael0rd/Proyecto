import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';
import { CartService } from '../../share/cart.service';
import {
  NotificacionService,
  TipoMessage,
} from '../../share/notification.service';
import { AjustesService } from '../../share/ajustes.service';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrl: './producto-index.component.css',
})
export class ProductoIndexComponent {
  datos: any; //Respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private router: Router,
    private cartService: CartService,
    private ajustesService: AjustesService,
    private notificacion: NotificacionService
    
  ) 
  
  {
    this.listaProductos();
  }
  //Listar todos los producto llamando al API
  listaProductos() {
    //localhost:3000/producto
    this.gService
      .list('producto')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log(data);
        this.datos = data;
      });
  }

  detalleProducto(id: number) {
    this.router.navigate(['/producto', id]);
  }

  comprar(id: number) {
    this.gService
      .get('producto', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Agregar producto obtenido del API al carrito
        this.cartService.addToCart(data);
        console.log(data);
        //Notificar al usuario
        this.notificacion.mensaje(
          'Orden',
          'Producto: ' + data.nombre + ' agregado a la orden',
          TipoMessage.success
        );
      });
  }

  editar(id: number) {
    this.gService
      .get('producto', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        //Agregar producto obtenido del API al carrito
        this.ajustesService.addToCart(data);
        console.log(data);
        //Notificar al usuario
        this.notificacion.mensajeRedirect(
          'Modificar Producto',
          'Producto: ' + data.nombre + ' agregado al ajuste del inventario',
          TipoMessage.success, '/inventario/ajustes'
        );
        
       // this.router.navigate(['/inventario/ajustes']);


      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
