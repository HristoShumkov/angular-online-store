import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { UsersService } from "../services/users.service";


export const AuthGuard: CanActivateChildFn = () => {
    const userService = inject(UsersService);
    const router = inject(Router);

  if (userService.isLoggedIn) {
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
}
