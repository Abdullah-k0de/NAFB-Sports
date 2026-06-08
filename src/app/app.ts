import { Component, HostListener, OnInit, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, AfterViewInit {
  isBrowser: boolean;
  private observer?: IntersectionObserver;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Scroll to top on route change
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.isBrowser) {
        window.scrollTo({ top: 0, behavior: 'instant' as any });
        // Re-run reveal scan after navigation
        setTimeout(() => this.initReveal(), 120);
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.initReveal();
    }
  }

  /** Scroll-reveal using IntersectionObserver */
  private initReveal() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: make everything visible immediately
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-pop, .reveal-step')
        .forEach(el => el.classList.add('is-visible'));
      return;
    }

    this.observer?.disconnect();

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          this.observer?.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-pop, .reveal-step').forEach(el => {
      this.observer!.observe(el);
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    // Kept for potential navbar scroll detection
  }
}
