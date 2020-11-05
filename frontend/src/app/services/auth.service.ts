import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  backend = "http://localhost:3500/";
  constructor(private router: Router){}

  //Set something in the localStorage. 'data' has to be JSON.stringify before being in param
  public setUserInfo(data, where : string){
    localStorage.setItem(where, data);
  }


  public removeUserInfo(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {

    let userData = localStorage.getItem('token')
    if (userData && JSON.parse(userData)) {
      return true;
    }
    return false;
  }
}
