import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IUsers } from 'src/app/interface/users';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user_api_url: string = 'http://localhost:9000/user';
  constructor(private http: HttpClient) { }


  publicgetUserData(userName: string): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.user_api_url +"/get/public/" + userName ).pipe(catchError(this.errorHandler));
  }

  validateUserEmail( emailAdderss: string): Observable<boolean> {
    console.log(emailAdderss);
    return this.http.put<boolean>(this.user_api_url + "/validateUserEmail/" + emailAdderss , {
      emailAdderss:emailAdderss, 
    }).pipe(catchError(this.errorHandler));
  }

  getUserDataByEmail( emailAdderss: string ): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.user_api_url + "/get/userDataByEmail/" + emailAdderss ).pipe(catchError(this.errorHandler));
  }

  registerUser(fullName: string, username: string, emailAddress: string, password: string,timezone: string): Observable<boolean> {
    console.log(fullName,username,emailAddress, password, timezone);
    return this.http.post<boolean>(this.user_api_url + "/signup", {
     
      fullName:fullName,
      username:username,
      emailAddress:emailAddress,
      password:password,
      timezone:timezone
    }).pipe(catchError(this.errorHandler));
  }


  loginUser(emailAddress: string, password: string): Observable<boolean> {

    return this.http.post<any>(this.user_api_url + "/signin", {
      emailAddress: emailAddress,
      password: password
    }).pipe(catchError(this.errorHandler));
  }

  checkUsername(username: string) {
    return this.http.post<any>(this.user_api_url + "/usernameCheck", {
      username: username
    }).pipe(catchError(this.errorHandler));
  }

  updateUserData(id:string, fullName:string, password:string, about:string, timezone:string): Observable<boolean> {
    return this.http.put<boolean>(this.user_api_url + "/update/userData/" + id, {
      fullName:fullName,   
      password:password ,     
      about:about,   
      timezone:timezone 
    }).pipe(catchError(this.errorHandler));
  }
  updateUserProfilePicture(id: string, userProfilePicture: string): Observable<boolean> {
    return this.http.patch<boolean>(this.user_api_url + "/update/profilePicture/" + id, {
      profilePicture: userProfilePicture
    }).pipe(catchError(this.errorHandler));
  }

  getUserDataById(id: string): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.user_api_url + "/get/userDataById/" + id).pipe(catchError(this.errorHandler));
  }

  getUserDataByUserName(username: string): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(this.user_api_url +"/get/userDataByUsername/" + username).pipe(catchError(this.errorHandler));
  }


  // EMAIL

  resetMail( emailAdderss: string, password: string): Observable<any> {
  
    return this.http.get<any>("http://localhost:3000/resetMail?emailAddress=" + emailAdderss + "&password=" +password ).pipe(catchError(this.errorHandler));
  }

  sendBookingConfirmationMail( bookedEmailAdderss: string, userEmailAdderss: string, bookedName: string, eventName: string): Observable<any> {
  
    return this.http.get<any>("https://mail-backend.onrender.com/sendBookingConfirmationMail?bookedEmailAdderss=" + bookedEmailAdderss +  "&userEmailAdderss=" +userEmailAdderss +  "&bookedName=" +bookedName + "&eventName=" +eventName  ).pipe(catchError(this.errorHandler));
  }

  sendBookingPendingMail( bookedEmailAdderss: string, userEmailAdderss: string, bookedName: string,  eventName: string): Observable<any> {
    return this.http.get<any>("https://mail-backend.onrender.com/sendBookingPendingMail?bookedEmailAdderss=" + bookedEmailAdderss +  "&userEmailAdderss=" +userEmailAdderss + "&bookedName=" + bookedName + "&eventName=" +eventName  ).pipe(catchError(this.errorHandler));
 }

 sendRescheduleMail( bookedEmailAdderss: string, userEmailAdderss: string, bookedName: string,  eventName: string, userURL: string, timeAndTimeZone: string, eventDate: string ): Observable<any> {
  return this.http.get<any>("https://mail-backend.onrender.com/sendRescheduleMail?bookedEmailAdderss=" + bookedEmailAdderss +  "&userEmailAdderss=" +userEmailAdderss + "&bookedName=" + bookedName + "&eventName=" +eventName  + "&userURL=" + userURL + "&timeAndTimeZone=" +timeAndTimeZone+ "&eventDate=" +eventDate).pipe(catchError(this.errorHandler));
}
sendCancelMail( bookedEmailAdderss: string, userEmailAdderss: string, bookedName: string,  eventName: string, userURL: string, timeAndTimeZone: string, eventDate: string ): Observable<any> {
  return this.http.get<any>("https://mail-backend.onrender.com/sendCancelMail?bookedEmailAdderss=" + bookedEmailAdderss +  "&userEmailAdderss=" +userEmailAdderss + "&bookedName=" + bookedName + "&eventName=" +eventName  + "&userURL=" + userURL + "&timeAndTimeZone=" +timeAndTimeZone+ "&eventDate=" +eventDate).pipe(catchError(this.errorHandler));
}

sendBookingAcceptMail( bookedEmailAdderss: string, userEmailAdderss: string, bookedName: string,  eventName: string, userURL: string, timeAndTimeZone: string, eventDate: string ): Observable<any> {
  return this.http.get<any>("https://mail-backend.onrender.com/sendBookingAcceptMail?bookedEmailAdderss=" + bookedEmailAdderss +  "&userEmailAdderss=" +userEmailAdderss + "&bookedName=" + bookedName + "&eventName=" +eventName  + "&userURL=" + userURL + "&timeAndTimeZone=" +timeAndTimeZone+ "&eventDate=" +eventDate).pipe(catchError(this.errorHandler));
}
sendBookingRejectMail( bookedEmailAdderss: string, userEmailAdderss: string, bookedName: string,  eventName: string, userURL: string, timeAndTimeZone: string, eventDate: string ): Observable<any> {
  return this.http.get<any>("https://mail-backend.onrender.com/sendBookingRejectMail?bookedEmailAdderss=" + bookedEmailAdderss +  "&userEmailAdderss=" +userEmailAdderss + "&bookedName=" + bookedName + "&eventName=" +eventName  + "&userURL=" + userURL + "&timeAndTimeZone=" +timeAndTimeZone+ "&eventDate=" +eventDate).pipe(catchError(this.errorHandler));
}

sendPreScheduleMail( bookedEmailAdderss: string, userEmailAdderss: string, bookedName: string,  eventName: string): Observable<any> {
  return this.http.get<any>("https://mail-backend.onrender.com/sendPreScheduleMail?bookedEmailAdderss=" + bookedEmailAdderss +  "&userEmailAdderss=" +userEmailAdderss + "&bookedName=" + bookedName + "&eventName=" +eventName  ).pipe(catchError(this.errorHandler));
}


  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }

}
