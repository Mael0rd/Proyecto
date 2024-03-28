import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductoDiagComponent } from '../producto-diag/producto-diag.component';
import { ImpresionService } from '../../share/services/impresion.service';
import { jsPDF } from 'jspdf';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-producto-all',
  templateUrl: './producto-all.component.html',
  styleUrl: './producto-all.component.css',
})
export class ProductoAllComponent implements AfterViewInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<ProductoAllItem>;

  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['codigo', 'nombre', 'precio', 'cilindraje', 'acciones'];

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private gService: GenericService,
    private dialog: MatDialog,
    private srvImpresion: ImpresionService
  ) {}

  ngAfterViewInit(): void {
    this.listaProductos();
  }

  //Listar todos los productos llamando al API
  listaProductos() {
    //localhost:3000/producto
    this.gService
      .list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  detalleProducto(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      id: id,
    };
    this.dialog.open(ProductoDiagComponent, dialogConfig);
  }
  crearProducto() {
    this.router.navigate(['/producto/create'], {
      relativeTo: this.route,
    });
  }
  actualizarProducto(id: number) {
    this.router.navigate(['/producto/update', id], {
      relativeTo: this.route,
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onImprimir() {
    const doc = new jsPDF();
    const data = this.dataSource.filteredData.map(row => [row.codigo, row.nombre, row.precio, row.cilindraje]);

    (doc as any).autoTable({
      head: [['Codigo', 'Nombre', 'Precio', 'Cilindraje']],
      body: data
    });

    doc.save('tabla_productos.pdf');

  }

}
