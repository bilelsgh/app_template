import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  field_non_valid : boolean = false;
  bad_mail_password : boolean = false;

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router
              ) { }

  ngOnInit(): void {
  }

  onSignIn(mail: string, password: string) {
    /*Envoie du mail et mdp au backend et réception du token de l'user correspondant*/
    this.httpClient
      .post(this.authService.backend + 'api/user/login', {mail: mail, password: password})
      .subscribe(
        (response) => {
          this.authService.setUserInfo( JSON.stringify(response['token']), 'token'); //stocke le token dans le session/localStorage
          this.authService.setUserInfo( JSON.stringify(response['user']), 'user');
          this.router.navigate(['']);
        },
        (error) => {
          if (error['status'] === 401 || error['status'] === 400) {
            this.bad_mail_password = true;
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    if (this.testMail(form.value['mail'])){
      this.field_non_valid = false;
      this.onSignIn(form.value.mail, form.value.password); // PASSPORT
    }else{
      this.field_non_valid = true;
      form.reset();
    }

  }

  testMail(mail:string){
    for(let elt of mail){
      if(elt === '@'){
        return true;
      }
    }
    return false;
  }
}
