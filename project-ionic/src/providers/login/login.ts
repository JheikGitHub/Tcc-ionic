import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL_API = 'http://192.168.0.104:3000';

const USER = 'user';

const userToken: string = 'userToken';

@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient) {
  }

  autenticacao(user: UserAuthenticateDTO) {
    var body = "grant_type=password&username=" + user.username + "&password=" + user.password;
    var header = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded' })
    return this.http.post(URL_API + "/api/token", body, { headers: header });
  }

  getUser() {
    return this.http.get(URL_API + "/api/usuario/acess-user", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.getToken()
      })
    });
  }

  removeUser() {
    window.localStorage.removeItem(USER);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  setToken(tokem: string) {
    window.localStorage.setItem(userToken, tokem)
  }

  getToken() {
    return window.localStorage.getItem(userToken);
  }

  removeToken() {
    window.localStorage.removeItem(userToken);
  }
}

export class UserAuthenticateDTO {
  username: string;  
  password: string;
}


