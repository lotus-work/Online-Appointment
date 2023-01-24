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


  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }

}
