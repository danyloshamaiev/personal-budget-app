import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public darkMode$: Observable<boolean>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storage: StorageMap
  ) {
    this.darkMode$ = this.storage
      .get('darkMode')
      .pipe(map((darkMode) => !!darkMode));
    this.darkMode$.subscribe((darkMode) => {
      if (darkMode) this.setDarkMode(darkMode);
    });
  }

  setDarkMode(darkMode: boolean) {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    if (!themeLink) return;
    this.storage.set('darkMode', darkMode).subscribe(() => {
      themeLink.href = `${darkMode ? 'dark-' : ''}theme.css`;
    });
  }
}
