import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FuncionarioProvider } from '../../providers/funcionario/funcionario';
import { Evento } from '../../models/evento';

@IonicPage()
@Component({
  selector: 'page-funcionario',
  templateUrl: 'funcionario.html',
})
export class FuncionarioPage {

  private eventos: Evento[] = [];
  private IdUsuario;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private serviceFuncionario: FuncionarioProvider) {
  }

  ionViewDidLoad() {
    this.IdUsuario = this.navParams.get('id');

    this.serviceFuncionario.buscaEventosFuncionario(this.IdUsuario).subscribe(
      (data: Evento[]) => { this.eventos = data },
      (err) => { console.log(err) }
    );
  }

}
