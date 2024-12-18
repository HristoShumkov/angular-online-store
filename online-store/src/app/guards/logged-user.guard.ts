import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

export const loggedUserGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
    const router = inject(Router);

  if (!userService.isLoggedIn) {
    return true;
  } else {
    router.navigate(["/"]);
    return false;
  }
};
