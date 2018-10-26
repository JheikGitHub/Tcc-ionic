import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginProvider } from '../login/login';
import { Evento } from '../../models/evento';

const URL_API = 'http://localhost:51990';

@Injectable()
export class ParticipanteProvider {

  constructor(public http: HttpClient, private token: LoginProvider) { }

  buscaEventosIncritos(idParticipante) {
    return this.http.get<Evento[]>(URL_API + '/api/usuario/eventos-inscrito/' + idParticipante,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + this.token.getToken()
        })
      }
    );
  }

}
