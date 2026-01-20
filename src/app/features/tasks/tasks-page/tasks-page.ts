import { Component, inject, ViewChild, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { Task, TaskItem } from '../../../core/services/task';
import { AsyncPipe } from '@angular/common';
import { TaskHighlight } from '../task-highlight/task-highlight';
import { map } from 'rxjs';
import { TaskEditComponent } from '../task-edit/task-edit';
import { TaskStats } from '../task-stats/task-stats';

@Component({
  selector: 'app-tasks-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ AsyncPipe, TaskStats, TaskHighlight, TaskEditComponent ],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
})
export class TasksPage {
  private taskService = inject(Task);

  tasks$ = this.taskService.tasks$;

  // État UI
  highlightedTask: TaskItem | null = null;
  editingTask: TaskItem | null = null;

  addTask(title: string): void {
    if (title.trim()) {
      this.taskService.addTask(title);
    }
  }

  toggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  highlight(task: TaskItem): void {
    this.highlightedTask = task;
  }

  editTask(task: TaskItem): void {
    this.editingTask = task;
  }

  updateTask(data: { id: number; title: string }): void {
    this.taskService.updateTask(data.id, data.title);
    this.editingTask = null;
  }

  cancelEdit(): void {
    this.editingTask = null;
  }
}