import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NovoFuncionario {
  nome: string;
  matricula: string;
  cargo: string;
}

export interface Funcionario {
  id: number;
  nome: string;
  matricula: string;
  cargo: string;
  criado_em: string;
}

export interface CriarFuncionarioResponse {
  mensagem: string;
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {
  private apiUrl = 'http://localhost:5000/funcionarios';
  private http = inject(HttpClient);

  constructor() { }

  criarFuncionario(funcionario: NovoFuncionario): Observable<CriarFuncionarioResponse> {
    return this.http.post<CriarFuncionarioResponse>(this.apiUrl, funcionario);
  }

  listarFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }
}