import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NovoEmprestimo {
  veiculo_id: number;
  funcionario_id: number;
  data_saida: string;
  km_saida: number;
  observacao?: string | null;
}

export interface Emprestimo {
  id: number;
  veiculo_id: number;
  veiculo_placa: string;
  funcionario_id: number;
  funcionario_nome: string;
  data_saida: string;
  km_saida: number;
  data_retorno: string | null;
  km_retorno: number | null;
  observacao: string | null;
  criado_em: string;
}

export interface RegistrarEmprestimoResponse {
  mensagem: string;
  id: number;
  veiculo_id: number;
  funcionario_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmprestimosService {
  private apiUrl = 'http://localhost:5000/emprestimos';
  private http = inject(HttpClient);

  constructor() { }

  registrarEmprestimo(emprestimo: NovoEmprestimo): Observable<RegistrarEmprestimoResponse> {
    return this.http.post<RegistrarEmprestimoResponse>(this.apiUrl, emprestimo);
  }

  listarEmprestimos(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(this.apiUrl);
  }
}