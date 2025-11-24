import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { EmprestimosComponent } from './components/emprestimos/emprestimos.component';
import { VeiculosComponent } from './components/veiculos/veiculos.component';

const routes: Routes = [
  // 1. Rota de Login (Área Não-Autenticada)
  { 
    path: '',component: LoginComponent,
  },
  // 2. Rota Principal/Layout (Área AUTENTICADA)
  {
    path: 'home', component: LayoutComponent,
    children: [
      { path: 'usuarios', component:UsuariosComponent, pathMatch: 'full' },
      { path: 'funcionarios', component:FuncionariosComponent, pathMatch: 'full' },
      { path: 'emprestimos', component:EmprestimosComponent, pathMatch: 'full' },
      { path: 'veiculos', component:VeiculosComponent, pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
