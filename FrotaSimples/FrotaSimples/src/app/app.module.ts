import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { VeiculosComponent } from './components/veiculos/veiculos.component';
import { EmprestimosComponent } from './components/emprestimos/emprestimos.component';
import { HomepageComponent } from './components/homepage/homepage.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    UsuariosComponent,
    FuncionariosComponent,
    VeiculosComponent,
    EmprestimosComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    PoTemplatesModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
