import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginFormGroup: FormGroup;
  submitted = false;
  loader: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storage: StorageService,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    });
  }

  async presentLoading() {
    this.loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Loading...',
      spinner: "bubbles"
    });
    await this.loader.present();
  }

   async dismissLoader() {
    await this.loadingController.getTop().then(a => {
      if (a) {
        a.dismiss();
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  get f() {
    return this.loginFormGroup.controls;
  }

  async login() {
    this.submitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }
    const userInfo = {
      username: this.f.username.value,
      password: this.f.password.value
    };
    await this.storage.setObject('AuthorizationData', userInfo);
    this.router.navigate(['/home']);
  }


}
