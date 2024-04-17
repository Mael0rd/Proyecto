import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenIndexComponent } from './orden-index/orden-index.component';
import { OrdenUsuarioComponent } from './orden-usuario/orden-usuario.component';
import { OrdenDetailComponent } from './orden-detail/orden-detail.component';

const routes: Routes = [
  { path: 'orden', component: OrdenIndexComponent },
  { path: 'orden/:id', component: OrdenDetailComponent },
  { path: 'carrito', component: OrdenUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenRoutingModule {}
