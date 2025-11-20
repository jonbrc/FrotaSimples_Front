import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface NovoVeiculo {
  modelo: string;
  marca: string;
  ano: number;
  placa: string;
  tipo: string;
}

export interface Veiculo {
  id: number;
  modelo: string;
  marca: string;
  ano: number;
  placa: string;
  tipo: string;
  ativo: boolean;
  criado_em: string;
}

export interface CadastrarVeiculoResponse {
  mensagem: string;
  id: number;
  placa: string;
  tipo: string;
}

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {
  private apiUrl = 'http://localhost:5000/veiculos';
  private http = inject(HttpClient);

  constructor() { }

  cadastrarVeiculo(veiculo: NovoVeiculo): Observable<CadastrarVeiculoResponse> {
    return this.http.post<CadastrarVeiculoResponse>(this.apiUrl, veiculo);
  }

  listarVeiculos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl);
  }
}