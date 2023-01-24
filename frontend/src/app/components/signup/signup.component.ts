import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  query = '';
  data: any = [];
  status: any = [];
  errMsg!: string;
  timezone: string;

  // Toggle
  firstStep: boolean =true;
  secondStep: boolean =false;

  constructor(private _userService: UserService, private spinner: NgxSpinnerService, private _toast: NgToastService) {
    this.timezone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  ngOnInit() {
  }

  onChange(UpdatedValue : string) :void
  {
    this._userService.checkUsername(UpdatedValue).subscribe(result => {
      this.data = result;
      console.log(this.data.success);
    });
  }
  check(event: any) {
    if (event.key === '') {
      event.preventDefault();
  }
  if (event.keyCode === 32) {
    return; // prevent the call if it's a space
  }
  // Get the input value from the event
  const searchValue = event.target.value;
  this._userService.checkUsername(this.query).subscribe(result => {
    this.data = result;
    console.log(this.data.success);
  });
  }

  addNewUserFunc(form: NgForm) {

    console.log(form.value);
    this.spinner.show();

    this._userService.registerUser(form.value.fullName, form.value.username, form.value.emailAdderss, form.value.password, this.timezone).subscribe(
      res => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status[0].success);
        if (this.status[0].success == true) {
          this._toast.success({ detail: "REGISTRATION SUCCESS", summary: 'Please Sign In Now', position: 'br' });
          setTimeout(function () {
            window.location.href = 'signin'
          }, 2000);
        }
        if (this.status[0].success == false) {
          this._toast.warning({ detail: "REGISTRATION FAILED", summary: this.status[0].message, position: 'br' });
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
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });
      }, () => console.log("Add New Event method excuted successfully"))
  }
  
  toggleNextStep()
  {
this.secondStep = true;
  }
}
