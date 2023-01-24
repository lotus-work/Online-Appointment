import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { IAvailibility } from 'src/app/interface/availibility';
import { AvailibilityService } from 'src/app/services/availibility/availibility.service';

@Component({
  selector: 'app-edit-availability',
  templateUrl: './edit-availability.component.html',
  styleUrls: ['./edit-availability.component.css']
})
export class EditAvailabilityComponent {

  incre: number = 0;
  fruits: any[] = [];
  vegs: any[] = [];

  // locationArr = [
  //   { id: 1, label: "Zoom", status: "false" },
  //   { id: 2, label: "Google Meet", status: "false" },
  //   { id: 3, label: "Microsoft Teams", status: "false" }
  // ];


  locationArr = [
    { id: 2, label: "Google Meet", status: "false" }
  ];

  str = [
    {
      id: 1,
      aria_controls: 'panelsStayOpen-collapseOne',
      arial_abelledby: 'panelsStayOpen-headingOne',
      week_name: 'Monday',
      status: true,
      available_timings: [
        {
          id: 1,
          start_time: '09:00 AM',
          end_time: '17:00 PM'
        }
      ]
    },

    {
      id: 2,
      aria_controls: 'panelsStayOpen-collapseTwo',
      arial_abelledby: 'panelsStayOpen-headingTwo',
      week_name: 'Tuesday',
      status: true,
      available_timings: [
        {
          id: 1,
          start_time: '09:00 AM',
          end_time: '17:00 PM'
        }
      ]
    },
    {
      id: 3,
      aria_controls: 'panelsStayOpen-collapseThree',
      arial_abelledby: 'panelsStayOpen-headingThree',
      week_name: 'Wednesday',
      status: true,
      available_timings: [
        {
          id: 1,
          start_time: '09:00 AM',
          end_time: '17:00 PM'
        }
      ]
    },
    {
      id: 4,
      aria_controls: 'panelsStayOpen-collapseFour',
      arial_abelledby: 'panelsStayOpen-headingFour',
      week_name: 'Thursday',
      status: true,
      available_timings: [
        {
          id: 1,
          start_time: '09:00 AM',
          end_time: '17:00 PM'
        }
      ]
    },
    {
      id: 5,
      aria_controls: 'panelsStayOpen-collapseFive',
      arial_abelledby: 'panelsStayOpen-headingFive',
      week_name: 'Friday',
      status: true,
      available_timings: [
        {
          id: 1,
          start_time: '09:00 AM',
          end_time: '17:00 PM'
        }
      ]
    },
    {
      id: 6,
      aria_controls: 'panelsStayOpen-collapseSix',
      arial_abelledby: 'panelsStayOpen-headingSix',
      week_name: 'Saturday',
      status: true,
      available_timings: [
        {
          id: 1,
          start_time: '09:00 AM',
          end_time: '17:00 PM'
        }
      ]
    },
    {
      id: 7,
      aria_controls: 'panelsStayOpen-collapseSeven',
      arial_abelledby: 'panelsStayOpen-headingSeven',
      week_name: 'Sunday',
      status: false,
      available_timings: [

      ]
    }
  ];

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

  availDetails: IAvailibility[] = [];

  avaibility: any;
  status: any;
  errMsg!: string;
  userId: string | null;
  availIdParams: string;



  constructor(private spinner: NgxSpinnerService, private _availServices: AvailibilityService, private _toast: NgToastService, private route: ActivatedRoute) {

    this.userId = String(localStorage.getItem('_id'));

    const routeParams = this.route.snapshot.paramMap;
    this.availIdParams = String(routeParams.get('id'));
  }

  ngOnInit(): void {
    this.getAvailDetails();
  }

  getAvailDetails() {
    this.spinner.show();

    this._availServices.getAvailById(String(this.userId), this.availIdParams).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.availDetails = res;
        console.log(this.availDetails);
        this.str = eval(this.availDetails[0].weeksAvailability);
        console.log(this.str);
        // CheckBox Pre Check

        // Setting timezone from db to frontend
        for (var i = 0; i < this.timeZoneArr.length; i++) {
          if (this.timeZoneArr[i].value == this.availDetails[0].timezone) {
            this.timeZoneArr[i].status = "true";
          }
        }

      }, err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.availDetails = [];
        this.errMsg = err;
        console.log(this.errMsg)
      }, () => console.log("Get Schedule By ID method excuted successfully"))
  }

  updateAvailDetails(updateForm: NgForm) {
    this.spinner.show();

    console.log(updateForm.value.availabilityName);


    var getTimezoneVal = document.getElementById("timezone") as HTMLInputElement;
    var timezoneVal = getTimezoneVal.value;
    console.log(timezoneVal);

    let weekAvailToString = JSON.stringify(this.str);

    this._availServices.updateAvail(this.availIdParams, updateForm.value.availabilityName, String(this.userId), timezoneVal, weekAvailToString).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        if (this.status == true) {
          this._toast.success({ detail: "UPDATE SUCCESS", summary: 'Schedule has been updated', position: 'br' });
        }
        else {
          this._toast.warning({ detail: "UPDATE FAILED", summary: 'Unable to update schedule', position: 'br' });
        }

      },
      err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this._toast.warning({ detail: " FAILED", summary: 'Please try after sometime', position: 'br' });
        // setTimeout(function () {
        //   window.location.reload();
        // }, 2000);
      },
      () => console.log("Update Availability method excuted successfully")

    )

  }



  myFunction(week_id: number) {
    const ele = document.querySelector("#myCheck" + week_id) as HTMLInputElement;
    const onCheck = document.getElementById("onCheck") as HTMLAnchorElement;
    const offCheck = document.getElementById("offCheck") as HTMLAnchorElement;

    var currentLengthAvailTime = this.str[week_id - 1].available_timings.length;
    console.log(ele.checked);
    if (ele.checked == true) {
      if (currentLengthAvailTime == 0) {
        var res = {
          id: (currentLengthAvailTime + 1),
          start_time: '09:00 AM',
          end_time: '17:00 PM'
        };
        this.str[week_id - 1].available_timings.push(res);
      }
      else {
        this.str[week_id - 1].status = false;
      }

    }
    else {
      this.str[week_id - 1].status = false;
      this.str[week_id - 1].available_timings.splice(0, currentLengthAvailTime)
    }


  }
  addTime(id: number) {

    console.log(id);
    console.log(this.str[id - 1]);

    console.log(this.str[id - 1].available_timings.length);
    var currentLengthAvailTime = this.str[id - 1].available_timings.length;

    const startTime = document.querySelector("#start_date" + id) as HTMLInputElement;
    const endTime = document.querySelector("#end_date" + id) as HTMLInputElement;
    console.log(startTime.value + endTime.value);
    var res = {
      id: (currentLengthAvailTime + 1),
      start_time: startTime.value,
      end_time: endTime.value
    };
    this.str[id - 1].available_timings.push(res);
  }

  removeTimings(week_id: number, availTime_id: number) {
    console.log(week_id + " " + availTime_id);

    for (var i = 0; i < this.str.length; i++) {
      if (this.str[i].id == week_id) {

        for (var j = 0; j < this.str[i].available_timings.length; j++) {
          if (this.str[i].available_timings[j].id == availTime_id) {
            this.str[i].available_timings.splice(j, 1);
          }
        }
      }
    }

  }



  // createSlots() {
  //   var slotConfig = {
  //     "configSlotHours": "0",
  //     "configSlotMinutes": "35",
  //     "configSlotPreparation": "0",
  //     "timeArr": [
  //       { "startTime": "09:00", "endTime": "11:00" },
  //       { "startTime": "10:30", "endTime": "10:45" }
  //     ]
  //   }
  //   // Getting values from slotConfig using destructuring
  //   const { configSlotHours, configSlotMinutes, configSlotPreparation, timeArr } = slotConfig;

  //   let defaultDate = new Date().toISOString().substring(0, 10)
  //   let slotsArray = []
  //   let _timeArrStartTime;
  //   let _timeArrEndTime;
  //   let _tempSlotStartTime;
  //   let _endSlot: any;
  //   let _startSlot;

  //   // Loop over timeArr
  //   for (var i = 0; i < timeArr.length; i++) {

  //     // Creating time stamp using time from timeArr and default date
  //     _timeArrStartTime = (new Date(defaultDate + " " + timeArr[i].startTime)).getTime();
  //     _timeArrEndTime = (new Date(defaultDate + " " + timeArr[i].endTime)).getTime();
  //     _tempSlotStartTime = _timeArrStartTime;

  //     // Loop around till _tempSlotStartTime is less end time from timeArr
  //     while ((new Date(_tempSlotStartTime)).getTime() < (new Date(_timeArrEndTime)).getTime()) {

  //       _endSlot = new Date(_tempSlotStartTime);
  //       _startSlot = new Date(_tempSlotStartTime);

  //       //Adding minutes and hours from config to create slot and overiding the value of _tempSlotStartTime
  //       _tempSlotStartTime = _endSlot.setHours(parseInt(_endSlot.getHours()) + parseInt(configSlotHours));
  //       _tempSlotStartTime = _endSlot.setMinutes(parseInt(_endSlot.getMinutes()) + parseInt(configSlotMinutes));

  //       // Check _tempSlotStartTime is less than end time after adding minutes and hours, if true push into slotsArr
  //       if (((new Date(_tempSlotStartTime)).getTime() <= (new Date(_timeArrEndTime)).getTime())) {

  //         // DateTime object is converted to time with the help of javascript functions
  //         // If you want 24 hour format you can pass hour12 false
  //         slotsArray.push({
  //           "timeSlotStart": new Date(_startSlot).toLocaleTimeString('en-US', {
  //             hour: 'numeric',
  //             minute: 'numeric',
  //             hour12: true
  //           }),
  //           "timeSlotEnd": _endSlot.toLocaleTimeString('en-US', {
  //             hour: 'numeric',
  //             minute: 'numeric',
  //             hour12: true
  //           })
  //         });
  //       }

  //       //preparation time is added in last to maintain the break period
  //       _tempSlotStartTime = _endSlot.setMinutes(_endSlot.getMinutes() + parseInt(configSlotPreparation));
  //     }
  //   }

  //   return slotsArray;
  // }
}