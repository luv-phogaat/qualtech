import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private storage: StorageService,
    private router: Router
  ) {}

  logout() {
    this.storage.removeItem('AuthorizationData');
    this.router.navigate(['/login']);
  }

}
