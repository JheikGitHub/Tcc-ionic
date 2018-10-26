import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { LoginProvider } from '../login/login';

const URL_API = 'http://localhost:51990';

@Injectable()
export class UsuarioProvider {

  constructor(public http: HttpClient, private token: LoginProvider) {
  }

  buscaUsuarioLogado() {
    return this.http.get<Usuario>(URL_API + "/api/usuario/acess-user", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token.getToken()
      })
    });
  }

}
