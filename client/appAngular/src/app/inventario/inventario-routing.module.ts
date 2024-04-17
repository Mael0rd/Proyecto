import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioIndexComponent } from './inventario-index/inventario-index.component';
//import { InventarioUserComponent } from './inventario-user/inventario-user.component';
import { InventarioDetailComponent } from './inventario-detail/inventario-detail.component';
import { InventarioFormComponent } from './inventario-form/inventario-form.component';
import { InventarioAjustesComponent } from './inventario-ajustes/inventario-ajustes.component';

const routes: Routes = [
  {
    path: 'inventario/create',
    component: InventarioFormComponent,
  },
  {
    path: 'inventario/ajustes',
    component: InventarioAjustesComponent,
  },
  {
    path: 'inventario/:usuarioregistraId',
    component: InventarioIndexComponent,
  },
  {
    path: 'inventario/usuario/:usuarioregistraId',
    component: InventarioDetailComponent,
  },

  {
    path: 'inventario/update/:id',
    component: InventarioFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioRoutingModule {}
