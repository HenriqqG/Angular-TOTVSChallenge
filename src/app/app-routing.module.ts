import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './layout/registro/registro.component';
import { HomeComponent } from './layout/home/home.component';

const routes: Routes = [
  {
    path:'', 
    component: HomeComponent,
  },
  {
      path:'novo-registro',
      component: RegistroComponent
  },
  {
      path:'atualizar-registro/:id',
      component: RegistroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
