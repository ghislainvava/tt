import { Component, inject } from '@angular/core';
import { Task } from '../../../core/services/task';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (stats$ | async; as stats) {
      <div class="stats">
        <h3>📊 Statistiques</h3>
        <p>Total : {{ stats.total }}</p>
        <p>Terminées : {{ stats.completed }}</p>
        <p>En cours : {{ stats.active }}</p>
        <p>Progression : {{ stats.percentage }}%</p>
      </div>
    }
  `,
  styles: [`
    .stats {
      background: #e8f5e9;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #4caf50;
    }
  `]
})
export class TaskStats {
  private taskService = inject(Task);

  stats$ = this.taskService.tasks$.pipe(
    map(tasks => {
      const total = tasks.length;
      const completed = tasks.filter(t => t.completed).length;
      const active = total - completed;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      return { total, completed, active, percentage };
    })
  );
}
