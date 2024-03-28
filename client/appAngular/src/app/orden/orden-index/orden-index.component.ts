import { AfterViewInit, Component, ViewChild  } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { GenericService } from '../../share/generic.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrdenDetailComponent } from '../orden-detail/orden-detail.component';

@Component({
  selector: 'app-orden-index',
  templateUrl: './orden-index.component.html',
  styleUrl: './orden-index.component.css',
})
export class OrdenIndexComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['id','fechaCreacion','proovedorId', 'usuario','acciones'];

  constructor(private gService:GenericService,
    private dialog:MatDialog){

  }

  ngAfterViewInit(): void {
    this.listaOrdenes()
  }

  // Listar las ordenes del llamando al API
  listaOrdenes() {
    //localhost:3000/orden
    this.gService.list('orden/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>{
        console.log(data)
        this.datos=data
        this.dataSource = new MatTableDataSource(this.datos)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  detalleOrden(id: number) {
    const dialogConfig=new MatDialogConfig()
    dialogConfig.disableClose=false;
    dialogConfig.width='50%'
    dialogConfig.data={
      id:id
    }
    this.dialog.open(OrdenDetailComponent,dialogConfig)
  }

  obtenerNombresProductos(productos: any[]): string {
    return productos.map((producto) => producto.producto.nombre).join(', ');
  } 

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
