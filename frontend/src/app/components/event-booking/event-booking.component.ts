import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { IAvailibility } from 'src/app/interface/availibility';
import { IEvents } from 'src/app/interface/events';
import { IUsers } from 'src/app/interface/users';
import { BookingService } from 'src/app/services/booking/booking.service';
import { UserService } from 'src/app/services/user/user.service';

import * as moment from 'moment';
import * as momenttm from 'moment-timezone';
import { EventsService } from 'src/app/services/events/events.service';
import { AvailibilityService } from 'src/app/services/availibility/availibility.service';
@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.css']
})
export class EventBookingComponent {
  timeZoneArr = [
    { "label": "(GMT-12:00) International Date Line West", "value": "Etc/GMT+12", status: "false" },
    { "label": "(GMT-11:00) Midway Island, Samoa", "value": "Pacific/Midway", status: "false" },
    { "label": "(GMT-10:00) Hawaii", "value": "Pacific/Honolulu", status: "false" },
    { "label": "(GMT-09:00) Alaska", "value": "US/Alaska", status: "false" },
    { "label": "(GMT-08:00) Pacific Time (US & Canada)", "value": "America/Los_Angeles", status: "false" },
    { "label": "(GMT-08:00) Tijuana, Baja California", "value": "America/Tijuana", status: "false" },
    { "label": "(GMT-07:00) Arizona", "value": "US/Arizona", status: "false" },
    { "label": "(GMT-07:00) Chihuahua, La Paz, Mazatlan", "value": "America/Chihuahua", status: "false" },
    { "label": "(GMT-07:00) Mountain Time (US & Canada)", "value": "US/Mountain", status: "false" },
    { "label": "(GMT-06:00) Central America", "value": "America/Managua", status: "false" },
    { "label": "(GMT-06:00) Central Time (US & Canada)", "value": "US/Central", status: "false" },
    { "label": "(GMT-06:00) Guadalajara, Mexico City, Monterrey", "value": "America/Mexico_City", status: "false" },
    { "label": "(GMT-06:00) Saskatchewan", "value": "Canada/Saskatchewan", status: "false" },
    { "label": "(GMT-05:00) Bogota, Lima, Quito, Rio Branco", "value": "America/Bogota", status: "false" },
    { "label": "(GMT-05:00) Eastern Time (US & Canada)", "value": "US/Eastern", status: "false" },
    { "label": "(GMT-05:00) Indiana (East)", "value": "US/East-Indiana", status: "false" },
    { "label": "(GMT-04:00) Atlantic Time (Canada)", "value": "Canada/Atlantic", status: "false" },
    { "label": "(GMT-04:00) Caracas, La Paz", "value": "America/Caracas", status: "false" },
    { "label": "(GMT-04:00) Manaus", "value": "America/Manaus", status: "false" },
    { "label": "(GMT-04:00) Santiago", "value": "America/Santiago", status: "false" },
    { "label": "(GMT-03:30) Newfoundland", "value": "Canada/Newfoundland", status: "false" },
    { "label": "(GMT-03:00) Brasilia", "value": "America/Sao_Paulo", status: "false" },
    { "label": "(GMT-03:00) Buenos Aires, Georgetown", "value": "America/Argentina/Buenos_Aires", status: "false" },
    { "label": "(GMT-03:00) Greenland", "value": "America/Godthab", status: "false" },
    { "label": "(GMT-03:00) Montevideo", "value": "America/Montevideo", status: "false" },
    { "label": "(GMT-02:00) Mid-Atlantic", "value": "America/Noronha", status: "false" },
    { "label": "(GMT-01:00) Cape Verde Is.", "value": "Atlantic/Cape_Verde", status: "false" },
    { "label": "(GMT-01:00) Azores", "value": "Atlantic/Azores", status: "false" },
    { "label": "(GMT+00:00) Casablanca, Monrovia, Reykjavik", "value": "Africa/Casablanca", status: "false" },
    { "label": "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London", "value": "Etc/Greenwich", status: "false" },
    { "label": "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna", "value": "Europe/Amsterdam", status: "false" },
    { "label": "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague", "value": "Europe/Belgrade", status: "false" },
    { "label": "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris", "value": "Europe/Brussels", status: "false" },
    { "label": "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb", "value": "Europe/Sarajevo", status: "false" },
    { "label": "(GMT+01:00) West Central Africa", "value": "Africa/Lagos", status: "false" },
    { "label": "(GMT+02:00) Amman", "value": "Asia/Amman", status: "false" },
    { "label": "(GMT+02:00) Athens, Bucharest, Istanbul", "value": "Europe/Athens", status: "false" },
    { "label": "(GMT+02:00) Beirut", "value": "Asia/Beirut", status: "false" },
    { "label": "(GMT+02:00) Cairo", "value": "Africa/Cairo", status: "false" },
    { "label": "(GMT+02:00) Harare, Pretoria", "value": "Africa/Harare", status: "false" },
    { "label": "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius", "value": "Europe/Helsinki", status: "false" },
    { "label": "(GMT+02:00) Jerusalem", "value": "Asia/Jerusalem", status: "false" },
    { "label": "(GMT+02:00) Minsk", "value": "Europe/Minsk", status: "false" },
    { "label": "(GMT+02:00) Windhoek", "value": "Africa/Windhoek", status: "false" },
    { "label": "(GMT+03:00) Kuwait, Riyadh, Baghdad", "value": "Asia/Kuwait", status: "false" },
    { "label": "(GMT+03:00) Moscow, St. Petersburg, Volgograd", "value": "Europe/Moscow", status: "false" },
    { "label": "(GMT+03:00) Nairobi", "value": "Africa/Nairobi", status: "false" },
    { "label": "(GMT+03:00) Tbilisi", "value": "Asia/Tbilisi", status: "false" },
    { "label": "(GMT+03:30) Tehran", "value": "Asia/Tehran", status: "false" },
    { "label": "(GMT+04:00) Abu Dhabi, Muscat", "value": "Asia/Muscat", status: "false" },
    { "label": "(GMT+04:00) Baku", "value": "Asia/Baku", status: "false" },
    { "label": "(GMT+04:00) Yerevan", "value": "Asia/Yerevan", status: "false" },
    { "label": "(GMT+04:30) Kabul", "value": "Asia/Kabul", status: "false" },
    { "label": "(GMT+05:00) Yekaterinburg", "value": "Asia/Yekaterinburg", status: "false" },
    { "label": "(GMT+05:00) Islamabad, Karachi, Tashkent", "value": "Asia/Karachi", status: "false" },
    { "label": "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi", "value": "Asia/Calcutta", status: "false" },
    { "label": "(GMT+05:45) Kathmandu", "value": "Asia/Katmandu", status: "false" },
    { "label": "(GMT+06:00) Almaty, Novosibirsk", "value": "Asia/Almaty", status: "false" },
    { "label": "(GMT+06:00) Astana, Dhaka", "value": "Asia/Dhaka", status: "false" },
    { "label": "(GMT+06:30) Yangon (Rangoon)", "value": "Asia/Rangoon", status: "false" },
    { "label": "(GMT+07:00) Bangkok, Hanoi, Jakarta", "value": "Asia/Bangkok", status: "false" },
    { "label": "(GMT+07:00) Krasnoyarsk", "value": "Asia/Krasnoyarsk", status: "false" },
    { "label": "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi", "value": "Asia/Hong_Kong", status: "false" },
    { "label": "(GMT+08:00) Kuala Lumpur, Singapore", "value": "Asia/Kuala_Lumpur", status: "false" },
    { "label": "(GMT+08:00) Irkutsk, Ulaan Bataar", "value": "Asia/Irkutsk", status: "false" },
    { "label": "(GMT+08:00) Perth", "value": "Australia/Perth", status: "false" },
    { "label": "(GMT+08:00) Taipei", "value": "Asia/Taipei", status: "false" },
    { "label": "(GMT+09:00) Osaka, Sapporo, Tokyo", "value": "Asia/Tokyo", status: "false" },
    { "label": "(GMT+09:00) Seoul", "value": "Asia/Seoul", status: "false" },
    { "label": "(GMT+09:00) Yakutsk", "value": "Asia/Yakutsk", status: "false" },
    { "label": "(GMT+09:30) Adelaide", "value": "Australia/Adelaide", status: "false" },
    { "label": "(GMT+09:30) Darwin", "value": "Australia/Darwin", status: "false" },
    { "label": "(GMT+10:00) Brisbane", "value": "Australia/Brisbane", status: "false" },
    { "label": "(GMT+10:00) Canberra, Melbourne, Sydney", "value": "Australia/Canberra", status: "false" },
    { "label": "(GMT+10:00) Hobart", "value": "Australia/Hobart", status: "false" },
    { "label": "(GMT+10:00) Guam, Port Moresby", "value": "Pacific/Guam", status: "false" },
    { "label": "(GMT+10:00) Vladivostok", "value": "Asia/Vladivostok", status: "false" },
    { "label": "(GMT+11:00) Magadan, Solomon Is., New Caledonia", "value": "Asia/Magadan", status: "false" },
    { "label": "(GMT+12:00) Auckland, Wellington", "value": "Pacific/Auckland", status: "false" },
    { "label": "(GMT+12:00) Fiji, Kamchatka, Marshall Is.", "value": "Pacific/Fiji", status: "false" },
    { "label": "(GMT+13:00) Nuku'alofa", "value": "Pacific/Tongatapu", status: "false" }
  ]
  timeSlotIntervals: number = 0;
  str = [
    {
      "id": 1,
      "aria_controls": "panelsStayOpen-collapseOne",
      "arial_abelledby": "panelsStayOpen-headingOne",
      "week_name": "Monday",
      "status": false,
      "available_timings": [
        {
          "id": 2,
          "start_time": "09:00 AM",
          "end_time": "11:00 AM"
        },
        {
          "id": 2,
          "start_time": "12:00 PM",
          "end_time": "14:00 PM"
        },
        {
          "id": 3,
          "start_time": "16:00 PM",
          "end_time": "18:00 PM"
        }
      ]
    },
    {
      "id": 2,
      "aria_controls": "panelsStayOpen-collapseTwo",
      "arial_abelledby": "panelsStayOpen-headingTwo",
      "week_name": "Tuesday",
      "status": false,
      "available_timings": [
        {
          "id": 1,
          "start_time": "09:00 AM",
          "end_time": "17:00 PM"
        }
      ]
    },
    {
      "id": 3,
      "aria_controls": "panelsStayOpen-collapseThree",
      "arial_abelledby": "panelsStayOpen-headingThree",
      "week_name": "Wednesday",
      "status": false,
      "available_timings": [
        {
          "id": 1,
          "start_time": "09:00 AM",
          "end_time": "17:00 PM"
        }
      ]
    },
    {
      "id": 4,
      "aria_controls": "panelsStayOpen-collapseFour",
      "arial_abelledby": "panelsStayOpen-headingFour",
      "week_name": "Thursday",
      "status": false,
      "available_timings": [
        {
          "id": 1,
          "start_time": "09:00 AM",
          "end_time": "17:00 PM"
        }
      ]
    },
    {
      "id": 5,
      "aria_controls": "panelsStayOpen-collapseFive",
      "arial_abelledby": "panelsStayOpen-headingFive",
      "week_name": "Friday",
      "status": false,
      "available_timings": [
        {
          "id": 1,
          "start_time": "09:00 AM",
          "end_time": "17:00 PM"
        }
      ]
    },
    {
      "id": 6,
      "aria_controls": "panelsStayOpen-collapseSix",
      "arial_abelledby": "panelsStayOpen-headingSix",
      "week_name": "Saturday",
      "status": false,
      "available_timings": []
    },
    {
      "id": 7,
      "aria_controls": "panelsStayOpen-collapseSeven",
      "arial_abelledby": "panelsStayOpen-headingSeven",
      "week_name": "Sunday",
      "status": false,
      "available_timings": []
    }
  ];

  slotConfig: any = [{
    "configSlotHours": "0",
    "configSlotMinutes": "0",
    "configSlotPreparation": "0",
    "timeArr": [

    ]
  }];

  userOriginalSlot: any = [
  ];

  bookedTimings = [
    {
      userbookedDate: "",
      userstartTime: "",
      userEndTime: "",
      userTimezone: "",
      userWeekname: "",
      bookedDate: "",
      bookedStartTime: "",
      bookedEndTime: "",
      bookedTimeZone: "",
      bookedWeekname: ""

    }
  ];

  setDeafultDateset: string = "";

  generatedTimingArr: any = [];


  timezoneGetValueOption: string = "Asia/Calcutta";


  user: IUsers[] = [];
  event: IEvents[] = [];
  availibility: IAvailibility[] = [];
  status: any;
  userId: string  = "";
  userName: string = "";
  errMsg!: string;
  availUserNameParams: string;
  eventParams: string;
  eventTitle: string = "";
  eventCheckGuestStatus: string = "";
  eventDesc: string = "";
  availibilityTimezone: string = "";
  eventDuration: number = 1;
  showMe: boolean = true;
  bookedStartTime: string = "";
  bookedEndTime: string = "";
  bookedTimeZone: string = "";
  bookedWeekname: string = "";
  bookedDate: string = "";
  getTodayDateByInput: string = "";
  bookedTimingsOfUser: any = [];
  preBookedData: any = [];

  deleteBookedTime: any = [];
  userProfilePicture: string = "";
  constructor(private spinner: NgxSpinnerService, private _bookingServices: BookingService, private _userService: UserService, private _eventsService: EventsService, private _availibilityService:AvailibilityService, private _usrServices: UserService, private _toast: NgToastService, private route: ActivatedRoute) {

    const routeParams = this.route.snapshot.paramMap;
    this.availUserNameParams = String(routeParams.get('username'));
    this.eventParams = String(routeParams.get('event_id'));


    this.setDeafultDateset = moment().format('YYYY-MM-DD');
    this.getUserData();

  }

  ngOnInit(): void {



    this.getAllBookings();
    var setDeafultDate = document.getElementById("bookingDate") as HTMLInputElement;
    setDeafultDate.defaultValue = moment().format('YYYY-MM-DD');

    var getDate = document.querySelector("#bookingDate") as HTMLInputElement;
    var getTimezoneVal = document.getElementById("timezone") as HTMLInputElement;
    var timezoneget = getTimezoneVal.value;
    // console.log(timezoneget);
    // console.log(getDate.value); 
    this.getTodayDateByInput = getDate.value;
    var currentDayTimeTextVal = document.getElementById("currentDayTimeText") as HTMLInputElement;

    currentDayTimeTextVal.innerText = moment(getDate.value).format('dddd') + ", " + moment(getDate.value).format('LL');
    // console.log(this.timezoneGetValueOption);
    // console.log(getDate.value); 

    /// RESET AFTER TIMEZONE CHNAGE
    var chnageOfTimeZone = momenttm.tz(this.timezoneGetValueOption);
    // console.log( moment(chnageOfTimeZone).format('L') );
    setDeafultDate.defaultValue = moment(chnageOfTimeZone).format('YYYY-MM-DD');
    currentDayTimeTextVal.innerText = moment(moment(chnageOfTimeZone).format('YYYY-MM-DD')).format('dddd') + ", " + moment(moment(chnageOfTimeZone).format('YYYY-MM-DD')).format('LL');



    //   if(moment(getDate.value).format('dddd') == "Monday")
    //   {
    //     // console.log(this.timezoneGetValueOption);
    //      let jsonData = JSON.stringify(this.slotMaker(0,moment().format('YYYY-MM-DD'), this.timezoneGetValueOption));

    //     this.generatedTimingArr = eval(jsonData);
    //   }
    //   else if(moment(getDate.value).format('dddd') == "Tuesday")
    //   {
    //     // console.log(this.timezoneGetValueOption);
    //    let jsonData = JSON.stringify(this.slotMaker(1,moment().format('YYYY-MM-DD'), this.timezoneGetValueOption));
    //    this.generatedTimingArr = eval(jsonData);

    //   }
    //   else if(moment(getDate.value).format('dddd') == "Wednesday")
    //   {
    //    let jsonData = JSON.stringify(this.slotMaker(2,moment().format('YYYY-MM-DD'), this.timezoneGetValueOption));
    //    this.generatedTimingArr = eval(jsonData);

    //   }
    //   else if(moment(getDate.value).format('dddd') == "Thursday")
    //   {
    //    let jsonData = JSON.stringify(this.slotMaker(3,moment().format('YYYY-MM-DD'), this.timezoneGetValueOption));
    //    this.generatedTimingArr = eval(jsonData);

    //   }
    //   else if(moment(getDate.value).format('dddd') == "Friday")
    //   {
    //    let jsonData = JSON.stringify(this.slotMaker(4,moment().format('YYYY-MM-DD'), this.timezoneGetValueOption));
    //    this.generatedTimingArr = eval(jsonData);

    //   }
    //   else if(moment(getDate.value).format('dddd') == "Saturday")
    //   {
    //    let jsonData = JSON.stringify(this.slotMaker(5,moment().format('YYYY-MM-DD'), this.timezoneGetValueOption));
    //    this.generatedTimingArr = eval(jsonData);

    //   }
    //   else if (moment(getDate.value).format('dddd') == "Sunday")
    //   {
    //    let jsonData = JSON.stringify(this.slotMaker(6,moment().format('YYYY-MM-DD'), this.timezoneGetValueOption));
    //    this.generatedTimingArr = eval(jsonData);

    //   }
    //  else{
    //   this.generatedTimingArr = [];
    //  }



  }



  getUserData() {
    this.spinner.show();
    this._userService.publicgetUserData(this.availUserNameParams).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.user = res;
        // console.log(this.user);
        this.userName = this.user[0].fullName;
        this.userId = this.user[0]._id;
        this.userProfilePicture = this.user[0].profilePicture;

        if (this.user[0].username == this.availUserNameParams) {
          this._eventsService.publicgetEventData(this.user[0]._id, this.eventParams).subscribe(
            res => {
              this.event = res;
              // console.log(this.event);
              this.eventTitle = this.event[0].title;
              this.eventDesc = this.event[0].description;
              this.eventDuration = this.event[0].length;
              this.timeSlotIntervals = this.event[0].timeSlotIntervals;
              this.eventCheckGuestStatus = this.event[0].disableGuests;
              if (this.user[0].username == this.availUserNameParams) {
                this._availibilityService.publicgetAvaibilityData(this.user[0]._id, this.event[0].availabilityId).subscribe(
                  res => {
                    setTimeout(() => {
                      /** spinner ends after 5 seconds */
                      this.spinner.hide();
                    }, 1000);
                    this.availibility = res;
                    // console.log(this.availibility);
                    this.str = eval(this.availibility[0].weeksAvailability);
                    this.availibilityTimezone = this.availibility[0].timezone;
                    this.timezoneGetValueOption = this.availibility[0].timezone;

                    for (var tz = 0; tz < this.timeZoneArr.length; tz++) {
                      if (this.timeZoneArr[tz].value == this.availibility[0].timezone) {
                        this.timeZoneArr[tz].status = "true";
                      }
                    }
                    if (moment().format('dddd') == "Monday") {
                      // console.log(this.timezoneGetValueOption);
                      let jsonData = JSON.stringify(this.slotMaker(0, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
                      this.generatedTimingArr = eval(jsonData);

                      let userjsonData = JSON.stringify(this.slotMaker(0, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
                      this.userOriginalSlot = eval(userjsonData);
                    }

                    else if (moment().format('dddd') == "Tuesday") {
                      // console.log(this.timezoneGetValueOption);
                      let jsonData = JSON.stringify(this.slotMaker(1, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
                      this.generatedTimingArr = eval(jsonData);


                      let userjsonData = JSON.stringify(this.slotMaker(1, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
                      this.userOriginalSlot = eval(userjsonData);


                    }
                    else if (moment().format('dddd') == "Wednesday") {
                      let jsonData = JSON.stringify(this.slotMaker(2, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
                      this.generatedTimingArr = eval(jsonData);

                      let userjsonData = JSON.stringify(this.slotMaker(2, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
                      this.userOriginalSlot = eval(userjsonData);

                    }
                    else if (moment().format('dddd') == "Thursday") {
                      let jsonData = JSON.stringify(this.slotMaker(3, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
                      this.generatedTimingArr = eval(jsonData);

                      let userjsonData = JSON.stringify(this.slotMaker(3, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
                      this.userOriginalSlot = eval(userjsonData);

                    }
                    else if (moment().format('dddd') == "Friday") {
                      let jsonData = JSON.stringify(this.slotMaker(4, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
                      this.generatedTimingArr = eval(jsonData);

                      let userjsonData = JSON.stringify(this.slotMaker(4, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
                      this.userOriginalSlot = eval(userjsonData);

                    }
                    else if (moment().format('dddd') == "Saturday") {
                      let jsonData = JSON.stringify(this.slotMaker(5, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
                      this.generatedTimingArr = eval(jsonData);

                      let userjsonData = JSON.stringify(this.slotMaker(5, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
                      this.userOriginalSlot = eval(userjsonData);

                    }
                    else if (moment().format('dddd') == "Sunday") {
                      let jsonData = JSON.stringify(this.slotMaker(6, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
                      this.generatedTimingArr = eval(jsonData);

                      let userjsonData = JSON.stringify(this.slotMaker(6, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
                      this.userOriginalSlot = eval(userjsonData);

                    }
                    else {
                      this.generatedTimingArr = [];
                    }

                    // this.eventDesc = this.event[0].description;
                  }, err => {
                    setTimeout(() => {
                      /** spinner ends after 5 seconds */
                      this.spinner.hide();
                    }, 1000);
                    this.user = [];
                    this.errMsg = err;
                    // console.log(this.errMsg)
                  }, () => console.log("Get Availbility Data method excuted successfully"))
              }
            }, err => {
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              this.user = [];
              this.errMsg = err;
              console.log(this.errMsg)
            }, () => console.log("Get Event Data method excuted successfully"))
        }

      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.user = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get User Data method excuted successfully"))
  }

  onChange(deviceValue: any) {

    var getDate = document.querySelector("#bookingDate") as HTMLInputElement;
    var getTimezoneVal = document.getElementById("timezone") as HTMLInputElement;
    this.timezoneGetValueOption = getTimezoneVal.value;
    // // console.log(timezoneVal);
    // console.log(getDate.value); 
    // alert(getDate.value);

    var currentDayTimeTextVal = document.getElementById("currentDayTimeText") as HTMLInputElement;

    //     currentDayTimeTextVal.innerText =   moment(getDate.value).format('dddd') + ", " + moment(getDate.value).format('LL');
    // // console.log(this.timezoneGetValueOption);

    var setDeafultDate = document.getElementById("bookingDate") as HTMLInputElement;
    // setDeafultDate.defaultValue = moment().format('YYYY-MM-DD');



    /// RESET AFTER TIMEZONE CHNAGE
    var chnageOfTimeZone = momenttm.tz(this.timezoneGetValueOption);
    // console.log( moment(chnageOfTimeZone).format('L') );
    setDeafultDate.defaultValue = moment(chnageOfTimeZone).format('YYYY-MM-DD');
    currentDayTimeTextVal.innerText = moment(moment(chnageOfTimeZone).format('YYYY-MM-DD')).format('dddd') + ", " + moment(moment(chnageOfTimeZone).format('YYYY-MM-DD')).format('LL');

    if (moment(getDate.value).format('dddd') == "Monday") {
      // console.log(this.timezoneGetValueOption);
      let jsonData = JSON.stringify(this.slotMaker(0, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));

      this.generatedTimingArr = eval(jsonData);

      let userjsonData = JSON.stringify(this.slotMaker(0, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
      this.userOriginalSlot = eval(userjsonData);
    }
    else if (moment(getDate.value).format('dddd') == "Tuesday") {
      // console.log(this.timezoneGetValueOption);
      let jsonData = JSON.stringify(this.slotMaker(1, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
      this.generatedTimingArr = eval(jsonData);

      //  this.generatedTimingArr.splice(this.deleteBookedTime[0].index,1);  
      //  this.generatedTimingArr.splice(this.deleteBookedTime[1].index,1);  
      let userjsonData = JSON.stringify(this.slotMaker(1, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
      this.userOriginalSlot = eval(userjsonData);
    }
    else if (moment(getDate.value).format('dddd') == "Wednesday") {
      let jsonData = JSON.stringify(this.slotMaker(2, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
      this.generatedTimingArr = eval(jsonData);

      let userjsonData = JSON.stringify(this.slotMaker(2, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
      this.userOriginalSlot = eval(userjsonData);

    }
    else if (moment(getDate.value).format('dddd') == "Thursday") {
      let jsonData = JSON.stringify(this.slotMaker(3, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
      this.generatedTimingArr = eval(jsonData);

      let userjsonData = JSON.stringify(this.slotMaker(3, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
      this.userOriginalSlot = eval(userjsonData);

    }
    else if (moment(getDate.value).format('dddd') == "Friday") {
      let jsonData = JSON.stringify(this.slotMaker(4, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
      this.generatedTimingArr = eval(jsonData);

      let userjsonData = JSON.stringify(this.slotMaker(4, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
      this.userOriginalSlot = eval(userjsonData);

    }
    else if (moment(getDate.value).format('dddd') == "Saturday") {
      let jsonData = JSON.stringify(this.slotMaker(5, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
      this.generatedTimingArr = eval(jsonData);

      let userjsonData = JSON.stringify(this.slotMaker(5, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
      this.userOriginalSlot = eval(userjsonData);

    }
    else if (moment(getDate.value).format('dddd') == "Sunday") {
      let jsonData = JSON.stringify(this.slotMaker(6, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
      this.generatedTimingArr = eval(jsonData);

      let userjsonData = JSON.stringify(this.slotMaker(6, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
      this.userOriginalSlot = eval(userjsonData);

    }
    else {
      this.generatedTimingArr = [];
    }
  }

  chnageOfTime(e: any) {

    var getDate = document.querySelector("#bookingDate") as HTMLInputElement;
    var getTimezoneVal = document.getElementById("timezone") as HTMLInputElement;
    this.timezoneGetValueOption = getTimezoneVal.value;
    // // console.log(timezoneVal);
    // console.log(getDate.value); 
    // alert(getDate.value);

    var currentDayTimeTextVal = document.getElementById("currentDayTimeText") as HTMLInputElement;

    currentDayTimeTextVal.innerText = moment(getDate.value).format('dddd') + ", " + moment(getDate.value).format('LL');
    // console.log(this.timezoneGetValueOption);

    var setDeafultDate = document.getElementById("bookingDate") as HTMLInputElement;
    setDeafultDate.defaultValue = moment().format('YYYY-MM-DD');



    if (moment(getDate.value).format('dddd') == "Monday") {
      // console.log(this.timezoneGetValueOption);
      let jsonData = JSON.stringify(this.slotMaker(0, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));

      this.generatedTimingArr = eval(jsonData);

      let userjsonData = JSON.stringify(this.slotMaker(0, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
      this.userOriginalSlot = eval(userjsonData);
    }
    else if (moment(getDate.value).format('dddd') == "Tuesday") {
      // console.log(this.timezoneGetValueOption);
      let jsonData = JSON.stringify(this.slotMaker(1, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
      this.generatedTimingArr = eval(jsonData);
      //  this.generatedTimingArr.splice(this.deleteBookedTime[0].index,1);  
      //  this.generatedTimingArr.splice(this.deleteBookedTime[1].index,1);  
      let userjsonData = JSON.stringify(this.slotMaker(1, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
      this.userOriginalSlot = eval(userjsonData);
    }
    else if (moment(getDate.value).format('dddd') == "Wednesday") {
      let jsonData = JSON.stringify(this.slotMaker(2, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
      this.generatedTimingArr = eval(jsonData);
      //
      console.log(this.generatedTimingArr);
      let userjsonData = JSON.stringify(this.slotMaker(2, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
      this.userOriginalSlot = eval(userjsonData);

    }
    else if (moment(getDate.value).format('dddd') == "Thursday") {
      let jsonData = JSON.stringify(this.slotMaker(3, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
      this.generatedTimingArr = eval(jsonData);

      let userjsonData = JSON.stringify(this.slotMaker(3, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
      this.userOriginalSlot = eval(userjsonData);

    }
    else if (moment(getDate.value).format('dddd') == "Friday") {
      let jsonData = JSON.stringify(this.slotMaker(4, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
      this.generatedTimingArr = eval(jsonData);

      let userjsonData = JSON.stringify(this.slotMaker(4, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
      this.userOriginalSlot = eval(userjsonData);

    }
    else if (moment(getDate.value).format('dddd') == "Saturday") {
      let jsonData = JSON.stringify(this.slotMaker(5, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
      this.generatedTimingArr = eval(jsonData);

      let userjsonData = JSON.stringify(this.slotMaker(5, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
      this.userOriginalSlot = eval(userjsonData);

    }
    else if (moment(getDate.value).format('dddd') == "Sunday") {
      let jsonData = JSON.stringify(this.slotMaker(6, moment().format('YYYY-MM-DD'), this.timezoneGetValueOption, this.eventDuration, this.timeSlotIntervals));
      this.generatedTimingArr = eval(jsonData);

      let userjsonData = JSON.stringify(this.slotMaker(6, this.getTodayDateByInput, this.availibility[0].timezone, this.eventDuration, this.timeSlotIntervals));
      this.userOriginalSlot = eval(userjsonData);

    }
    else {
      this.generatedTimingArr = [];
    }
  }

  getAllBookings() {
    this.spinner.show();
    this._bookingServices.getAllBookings(this.availUserNameParams).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        for (var i = 0; i < res.length; i++) {
          if (res[i].bookingStatus != "Cancelled" && res[i].bookingStatus != "Rescheduled") {
            this.preBookedData.push(res[i]);
          }
        }
        console.log(this.preBookedData);

        for (var i = 0; i < this.preBookedData.length; i++) {
          this.bookedTimingsOfUser.push(eval(this.preBookedData[i].bookedTime));
        }

        // console.log(this.bookedTimingsOfUser);

      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.preBookedData = [];
        this.errMsg = err;
        // console.log(this.errMsg)
      }, () => console.log("Get All Bookings method excuted successfully"))
  }

  slotMaker(weekNumber: number, date: string, timezone: string, duration: number, timeslotDuration: number) {
    // console.log(this.str);
    moment.tz.setDefault(this.availibility[0].timezone);
    timezone = this.timezoneGetValueOption;
    var currentLengthAvailTime = this.str[weekNumber].available_timings.length;
    this.slotConfig[0].timeArr = [];

    if (currentLengthAvailTime != 0) {

      for (var i = 0; i < currentLengthAvailTime; i++) {

        var getStartVal = (this.str[weekNumber].available_timings[i].start_time).slice(0, -3);
        var getEndVal = (this.str[weekNumber].available_timings[i].end_time).slice(0, -3);
        // console.log(timezone);
        var res = {

          startTime: momenttm(date + " " + getStartVal).tz(timezone).format('LT'),
          endTime: momenttm(date + " " + getEndVal).tz(timezone).format('LT'),
        };

        this.slotConfig[0].timeArr.push(res);

      }

      this.slotConfig[0].configSlotMinutes = duration;
      this.slotConfig[0].configSlotPreparation = timeslotDuration;
      // console.log(this.slotConfig);
    }
    // console.log(this.slotConfig);
    const { configSlotHours, configSlotMinutes, configSlotPreparation, timeArr } = this.slotConfig;

    let defaultDate = new Date().toISOString().substring(0, 10)

    let slotsArray = [];
    let _timeArrStartTime;
    let _timeArrEndTime;
    let _tempSlotStartTime;
    let _endSlot: any;
    let _startSlot;

    // Loop over timeArr
    for (var i = 0; i < this.slotConfig[0].timeArr.length; i++) {
      // console.log(this.slotConfig[weekNumber].timeArr[i]);
      // Creating time stamp using time from timeArr and default date
      _timeArrStartTime = (new Date(defaultDate + " " + this.slotConfig[0].timeArr[i].startTime)).getTime();
      _timeArrEndTime = (new Date(defaultDate + " " + this.slotConfig[0].timeArr[i].endTime)).getTime();
      _tempSlotStartTime = _timeArrStartTime;

      // console.log(_tempSlotStartTime);

      var loopMaker = 0;
      // Loop around till _tempSlotStartTime is less end time from timeArr
      while ((new Date(_tempSlotStartTime)).getTime() < (new Date(_timeArrEndTime)).getTime()) {

        _endSlot = new Date(_tempSlotStartTime);
        _startSlot = new Date(_tempSlotStartTime);

        //Adding minutes and hours from config to create slot and overiding the value of _tempSlotStartTime
        _tempSlotStartTime = _endSlot.setHours(parseInt(_endSlot.getHours()) + parseInt(this.slotConfig[0].configSlotHours));
        _tempSlotStartTime = _endSlot.setMinutes(parseInt(_endSlot.getMinutes()) + parseInt(this.slotConfig[0].configSlotMinutes));

        // Check _tempSlotStartTime is less than end time after adding minutes and hours, if true push into slotsArr
        if (((new Date(_tempSlotStartTime)).getTime() <= (new Date(_timeArrEndTime)).getTime())) {

          // DateTime object is converted to time with the help of javascript functions
          // If you want 24 hour format you can pass hour12 false
          slotsArray.push({
            "id": loopMaker,
            "timeSlotStart": new Date(_startSlot).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            }),
            "timeSlotEnd": _endSlot.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            })
          });
          loopMaker++;
        }

        //preparation time is added in last to maintain the break period
        _tempSlotStartTime = _endSlot.setMinutes(_endSlot.getMinutes() + parseInt(this.slotConfig[0].configSlotPreparation));
      }
    }
    // console.log(this.bookedTimingsOfUser);

    var getDate = document.querySelector("#bookingDate") as HTMLInputElement;
    console.log(getDate.value);
    var matchedIndex = [];

    for (var i = 0; i < slotsArray.length; i++) {
      for (var j = 0; j < this.bookedTimingsOfUser.length; j++) {
        var getStartValInSlice = (this.bookedTimingsOfUser[j][0].userstartTime).slice(0, -3);
        // console.log(timezone);
        // console.log((momenttm(date+ " " + slotsArray[i].timeSlotStart).tz('Asia/Calcutta')).format('LT') )
        const convertTime12to24 = (time12h: any) => {
          const [time, modifier] = time12h.split(' ');

          let [hours, minutes] = time.split(':');

          if (hours === '12') {
            hours = '00';
          }

          if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
          }

          return `${hours}:${minutes}`;
        }
        // var convertTimeto24=  convertTime12to24(slot);
        // var getHourFromconvertTimeto24 = moment('13:10','HH:mm').hours();
        // var getMinFromconvertTimeto24 = moment('13:10','HH:mm').hours();

        // const getYear =  ;
        // const getMonth = 0 ;
        // const getDay = 0 ;
        // const getHour = 0 ;
        // const getMin = 0 ;
        // const getTimezone = "" ;

        const initialToTimezone = this.timeConvTimeZone(Number(moment(date).format("YYYY")), Number(moment(date).format("M")), Number(moment(date).format("D")), moment(convertTime12to24(slotsArray[i].timeSlotStart), 'HH:mm').hours(), moment(convertTime12to24(slotsArray[i].timeSlotStart), 'HH:mm').minutes(), this.availibility[0].timezone);
        const initialToTimezoneEnd = this.timeConvTimeZone(Number(moment(date).format("YYYY")), Number(moment(date).format("M")), Number(moment(date).format("D")), moment(convertTime12to24(slotsArray[i].timeSlotEnd), 'HH:mm').hours(), moment(convertTime12to24(slotsArray[i].timeSlotEnd), 'HH:mm').minutes(), this.availibility[0].timezone);

        const initialToBookingTimezone = this.timeConvTimeZone(Number(moment(date).format("YYYY")), Number(moment(date).format("M")), Number(moment(date).format("D")), moment(convertTime12to24(this.bookedTimingsOfUser[j][0].userstartTime), 'HH:mm').hours(), moment(convertTime12to24(this.bookedTimingsOfUser[j][0].userstartTime), 'HH:mm').minutes(), this.timezoneGetValueOption);
        const initialToBookingTimezoneEnd = this.timeConvTimeZone(Number(moment(date).format("YYYY")), Number(moment(date).format("M")), Number(moment(date).format("D")), moment(convertTime12to24(this.bookedTimingsOfUser[j][0].userEndTime), 'HH:mm').hours(), moment(convertTime12to24(this.bookedTimingsOfUser[j][0].userEndTime), 'HH:mm').minutes(), this.timezoneGetValueOption);

        // const initialToUserTimeZone = this.timeConvTimeZone(getYear,getMonth,getDay,getHour,getMin,getTimezone);
        // console.log(moment(convertTime12to24(slotsArray[i].timeSlotStart),'HH:mm').hours(),moment(convertTime12to24(slotsArray[i].timeSlotStart),'HH:mm').minutes());
        console.log(" User Booked Time " + " " + this.availibility[0].timezone + initialToTimezone + initialToTimezoneEnd);
        console.log("User " + this.timezoneGetValueOption + initialToBookingTimezone + initialToBookingTimezoneEnd);
        //  console.log("24 hours format " + moment(initialToTimezone, ["h:mm A"]).format("HH:mm"));
        //  console.log("To Match with " + moment(initialToTimezone, ["h:mm A"]).format("HH:mm") + " and " + moment(this.bookedTimingsOfUser[j][0].userEndTime, ["h:mm A"]).format("HH:mm"))
        // console.log(" Booked Time of user" + " " + this.timezoneGetValueOption +initialToBookingTimezone + initialToBookingTimezoneEnd);
        // console.log(this.timeConvTimeZone(2022,4,10,8,30,"Asia/Karachi"));
        //   console.log(date);

        //   console.log(momenttm(date, "9:00 AM").tz("Asia/Calcutta").format('LT'));
        //   console.log(this.timeConvTimeZone(Number(moment(date).format("YYYY")),Number(moment(date).format("M")),Number(moment(date).format("D")),moment(convertTime12to24(slotsArray[i].timeSlotStart),'HH:mm').hours(),moment(convertTime12to24(slotsArray[i].timeSlotStart),'HH:mm').minutes(),this.bookedTimingsOfUser[j][0].userTimezone));

        // if((momenttm(date+ " " + slotsArray[i].timeSlotStart).tz(timezone)).tz(this.bookedTimingsOfUser[j][0].userTimezone).format('LT')  == momenttm(date+ " " + getStartValInSlice).tz(this.bookedTimingsOfUser[j][0].userTimezone).format('LT') &&  moment(getDate.value).format('LL')  == this.bookedTimingsOfUser[j][0].userbookedDate)     
        // if(slotsArray[i].timeSlotStart == "April 6, 2022")

        // console.log(" Converted " + moment(initialToTimezone, ["h:mm A"]).format("HH:mm") +  moment(this.bookedTimingsOfUser[j][0].userEndTime, ["h:mm A"]).format("HH:mm") )

        /**
         *   if(initialToTimezone == initialToBookingTimezone &&  moment(getDate.value).format('LL')  == this.bookedTimingsOfUser[j][0].userbookedDate )
         * previous condition for check
         * 
         */


        const convertTT = this.timeConvTimeZone(Number(moment(date).format("YYYY")), Number(moment(date).format("M")), Number(moment(date).format("D")), moment(convertTime12to24(this.bookedTimingsOfUser[j][0].userEndTime), 'HH:mm').hours(), moment(convertTime12to24(this.bookedTimingsOfUser[j][0].userEndTime), 'HH:mm').minutes(), this.timezoneGetValueOption);
        //  if(initialToTimezone == initialToBookingTimezone &&  moment(getDate.value).format('LL')  == this.bookedTimingsOfUser[j][0].userbookedDate )
        if (moment(getDate.value).format('LL') == this.bookedTimingsOfUser[j][0].userbookedDate) {
          if (moment(initialToTimezone, ["h:mm A"]).format("HH:mm") >= moment(initialToBookingTimezone, ["h:mm A"]).format("HH:mm") && moment(initialToTimezone, ["h:mm A"]).format("HH:mm") < moment(initialToBookingTimezoneEnd, ["h:mm A"]).format("HH:mm") || 
          moment(initialToTimezoneEnd, ["h:mm A"]).format("HH:mm") > moment(initialToBookingTimezone, ["h:mm A"]).format("HH:mm") && moment(initialToTimezoneEnd, ["h:mm A"]).format("HH:mm") <= moment(initialToBookingTimezoneEnd, ["h:mm A"]).format("HH:mm")) {
            matchedIndex.push(i);

            console.log(initialToTimezone + " " + initialToBookingTimezone);
            console.log(moment(getDate.value).format('LL') + " " + this.bookedTimingsOfUser[j][0].userbookedDate);

            console.log(moment(initialToTimezone, ["h:mm A"]).format("HH:mm") + " compare " + moment(this.bookedTimingsOfUser[j][0].userEndTime, ["h:mm A"]).format("HH:mm"));
            /**
             * 
             * 10:15 > this.bookedTimingsOfUser[j][0].userEndTime 10:30 
             * 
             * 
             * 
             */
            // var delres = {
            //   "timestart": slotsArray[i].timeSlotStart,
            //   "timeend": slotsArray[i].timeSlotEnd
            // }
            // this.deleteBookedTime.push(delres);
            slotsArray[i].timeSlotStart = "Booked";

            console.log("True " + i + slotsArray[i].timeSlotStart);
            // this.deleteBookedTime.push(deleteIndex);
          }

        }
      }
    }
    // for(var i =0;i<slotsArray.length;i++)
    // {
    //   if(slotsArray[i].id == matchedIndex[i])
    //   {
    //     slotsArray[i].timeSlotStart = "Booked";
    //   }
    // }

    console.log(matchedIndex);
    console.log(slotsArray);
    // console.log("this.deleteBookedTime "+ this.deleteBookedTime[0][0]);
    console.log(this.bookedTimingsOfUser);
    console.log(slotsArray);
    console.log(this.deleteBookedTime);
    console.log(moment(this.getTodayDateByInput).format('LL'));
    // for(var dl =0;dl<this.deleteBookedTime.length;dl++)
    // {
    //   console.log(this.deleteBookedTime[dl]);

    //   slotsArray.splice(this.deleteBookedTime[dl].timestart,1);  

    //   // if(slotsArray[])
    // }
    const datettt = new Date('2022-04-10T08:30').toLocaleString('en-US', { timeZone: "Asia/Karachi" });

    console.log(datettt);
    console.log(slotsArray);

    return slotsArray;

  }


  timeConvTimeZone(year: number, month: number, day: number, hours: number, minutes: number, timezone: string) {
    const timeConv = new Date(year, month, day, hours, minutes).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: timezone
    });
    return timeConv;
  }

  getDetailsFunc(timeslotStart: string, timeSlotEnd: string, indexEle: number) {
    moment.tz.setDefault(this.availibility[0].timezone);
    // console.log(timeslotStart + " "+ timeSlotEnd);
    // console.log(this.timezoneGetValueOption)
    var getDate = document.querySelector("#bookingDate") as HTMLInputElement;
    // console.log(getDate.value);

    this.bookedStartTime = timeslotStart;
    this.bookedEndTime = timeSlotEnd;

    this.bookedDate = moment(getDate.value).format('LL');
    this.bookedWeekname = moment(getDate.value).format('dddd');;


    if (this.timezoneGetValueOption != this.availibility[0].timezone) {
      const convertTime12to24 = (time12h: any) => {
        const [time, modifier] = time12h.split(' ');

        let [hours, minutes] = time.split(':');

        if (hours === '12') {
          hours = '00';
        }

        if (modifier === 'PM') {
          hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`;
      }
      // var convertTimeto24=  convertTime12to24(slot);
      // var getHourFromconvertTimeto24 = moment('13:10','HH:mm').hours();
      // var getMinFromconvertTimeto24 = moment('13:10','HH:mm').hours();

      // const getYear =  ;
      // const getMonth = 0 ;
      // const getDay = 0 ;
      // const getHour = 0 ;
      // const getMin = 0 ;
      // const getTimezone = "" ;

      const initialToTimezone = this.timeConvTimeZone(Number(moment(this.getTodayDateByInput).format("YYYY")), Number(moment(this.getTodayDateByInput).format("M")), Number(moment(this.getTodayDateByInput).format("D")), moment(convertTime12to24(this.userOriginalSlot[indexEle].timeSlotStart), 'HH:mm').hours(), moment(convertTime12to24(this.userOriginalSlot[indexEle].timeSlotStart), 'HH:mm').minutes(), this.availibility[0].timezone);
      console.log("chnage " + initialToTimezone);
      const initialToTimezoneEnd = this.timeConvTimeZone(Number(moment(this.getTodayDateByInput).format("YYYY")), Number(moment(this.getTodayDateByInput).format("M")), Number(moment(this.getTodayDateByInput).format("D")), moment(convertTime12to24(this.userOriginalSlot[indexEle].timeSlotEnd), 'HH:mm').hours(), moment(convertTime12to24(this.userOriginalSlot[indexEle].timeSlotEnd), 'HH:mm').minutes(), this.availibility[0].timezone);
      console.log("chnage " + initialToTimezone);

      this.bookedTimings[0].userstartTime = initialToTimezone;
      this.bookedTimings[0].userEndTime = initialToTimezoneEnd;

    }
    else {
      this.bookedTimings[0].userstartTime = this.userOriginalSlot[indexEle].timeSlotStart;
      this.bookedTimings[0].userEndTime = this.userOriginalSlot[indexEle].timeSlotEnd;

    }
    // console.log(this.userOriginalSlot);
    this.bookedTimings[0].userbookedDate = this.bookedDate;
    this.bookedTimings[0].userTimezone = this.availibility[0].timezone;
    this.bookedTimings[0].userWeekname = moment(this.getTodayDateByInput).format('dddd');
    // console.log("timezone of user: "+ this.availibilityTimezone)
    this.bookedTimings[0].bookedDate = this.bookedDate;
    this.bookedTimings[0].bookedTimeZone = this.timezoneGetValueOption;
    this.bookedTimings[0].bookedStartTime = this.bookedStartTime;
    this.bookedTimings[0].bookedEndTime = this.bookedEndTime;
    this.bookedTimings[0].bookedWeekname = this.bookedWeekname;
    // console.log(this.bookedTimings);


  }

  addNewBookingFunc(form: NgForm) {
    this.spinner.show();
    // console.log(form.value);
    let bookedTimingsData = JSON.stringify(this.bookedTimings);
    // console.log(this.availUserNameParams, this.event[0].eventId, this.eventParams, bookedTimingsData,);
    var getOptInBookingVal = this.event[0].optInBooking;
    var optInBooking = "";
    var sendConfirmationMail = "Not Sent";
    if (getOptInBookingVal == "Yes") {
      optInBooking = "On Hold";
    }
    else {
      optInBooking = "Confirmed";
    }
    this._bookingServices.addNewBooking(this.availUserNameParams, this.event[0]._id, this.event[0].title, bookedTimingsData, form.value.name, form.value.phoneNumber, form.value.emailId, form.value.guestemailId, form.value.additionalNotes, sendConfirmationMail, optInBooking.trim()).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        if (this.status[0].success == true) {
          var hostname = this.user[0].fullName;
          var optInBooking = this.event[0].optInBooking;
          var whatEvent = this.event[0].eventName;
          var whenDate = this.bookedTimings[0].bookedWeekname + " " + this.bookedTimings[0].bookedDate;
          var whenTime = this.bookedTimings[0].bookedStartTime + " - " + this.bookedTimings[0].bookedEndTime;
          var duration = this.event[0].length;
          var timezoneUser = this.bookedTimings[0].bookedTimeZone;
          if (this.event[0].optInBooking == "No") {
            this._usrServices.sendBookingConfirmationMail(this.user[0].emailAddress, form.value.emailId, hostname, whatEvent).subscribe(
              res => {
                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 1000);
                console.log(res);
              },
              err => {
                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 1000);
                console.log(err);
              },
              () => console.log("Send Mail Worked")
            )
            this._toast.success({ detail: "Booking Confirmed", summary: 'Thank you ! Talk to you soon!', position: 'br' });

            setTimeout(function () {
              window.location.href = "/success?hostname=" + hostname + "&optInBooking=" + optInBooking + "&whatEvent=" + whatEvent + "&whenDate=" + whenDate + "&whenTime=" + whenTime + "&duration=" + duration + "&timezoneUser=" + timezoneUser;
            }, 2000);

          }
          else {

            this._usrServices.sendBookingPendingMail(this.user[0].emailAddress, form.value.emailId, hostname, whatEvent).subscribe(
              res => {
                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 1000);
                console.log(res);
              },
              err => {
                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 1000);
                console.log(err);
              },
              () => console.log("Send Mail Worked")
            )
            this._toast.success({ detail: "Booking Done", summary: 'Please wait till it is confirmed', position: 'br' });

            setTimeout(function () {

              window.location.href = "/success?hostname=" + hostname + "&optInBooking=" + optInBooking + "&whatEvent=" + whatEvent + "&whenDate=" + whenDate + "&whenTime=" + whenTime + "&duration=" + duration + "&timezoneUser=" + timezoneUser;
            }, 2000);

          }
        }
        else {
          this._toast.warning({ detail: "BOOKING FAILED", summary: 'Unable to book a slot', position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
      },
      err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this._toast.warning({ detail: " FAILED", summary: 'Please try after sometime', position: 'br' });
      }, () => console.log("New Booking method excuted successfully"))

  }


}


function e(e: any) {
  throw new Error('Function not implemented.');
}