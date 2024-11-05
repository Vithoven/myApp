import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return new Promise((resolve => {
    resolve(true);
    resolve(false);
  }))
};
