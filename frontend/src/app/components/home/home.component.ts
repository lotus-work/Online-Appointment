import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { IBooking } from 'src/app/interface/booking';
import { IEvents } from 'src/app/interface/events';
import { BookingService } from 'src/app/services/booking/booking.service';
declare var gapi: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isSignedIn = false;

  bookings: IBooking[] = [];
  eventDetails: IEvents[] = [];
  onHoldBookings: IBooking[] = [];
  rescheduleBookings: IBooking[] = [];
  upcomingBookings: IBooking[] = [];
  cancelledBookings: IBooking[] = [];
  pastBookings: IBooking[] = [];
 completedBookings: IBooking[] = [];
  
  
  timingsData : any =[ ];
  upcomingTimingsData : any =[ ];
completedTimingsData : any =[ ];
  onHoldTimingsData : any =[ ];
  cancelledTimingsData : any =[ ];
  pastTimingsData : any =[ ];
  rescheduleTimingsData : any =[ ];

  
  username: string | null;
  fullNameCurrentUser: string | null;
  emailCurrentUser : string | null;
  userId: number | null;
  userTimezone: string = "";
  userToken: string | null;
  errMsg!: string;
  status: boolean = false;

  constructor(private spinner: NgxSpinnerService,private _bookingServices: BookingService, private zone: NgZone, private _toast: NgToastService, private _router: Router) {

    this.username = localStorage.getItem('userName');;
    this.userTimezone = "Asia/Calcutta";
    this.userId = Number(localStorage.getItem('userID'));
    this.userToken = localStorage.getItem('userToken');;
    this.fullNameCurrentUser = localStorage.getItem('fullName');
    this.emailCurrentUser = localStorage.getItem('emailAddress');
   }

  async ngOnInit() {
    this.getAllBookings();
    await this.loadGapi();
    gapi.load('client:auth2', this.initClient.bind(this));
  }

  getAllBookings() {
    this.spinner.show();
  
    this._bookingServices.getAllBookings(String(this.username)).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
      this.bookings = res;
      console.log(this.bookings);

     var getCurentDateOfUser = (moment.tz(moment(), this.userTimezone).format('LL'));
      var currentTime = (moment.tz(moment(), this.userTimezone)).format('LT');
    
      console.log(getCurentDateOfUser);
      console.log(currentTime);

      for(var i =0;i<this.bookings.length;i++)
      {
        if(this.bookings[i].bookingStatus == "On Hold")
        {
          this.onHoldBookings.push(this.bookings[i]);
          this.onHoldTimingsData.push(eval(this.bookings[i].bookedTime));
          console.log(this.onHoldBookings);
        }
        else if(this.bookings[i].bookingStatus == "Completed")
        {
          this.completedBookings.push(this.bookings[i]);
          this.completedTimingsData.push(eval(this.bookings[i].bookedTime));
        }
        else if(this.bookings[i].bookingStatus == "Cancelled")
        {
          this.cancelledBookings.push(this.bookings[i]);
          this.cancelledTimingsData.push(eval(this.bookings[i].bookedTime));
        }
        else if(this.bookings[i].bookingStatus == "Rescheduled")
        {
          this.rescheduleBookings.push(this.bookings[i]);
          this.rescheduleTimingsData.push(eval(this.bookings[i].bookedTime));
        }
        else if(this.bookings[i].bookingStatus == "Confirmed")
        {
          var intoJson = (eval(this.bookings[i].bookedTime));
          console.log((moment.tz(intoJson[0].userbookedDate, intoJson[0].userTimezone).format('YYYY-MM-DD'))  + " > "+ getCurentDateOfUser);

          var date1 = new Date(intoJson[0].userbookedDate);
          var date2 = new Date(getCurentDateOfUser);
        
          if(date1.getTime() < date2.getTime()){
            this.pastBookings.push(this.bookings[i]);
            this.pastTimingsData.push(eval(this.bookings[i].bookedTime));
          }
          else{
            this.upcomingBookings.push(this.bookings[i]);
            this.upcomingTimingsData.push(eval(this.bookings[i].bookedTime));
          }
                  
        }
        else
        {
          this.pastBookings.push(this.bookings[i]);
          this.pastTimingsData.push(eval(this.bookings[i].bookedTime));
        }
      }
      console.log(this.rescheduleBookings);
      console.log(this.rescheduleTimingsData);
      console.log(this.timingsData);

    }, err => {
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.bookings = [];
       this.errMsg = err;
       console.log(this.errMsg)
    }, () => console.log("Get All Bookings method excuted successfully"))
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
      //  this.addUpcomingEvents();
      this._toast.success({ detail: "SUCCESS", summary: 'Integrated Google Calendar ', position: 'br' });

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