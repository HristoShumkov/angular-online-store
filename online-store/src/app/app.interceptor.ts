import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../enviroments/environment';
import { catchError } from 'rxjs';

const { BASE_URL } = environment;
const URL = "/url"

export const appInterceptor: HttpInterceptorFn = (req, next) => {
if (req.url.startsWith(URL)) {
  req = req.clone({
    url: req.url.replace(URL, BASE_URL),
    withCredentials: true,
  });
}
  
  return next(req).pipe(
    catchError((err) => {
      console.log(err)

      return [err]
    })
  )
};
