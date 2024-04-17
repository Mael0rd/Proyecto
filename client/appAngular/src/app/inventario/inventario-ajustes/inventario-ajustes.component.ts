import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorMessage } from '../../form-error-message';
import { GenericService } from '../../share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { NotificacionService, TipoMessage } from '../../share/notification.service';
import { AjustesService } from '../../share/ajustes.service';

interface Tipo {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-inventario-ajustes',
  templateUrl: './inventario-ajustes.component.html',
  styleUrl: './inventario-ajustes.component.css'
})


export class InventarioAjustesComponent {
  selectedValue: string;
  Tipos: Tipo[] = [
    {value: '0', viewValue: 'Entrada'},
    {value: '1', viewValue: 'Salida'},
    
  ];
  destroy$: Subject<boolean> = new Subject<boolean>();
//Nombre del formulario
  ajustesForm: FormGroup;
  //Variables
  fecha = Date.now();
  qtyItems = 0;
  total = 0;
  //Listas
  bodegaList: any;
  productoList: any;
  //Tabla
  displayedColumns: string[] = [
    'producto',
    'precio',
    'cantidad',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private gService: GenericService,
    private noti: NotificacionService,
    private ajustesService: AjustesService,
    private fb: FormBuilder,
    
  ) 

  {
    this.formularioReactive();
    this.listabodega();
    //this.listaproducto()

  }

  ngOnInit(): void {
    this.ajustesService.currentDataCart$.subscribe((data) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.total = this.ajustesService.getTotal();
  }

  formularioReactive() {
    this.ajustesForm = this.fb.group({
      bodegas: [null, Validators.required],
      //proovedores: [null, Validators.required],
      //usuarios: [null, Validators.required],
    });
  }

  public errorHandling = (controlName: string) => {
    let messageError = '';
    const control = this.ajustesForm.get(controlName);
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
  }

  calcularCantidadTotal(bodegas: any[]): number {
    const idBodegaSeleccionada = this.ajustesForm.get('bodegas').value;
    let cantidadTotal = 0;
  
    // Iterar sobre las bodegas y sumar las cantidades de la bodega seleccionada
    for (const bodega of bodegas) {
        if (bodega.bodegaId === idBodegaSeleccionada) {
            cantidadTotal += bodega.cantStock;
        }
    }
    return cantidadTotal;
}

validarNumeros(event: KeyboardEvent) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);

  if (!pattern.test(inputChar)) {
      // Si el caracter ingresado no es un número, se previene la acción por defecto
      event.preventDefault();
  }
}



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
  
  listaproducto(){
    this.productoList=null;
    this.gService
      .list('producto')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log("producto",data);
        this.productoList = data;
      });
  }
  agregarProducto(){
    
  }

  actualizarCantidad(item: any) {
    this.ajustesService.addToCart(item);
    this.total = this.ajustesService.getTotal();
    //console.log(item);
    
  }

  eliminarItem(item: any) {
    this.ajustesService.removeFromCart(item);
    this.total = this.ajustesService.getTotal();
    this.noti.mensaje('Ajuste', 'Producto eliminado', TipoMessage.warning);
  }

  registrarAjuste() {

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
