import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';
import {ThemeService} from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private themeService: ThemeService // For the sake of keeping alive an Observable subscription
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  logout($event: Event) {
    this.authService.logout($event);
  }
}
