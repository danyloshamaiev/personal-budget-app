import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signUpWithGoogle(): void {
    this.authService
      .signInWithGoogle()
      .then(() => this.router.navigate(['accounts']));
  }

  signUpWithFacebook(): void {
    this.authService
      .signInWithFacebook()
      .then(() => this.router.navigate(['accounts']));
  }
}
