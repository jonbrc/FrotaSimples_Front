import { Component, OnInit } from '@angular/core';
import { PoSlideItem, PoChartSerie } from '@po-ui/ng-components';
import { VeiculosService, Veiculo } from '../../services/veiculos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  standalone: false,
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {

  slides: Array<PoSlideItem> = [
    { image: '../../../assets/imagens/BannerFrotaSimples2.png' }
  ];

  seriesVeiculos: PoChartSerie[] = [];

  constructor(private veiculosService: VeiculosService, private router:Router) { }

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos(): void {
    this.veiculosService.listarVeiculos().subscribe({
      next: (veiculos: Veiculo[]) => {
        const ativos = veiculos.filter(v => v.ativo).length;
        const inativos = veiculos.filter(v => !v.ativo).length;

        this.seriesVeiculos = [
          { label: 'Veículos disponíveis', data: ativos },
          { label: 'Veículos indisponíveis', data: inativos }
        ];
      },
      error: (err) => {
        console.error('Erro ao carregar veículos', err);
      }
    });
  }

  irParaUsuarios(): void {
    this.router.navigate(["app/usuarios"]);
  }

  irParaFuncionarios(): void {
    this.router.navigate(["app/funcionarios"]);
  }

  irParaVeiculos(): void {
    this.router.navigate(["app/veiculos"]);
  }

  irParaEmprestimos(): void {
    this.router.navigate(["app/emprestimos"]);
  } 
}
