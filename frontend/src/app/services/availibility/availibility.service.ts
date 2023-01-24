import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IAvailibility } from 'src/app/interface/availibility';

@Injectable({
  providedIn: 'root'
})
export class AvailibilityService {

  private availability_api_url: string = 'http://localhost:9000/availability';
  constructor(private http: HttpClient) { }

  getAllAvaibility(userId: string): Observable<IAvailibility[]> {
    return this.http.get<IAvailibility[]>(this.availability_api_url + "/get/all/" + userId).pipe(catchError(this.errorHandler));
  }

  getAvailById(userId: string, availId: string): Observable<IAvailibility[]> {
    return this.http.get<IAvailibility[]>(this.availability_api_url + "/get/all/" + userId + "/" + availId).pipe(catchError(this.errorHandler));
  }

  addNewScheduleAvail(availabilityName: string, userId: string, timezone: string): Observable<boolean> {
    return this.http.post<boolean>(this.availability_api_url + "/add", {
      userId: userId,
      availabilityName: availabilityName,
      timezone: timezone
    }).pipe(catchError(this.errorHandler));

  }

  updateAvail(availabilityId: string, availabilityName: string, userId: string, timezone: string, weeksAvailability: string): Observable<boolean> {
    return this.http.put<boolean>(this.availability_api_url + "/update", {
      availabilityId: availabilityId,
      availabilityName: availabilityName,
      userId: userId,
      timezone: timezone,
      weeksAvailability: weeksAvailability,

    }).pipe(catchError(this.errorHandler));



  }

  deleteScheduleById(userId: string, availabilityId: string): Observable<boolean> {
    return this.http.delete<boolean>(this.availability_api_url + "/delete/" + userId + "/"+ availabilityId).pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}