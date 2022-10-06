import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  signUpWithGoogle(): void {
    this.authService.signInWithGoogle().then(() => {
      this.router.navigate(['accounts']);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'You have successfully signed up with Google account',
      });
    });
  }

  signUpWithFacebook(): void {
    this.authService.signInWithFacebook().then(() => {
      this.router.navigate(['accounts']);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'You have successfully signed up with Facebook account',
      });
    });
  }
}
