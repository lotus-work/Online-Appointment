import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { IUsers } from 'src/app/interface/users';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  status: any;
  errMsg!: string;
  userDetails: IUsers[] = [];
  userLocation: any = [];
  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private _usrServices: UserService, private _toast: NgToastService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  loginUserFunc(form: NgForm) {

    console.log(form.value);
    this.spinner.show();
    this._usrServices.loginUser(form.value.emailAdderss, form.value.password).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        
        this.onlogindeviceinfo();
        
        if (this.status.length >= 1) {
          this.userDetails = this.status;
          localStorage.setItem("userName", this.userDetails[0].username);
          localStorage.setItem("_id", String(this.userDetails[0]._id));
          localStorage.setItem("fullName", String(this.userDetails[0].fullName));
          localStorage.setItem("emailAddress", String(this.userDetails[0].emailAddress));
          localStorage.setItem("profilePicture", String(this.userDetails[0].profilePicture));
          if (this.userDetails[0].about.length > 0) {
            localStorage.setItem("isAbout", String("true"));
          } else {
            localStorage.setItem("isAbout", String("false"));
          }
          this._toast.success({ detail: "LOGIN SUCCESS", summary: 'Redirecting to home page', position: 'br' });

          setTimeout(() => {
            this.router.navigate(["/calendar-intregration"]);
          }, 2000);

        }
        else {
          this._toast.warning({ detail: "WRONG CREDINTIALS", summary: 'Unable to login', position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
      },
      err => {
        this._toast.warning({ detail: " FAILED", summary: 'Please try after sometime', position: 'br' });
      }, () => console.log("Login method excuted successfully"))
  }
  onlogindeviceinfo() {
    const currentDate = new Date();
    console.log("Current Date " + currentDate);

    // Get approximate location based on IP address
    this.http.get('https://ipinfo.io/json?token=b841493bd13584').subscribe(response => {
      this.userLocation = response;
      console.log(response);
      // Get user agent string
      const userAgent = window.navigator.userAgent;

      let os = 'unknown';
      const platform = window.navigator.platform;

      if (platform.indexOf('Win') !== -1) {
        os = 'Windows';
      } else if (platform.indexOf('Mac') !== -1) {
        os = 'MacOS';
      } else if (platform.indexOf('Linux') !== -1) {
        os = 'Linux';
      } else if (platform.indexOf('Android') !== -1) {
        os = 'Android';
      } else if (platform.indexOf('iOS') !== -1) {
        os = 'iOS';
      }
      // Browser detection
      let browser = 'unknown';
      if (userAgent.indexOf('Chrome') !== -1) {
        browser = 'Chrome';
      } else if (userAgent.indexOf('Firefox') !== -1) {
        browser = 'Firefox';
      } else if (userAgent.indexOf('Safari') !== -1) {
        browser = 'Safari';
      } else if (userAgent.indexOf('Opera') !== -1) {
        browser = 'Opera';
      } else if (userAgent.indexOf('Edge') !== -1) {
        browser = 'Edge';
      } else if (userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident') !== -1) {
        browser = 'Internet Explorer';
      }

      console.log(os + " " + browser);
      const data = [{
        userName: this.userDetails[0].fullName,
        emailAddress: this.userDetails[0].emailAddress,
        loginDate: currentDate,
        operatingSystem: os,
        browserInfo: browser,
        location: [this.userLocation]
      }];
      console.log(data);

      this.http.post("http://localhost:3000/onlogindeviceinfo", data).subscribe((response) => {
        console.log('Response:', response);
      }, (error) => {
        console.error('Error:', error);
      });

    });

  }
}