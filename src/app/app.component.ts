import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {ThemeService} from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  switchDarkMode() {
    this.themeService.switchDarkMode();
  }
}
