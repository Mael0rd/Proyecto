import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProovedorIndexComponent } from './proovedor-index/proovedor-index.component';
import { ProovedorFormComponent } from './proovedor-form/proovedor-form.component';

const routes: Routes = [
  {
    path: 'proovedor',
    component: ProovedorIndexComponent,
  },
  { 
    path: 'proovedor/create',
    component: ProovedorFormComponent 
  },
  {
    path:'proovedor/update/:id',
    component: ProovedorFormComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProovedorRoutingModule {}
