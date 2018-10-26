import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Evento } from '../../models/evento';
import { ParticipanteProvider } from '../../providers/participante/participante';

@IonicPage()
@Component({
  selector: 'page-participante',
  templateUrl: 'participante.html',
})
export class ParticipantePage {

  private eventos: Evento[] = [];
  private IdUsuario;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private service: ParticipanteProvider) {
  }

  ionViewDidLoad() {
    this.IdUsuario = this.navParams.get('id');

    console.log(this.IdUsuario);

    this.service.buscaEventosIncritos(this.IdUsuario).subscribe(
      (data: Evento[]) => {
        this.eventos = data
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
