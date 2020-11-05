import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  backend = "";
  constructor(){}

  //Set something in the localStorage. 'data' has to be JSON.stringify before being in param
  public setUserInfo(data, where : string){
    localStorage.setItem(where, data);
  }
}
