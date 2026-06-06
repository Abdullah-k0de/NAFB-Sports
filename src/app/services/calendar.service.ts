import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private calendarId = environment.calendarId;
  private apiKey = environment.googleCalendarApiKey;

  private eventsCache: any[] | null = null;
  private eventsSubject = new BehaviorSubject<any[]>([]);
  public events$ = this.eventsSubject.asObservable();

  public loading = false;
  public error = false;

  constructor(private http: HttpClient) { }

  fetchEvents() {
    if (this.eventsCache !== null) {
      this.eventsSubject.next(this.eventsCache);
      return;
    }

    this.loading = true;
    const now = new Date();
    // Fetch from 3 months ago to 6 months ahead to cover all local calendar views
    const timeMin = new Date(now.getFullYear(), now.getMonth() - 3, 1).toISOString();
    const timeMax = new Date(now.getFullYear(), now.getMonth() + 6, 1).toISOString();

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(this.calendarId)}/events?key=${this.apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&maxResults=250`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.eventsCache = response.items || [];
        this.eventsSubject.next(this.eventsCache!);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch calendar events', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}
