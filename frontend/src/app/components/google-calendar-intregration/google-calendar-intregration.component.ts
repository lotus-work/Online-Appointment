import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';

declare var gapi: any;

@Component({
  selector: 'app-google-calendar-intregration',
  templateUrl: './google-calendar-intregration.component.html',
  styleUrls: ['./google-calendar-intregration.component.css']
})
export class GoogleCalendarIntregrationComponent implements OnInit {

  isSignedIn = false;

  constructor(private spinner: NgxSpinnerService,private zone: NgZone, private _toast: NgToastService, private _router: Router) { }

  async ngOnInit() {
    await this.loadGapi();
    gapi.load('client:auth2', this.initClient.bind(this));
  }

  initClient() {
    const updateSigninStatus = this.updateSigninStatus.bind(this);
    gapi.client
      .init({
        apiKey: 'AIzaSyAjVE6bHNC53ARTLiXRzrJwqyn8yGcH3Vw',
        clientId:
          '1077908882481-2c2hgj56b5m9rkfoirtd56c0ln05ct48.apps.googleusercontent.com',
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
        scope: 'https://www.googleapis.com/auth/calendar',
      })
      .then(() => {
        this.zone.run(() => {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
      });
  }

  updateSigninStatus(isSignedIn: any) {
    console.log('updateSigninStatus', isSignedIn);
    this.isSignedIn = isSignedIn;
    if (isSignedIn) {
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this._toast.success({ detail: "SUCCESS", summary: 'Integrated Google Calendar ', position: 'br' });
      this._router.navigate(['/home'])
        .then(() => {
          window.location.reload();
        });
    }
    if (isSignedIn == false) {
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this._router.navigate(["/calendar-intregration"]);
    }
  }

  handleAuthClick() {
    this.spinner.show();
    gapi.auth2.getAuthInstance().signIn();
  }

  handleSignoutClick() {
    this.spinner.show();
    gapi.auth2.getAuthInstance().signOut();
  }


  loadGapi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    window.document.body.appendChild(script);
    return new Promise<void>((resolve, reject) => {
      script.addEventListener('error', (error) => reject(error));
      script.addEventListener('load', () => resolve());
    });
  }



}