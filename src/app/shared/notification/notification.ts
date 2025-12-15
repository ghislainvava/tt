import { Component, inject } from '@angular/core';
import { NotificationService } from '../../core/services/notification';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (notification$ | async; as notif) {
      <div class="notification" [class]="notif.type">
        {{ notif.message }}
      </div>
    }, 
  `,
  styles: [`
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
    }
    .success { background: #4caf50; }
    .error { background: #f44336; }
    .info { background: #2196f3; }
    @keyframes slideIn {
      from { transform: translateX(400px); }
      to { transform: translateX(0); }
    }
  `]
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);
  notification$ = this.notificationService.notification$;
}