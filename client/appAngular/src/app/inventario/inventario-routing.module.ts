import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioIndexComponent } from './inventario-index/inventario-index.component';
import { InventarioUserComponent } from './inventario-user/inventario-user.component';
import { InventarioDetailComponent } from './inventario-detail/inventario-detail.component';

const routes: Routes = [
  { path: 'inventario/:usuarioregistraId', component: InventarioIndexComponent },
  { path: 'inventario/usuario/:usuarioregistraId', component: InventarioDetailComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
