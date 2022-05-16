import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

 // public dialCodes = environment.COUNTRY_DIAL_CODES;
 userForm = new FormGroup({
  'name': new FormControl('', [Validators.required]),
  'emailId': new FormControl('', [Validators.required]),
  'contactNo': new FormControl('', [Validators.required])
});
spinner = false;
disabled = false;
submitted = false;

customAlertOptions: any = {
  header: 'Contact Number',
  subHeader: 'Select Area Code',
  translucent: true
};
constructor(
  // private userProvider: InitUserProvider,
  private menuCtrl: MenuController,
  // private api: APIService,
  // private util: UtilService,
  // private push: PushService
) {}

ngOnInit() {
}

ionViewWillEnter() {
  this.menuCtrl.enable(false);
}
ionViewWillLeave() {
  this.menuCtrl.enable(true);
}

setSpinner() {
  this.spinner = true;
  this.disabled = true;
}

clearSpinner() {
  this.spinner = false;
  this.disabled = false;
}
async getFormValidationErrors() {
  let error = '';
  Object.keys(this.userForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.userForm.get(key).errors;
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach(async keyError => {
        error += `${key} ${keyError} & `;
      });
    }
  });
  const errMsg = error.slice(0, -3);
  // const toast = await this.util.createToast(errMsg, false, 'top');
  // await toast.present();
}


get f() {
  return this.userForm.controls;
}

async registerUser() {
  this.submitted = true;
  if (this.userForm.invalid) {
    this.getFormValidationErrors();
    return;
  }

  this.setSpinner();
  // this.api.signUp(this.userForm.value)
  //   .then(res => {
  //     this.userProvider.setToken(res['token']);
  //     this.api.getUser().subscribe((user: any) => {
  //       this.push.saveToken();
  //       this.userProvider.setLoggedInUser(user);
  //       this.clearSpinner();
  //       this.util.goToNew('/home');
  //     });
  //   }).catch(async err => {
  //     const toast = await this.util.createToast(err.error.message || err.statusText, false, 'top');
  //     await toast.present();
  //     this.clearSpinner();
  //   });
}

}
