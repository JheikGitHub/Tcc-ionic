import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginProvider } from '../login/login';
import { Evento } from '../../models/evento';
import { Participante } from '../../models/participante';

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

  buscaParticipanteCodCarteirinha(valor) {
    return this.http.get<Participante>(URL_API + '/api/aluno/busca-por-codigo/' + valor,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + this.token.getToken()
        })
      }
    );
  }

  confirmaPresenca(confirmacaoPresenca: ConfirmacaoPresenca) {
    return this.http.post(URL_API + "/api/evento/confimacao-de-presenca-no-evento", confirmacaoPresenca, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + this.token.getToken()
        })
    })
}

}

export class ConfirmacaoPresenca {
  UsuarioId: number;
  EventoId: number;
}
