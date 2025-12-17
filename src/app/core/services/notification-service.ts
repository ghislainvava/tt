import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<NotificationState | null>(null);
  notification$ = this.notificationSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.notificationSubject.next({ message, type });
    
    // Auto-hide après 3 secondes
    setTimeout(() => {
      this.notificationSubject.next(null);
    }, 3000);
  }
}
