import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success-booking',
  templateUrl: './success-booking.component.html',
  styleUrls: ['./success-booking.component.css']
})
export class SuccessBookingComponent {
  hostname: string;
  optInBooking : string;
  whatEvent : string;
  whenDate: string;
  whenTime: string;
  duration: number;
  timezoneUser: string;
  constructor( private route: ActivatedRoute) {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString); 
    this.hostname = String(urlParams.get('hostname'));
    this.optInBooking = String(urlParams.get('optInBooking'));
    this.whatEvent = String(urlParams.get('whatEvent'));
    this.whenDate = String(urlParams.get('whenDate'));
    this.whenTime = String(urlParams.get('whenTime'));
    this.duration = Number(urlParams.get('duration'));
    this.timezoneUser = String(urlParams.get('timezoneUser'));
    
   }

  ngOnInit(): void {
   console.log(this.hostname);
  }

}