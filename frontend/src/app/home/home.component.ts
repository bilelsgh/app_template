import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuth : boolean;
  firstName : string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isAuthenticated();
    this.firstName = localStorage.getItem("user") ;
  }

}
