import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public darkMode = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  switchDarkMode() {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    console.log(themeLink);
    if (themeLink) {
      this.darkMode = !this.darkMode;
      themeLink.href = `${this.darkMode ? 'dark-' : ''}theme.css`;
      console.log(themeLink);
    }
  }
}
