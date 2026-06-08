import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarService } from '../../services/calendar.service';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: any[];
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [DatePipe],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class EventsComponent implements OnInit {
  upcomingEvents: any[] = [];
  allEventsCache: any[] = [];
  calendarDays: CalendarDay[] = [];
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  currentMonthDate = new Date();

  selectedDay: CalendarDay | null = null;

  constructor(public calendarService: CalendarService, private cdr: ChangeDetectorRef, private ngZone: NgZone) { }

  ngOnInit() {
    this.calendarService.fetchEvents();
    this.calendarService.events$.subscribe(allEvents => {
      this.ngZone.run(() => {
        this.allEventsCache = allEvents;
        this.populateCalendar();

        const now = new Date();
        this.upcomingEvents = allEvents.filter(e => {
          const d = new Date(e.start?.dateTime || e.start?.date);
          return d >= now;
        }).slice(0, 3);

        this.cdr.detectChanges();
      });
    });
  }

  populateCalendar() {
    const year = this.currentMonthDate.getFullYear();
    const month = this.currentMonthDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startOffset = firstDayOfMonth.getDay();
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startOffset);

    const endOffset = 6 - lastDayOfMonth.getDay();
    const endDate = new Date(lastDayOfMonth);
    endDate.setDate(endDate.getDate() + endOffset);

    this.calendarDays = [];
    let currentDate = new Date(startDate);

    const todayDateString = new Date().toDateString();

    while (currentDate <= endDate) {
      this.calendarDays.push({
        date: new Date(currentDate),
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.toDateString() === todayDateString,
        events: []
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    this.allEventsCache.forEach((event: any) => {
      const eventDateStr = event.start?.dateTime || event.start?.date;
      if (!eventDateStr) return;

      const eventDate = new Date(eventDateStr);
      const day = this.calendarDays.find(d => d.date.toDateString() === eventDate.toDateString());
      if (day) {
        day.events.push(event);
      }
    });
  }

  nextMonth() {
    this.currentMonthDate = new Date(this.currentMonthDate.getFullYear(), this.currentMonthDate.getMonth() + 1, 1);
    this.populateCalendar();
  }

  prevMonth() {
    this.currentMonthDate = new Date(this.currentMonthDate.getFullYear(), this.currentMonthDate.getMonth() - 1, 1);
    this.populateCalendar();
  }

  openDayModal(day: CalendarDay) {
    if (day.events && day.events.length > 0) {
      this.selectedDay = day;
    }
  }

  closeDayModal() {
    this.selectedDay = null;
  }
}
