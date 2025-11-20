import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  // 1. Rota de Login (Área Não-Autenticada)
  { 
    path: '',component: LoginComponent,
  },
  // 2. Rota Principal/Layout (Área AUTENTICADA)
  {
    path: 'home', component: LayoutComponent,
    children: [
      { path: 'usuarios', component:UsuariosComponent, pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
