import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage: StorageService,
    private router: Router
  ) {
      this.storage.getObject('AuthorizationData').then(data => {
        if (data) {
          this.router.navigate(['/home']);
        }
      });
  }
}
