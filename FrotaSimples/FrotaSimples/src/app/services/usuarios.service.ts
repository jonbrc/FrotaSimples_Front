import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  funcionario_id: number | null;
  criado_em: string; // Data de criação
}

export interface NovoUsuario {
  nome: string;
  email: string;
  senha: string;
  funcionario_id?: number | null;
}

export interface CriarUsuarioResponse {
  mensagem: string;
  id: number;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:5000/usuarios'; 

  private http = inject(HttpClient);

  constructor() { }

  criarUsuario(usuario: NovoUsuario): Observable<CriarUsuarioResponse> {
    console.log('Tentando cadastrar novo usuário:', usuario.email);
    return this.http.post<CriarUsuarioResponse>(this.apiUrl, usuario);
  }

  listarUsuarios(): Observable<Usuario[]> {
    console.log('Buscando lista de usuários...');
    return this.http.get<Usuario[]>(this.apiUrl);
  }
}