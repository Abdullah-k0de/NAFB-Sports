import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  nextEvent: any = null;

  champValues = [
    { letter: 'C', word: 'Confident' },
    { letter: 'H', word: 'Healthy' },
    { letter: 'A', word: 'Active' },
    { letter: 'M', word: 'Motivated' },
    { letter: 'P', word: 'People' },
    { letter: 'I', word: 'Integrity' },
    { letter: 'O', word: 'Optimism' },
    { letter: 'N', word: 'Nurturing' },
    { letter: 'S', word: 'Supportive' },
  ];

  constructor(public calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarService.fetchEvents();
    this.calendarService.events$.subscribe(events => {
      const now = new Date();
      const upcoming = events.filter(e => new Date(e.start?.dateTime || e.start?.date) >= now);
      this.nextEvent = upcoming.length > 0 ? upcoming[0] : null;
    });
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseInt(el.getAttribute('data-target') || '0', 10);
            const suffix = el.getAttribute('data-suffix') || '';
            let current = 0;
            const increment = target / 240; // Approx 4 seconds
            
            const updateCounter = () => {
              current += increment;
              if (current < target) {
                el.innerText = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
              } else {
                el.innerText = target + suffix;
              }
            };
            
            updateCounter();
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });

      document.querySelectorAll('.count-up').forEach(el => observer.observe(el));
    }
  }
}
