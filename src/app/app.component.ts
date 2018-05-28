import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginCredentials = {};
  user = {};
  authenticated;
  touched;

  
  constructor(private authService: AuthService) {
    const token = localStorage.getItem("token")
    if(token){
      this.authService.login({tokenFound: token});
      this.authenticated = this.authService.authenticated;
      this.touched = true;
      this.user = this.authService.user;
    }
  }

  login() {
    // login user using authService.
    this.authService.login(this.loginCredentials);
    this.authenticated = this.authService.authenticated;
    this.touched = true;
    this.user = this.authService.user;
    

  }

  logout() {
    // logout user using authService.
    this.authService.logout();
    this.user = {};
    this.loginCredentials= {}
    this.authenticated = false;
    this.touched = false;

  }

  testApi() {
    // test API access by invoking getResource on authService.
    this.authService.getResource(localStorage.getItem("token"));

  }

}
