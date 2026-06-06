import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  nextEvent: any = null;

  constructor(public calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarService.fetchEvents();
    this.calendarService.events$.subscribe(events => {
      const now = new Date();
      const upcoming = events.filter(e => new Date(e.start?.dateTime || e.start?.date) >= now);
      if (upcoming.length > 0) {
        this.nextEvent = upcoming[0];
      }
    });
  }
}
