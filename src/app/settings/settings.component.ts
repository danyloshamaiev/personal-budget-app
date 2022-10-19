import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import IUser from '../models/user.model';
import {SettingsService} from '../services/settings.service';
import {ThemeService} from '../services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  public settingsForm: FormGroup;
  public userInfo$: Observable<IUser>;
  public darkMode$: Observable<boolean>;
  private unsubscribe$: Subject<void>;

  constructor(
    private settingsService: SettingsService,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.settingsForm = new FormGroup({
      displayName: new FormControl(''),
      currency: new FormControl(''),
    });
    this.userInfo$ = this.settingsService.getUserInfo();
    this.darkMode$ = this.themeService.darkMode$;
    this.unsubscribe$ = new Subject<void>();
  }

  public ngOnInit(): void {
    this.userInfo$.subscribe((value) => console.log(value));
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  public saveSettings(): void {
    // this.settingsService.saveUserSettings();
  }

  public setDarkMode({checked}: {checked: boolean}) {
    this.themeService.setDarkMode(checked);
  }
}
