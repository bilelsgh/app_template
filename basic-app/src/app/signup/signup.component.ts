import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  alreadyExist : boolean = false;
  current_surname: string;
  picture_profil_file: File = null;
  small_password: boolean;
  strong_password: boolean;
  bad_password: boolean;
  medium_password: boolean;
  badRegex = new RegExp('^[a-zA-Z]{8,}$');
  mediumRegex = new RegExp('^[a-zA-Z0-9]{8,}$');
  strongRegex = new RegExp('^.{8,}$');
  same_password = true;
  info_mdp = false;

  constructor(private httpClient: HttpClient, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.checkSamePassword(form)) {
      this.same_password = true;
      const name = form.value.lastName;
      const prenom = form.value.firstName;
      const sexe = form.value.sex;
      const mail = form.value.mail;
      const password = form.value.password;
      this.addUser(name, prenom, sexe, mail, password);

      // this.auth.isAuth = true;
    } else if (form.value.password.length < 8) {
      form.reset();
      this.strong_password = false;
      this.medium_password = false;
      this.bad_password = false;
      this.same_password = true;
      alert('Le mot de passe doit faire au moins 6 caractères.');
    } else {
      form.reset();
      this.strong_password = false;
      this.medium_password = false;
      this.bad_password = false;
      this.same_password = true;
      alert('Les mots de passe entrés ne sont pas identiques.');
    }
  }

  checkSamePassword(form: NgForm) {
    return form.value.password === form.value.confirm_password;
  }
  quickCheckPassword(form: NgForm) {
    if (form.value.password !== form.value.confirm_password) {
      this.same_password = false;
    } else {
      this.same_password = true;
    }
  }

  passwordComplexity(text: string) {

    if (text.length < 6) {
      this.small_password = true;
      this.bad_password = false;
      this.medium_password = false;
      this.strong_password = false;
    } else if ( this.badRegex.test(text) ) {
      this.small_password = false;
      this.bad_password = true;
      this.medium_password = false;
      this.strong_password = false;
    } else if ( this.mediumRegex.test(text) ) {
      this.small_password = false;
      this.medium_password = true;
      this.strong_password = false;
      this.bad_password = false;
    } else if ( this.strongRegex.test(text) ) {
      this.small_password = false;
      this.strong_password = true;
      this.bad_password = false;
      this.medium_password = false;
    }

  }

  addUser(nom: string, prenom: string, sexe: string, mail: string, password: string, ){
    const newUser = {firstName: '', lastName: '', sex: '', mail:'', password:''};
    newUser.firstName = prenom;
    newUser.lastName = nom;
    newUser.sex = sexe;
    newUser.mail = mail;
    newUser.password = password;

    this.httpClient
      .post(this.auth.backend + 'api/user', newUser)
      .subscribe(
        (response) => {
          //Reception of the token which is set in the localStorage
          this.alreadyExist = false;
          this.auth.setUserInfo( JSON.stringify(response['token']), 'token'); //stocke le token dans le session/localStorage
          this.auth.setUserInfo( JSON.stringify(response['user']), 'user');
          this.router.navigate(['']);
        },
        (error) => {
          if(error['status'] === 400){
            this.alreadyExist = true;
          }
        }
      );
  }

}
