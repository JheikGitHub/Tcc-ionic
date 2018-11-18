import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Evento } from '../../models/evento';
import { LoginProvider } from '../login/login';


const URL_API = 'http://192.168.0.104:3000';

@Injectable()
export class AdminProvider {

  constructor(public http: HttpClient, private token: LoginProvider) {

  }
  buscaTodosEventos() {
    return this.http.get<Evento[]>(URL_API + '/api/evento/busca-todos',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + this.token.getToken()
        })
      }
    );
  }
}
