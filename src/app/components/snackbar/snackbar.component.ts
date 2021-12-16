import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {
  @Input() message: string;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.open(this.message, '', {
      duration: 2000,
      }
    );
  }

}
