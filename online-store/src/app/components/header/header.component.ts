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

  get username():string {
    return this.userService.user?.username || '';
  }

  get pfpUrl():string {
    return this.userService.user?.profilePic || 'default-profile-picture.png';
  }

  toggleMenu() {
    this.isMenuToggled = !this.isMenuToggled
  }
}
