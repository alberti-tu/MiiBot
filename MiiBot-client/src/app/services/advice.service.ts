import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AdviceService {

  constructor(private toast: MatSnackBar) { }

  public showToast(message: string, action?: string, config?: MatSnackBarConfig<any>): MatSnackBarRef<SimpleSnackBar> {
    if (action !== undefined) {
      config = config !== undefined ? config : { verticalPosition: 'top', horizontalPosition: 'right' };
    } else {
      config = config !== undefined ? config : { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right' };
    }
    return this.toast.open(message, action, config);
  }
}
