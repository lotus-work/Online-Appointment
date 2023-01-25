import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IEvents } from 'src/app/interface/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private event_api_url: string = 'http://localhost:9000/event';
  constructor(private http: HttpClient) { }

  getAllEvents(userId: string): Observable<IEvents[]> {
    return this.http.get<IEvents[]>(this.event_api_url + "/get/all/" + userId).pipe(catchError(this.errorHandler));
  }

  getEventById(userId: string, eventId: string): Observable<IEvents[]> {
    return this.http.get<IEvents[]>(this.event_api_url + "/get/all/" + userId + "/" + eventId).pipe(catchError(this.errorHandler));
  }

  addNewEvent(userId: string, title: string, url: string, length: number, availabilityId: string, description: string, location: string): Observable<boolean> {
    return this.http.post<boolean>(this.event_api_url + "/add", {
      userId: userId,
      title: title,
      url: url,
      length: length,
      availabilityId: availabilityId,
      description: description,
      location: location
    }).pipe(catchError(this.errorHandler));
  }

  updateEvent(eventId: string, userId: string, title: string, description: string, location: string,
    url: string, length: number, availabilityId: string, eventName: string, optInBooking: string, disableGuests: string, hideEventType: string, timeSlotIntervals: number): Observable<boolean> {
   
    return this.http.put<boolean>(this.event_api_url + "/update", {
      eventId: eventId,
      userId: userId,
      title: title,
      description: description,
      location: location,
      url: url,
      length: length,
      availabilityId: availabilityId,
      eventName: eventName,
      optInBooking: optInBooking,
      disableGuests: disableGuests,
      hideEventType: hideEventType,
      timeSlotIntervals: timeSlotIntervals

    }).pipe(catchError(this.errorHandler));
  }


  deleteEvent(userId: string, eventId: string): Observable<boolean> {
    return this.http.delete<boolean>(this.event_api_url + "/delete/" + userId +  "/" + eventId).pipe(catchError(this.errorHandler))
  }
  
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }

}