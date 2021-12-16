import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { User, Admin } from 'src/app/models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLoading = false;
  userIsAdmin: boolean = false;
  name: string;
  age: number;
  school: string;
  email: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.userIsAdmin = this.authService.getIsAdmin();
    
    if (this.userIsAdmin) {
      this.authService.getAdmin().subscribe((admin: { admin: Admin }) => {
        this.name = admin.admin.name;
        this.school = admin.admin.school;
        this.email = admin.admin.email;
        this.isLoading = false;
      });
    } else {
      this.authService.getUser().subscribe((user: { user: User }) => {
        this.name = user.user.name;
        this.age = user.user.age;
        this.school = user.user.school;
        this.email = user.user.email;
        this.isLoading = false;
      });
    }
  }
}
