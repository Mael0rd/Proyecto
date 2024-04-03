import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioIndexComponent } from './inventario-index/inventario-index.component';
import { InventarioDetailComponent } from './inventario-detail/inventario-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { InventarioUserComponent } from './inventario-user/inventario-user.component';
import { InventarioFormComponent } from './inventario-form/inventario-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InventarioIndexComponent,
    InventarioDetailComponent,
    InventarioUserComponent,
    InventarioFormComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatChipsModule,
    ReactiveFormsModule,
    
  ]
})
export class InventarioModule { }
