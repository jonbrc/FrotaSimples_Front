import { Component, ViewChild, OnInit } from '@angular/core';
import { PoNotificationService, PoTableColumn, PoDynamicFormField, PoModalComponent, PoDynamicFormComponent, PoDialogService } from '@po-ui/ng-components';
import { FuncionariosService, Funcionario, NovoFuncionario, CriarFuncionarioResponse } from '../../services/funcionarios.service';

@Component({
  selector: 'app-funcionarios',
  standalone: false,
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.css'
})

export class FuncionariosComponent implements OnInit {
  isEditing: boolean = false;
  
  // Usando a interface tipada
  funcionarios: Funcionario[] = [];

  // ViewChilds
  @ViewChild('dynamicForm', { static: true }) dynamicForm!: PoDynamicFormComponent;
  @ViewChild('modalForm', { static: true }) modal!: PoModalComponent; 

  // Setando os campos do dynamicForm: nome, matricula e cargo
  public readonly fields: Array<PoDynamicFormField> = [
    { property: 'nome', label: 'Nome', required: true, showRequired: true, gridColumns: 12 },
    { property: 'matricula', label: 'Matrícula', required: true, showRequired: true, gridColumns: 6 },
    { property: 'cargo', label: 'Cargo', required: true, showRequired: true, gridColumns: 6 },
  ];

  // Definindo as colunas da tabela de acordo com o retorno da API
  columns: Array<PoTableColumn> = [
    { property: 'id', label: 'ID', type: 'number'},
    { property: 'nome', label: 'Nome'},
    { property: 'matricula', label: 'Matrícula'},
    { property: 'cargo', label: 'Cargo'},
    { property: 'criado_em', label: 'Criado Em', type: 'date', format: 'dd/MM/yyyy HH:mm:ss'}
  ];

  // Ações da tabela: Não utilizadas pois não há endpoints de edição/exclusão
  public readonly tableActions: Array<any> = [];

  // Construtor que instancia os serviços necessários
  constructor(
    private funcionariosService: FuncionariosService,
    private poNotificationService: PoNotificationService,
    private poDialog: PoDialogService
  ) { }

  ngOnInit(): void {
    this.listarFuncionarios();
  }

  /***** DEFINIÇÕES DO CRUD *****/

  cadastrarFuncionario(): void {
    if (this.dynamicForm.form.invalid) {
      this.poNotificationService.warning('Preencha os campos obrigatórios corretamente.');
      return;
    }

    const formValue = this.dynamicForm.form.value;

    const novoFuncionario: NovoFuncionario = {
      nome: formValue.nome,
      matricula: formValue.matricula,
      cargo: formValue.cargo
    };

    this.funcionariosService.criarFuncionario(novoFuncionario).subscribe({
      next: (response: CriarFuncionarioResponse) => {
        this.poNotificationService.success({
          message: response.mensagem,
        });

        this.modal.close();
        this.listarFuncionarios();
      },
      error: (errorResponse) => {
        const errorMessage = errorResponse.error?.erro || 'Erro desconhecido ao cadastrar funcionário.';
        this.poNotificationService.error({
          message: errorMessage,
        });
        console.error('Erro no cadastro:', errorResponse);
      }
    });
  }

  listarFuncionarios(): void {
    this.funcionariosService.listarFuncionarios().subscribe({
      next: (response: Funcionario[]) => {
        // A resposta já vem no formato correto
        this.funcionarios = response;
      },
      error: (error) => {
        this.poNotificationService.error('Erro ao carregar lista de funcionários.');
        console.error('Erro ao carregar funcionários:', error);
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