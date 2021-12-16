import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/profile.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  isLoading: boolean = false;
  usersList: User[] = [];

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.authService.getUsersList().subscribe((users: any) => {
      this.usersList = users.result;
      this.isLoading = false;
    });
  }

}
