import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
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

  // Donation Widget State
  donationType: 'one-time' | 'monthly' = 'one-time';
  presetAmounts = [250, 100, 50, 25, 10];
  selectedAmount: number | null = 25;

  // IMPORTANT: Replace these with actual Stripe Payment Links
  stripeLinks = {
    oneTime: {
      10: 'https://donate.stripe.com/test_5kQ28sd6vb9GeFecC704806',
      25: 'https://donate.stripe.com/test_dRm28s4zZ7Xu8gQ7hN04807',
      50: 'https://donate.stripe.com/test_4gM4gA1nN0v28gQgSn04808',
      100: 'https://donate.stripe.com/test_5kQ5kEeaz91yeFe8lR04809',
      250: 'https://donate.stripe.com/test_7sYaEY1nN91y8gQ8lR0480a',
      custom: 'https://donate.stripe.com/test_dRmeVe8QfcdKdBafOj04800'
    },
    monthly: {
      10: 'https://buy.stripe.com/test_aFa00k5E3fpW54EcC704801', // $10/mo link
      25: 'https://donate.stripe.com/test_eVq4gA3vVgu068I6dJ04802', // $25/mo link
      50: 'https://donate.stripe.com/test_eVq8wQ3vVdhOeFe8lR04803', // $50/mo link
      100: 'https://donate.stripe.com/test_bJebJ24zZ6TqdBaatZ04804', // $100/mo link
      250: 'https://donate.stripe.com/test_3cIcN6giHelSaoY9pV04805' // $250/mo link
    }
  };

  constructor(public calendarService: CalendarService) { }

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

  selectPreset(amount: number | 'custom') {
    if (amount === 'custom') {
      window.location.href = this.stripeLinks.oneTime.custom;
    } else {
      this.selectedAmount = amount as number;
    }
  }

  handleDonate() {
    const amount = this.selectedAmount || 25;

    if (this.donationType === 'one-time') {
      // @ts-ignore
      const oneTimeLink = this.stripeLinks.oneTime[amount];
      if (oneTimeLink && oneTimeLink.includes('stripe.com')) {
        window.location.href = oneTimeLink;
      } else {
        // Fallback to custom/generic if specific one-time isn't configured
        // @ts-ignore
        if (this.stripeLinks.oneTime.custom) {
          // @ts-ignore
          window.location.href = this.stripeLinks.oneTime.custom;
        } else {
          alert('Stripe One-Time Link for $' + amount + ' is not yet configured.');
        }
      }
    } else {
      // @ts-ignore
      const monthlyLink = this.stripeLinks.monthly[amount];
      if (monthlyLink && monthlyLink.includes('stripe.com')) {
        window.location.href = monthlyLink;
      } else {
        alert('Stripe Monthly Link for $' + amount + ' is not yet configured.');
      }
    }
  }
}
