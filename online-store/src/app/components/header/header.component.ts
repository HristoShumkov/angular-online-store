import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private userService: UsersService) {};

  isMenuToggled: boolean = false;

  get isLoggedIn():boolean {
    return this.userService.isLogged;
  }

  toggleMenu() {
    this.isMenuToggled = !this.isMenuToggled
  }
}
