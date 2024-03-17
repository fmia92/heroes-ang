import { Inject, Injectable } from '@angular/core'
import { MatSnackBar, type MatSnackBarConfig } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor (
    @Inject(MatSnackBar) private readonly snackBar: MatSnackBar
  ) { }

  showAlert (message: string, action: string, config?: MatSnackBarConfig): void {
    this.snackBar.open(message, action, {
      ...config,
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  showError (message: string): void {
    this.showAlert(message, 'Error', { panelClass: ['alert-error'] })
  }

  showSuccess (message: string): void {
    this.showAlert(message, 'Success', { panelClass: ['alert-success'] })
  }
}
