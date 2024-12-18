import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  constructor(private userService: UsersService) {}

  get username():string {
    return this.userService.user?.username || '';
  }

  get pfpUrl():string {
    return this.userService.user?.profilePic || 'default-profile-picture.png';
  }

  get createdOn():number {
    return this.userService.user?._createdOn || NaN;
  }
}
