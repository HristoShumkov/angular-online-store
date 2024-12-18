import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private userService: UsersService, private router: Router) {};

  isMenuToggled: boolean = false;

  get isLoggedIn():boolean {
    return this.userService.isLoggedIn;
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

  logout() {
    this.userService.logout().subscribe(() => this.router.navigate(["/"]));
  }
}
