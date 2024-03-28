import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';

@Component({
  selector: 'app-inventario-user',
  templateUrl: './inventario-user.component.html',
  styleUrl: './inventario-user.component.css'
})
export class InventarioUserComponent {
  datos: any; // Respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();
  userId = 2; // Id del usuario

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['id','acciones'];

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
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
}
