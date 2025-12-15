import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { Task } from '../../../core/services/task';
import { AsyncPipe } from '@angular/common';
import { TaskHighlight } from '../task-highlight/task-highlight';
import { map } from 'rxjs';

@Component({
  selector: 'app-tasks-page',
  imports: [ AsyncPipe],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
})
export class TasksPage {
  private taskService = inject(Task);

  tasks$ = this.taskService.tasks$;

  @ViewChild('highlightContainer', { read: ViewContainerRef })
  highlightContainer!: ViewContainerRef;


  addTask(title: string): void {
    if (title.trim()) {
      this.taskService.addTask(title);
    }
    
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }


 
highlight(task: any) {
  this.highlightContainer.clear();
  const ref = this.highlightContainer.createComponent(TaskHighlight);
  ref.instance.title = task.title;
}

toggleTask(id: number): void {
  this.taskService.toggleTask(id);
}

// Bonus : Filtrer les tâches actives
activeTasks$ = this.taskService.tasks$.pipe(
  map(tasks => tasks.filter(t => !t.completed))
);

// Bonus : Filtrer les tâches terminées
completedTasks$ = this.taskService.tasks$.pipe(
  map(tasks => tasks.filter(t => t.completed))
);
  

}
