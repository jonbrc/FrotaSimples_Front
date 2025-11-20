import { Component, ViewChild, OnInit } from '@angular/core';
import { PoNotificationService, PoTableColumn, PoDynamicFormField, PoModalComponent, PoDynamicFormComponent, PoDialogService } from '@po-ui/ng-components';
import { UsuariosService, Usuario, NovoUsuario, CriarUsuarioResponse } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})

export class UsuariosComponent implements OnInit {
  isEditing: boolean = false;
  
  // Usando a interface tipada
  usuarios: Usuario[] = [];

  // ViewChilds
  @ViewChild('dynamicForm', { static: true }) dynamicForm!: PoDynamicFormComponent;
  @ViewChild('modalForm', { static: true }) modal!: PoModalComponent; 

  // Setando os campos do dynamicForm: nome, email, senha e funcionario_id (opcional)
  public readonly fields: Array<PoDynamicFormField> = [
    { property: 'nome', label: 'Nome', required: true, showRequired: true, gridColumns: 6 },
    { property: 'email', label: 'Email', required: true, showRequired: true, gridColumns: 6 },
    { property: 'senha', label: 'Senha', required: true, showRequired: true, gridColumns: 6, type: 'password' },
    { property: 'funcionario_id', label: 'ID do Funcionário (Opcional)', required: false, gridColumns: 6, type: 'number' },
  ];

  // Definindo as colunas da tabela de acordo com o retorno da API
  columns: Array<PoTableColumn> = [
    { property: 'id', label: 'ID', type: 'number'},
    { property: 'nome', label: 'Nome', width: '40%' },
    { property: 'email', label: 'Email', width: '35%' },
    { property: 'funcionario_id', label: 'ID Funcionário', type: 'number', width: '15%' },
    { property: 'criado_em', label: 'Criado Em', type: 'date', format: 'dd/MM/yyyy HH:mm:ss', width: '20%' }
  ];

  // Ações da tabela: Não utilizadas pois não há endpoints de edição/exclusão
  public readonly tableActions: Array<any> = [];

  // Construtor que instancia os serviços necessários (seguindo seu modelo)
  constructor(
    private usuariosService: UsuariosService,
    private poNotificationService: PoNotificationService,
    private poDialog: PoDialogService
  ) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  /***** DEFINIÇÕES DO CRUD *****/

  cadastrarUsuario(): void {
    if (this.dynamicForm.form.invalid) {
      this.poNotificationService.warning('Preencha os campos obrigatórios corretamente.');
      return;
    }

    const formValue = this.dynamicForm.form.value;

    const novoUsuario: NovoUsuario = {
      nome: formValue.nome,
      email: formValue.email,
      senha: formValue.senha,
      funcionario_id: formValue.funcionario_id ? Number(formValue.funcionario_id) : null
    };

    this.usuariosService.criarUsuario(novoUsuario).subscribe({
      next: (response: CriarUsuarioResponse) => {
        this.poNotificationService.success({
          message: response.mensagem,
        });

        this.modal.close();
        this.listarUsuarios();
      },
      error: (errorResponse) => {
        const errorMessage = errorResponse.error?.erro || 'Erro desconhecido ao cadastrar usuário.';
        this.poNotificationService.error({
          message: errorMessage,
        });
        console.error('Erro no cadastro:', errorResponse);
      }
    });
  }

  listarUsuarios(): void {
    this.usuariosService.listarUsuarios().subscribe({
      next: (response: Usuario[]) => {
        // A resposta já vem no formato correto, sem a necessidade de adicionar a propriedade 'acoes'
        this.usuarios = response;
      },
      error: (error) => {
        this.poNotificationService.error('Erro ao carregar lista de usuários.');
        console.error('Erro ao carregar usuários:', error);
      }
    });
  }

  // FUNÇÕES UTEIS
  resetAll(): void {
    // Resetar o formulário e garantir o modo de cadastro
    this.dynamicForm.form.reset();
    this.isEditing = false;
  }
  
  // Função para abrir o modal de criação
  abrirModalCriacao(): void {
    this.resetAll();
    this.modal.open();
  }
}