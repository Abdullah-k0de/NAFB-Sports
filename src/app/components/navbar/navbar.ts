import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  isMenuOpen = false;
  isScrolled = false;

  constructor(public themeService: ThemeService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 12;
  }

  @HostListener('window:keydown.escape')
  onEscape() {
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }
}
