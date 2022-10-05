import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  login(): void {
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }

  signInWithGoogle(): void {
    this.authService
      .signInWithGoogle()
      .then(() => this.router.navigate(['accounts']));
  }

  signInWithFacebook(): void {
    this.authService
      .signInWithFacebook()
      .then(() => this.router.navigate(['accounts']));
  }
}
