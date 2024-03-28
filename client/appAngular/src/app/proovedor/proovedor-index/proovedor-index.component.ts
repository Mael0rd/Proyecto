import { Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-proovedor-index',
  templateUrl: './proovedor-index.component.html',
  styleUrl: './proovedor-index.component.css'
})
export class ProovedorIndexComponent {
  datos: any; //Respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['nombre', 'correo', 'telefono', 'direccion', 'acciones'];

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private gService: GenericService,
    private dialog: MatDialog,
  ) {}

  ngAfterViewInit(): void {
    this.listaProovedores();
  }
  //Listar todos los productos llamando al API
  listaProovedores() {
    //localhost:3000/producto
    this.gService
      .list('proovedor/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log(data);
        this.datos = data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  
  detalleProovedor(id: number) {
    this.router.navigate(['/proovedor', id]);
  }

  crearProovedor() {
    this.router.navigate(['/proovedor/create'], {
      relativeTo: this.route,
    });
  }
  
  actualizarProovedor(id: number) {
    this.router.navigate(['/proovedor/update', id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
