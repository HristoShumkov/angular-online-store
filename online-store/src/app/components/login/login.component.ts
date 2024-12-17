import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private userService: UsersService, private router: Router) {}
  login(form: NgForm) {
    if(form.invalid) {
      return;
    }

    const {email, password} = form.value

    console.log(email, password)

    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(["/"]);
    });
  }
}
