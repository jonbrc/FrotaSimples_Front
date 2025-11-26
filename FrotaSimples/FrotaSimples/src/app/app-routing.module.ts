import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { EmprestimosComponent } from './components/emprestimos/emprestimos.component';
import { VeiculosComponent } from './components/veiculos/veiculos.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  { 
    path: '',component: LoginComponent,
  },
  {
    path: 'app', component: LayoutComponent,
    children: [
      { path: 'homepage', component:HomepageComponent, pathMatch: 'full' },
      { path: 'usuarios', component:UsuariosComponent, pathMatch: 'full' },
      { path: 'funcionarios', component:FuncionariosComponent, pathMatch: 'full' },
      { path: 'emprestimos', component:EmprestimosComponent, pathMatch: 'full' },
      { path: 'veiculos', component:VeiculosComponent, pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
