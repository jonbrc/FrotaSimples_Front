import { Component } from '@angular/core';
import { PoPageLogin } from '@po-ui/ng-templates';
import { PoDialogService, PoNotificationService, PoToasterOrientation } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(
    private poDialog: PoDialogService,
    private PoNotificationService: PoNotificationService,
    private ValidarUsuarioService: AuthService,
    private router: Router  // Injeta o Router
  ) { }

  onLoginSubmit(formData: PoPageLogin) {
    console.log('teste')
    this.ValidarUsuarioService.login(formData.login, formData.password)
      .subscribe({
        next: (response: any) => {
          if (response?.usuario) {

            this.PoNotificationService.success({
              message: 'Login realizado com sucesso!',
              orientation: PoToasterOrientation.Top
            });

            this.router.navigate(['app/homepage']);
          }
        },
        error: (err) => {
          if (err.status === 401) {
            this.PoNotificationService.error({
              message: 'Usuário ou senha inválidos',
              orientation: PoToasterOrientation.Top
            });
          } else {
            this.poDialog.alert({
              title: 'Erro ao realizar login',
              message: 'Ocorreu um erro ao conectar com o servidor'
            });
          }
        }
      });
  }
}