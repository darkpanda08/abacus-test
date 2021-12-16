import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean = false;
  selected: string;
  isStudent: boolean;

  constructor(public authService: AuthService, private _snackBar: MatSnackBar) { }

  onChange() {
    if (this.selected === 'student') {
      this.isStudent = true;
    } else {
      this.isStudent = false;
    }
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
        return;
    }
    this.isLoading = true;
    if (this.isStudent) {
      this.authService.login(form.value.email, form.value.password)
    } else {
      this.authService.loginAdmin(form.value.email, form.value.password);
    }
  }
}
