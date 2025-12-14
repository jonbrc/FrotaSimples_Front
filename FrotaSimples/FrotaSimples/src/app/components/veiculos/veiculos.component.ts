import { Component, ViewChild, OnInit } from '@angular/core';
import { PoNotificationService, PoTableColumn, PoDynamicFormField, PoModalComponent, PoDynamicFormComponent, PoDialogService } from '@po-ui/ng-components';
import { VeiculosService, Veiculo, NovoVeiculo, CadastrarVeiculoResponse } from '../../services/veiculos.service';

@Component({
  selector: 'app-veiculos',
  standalone: false,
  templateUrl: './veiculos.component.html',
  styleUrl: './veiculos.component.css'
})

export class VeiculosComponent implements OnInit {
  isEditing: boolean = false;

  // Usando a interface tipada
  veiculos: Veiculo[] = [];

  // ViewChilds
  @ViewChild('dynamicForm', { static: true }) dynamicForm!: PoDynamicFormComponent;
  @ViewChild('modalForm', { static: true }) modal!: PoModalComponent;

  // Setando os campos do dynamicForm: modelo, marca, ano, placa e tipo
  public readonly fields: Array<PoDynamicFormField> = [
    { property: 'modelo', label: 'Modelo', required: true, showRequired: true, gridColumns: 6 },
    { property: 'marca', label: 'Marca', required: true, showRequired: true, gridColumns: 6 },
    { property: 'ano', label: 'Ano', required: true, showRequired: true, gridColumns: 4, type: 'number' },
    { property: 'placa', label: 'Placa', required: true, showRequired: true, gridColumns: 4 },
    { property: 'tipo', label: 'Tipo', required: true, showRequired: true, gridColumns: 4 },
  ];

  // Definindo as colunas da tabela de acordo com o retorno da API
  columns: PoTableColumn[] = [
    {
      property: 'ativo',
      label: '',
      type: 'icon',
      width: '5%',
      icons: [
        {
          icon: 'an-fill an-circle',
          color: 'color-11',
          value: 'true',
          tooltip: 'Ativo'
        },
        {
          icon: 'an-fill an-circle',
          color: 'color-07',
          value: 'false',
          tooltip: 'Inativo'
        }
      ]
    },

    { property: 'id', label: 'ID', type: 'number' },
    { property: 'modelo', label: 'Modelo' },
    { property: 'marca', label: 'Marca' },
    { property: 'ano', label: 'Ano', type: 'number' },
    { property: 'placa', label: 'Placa' },
    {
      property: 'tipo',
      label: 'Tipo',
      type: 'icon',
      width: '8%',
      icons: [
        { icon: 'an an-car-profile', value: 'carro', tooltip: 'Carro' },
        { icon: 'an an-truck', value: 'caminhao', tooltip: 'Caminhão' }
      ]
    },
    { property: 'criado_em', label: 'Criado Em', type: 'date', format: 'dd/MM/yyyy HH:mm:ss', width: '17%' }
  ];

  // Ações da tabela: Não utilizadas pois não há endpoints de edição/exclusão
  public readonly tableActions: Array<any> = [];

  // Construtor que instancia os serviços necessários
  constructor(
    private veiculosService: VeiculosService,
    private poNotificationService: PoNotificationService,
    private poDialog: PoDialogService
  ) { }

  ngOnInit(): void {
    this.listarVeiculos();
  }

  /***** DEFINIÇÕES DO CRUD *****/

  cadastrarVeiculo(): void {
    if (this.dynamicForm.form.invalid) {
      this.poNotificationService.warning('Preencha os campos obrigatórios corretamente.');
      return;
    }

    const formValue = this.dynamicForm.form.value;

    const novoVeiculo: NovoVeiculo = {
      modelo: formValue.modelo,
      marca: formValue.marca,
      ano: Number(formValue.ano),
      placa: formValue.placa,
      tipo: formValue.tipo
    };

    this.veiculosService.cadastrarVeiculo(novoVeiculo).subscribe({
      next: (response: CadastrarVeiculoResponse) => {
        this.poNotificationService.success({
          message: response.mensagem,
        });

        this.modal.close();
        this.listarVeiculos();
      },
      error: (errorResponse) => {
        const errorMessage = errorResponse.error?.erro || 'Erro desconhecido ao cadastrar veículo.';
        this.poNotificationService.error({
          message: errorMessage,
        });
        console.error('Erro no cadastro:', errorResponse);
      }
    });
  }

  listarVeiculos(): void {
    this.veiculosService.listarVeiculos().subscribe({
      next: (response: Veiculo[]) => {
        this.veiculos = response.map(v => ({
          ...v,
          ativo: v.ativo ? 'true' : 'false'
        })) as any;
      },
      error: () => {
        this.poNotificationService.error('Erro ao carregar lista de veículos.');
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