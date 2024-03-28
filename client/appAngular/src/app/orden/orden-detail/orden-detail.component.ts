import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';

@Component({
  selector: 'app-orden-detail',
  templateUrl: './orden-detail.component.html',
  styleUrls: ['./orden-detail.component.css']
})
export class OrdenDetailComponent implements OnInit {
  datos: any;
  datosDialog: any;
  totalCantidadProductos: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<OrdenDetailComponent>,
    @Inject(GenericService) private gService: GenericService
  ) {
    this.datosDialog = data;
    console.log('Datos recibidos:', data);
  }

  ngOnInit(): void {
    if (this.datosDialog.id) {
      this.obtenerOrden(this.datosDialog.id);
    }    
  }
  calcularTotalCantidadProductos(): void {
    if (this.datos && this.datos.productos) {
      this.totalCantidadProductos = this.datos.productos.reduce((total, producto) => total + producto.cantidad, 0);
    } else {
      this.totalCantidadProductos = 0;
    }
  }
  obtenerOrden(id: any) {
    this.gService
      .get('orden', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Datos de la orden:', data);
        this.datos = data;
        this.calcularTotalCantidadProductos();
      });
  }

  print() {
    window.print();
  }

  close() {
    this.dialogRef.close();
  }
}
