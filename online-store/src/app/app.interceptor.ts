import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../enviroments/environment';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { UsersService } from './services/users.service';

const { BASE_URL } = environment;
const URL = "/url"

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UsersService);
  const token = userService.getAccessToken();

  if (req.url.startsWith(URL)) {
    req = req.clone({
      url: req.url.replace(URL, BASE_URL),
      withCredentials: true,
      setHeaders: token ? { "X-Authorization": token } : {}
    });
  }

  return next(req).pipe(
    catchError((err) => {
      console.log(err)

      return [err]
    })
  )
};
