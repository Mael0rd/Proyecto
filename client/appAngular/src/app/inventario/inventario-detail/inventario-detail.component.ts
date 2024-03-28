import { Component, Inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-inventario-detail',
  templateUrl: './inventario-detail.component.html',
  styleUrl: './inventario-detail.component.css'
})
export class InventarioDetailComponent {
  datos:any
  datosDialog: any;
  destroy$:Subject<boolean>=new Subject<boolean>()

  constructor(@Inject(MAT_DIALOG_DATA) data,
  private dialogRef: MatDialogRef<InventarioDetailComponent>,
  @Inject(GenericService) private gService: GenericService
) {

  this.datosDialog = data;
  console.log('Datos recibidos:', data);
    }
    ngOnInit(): void {
      if (this.datosDialog.id) {
        this.obtenerInventario(this.datosDialog.id);
      }    
    }

  obtenerInventario(id: any) {
    this.gService
      .get('inventario/detalle',id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
        console.log('Datos del inventario:',this.datos);
      });
  }

  
  
  close() {
    this.dialogRef.close();
  }  
}
