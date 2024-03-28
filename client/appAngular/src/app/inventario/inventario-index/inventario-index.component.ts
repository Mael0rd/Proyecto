import { Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { GenericService } from '../../share/generic.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InventarioDetailComponent } from '../inventario-detail/inventario-detail.component';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-inventario-index',
  templateUrl: './inventario-index.component.html',
  styleUrl: './inventario-index.component.css'
})
export class InventarioIndexComponent {
  datos: any; // Respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();
  userId = 2; // Id del usuario

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['producto.nombre','bodega.nombre','cantStock','precio','acciones'];

  constructor(private gService: GenericService, private dialog:MatDialog) {
  }
  ngAfterViewInit(): void {
    this.listaInventario()
  }

  // Listar los pedidos del cliente llamando al API
  listaInventario() {
    const endpoint = 'inventario';
    this.gService.listPorUsuario(endpoint, this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data
        this.dataSource = new MatTableDataSource(this.datos)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  // Direccionar a la página de detalle
  detalleInventario(id: number) {
    const dialogConfig=new MatDialogConfig()
    dialogConfig.disableClose=false;
    dialogConfig.width='50%'
    dialogConfig.data={
      id:id
    }
    this.dialog.open(InventarioDetailComponent,dialogConfig);
    console.log('id de detalle inventario',id);// si funciona
  }
//revisar este metodo
  obtenerNombresProductos(productos: any[]): string {
    return productos.map((producto) => producto.producto.nombre).join(', ');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onImprimir() {
    const doc = new jsPDF();
    //const data = this.dataSource.filteredData.map(row => [row.nombre, row.nombre, row.cantStock, row.precio]);

    doc.text("Tabla de Productos", doc.internal.pageSize.getWidth() / 2, 10, { align: 'center' });

    (doc as any).autoTable({      
      html:"#miTabla"
    });

    doc.save('tabla_productos.pdf');
  }



}

