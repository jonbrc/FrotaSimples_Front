import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  funcionario_id: number | null;
}

interface LoginPayload {
  email: string;
  senha: string;
}

interface LoginResponse {
  mensagem: string;
  usuario: Usuario;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly API_URL = 'http://localhost:5000/login'; 
  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<LoginResponse> {
    const payload: LoginPayload = { email, senha };
    return this.http.post<LoginResponse>(this.API_URL, payload);
  }
}