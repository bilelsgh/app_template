import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(f){
    alert("Not build yet");
  }

  updateSurname(text: string) {
    this.current_surname = text;
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
}
