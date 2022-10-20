import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable, Subject, take} from 'rxjs';
import {SettingsService} from '../services/settings.service';
import {ThemeService} from '../services/theme.service';
import {ToastService} from '../services/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  public settingsForm: FormGroup;
  public darkMode$: Observable<boolean>;
  private unsubscribe$: Subject<void>;

  constructor(
    private settingsService: SettingsService,
    private themeService: ThemeService,
    private router: Router,
    private toast: ToastService
  ) {
    this.settingsForm = new FormGroup({
      displayName: new FormControl(''),
      currency: new FormControl(''),
    });
    this.settingsService
      .getUserInfo()
      .pipe(take(1))
      .subscribe(({displayName, currency}) => {
        this.settingsForm.patchValue({displayName, currency});
      });
    this.darkMode$ = this.themeService.darkMode$;
    this.unsubscribe$ = new Subject<void>();
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  public saveSettings(): void {
    this.settingsService
      .updateUserInfo(this.settingsForm.value)
      .subscribe(() => {
        this.toast.success({detail: 'Settings saved successfully'});
      });
  }

  public setDarkMode({checked}: {checked: boolean}): void {
    this.themeService.setDarkMode(checked);
  }

  public uploadProfilePhoto($event: any): void {
    this.settingsService
      .updateProfilePhoto($event.files[0])
      .subscribe((result) => {
        this.toast.success({
          detail: 'You successfully uploaded a new profile photo',
        });
      });
  }
}
