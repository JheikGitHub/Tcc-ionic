import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminProvider } from '../../providers/admin/admin';
import { Evento } from '../../models/evento';


@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  private eventos: Evento[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private adminService: AdminProvider) {
  }

  ionViewDidLoad() {
    this.adminService.buscaTodosEventos().subscribe(
      (dados: Evento[]) => { this.eventos = dados },
      (err) => { console.log(err) }
    );
  }


}
