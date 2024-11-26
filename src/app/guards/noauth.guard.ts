import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private firebaseSvc: FirebaseService,
    private router: Router,
    private utils: UtilsService
  ) {}

  async canActivate(): Promise<boolean> {
    const user = await this.firebaseSvc.getAuthIns().currentUser;
    if (user) {
      const storedUser = this.utils.getFromLocalStorage('user');
      const redirectPath = storedUser.role === 'profesor' ? '/home-profe' : '/home';

      this.router.navigate([redirectPath]);
      return false;
    }
    return true;
  }
}
