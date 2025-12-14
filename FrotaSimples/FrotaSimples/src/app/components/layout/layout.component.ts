import { Component, ViewChild } from '@angular/core';
import { PoMenuItem, PoMenuModule, PoToolbarAction, PoNotificationService, PoModalComponent } from '@po-ui/ng-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
 
  constructor(private router: Router, private poNotification: PoNotificationService) { }

  ngOnInit(): void {
   console.log('ok')
  }

  readonly menus: Array<PoMenuItem> = this.getFilteredMenus();

  private getFilteredMenus(): Array<PoMenuItem> {
    const allMenus: Array<PoMenuItem> = [
      { label: 'Home', link: 'homepage', icon: 'an an-house-line', shortLabel: 'Home' },
      { label: 'Empréstimos', link: 'emprestimos', icon: 'an an-calendar-blank', shortLabel: 'Empréstimos' },
      { label: 'Veículos', link: 'veiculos', icon: 'an an-car', shortLabel: 'Veículos' },
      { label: 'Usuários', link: 'usuarios', icon: 'an an-user-list', shortLabel: 'Usuários' },
      { label: 'Funcionários', link: 'funcionarios', icon: 'an an-users-three', shortLabel: 'Funcionários' },
      { label: 'Sair', link: '', icon: 'an an-arrow-left', shortLabel: 'Sair', action: this.logout.bind(this) }
    ];
    return allMenus;
  }

  logout() {
    this.router.navigate(['/']); // Navega para a rota raiz (login)
    sessionStorage.clear();
  }
}
