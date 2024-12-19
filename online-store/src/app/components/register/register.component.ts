import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { passwordMatchValidator } from '../../utils/password-match.validator';

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
    email: new FormControl('', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]), 
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z0-9._]*$/)]),
    passGroup: new FormGroup(
      {
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [passwordMatchValidator("password", "confirmPassword")]
      }
    ),
    profilePic: new FormControl('')
  })

  get passGroup() {
    return this.registerForm.get("passGroup");
  }

  get emailErrorCheck() {
    return (
      this.registerForm.get('email')?.touched &&
      this.registerForm.get('email')?.errors?.['required'] ||
      this.registerForm.get('email')?.touched &&
      this.registerForm.get('email')?.errors?.['pattern']
    );
  }

  get usernameErrorCheck() {
    return (
      this.registerForm.get('username')?.touched &&
      this.registerForm.get('username')?.errors?.['required'] ||
      this.registerForm.get('username')?.touched &&
      this.registerForm.get('username')?.errors?.['minlength'] ||
      this.registerForm.get('username')?.touched &&
      this.registerForm.get('username')?.errors?.['pattern']
    );
  }

  get passErrorCheck() {
    return (
      this.passGroup?.get('password')?.touched &&
      this.passGroup?.get('password')?.errors?.['required'] ||
      this.passGroup?.get('password')?.touched &&
      this.passGroup?.get('password')?.errors?.['minlength'] ||
      this.passGroup?.get('password')?.touched &&
      this.passGroup?.get('password')?.errors?.['pattern']
    );
  }

  get passMatchErrorCheck() {
    return this.passGroup?.get('confirmPassword')?.touched && this.passGroup?.errors?.['passwordMatchValidator'];
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    const {
      email,
      username,
      passGroup,
      profilePic,
    } = this.registerForm.value as {
      email: string;
      username: string;
      passGroup: { password: string; confirmPassword: string };
      profilePic: string
    };

    this.userService.register(email, username, passGroup.password, profilePic).subscribe(() => {
      this.router.navigate(["/"]);
    });
  }
}
