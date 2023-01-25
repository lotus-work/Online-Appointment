import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { IEvents } from 'src/app/interface/events';
import { IUsers } from 'src/app/interface/users';
import { BookingService } from 'src/app/services/booking/booking.service';
import { EventsService } from 'src/app/services/events/events.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-booking',
  templateUrl: './profile-booking.component.html',
  styleUrls: ['./profile-booking.component.css']
})
export class ProfileBookingComponent implements OnInit {
  availUserNameParams: string;
  errMsg!: string;
  user: IUsers[] = [];
  event: IEvents[] = [];
  userName: string = "";
  profilePicture: string = "";
  about: string = "";
  userProfilePicture: string = "";
  hideEventType: string = "";
  strEvent: any = [];
  constructor(private spinner: NgxSpinnerService, private _bookingServices: BookingService, private _userServices: UserService, private _evtServices: EventsService, private _toast: NgToastService, private route: ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    this.availUserNameParams = String(routeParams.get('username'));

  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.spinner.show();
    console.log(this.availUserNameParams);
    this._userServices.publicgetUserData(this.availUserNameParams).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        
        this.user = res;
        console.log(this.user[0]);
        this.userName = this.user[0].fullName;
        this.profilePicture = this.user[0].profilePicture;
        this.about = this.user[0].about;
        console.log(this.about);
        this.userProfilePicture = this.user[0].profilePicture;
        console.log(res.length);
        if (res.length != null) {
          this._evtServices.getAllEvents(String(this.user[0]._id)).subscribe(
            res => {
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              for (var i = 0; i < res.length; i++) {
                if (res[i].hideEventType == "No") {
                  this.strEvent.push(res[i]);

                }
                else {
                  this.event = [];
                }
              }
              console.log(this.strEvent);


            }, err => {
              setTimeout(() => {
                /** spinner ends after 5 seconds */
                this.spinner.hide();
              }, 1000);
              this.event = [];
              this.errMsg = err;
              console.log(this.errMsg)
            }, () => console.log("Get All Events method excuted successfully"))

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

}