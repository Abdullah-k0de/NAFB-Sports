import { Component, HostListener, signal, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';

export interface FloatingIcon {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  type: 'soccer' | 'basketball' | 'tennis' | 'football' | 'trophy' | 'whistle';
  rotation: number;
  scale: number;
  opacity: number;
  color: string;
  animDuration: number;
  animDelay: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('nafb-sports');
  icons = signal<FloatingIcon[]>([]);
  isBrowser: boolean;

  types: FloatingIcon['type'][] = ['soccer', 'basketball', 'tennis', 'football', 'trophy', 'whistle'];

  // Modern vibrant sports colors
  colors = ['#38bdf8', '#818cf8', '#a78bfa', '#f472b6', '#fb923c', '#fbbf24', '#34d399', '#2dd4bf', '#ef4444', '#10b981'];

  constructor(@Inject(PLATFORM_ID) platformId: Object, private router: Router) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Scroll to top of the custom container on route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.isBrowser) {
        window.scrollTo({ top: 0, behavior: 'instant' as any });
      }
    });
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.generateIcons();
    }
  }

  generateIcons() {
    const newIcons: FloatingIcon[] = [];
    
    // Responsive parameters to prevent clutter on mobile
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 24 : 45;
    const minDistance = isMobile ? 15 : 10;

    for (let i = 0; i < count; i++) {
      const randomType = this.types[Math.floor(Math.random() * this.types.length)];
      const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];

      let baseX = 0;
      let baseY = 0;
      let isValid = false;
      let attempts = 0;

      // Find a non-overlapping coordinate
      while (!isValid && attempts < 100) {
        baseX = 2 + Math.random() * 96;
        baseY = 2 + Math.random() * 96;
        isValid = true;

        for (const existing of newIcons) {
          const dx = existing.baseX - baseX;
          const dy = existing.baseY - baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < minDistance) {
            isValid = false;
            break;
          }
        }
        attempts++;
      }

      newIcons.push({
        id: i,
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        type: randomType,
        rotation: Math.random() * 360,
        scale: 0.4 + Math.random() * 1.5,
        opacity: 0.15 + Math.random() * 0.35,
        color: randomColor,
        animDuration: 8 + Math.random() * 25,
        animDelay: -(Math.random() * 25)
      });
    }
    this.icons.set(newIcons);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isBrowser || window.innerWidth < 768) return;

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    this.icons.update(icons => {
      return icons.map(icon => {
        // Convert base vw/vh to pixels
        const iconPxX = (icon.baseX / 100) * windowWidth;
        const iconPxY = (icon.baseY / 100) * windowHeight;

        const dx = iconPxX - mouseX;
        const dy = iconPxY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repel radius
        const repelRadius = 250;

        if (dist < repelRadius && dist > 0) {
          const force = Math.pow((repelRadius - dist) / repelRadius, 1.5);
          // Push up to 120px away
          const pushFactor = 120 * force;

          const pushX = (dx / dist) * pushFactor;
          const pushY = (dy / dist) * pushFactor;

          // Convert back to vw/vh for smooth rendering
          const newVw = icon.baseX + (pushX / windowWidth) * 100;
          const newVh = icon.baseY + (pushY / windowHeight) * 100;

          return { ...icon, x: newVw, y: newVh };
        } else {
          // Return to base
          return { ...icon, x: icon.baseX, y: icon.baseY };
        }
      });
    });
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (!this.isBrowser || window.innerWidth >= 768) return;

    // Only respond to the first touch point to keep it ultra lightweight
    const touch = event.touches[0];
    if (!touch) return;

    const mouseX = touch.clientX;
    const mouseY = touch.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    this.icons.update(icons => {
      return icons.map(icon => {
        const iconPxX = (icon.baseX / 100) * windowWidth;
        const iconPxY = (icon.baseY / 100) * windowHeight;

        const dx = iconPxX - mouseX;
        const dy = iconPxY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const repelRadius = 200; // slightly smaller radius for touch

        if (dist < repelRadius && dist > 0) {
          const force = Math.pow((repelRadius - dist) / repelRadius, 1.5);
          const pushFactor = 120 * force;

          const pushX = (dx / dist) * pushFactor;
          const pushY = (dy / dist) * pushFactor;

          const newVw = icon.baseX + (pushX / windowWidth) * 100;
          const newVh = icon.baseY + (pushY / windowHeight) * 100;

          return { ...icon, x: newVw, y: newVh };
        }
        
        // Don't auto-return to base immediately on touch, let it stay repelled
        return icon;
      });
    });
    
    // Automatically reset them after 2 seconds
    setTimeout(() => {
      if (!this.isBrowser) return;
      this.icons.update(icons => {
        return icons.map(icon => ({ ...icon, x: icon.baseX, y: icon.baseY }));
      });
    }, 2000);
  }
}
