import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IAvailibility } from 'src/app/interface/availibility';
import { IBooking } from 'src/app/interface/booking';
import { IEvents } from 'src/app/interface/events';
import { IUsers } from 'src/app/interface/users';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private booking_api_url: string = 'http://localhost:9000/booking';
  constructor(private http: HttpClient) { }


  getAllBookings(userName: string): Observable<IBooking[]> {
    return this.http.get<IBooking[]>(this.booking_api_url + "/get/booking/" + userName).pipe(catchError(this.errorHandler));
  }

  addNewBooking(username: string, eventId: string, eventName: string, bookedTime: string, appointmentUsername: string, appointmentUserPhoneNumber: string, appointmentUserEmail: string, appointmentGuestEmail: string, additionalNotes: string, sendConfirmationMail: string, bookingstatus: string): Observable<boolean> {
    return this.http.post<boolean>(this.booking_api_url + "/add", {
      bookedUser: username,
      bookedEventId: eventId,
      bookedEventName: eventName,
      bookedTime: bookedTime,
      appointmentBookedUsername: appointmentUsername,
      appointmentBookedPhoneNumber: appointmentUserPhoneNumber,
      appointmentBookedEmail: appointmentUserEmail,
      appointmentGuestEmail: appointmentGuestEmail,
      additionalNotes: additionalNotes,
      sendConfirmationMail: sendConfirmationMail,
      bookingstatus: bookingstatus
    }).pipe(catchError(this.errorHandler));
  }

  sendMail(appointWith: string, appointWithEmail: string, eventSummary: string, dateEvent: string, time: string, timezone: string, location: string, eventAttendee: string, eventAttendeeEmail: string, eventDesc: string): Observable<any> {

    return this.http.get<any>("https://mail-backend.onrender.com/sendmail?appointWith=" + appointWith + "&appointWithEmail=" + appointWithEmail + "&eventSummary=" + eventSummary + "&dateEvent=" + dateEvent + "&time=" + time + "&timezone=" + timezone + "&location=" + location + "&eventAttendee=" + eventAttendee + "&eventAttendeeEmail=" + eventAttendeeEmail + "&eventDesc=" + eventDesc).pipe(catchError(this.errorHandler));
  }

  updateConfirmationOnMailSentEvent(bookedUser: string, bookingId: string): Observable<boolean> {

    return this.http.put<boolean>(this.booking_api_url + "/update/confirmationMailMeeting", {
      bookedUser: bookedUser,
      bookingId: bookingId
    }).pipe(catchError(this.errorHandler));
  }


  updateBookingOnConfirm(bookedUser: string, bookingId: string): Observable<boolean> {

    return this.http.put<boolean>(this.booking_api_url + "/update/onConfirm", {
      bookedUser: bookedUser,
      bookingId: bookingId
    }).pipe(catchError(this.errorHandler));
  }

  updateBookingOnReject(bookedUser: string, bookingId: string): Observable<boolean> {

    return this.http.put<boolean>(this.booking_api_url + "/update/onReject", {
      bookedUser: bookedUser,
      bookingId: bookingId
    }).pipe(catchError(this.errorHandler));
  }
  updateBookingOnReschedule(bookedUser: string, bookingId: string): Observable<boolean> {

    return this.http.put<boolean>(this.booking_api_url + "/update/onReschedule", {
      bookedUser: bookedUser,
      bookingId: bookingId
    }).pipe(catchError(this.errorHandler));
  }
  updateBookingOnComplete(bookedUser: string, bookingId: string): Observable<boolean> {

    return this.http.put<boolean>(this.booking_api_url + "/update/onComplete", {
      bookedUser: bookedUser,
      bookingId: bookingId
    }).pipe(catchError(this.errorHandler));
  }

  updateBookingOnCancel(bookedUser: string, bookingId: string): Observable<boolean> {

    return this.http.put<boolean>(this.booking_api_url + "/update/onCancel", {
      bookedUser: bookedUser,
      bookingId: bookingId
    }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}