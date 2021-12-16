import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoading: boolean = false;
  selected: string;
  isStudent: boolean;
  
  constructor(public authService: AuthService, private _snackBar: MatSnackBar, private router: Router) { }

  onChange() {
    if (this.selected === 'student') {
      this.isStudent = true;
    } else {
      this.isStudent = false;
    }
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
        return;
    }
    this.isLoading = true;
    if (this.isStudent) {
      const { name, age, school, email, password } = form.value;
      this.authService.createUser(name, age, school, email, password)
      .subscribe(response => {
        this.isLoading = false;
        this.router.navigate(['/login']).then((navigated: boolean) => {
          if(navigated) {
            this._snackBar.open('Signup Successful', '', {
              duration: 2000,
              }
            );
          }
        });
      }
      , error => {
        this.isLoading = false;
        this._snackBar.open(error.error.msg, '', {
          duration: 5000,
        });
      });
    } else {
      const { name, school, email, password } = form.value;
      this.authService.createAdmin(name, school, email, password)
      .subscribe(response => {
        this.isLoading = false;
        this.router.navigate(['/login']).then((navigated: boolean) => {
          if(navigated) {
            this._snackBar.open('Signup Successful', '', {
              duration: 2000,
              }
            );
          }
        });
      }
      , error => {
        this.isLoading = false;
        this._snackBar.open(error.error.msg, '', {
          duration: 5000,
        });
      });
    }
  }
}
