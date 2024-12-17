import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userService: UsersService, private router: Router) { }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    profilePic: new FormControl('')
  }
  )

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    const {
      email,
      username,
      password,
      profilePic,
    } = this.registerForm.value as {
      email: string;
      username: string;
      password: string;
      profilePic: string
    };

    this.userService.register(email, username, password, profilePic).subscribe(() => {
      this.router.navigate(["/"]);
    });
  }
}
