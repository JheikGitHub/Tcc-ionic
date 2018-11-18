import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginProvider } from '../login/login';
import { Evento } from '../../models/evento';

const URL_API = 'http://192.168.0.104:3000';

@Injectable()
export class FuncionarioProvider {

  constructor(public http: HttpClient, private token: LoginProvider) {
  }

  buscaEventosFuncionario(idFuncionario: number) {
    return this.http.get<Evento[]>(URL_API + '/api/evento/busca-eventos-moderador/' + idFuncionario,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + this.token.getToken()
        })
      }
    );
  }
}
