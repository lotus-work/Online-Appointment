import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { IBooking } from 'src/app/interface/booking';
import { IEvents } from 'src/app/interface/events';
import { BookingService } from 'src/app/services/booking/booking.service';
import { EventsService } from 'src/app/services/events/events.service';
import { UserService } from 'src/app/services/user/user.service';
import * as moment from 'moment';
import * as momenttm from 'moment-timezone';
declare var gapi : any;
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {

 
  timeZoneArr = [
    {"label":"(GMT-12:00) International Date Line West","value":"Etc/GMT+12", status: "false" },
    {"label":"(GMT-11:00) Midway Island, Samoa","value":"Pacific/Midway", status: "false" },
    {"label":"(GMT-10:00) Hawaii","value":"Pacific/Honolulu", status: "false" },
    {"label":"(GMT-09:00) Alaska","value":"US/Alaska", status: "false" },
    {"label":"(GMT-08:00) Pacific Time (US & Canada)","value":"America/Los_Angeles", status: "false" },
    {"label":"(GMT-08:00) Tijuana, Baja California","value":"America/Tijuana", status: "false" },
    {"label":"(GMT-07:00) Arizona","value":"US/Arizona", status: "false" },
    {"label":"(GMT-07:00) Chihuahua, La Paz, Mazatlan","value":"America/Chihuahua", status: "false" },
    {"label":"(GMT-07:00) Mountain Time (US & Canada)","value":"US/Mountain", status: "false" },
    {"label":"(GMT-06:00) Central America","value":"America/Managua", status: "false" },
    {"label":"(GMT-06:00) Central Time (US & Canada)","value":"US/Central", status: "false" },
    {"label":"(GMT-06:00) Guadalajara, Mexico City, Monterrey","value":"America/Mexico_City", status: "false" },
    {"label":"(GMT-06:00) Saskatchewan","value":"Canada/Saskatchewan", status: "false" },
    {"label":"(GMT-05:00) Bogota, Lima, Quito, Rio Branco","value":"America/Bogota", status: "false" },
    {"label":"(GMT-05:00) Eastern Time (US & Canada)","value":"US/Eastern", status: "false" },
    {"label":"(GMT-05:00) Indiana (East)","value":"US/East-Indiana", status: "false" },
    {"label":"(GMT-04:00) Atlantic Time (Canada)","value":"Canada/Atlantic", status: "false" },
    {"label":"(GMT-04:00) Caracas, La Paz","value":"America/Caracas", status: "false" },
    {"label":"(GMT-04:00) Manaus","value":"America/Manaus", status: "false" },
    {"label":"(GMT-04:00) Santiago","value":"America/Santiago", status: "false" },
    {"label":"(GMT-03:30) Newfoundland","value":"Canada/Newfoundland", status: "false" },
    {"label":"(GMT-03:00) Brasilia","value":"America/Sao_Paulo", status: "false" },
    {"label":"(GMT-03:00) Buenos Aires, Georgetown","value":"America/Argentina/Buenos_Aires", status: "false" },
    {"label":"(GMT-03:00) Greenland","value":"America/Godthab", status: "false" },
    {"label":"(GMT-03:00) Montevideo","value":"America/Montevideo", status: "false" },
    {"label":"(GMT-02:00) Mid-Atlantic","value":"America/Noronha", status: "false" },
    {"label":"(GMT-01:00) Cape Verde Is.","value":"Atlantic/Cape_Verde", status: "false" },
    {"label":"(GMT-01:00) Azores","value":"Atlantic/Azores", status: "false" },
    {"label":"(GMT+00:00) Casablanca, Monrovia, Reykjavik","value":"Africa/Casablanca", status: "false" },
    {"label":"(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London","value":"Etc/Greenwich", status: "false" },
    {"label":"(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna","value":"Europe/Amsterdam", status: "false" },
    {"label":"(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague","value":"Europe/Belgrade", status: "false" },
    {"label":"(GMT+01:00) Brussels, Copenhagen, Madrid, Paris","value":"Europe/Brussels", status: "false" },
    {"label":"(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb","value":"Europe/Sarajevo", status: "false" },
    {"label":"(GMT+01:00) West Central Africa","value":"Africa/Lagos", status: "false" },
    {"label":"(GMT+02:00) Amman","value":"Asia/Amman", status: "false" },
    {"label":"(GMT+02:00) Athens, Bucharest, Istanbul","value":"Europe/Athens", status: "false" },
    {"label":"(GMT+02:00) Beirut","value":"Asia/Beirut", status: "false" },
    {"label":"(GMT+02:00) Cairo","value":"Africa/Cairo", status: "false" },
    {"label":"(GMT+02:00) Harare, Pretoria","value":"Africa/Harare", status: "false" },
    {"label":"(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius","value":"Europe/Helsinki", status: "false" },
    {"label":"(GMT+02:00) Jerusalem","value":"Asia/Jerusalem", status: "false" },
    {"label":"(GMT+02:00) Minsk","value":"Europe/Minsk", status: "false" },
    {"label":"(GMT+02:00) Windhoek","value":"Africa/Windhoek", status: "false" },
    {"label":"(GMT+03:00) Kuwait, Riyadh, Baghdad","value":"Asia/Kuwait", status: "false" },
    {"label":"(GMT+03:00) Moscow, St. Petersburg, Volgograd","value":"Europe/Moscow", status: "false" },
    {"label":"(GMT+03:00) Nairobi","value":"Africa/Nairobi", status: "false" },
    {"label":"(GMT+03:00) Tbilisi","value":"Asia/Tbilisi", status: "false" },
    {"label":"(GMT+03:30) Tehran","value":"Asia/Tehran", status: "false" },
    {"label":"(GMT+04:00) Abu Dhabi, Muscat","value":"Asia/Muscat", status: "false" },
    {"label":"(GMT+04:00) Baku","value":"Asia/Baku", status: "false" },
    {"label":"(GMT+04:00) Yerevan","value":"Asia/Yerevan", status: "false" },
    {"label":"(GMT+04:30) Kabul","value":"Asia/Kabul", status: "false" },
    {"label":"(GMT+05:00) Yekaterinburg","value":"Asia/Yekaterinburg", status: "false" },
    {"label":"(GMT+05:00) Islamabad, Karachi, Tashkent","value":"Asia/Karachi", status: "false" },
    {"label":"(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi","value":"Asia/Calcutta", status: "false" },
    {"label":"(GMT+05:45) Kathmandu","value":"Asia/Katmandu", status: "false" },
    {"label":"(GMT+06:00) Almaty, Novosibirsk","value":"Asia/Almaty", status: "false" },
    {"label":"(GMT+06:00) Astana, Dhaka","value":"Asia/Dhaka", status: "false" },
    {"label":"(GMT+06:30) Yangon (Rangoon)","value":"Asia/Rangoon", status: "false" },
    {"label":"(GMT+07:00) Bangkok, Hanoi, Jakarta","value":"Asia/Bangkok", status: "false" },
    {"label":"(GMT+07:00) Krasnoyarsk","value":"Asia/Krasnoyarsk", status: "false" },
    {"label":"(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi","value":"Asia/Hong_Kong", status: "false" },
    {"label":"(GMT+08:00) Kuala Lumpur, Singapore","value":"Asia/Kuala_Lumpur", status: "false" },
    {"label":"(GMT+08:00) Irkutsk, Ulaan Bataar","value":"Asia/Irkutsk", status: "false" },
    {"label":"(GMT+08:00) Perth","value":"Australia/Perth", status: "false" },
    {"label":"(GMT+08:00) Taipei","value":"Asia/Taipei", status: "false" },
    {"label":"(GMT+09:00) Osaka, Sapporo, Tokyo","value":"Asia/Tokyo", status: "false" },
    {"label":"(GMT+09:00) Seoul","value":"Asia/Seoul", status: "false" },
    {"label":"(GMT+09:00) Yakutsk","value":"Asia/Yakutsk", status: "false" },
    {"label":"(GMT+09:30) Adelaide","value":"Australia/Adelaide", status: "false" },
    {"label":"(GMT+09:30) Darwin","value":"Australia/Darwin", status: "false" },
    {"label":"(GMT+10:00) Brisbane","value":"Australia/Brisbane", status: "false" },
    {"label":"(GMT+10:00) Canberra, Melbourne, Sydney","value":"Australia/Canberra", status: "false" },
    {"label":"(GMT+10:00) Hobart","value":"Australia/Hobart", status: "false" },
    {"label":"(GMT+10:00) Guam, Port Moresby","value":"Pacific/Guam", status: "false" },
    {"label":"(GMT+10:00) Vladivostok","value":"Asia/Vladivostok", status: "false" },
    {"label":"(GMT+11:00) Magadan, Solomon Is., New Caledonia","value":"Asia/Magadan", status: "false" },
    {"label":"(GMT+12:00) Auckland, Wellington","value":"Pacific/Auckland", status: "false" },
    {"label":"(GMT+12:00) Fiji, Kamchatka, Marshall Is.","value":"Pacific/Fiji", status: "false" },
    {"label":"(GMT+13:00) Nuku'alofa","value":"Pacific/Tongatapu", status: "false" }
  ]
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
  userId: string | null;
  userTimezone: string = "";
  errMsg!: string;
  status: boolean = false;

  constructor(private spinner: NgxSpinnerService,private _bookingServices: BookingService,private _usrServices : UserService,  private _evtServices: EventsService, private _toast: NgToastService, private route: ActivatedRoute,private zone: NgZone,private http: HttpClient,private _router: Router ) { 
    this.username = localStorage.getItem('userName');;
    this.userTimezone = "Asia/Calcutta";
    this.userId = String(localStorage.getItem('_id'));
    this.fullNameCurrentUser = localStorage.getItem('fullName');
    this.emailCurrentUser = localStorage.getItem('emailAddress');
  }

  async ngOnInit() {
    this.getAllBookings();
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

  addToCalendar(bookedEventId: string, indexNum: Number,bookingId: string) {

    this.spinner.show();
    this._evtServices.getEventById(String(this.userId), String(bookedEventId)).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
      this.eventDetails = res;
      console.log(this.eventDetails);
      var timezoneGMT= "";
    for(var i=0;i<this.timeZoneArr.length;i++)
    {
      if(this.timeZoneArr[i].value == this.upcomingTimingsData[Number(indexNum)][0].userTimezone)
      {
        console.log(this.timeZoneArr[i].label);
        timezoneGMT  = this.timeZoneArr[i].label;
      }
    }
   

    var timeZoneGMTFormatted =  timezoneGMT.slice(4, 10);
    var dateConvertMoment = moment(this.upcomingTimingsData[Number(indexNum)][0].userbookedDate).format('YYYY-MM-DD');  
    // console.log(indexNum);
    // console.log(this.upcomingTimingsData[0].bookedTimeZone);
    var starttimeConvert = moment(this.upcomingTimingsData[Number(indexNum)][0].userstartTime, ["h:mm A"]).format("HH:mm");
    var endtimeConvert = moment(this.upcomingTimingsData[Number(indexNum)][0].userEndTime, ["h:mm A"]).format("HH:mm");
    // console.log(timeZoneGMTFormatted + " "+ dateConvertMoment+ " "+ timeConvert);
    // 2022-04-14T09:00:00+05:30
    var startTime = dateConvertMoment+"T"+starttimeConvert+":00"+timeZoneGMTFormatted;
    var endTime = dateConvertMoment+"T"+endtimeConvert+":00"+timeZoneGMTFormatted;
    console.log(startTime);
      if(this.upcomingBookings[Number(indexNum)].appointmentGuestEmail == null)
      {
        var request =   gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          sendNotifications: true,
          sendUpdates: 'all',
          conferenceDataVersion: 1,
          'resource': {
            'summary': this.eventDetails[0].eventName ,
            'location': 'Google Meet',
            'description': this.eventDetails[0].description,
            
            'start': {
              'dateTime': startTime,
              'timeZone': this.upcomingTimingsData[Number(indexNum)].userTimezone
            },
            'end': {
              'dateTime': endTime,
              'timeZone': this.upcomingTimingsData[Number(indexNum)].userTimezone
            },
            'attendees': [
              {'email': this.upcomingBookings[Number(indexNum)].appointmentBookedEmail}
            ],
            "conferenceData": {
              "createRequest": {
                "conferenceSolutionKey": {
                  "type": "hangoutsMeet",
                },
                "requestId": "7qxalsvy0exxaje",
                
              }
            },
            
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          }
        })
    
        request.execute((resp: any) => {
          console.log(resp.status);

          if(resp.status == "confirmed")
          {
            // var appointWith = String(this.fullNameCurrentUser);
            // var appointWithEmail =  String(this.emailCurrentUser);
            // var eventSummary= this.eventDetails[0].eventName;
            // var dateEvent = this.upcomingTimingsData[Number(indexNum)][0].bookedDate;
            // var time= this.upcomingTimingsData[Number(indexNum)][0].bookedStartTime + " - " + this.upcomingTimingsData[Number(indexNum)][0].bookedEndTime;
            // var timezone =  this.upcomingTimingsData[Number(indexNum)][0].bookedTimeZone;
            // var location= resp.hangoutLink;
            // var eventAttendee=this.upcomingBookings[Number(indexNum)].appointmentBookedUsername ;
            // var eventAttendeeEmail = this.upcomingBookings[Number(indexNum)].appointmentBookedEmail;
            // var eventDesc= this.eventDetails[0].description;

            // this._bookingServices.sendMail(appointWith, appointWithEmail, eventSummary,dateEvent, time,timezone, location, eventAttendee,eventAttendeeEmail, eventDesc).subscribe(
            //   res =>{
            //     console.log(res);
            //   },
            //   err =>{
            //     console.log(err);
            //   },
            //   () => console.log("Send Mail Worked")
        
            // )

            this.updateConfirmationMailOnSent(String(bookingId));
           this._usrServices.sendPreScheduleMail(String(this.emailCurrentUser),this.upcomingBookings[Number(indexNum)].appointmentBookedEmail,String(this.fullNameCurrentUser),this.upcomingBookings[Number(indexNum)].bookedEventName).subscribe(
              res =>{
                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 1000);
                console.log(res);
              },
              err =>{
                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 1000);
                console.log(err);
              },
              () => console.log("Send Mail Worked")
            )
            this._toast.success({detail:"EMAIL SENT",summary:'Schedule Mail has been sent', position: 'br'});
            setTimeout(function () {
              window.location.reload();
            }, 2000);
        
        }
        });

      }
      else {
        var request =   gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          sendNotifications: true,
          sendUpdates: 'all',
          conferenceDataVersion: 1,
          'resource': {
            'summary': this.eventDetails[0].eventName,
            'location': 'Google Meet',
            'description': this.eventDetails[0].description,
            
            'start': {
              'dateTime': startTime,
              'timeZone': this.upcomingTimingsData[Number(indexNum)].userTimezone
            },
            'end': {
              'dateTime': endTime,
              'timeZone': this.upcomingTimingsData[Number(indexNum)].userTimezone
            },
            'attendees': [
              {'email': this.upcomingBookings[Number(indexNum)].appointmentBookedEmail},
              {'email': this.upcomingBookings[Number(indexNum)].appointmentGuestEmail}
            ],
            "conferenceData": {
              "createRequest": {
                "conferenceSolutionKey": {
                  "type": "hangoutsMeet",
                },
                "requestId": "7qxalsvy0exxaje",
                
              }
            },
            
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          }
        })
    
        request.execute((resp: any) => {
          console.log(resp);

          if(resp.status == "confirmed")
          {
            
            this.updateConfirmationMailOnSent(String(bookingId));
            this._usrServices.sendPreScheduleMail(String(this.emailCurrentUser),this.upcomingBookings[Number(indexNum)].appointmentBookedEmail,String(this.fullNameCurrentUser),this.upcomingBookings[Number(indexNum)].bookedEventName).subscribe(
              res =>{
                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 1000);
                console.log(res);
              },
              err =>{
                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 1000);
                console.log(err);
              },
              () => console.log("Send Mail Worked")
            )
            this._toast.success({detail:"EMAIL SENT",summary:'Schedule Mail has been sent', position: 'br'});
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          }
        });

      }
       
      
    }, err => {
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.eventDetails = [];
       this.errMsg = err;
       console.log(this.errMsg)
    }, () => console.log("Get All Events method excuted successfully"))   
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
         console.log(date1.getTime() + " | " +  date2.getTime());
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


  updateConfirmationMailOnSent(bookingId: string)
  {
    this.spinner.show();
    this._bookingServices.updateConfirmationOnMailSentEvent(String(this.username), bookingId).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        if(this.status == true)
        {
          this._toast.success({detail:"MAIL HAS BEEN SENT",summary:'Mail has been sent to the attendes', position: 'br'});
          // setTimeout(function () {
          //   window.location.reload();
          // }, 2000);
        }
        else{
          this._toast.warning({detail:"MAIL NOT SENT",summary:'Unable to send mail', position: 'br'});
          // setTimeout(function () {
          //   window.location.reload();
          // }, 2000);
        }
       
    },
    err =>{
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.errMsg = err;
      this._toast.warning({detail:"FAILED",summary:'Please try after sometime', position: 'br'});
  
    //  setTimeout(function () {
    //     window.location.reload();
    //   }, 2000);
    },
    () => console.log("Update Cofirmation mail on sent method excuted successfully"))
  }

  updateOnConfirm(bookingId: string, indexOfelement : any)
  {
    this.spinner.show();
    this._bookingServices.updateBookingOnConfirm(String(this.username), bookingId).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
  
        if(this.status == true)
        {
          var timeAndTimeZone  = this.onHoldTimingsData[indexOfelement][0].userstartTime + " - "+  this.onHoldTimingsData[indexOfelement][0].userEndTime +  "( " + this.onHoldTimingsData[indexOfelement][0].userTimezone  + " )";
          var evtDate = this.onHoldTimingsData[indexOfelement][0].userbookedDate;
          this._usrServices.sendBookingAcceptMail(String(this.emailCurrentUser),this.onHoldBookings[indexOfelement].appointmentBookedEmail,String(this.fullNameCurrentUser),this.onHoldBookings[indexOfelement].bookedEventName, String(this.username),timeAndTimeZone,evtDate).subscribe(
            res =>{
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              console.log(res);
            },
            err =>{
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              console.log(err);
            },
            () => console.log("Send Mail Worked")
          )
          this._toast.success({detail:"BOOKING IS CONFIRMED",summary:'The meeting has been confirmed', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
        else{
          this._toast.warning({detail:"UNABLE TO CONFIRM",summary:'Unable to confirm the meeting', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
       
    },
    err =>{
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.errMsg = err;
      this._toast.warning({detail:"FAILED",summary:'Please try after sometime', position: 'br'});
  
     setTimeout(function () {
        window.location.reload();
      }, 2000);
    },
    () => console.log("Update Booking on Confirm method excuted successfully"))
  }

  updateOnReject(bookingId: string, indexOfelement: any)
  {
    this.spinner.show();
    this._bookingServices.updateBookingOnReject(String(this.username), bookingId).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
    
        if(this.status == true)
        {
          var timeAndTimeZone  = this.onHoldTimingsData[indexOfelement][0].userstartTime + " - "+  this.onHoldTimingsData[indexOfelement][0].userEndTime +  "( " + this.onHoldTimingsData[indexOfelement][0].userTimezone  + " )";
          var evtDate = this.onHoldTimingsData[indexOfelement][0].userbookedDate;
          this._usrServices.sendBookingRejectMail(String(this.emailCurrentUser),this.onHoldBookings[indexOfelement].appointmentBookedEmail,String(this.fullNameCurrentUser),this.onHoldBookings[indexOfelement].bookedEventName, String(this.username),timeAndTimeZone,evtDate).subscribe(
            res =>{
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              console.log(res);
            },
            err =>{
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              console.log(err);
            },
            () => console.log("Send Mail Worked")
          )
          this._toast.success({detail:"BOOKING IS REJECTED",summary:'The meeting has been rejected', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
        else{
          this._toast.warning({detail:"UNABLE TO REJECT",summary:'Unable to reject the meeting', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
       
    },
    err =>{
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.errMsg = err;
      this._toast.warning({detail:"FAILED",summary:'Please try after sometime', position: 'br'});
  
     setTimeout(function () {
        window.location.reload();
      }, 2000);
    },
    () => console.log("Update Booking on Reject method excuted successfully"))
  }

 

  updateOnComplete(bookingId: string)
  {
    this.spinner.show();
    this._bookingServices.updateBookingOnComplete(String(this.username), bookingId).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        if(this.status == true)
        {
          this._toast.success({detail:"MEETING IS COMPLETED",summary:'The meeting has been confirmed', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
        else{
          this._toast.warning({detail:"UNABLE TO PROCCED",summary:'Unable to set as completed', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
       
    },
    err =>{
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.errMsg = err;
      this._toast.warning({detail:"FAILED",summary:'Please try after sometime', position: 'br'});
  
     setTimeout(function () {
        window.location.reload();
      }, 2000);
    },
    () => console.log("Update Booking on Complete method excuted successfully"))
  }
  updateOnCancelPast(bookingId: string, indexOfelement: number)
  {
    this.spinner.show();
    this._bookingServices.updateBookingOnCancel(String(this.username), bookingId).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        if(this.status == true)
        {
           var timeAndTimeZone  = this.pastTimingsData[indexOfelement][0].userstartTime + " - "+  this.pastTimingsData[indexOfelement][0].userEndTime +  "( " + this.pastTimingsData[indexOfelement][0].userTimezone  + " )";
          var evtDate = this.pastTimingsData[indexOfelement][0].userbookedDate;
         
          this._usrServices.sendCancelMail(String(this.emailCurrentUser),this.pastBookings[indexOfelement].appointmentBookedEmail,String(this.fullNameCurrentUser),this.pastBookings[indexOfelement].bookedEventName, String(this.username),timeAndTimeZone,evtDate).subscribe(
            res =>{
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              console.log(res);
            },
            err =>{
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              console.log(err);
            },
            () => console.log("Send Mail Worked")
          )
          this._toast.success({detail:"BOOKING IS CANCELLED",summary:'The meeting has been cancel', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
        else{
          this._toast.warning({detail:"UNABLE TO CANCEL",summary:'Unable to cancel the meeting', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
       
    },
    err =>{
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.errMsg = err;
      this._toast.warning({detail:"FAILED",summary:'Please try after sometime', position: 'br'});
  
     setTimeout(function () {
        window.location.reload();
      }, 2000);
    },
    () => console.log("Update Booking on cancel method excuted successfully"))
  }
  updateOnCancelUpcoming(bookingId: string, indexOfelement: number)
  {
    this.spinner.show();
    this._bookingServices.updateBookingOnCancel(String(this.username), bookingId).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        if(this.status == true)
        {
           var timeAndTimeZone  = this.upcomingTimingsData[indexOfelement][0].userstartTime + " - "+  this.upcomingTimingsData[indexOfelement][0].userEndTime +  "( " + this.upcomingTimingsData[indexOfelement][0].userTimezone  + " )";
          var evtDate = this.upcomingTimingsData[indexOfelement][0].userbookedDate;
         
          this._usrServices.sendCancelMail(String(this.emailCurrentUser),this.upcomingBookings[indexOfelement].appointmentBookedEmail,String(this.fullNameCurrentUser),this.upcomingBookings[indexOfelement].bookedEventName, String(this.username),timeAndTimeZone,evtDate).subscribe(
            res =>{
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              console.log(res);
            },
            err =>{
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              console.log(err);
            },
            () => console.log("Send Mail Worked")
          )
          this._toast.success({detail:"BOOKING IS CANCELLED",summary:'The meeting has been cancel', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
        else{
          this._toast.warning({detail:"UNABLE TO CANCEL",summary:'Unable to cancel the meeting', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
       
    },
    err =>{
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.errMsg = err;
      this._toast.warning({detail:"FAILED",summary:'Please try after sometime', position: 'br'});
  
     setTimeout(function () {
        window.location.reload();
      }, 2000);
    },
    () => console.log("Update Booking on cancel method excuted successfully"))
  }
  updateOnCancelReschedule(bookingId: string, indexOfelement: number)
  {
    this.spinner.show();
    this._bookingServices.updateBookingOnCancel(String(this.username), bookingId).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        if(this.status == true)
        {
           var timeAndTimeZone  = this.rescheduleTimingsData[indexOfelement][0].userstartTime + " - "+  this.rescheduleTimingsData[indexOfelement][0].userEndTime +  "( " + this.rescheduleTimingsData[indexOfelement][0].userTimezone  + " )";
          var evtDate = this.rescheduleTimingsData[indexOfelement][0].userbookedDate;
         
          this._usrServices.sendCancelMail(String(this.emailCurrentUser),this.rescheduleBookings[indexOfelement].appointmentBookedEmail,String(this.fullNameCurrentUser),this.rescheduleBookings[indexOfelement].bookedEventName, String(this.username),timeAndTimeZone,evtDate).subscribe(
            res =>{
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              console.log(res);
            },
            err =>{
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              console.log(err);
            },
            () => console.log("Send Mail Worked")
          )
          this._toast.success({detail:"BOOKING IS CANCELLED",summary:'The meeting has been cancel', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
        else{
          this._toast.warning({detail:"UNABLE TO CANCEL",summary:'Unable to cancel the meeting', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
       
    },
    err =>{
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.errMsg = err;
      this._toast.warning({detail:"FAILED",summary:'Please try after sometime', position: 'br'});
  
     setTimeout(function () {
        window.location.reload();
      }, 2000);
    },
    () => console.log("Update Booking on cancel method excuted successfully"))
  }

  updateOnRescheduleFromPast(bookingId: string, indexOfelement: number)
  {
    this.spinner.show();
    this._bookingServices.updateBookingOnReschedule(String(this.username), bookingId).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        if(this.status == true)
        {
          var timeAndTimeZone  = this.pastTimingsData[indexOfelement][0].userstartTime + " - "+  this.pastTimingsData[indexOfelement][0].userEndTime +  "( " + this.pastTimingsData[indexOfelement][0].userTimezone  + " )";
          var evtDate = this.pastTimingsData[indexOfelement][0].userbookedDate;
          this._usrServices.sendRescheduleMail(String(this.emailCurrentUser),this.pastBookings[indexOfelement].appointmentBookedEmail,String(this.fullNameCurrentUser),this.pastBookings[indexOfelement].bookedEventName, String(this.username),timeAndTimeZone,evtDate).subscribe(
            res =>{
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              console.log(res);
            },
            err =>{
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              console.log(err);
            },
            () => console.log("Send Mail Worked")
          )
       
          this._toast.success({detail:"BOOKING IS RESCHEDULED",summary:'Reschedule mail has been sent', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
        else{
          this._toast.warning({detail:"UNABLE TO RESCHEDULE",summary:'Unable to send mail', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
       
    },
    err =>{
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.errMsg = err;
      this._toast.warning({detail:"FAILED",summary:'Please try after sometime', position: 'br'});
  
     setTimeout(function () {
        window.location.reload();
      }, 2000);
    },
    () => console.log("Update Booking on Reschedule method excuted successfully"))
  }

  updateOnRescheduleFromUpcoming(bookingId: string, indexOfelement: number)
  {
    this.spinner.show();
    this._bookingServices.updateBookingOnReschedule(String(this.username), bookingId).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        if(this.status == true)
        {
          var timeAndTimeZone  = this.upcomingTimingsData[indexOfelement][0].userstartTime + " - "+  this.upcomingTimingsData[indexOfelement][0].userEndTime +  "( " + this.upcomingTimingsData[indexOfelement][0].userTimezone  + " )";
          var evtDate = this.upcomingTimingsData[indexOfelement][0].userbookedDate;
          this._usrServices.sendRescheduleMail(String(this.emailCurrentUser),this.upcomingBookings[indexOfelement].appointmentBookedEmail,String(this.fullNameCurrentUser),this.upcomingBookings[indexOfelement].bookedEventName, String(this.username),timeAndTimeZone,evtDate).subscribe(
            res =>{
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              console.log(res);
            },
            err =>{
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              console.log(err);
            },
            () => console.log("Send Mail Worked")
          )
       
          this._toast.success({detail:"BOOKING IS RESCHEDULED",summary:'Reschedule mail has been sent', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
        else{
          this._toast.warning({detail:"UNABLE TO RESCHEDULE",summary:'Unable to send mail', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
       
    },
    err =>{
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.errMsg = err;
      this._toast.warning({detail:"FAILED",summary:'Please try after sometime', position: 'br'});
  
     setTimeout(function () {
        window.location.reload();
      }, 2000);
    },
    () => console.log("Update Booking on Reschedule method excuted successfully"))
  }

  
}