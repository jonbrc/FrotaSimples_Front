import { Component, ViewChild, OnInit } from '@angular/core';
import { PoNotificationService, PoTableColumn, PoDynamicFormField, PoModalComponent, PoDynamicFormComponent, PoDialogService } from '@po-ui/ng-components';
import { EmprestimosService, Emprestimo, NovoEmprestimo, RegistrarEmprestimoResponse } from '../../services/emprestimos.service';

@Component({
  selector: 'app-emprestimos',
  standalone: false,
  templateUrl: './emprestimos.component.html',
  styleUrl: './emprestimos.component.css'
})

export class EmprestimosComponent implements OnInit {
  isEditing: boolean = false;

  // Usando a interface tipada
  emprestimos: Emprestimo[] = [];

  // ViewChilds
  @ViewChild('dynamicForm', { static: true }) dynamicForm!: PoDynamicFormComponent;
  @ViewChild('modalForm', { static: true }) modal!: PoModalComponent;

  // Setando os campos do dynamicForm: veiculo_id, funcionario_id, data_saida, km_saida e observacao (opcional)
  public readonly fields: Array<PoDynamicFormField> = [
    { property: 'veiculo_id', label: 'ID do Veículo', required: true, showRequired: true, gridColumns: 6, type: 'number' },
    { property: 'funcionario_id', label: 'ID do Funcionário', required: true, showRequired: true, gridColumns: 6, type: 'number' },
    { property: 'data_saida', label: 'Data de Saída', required: true, showRequired: true, gridColumns: 6, type: 'date' },
    { property: 'km_saida', label: 'KM de Saída', required: true, showRequired: true, gridColumns: 6, type: 'number' },
    { property: 'observacao', label: 'Observação (Opcional)', required: false, gridColumns: 12 },
  ];

  // Definindo as colunas da tabela de acordo com o retorno da API
  columns: PoTableColumn[] = [
    {
      property: 'ativoTabela',
      label: '',
      type: 'icon',
      width: '4%',
      icons: [
        {
          icon: 'an-fill an-circle',
          color: 'color-08',
          value: 'true',
          tooltip: 'Empréstimo em andamento'
        },
        {
          icon: 'an-fill an-circle',
          color: 'color-11',
          value: 'false',
          tooltip: 'Empréstimo finalizado'
        }
      ]
    },

    { property: 'id', label: 'ID', type: 'number', width: '5%' },
    { property: 'veiculo_placa', label: 'Placa do Veículo', width: '12%' },
    { property: 'funcionario_nome', label: 'Funcionário', width: '18%' },
    { property: 'data_saida', label: 'Data Saída', type: 'date', format: 'dd/MM/yyyy', width: '10%' },
    { property: 'km_saida', label: 'KM Saída', type: 'number', width: '10%' },
    { property: 'data_retorno', label: 'Data Retorno', type: 'date', format: 'dd/MM/yyyy', width: '10%' },
    { property: 'km_retorno', label: 'KM Retorno', type: 'number', width: '10%' },
    { property: 'observacao', label: 'Observação', width: '15%' },
    { property: 'criado_em', label: 'Criado Em', type: 'date', format: 'dd/MM/yyyy HH:mm:ss', width: '15%' }
  ];

  // Ações da tabela: Não utilizadas pois não há endpoints de edição/exclusão
  public readonly tableActions: Array<any> = [];

  // Construtor que instancia os serviços necessários
  constructor(
    private emprestimosService: EmprestimosService,
    private poNotificationService: PoNotificationService,
    private poDialog: PoDialogService
  ) { }

  ngOnInit(): void {
    this.listarEmprestimos();
  }

  /***** DEFINIÇÕES DO CRUD *****/

  registrarEmprestimo(): void {
    if (this.dynamicForm.form.invalid) {
      this.poNotificationService.warning('Preencha os campos obrigatórios corretamente.');
      return;
    }

    const formValue = this.dynamicForm.form.value;

    const novoEmprestimo: NovoEmprestimo = {
      veiculo_id: Number(formValue.veiculo_id),
      funcionario_id: Number(formValue.funcionario_id),
      data_saida: formValue.data_saida,
      km_saida: Number(formValue.km_saida),
      observacao: formValue.observacao || null
    };

    this.emprestimosService.registrarEmprestimo(novoEmprestimo).subscribe({
      next: (response: RegistrarEmprestimoResponse) => {
        this.poNotificationService.success({
          message: response.mensagem,
        });

        this.modal.close();
        this.listarEmprestimos();
      },
      error: (errorResponse) => {
        const errorMessage = errorResponse.error?.erro || 'Erro desconhecido ao registrar empréstimo.';
        this.poNotificationService.error({
          message: errorMessage,
        });
        console.error('Erro no registro:', errorResponse);
      }
    });
  }

  listarEmprestimos(): void {
    this.emprestimosService.listarEmprestimos().subscribe({
      next: (response: Emprestimo[]) => {
        this.emprestimos = response.map(e => ({
          ...e,
          ativoTabela: e.data_retorno ? 'false' : 'true'
        })) as any;
      },
      error: () => {
        this.poNotificationService.error('Erro ao carregar lista de empréstimos.');
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