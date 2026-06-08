import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: 'light' | 'dark' = 'light';

  constructor() {
    this.initTheme();
  }

  private initTheme() {
    const saved = localStorage.getItem('nafb-theme') as 'light' | 'dark' | null;
    if (saved === 'dark' || saved === 'light') {
      this.currentTheme = saved;
    } else {
      // Default: LIGHT mode
      this.currentTheme = 'light';
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('nafb-theme', this.currentTheme);
    this.applyTheme();
  }

  private applyTheme() {
    if (this.currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  isDark() {
    return this.currentTheme === 'dark';
  }
}
