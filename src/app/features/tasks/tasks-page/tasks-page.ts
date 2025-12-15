import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { Task, TaskItem } from '../../../core/services/task';
import { AsyncPipe } from '@angular/common';
import { TaskHighlight } from '../task-highlight/task-highlight';
import { map } from 'rxjs';
import { TaskEditComponent } from '../task-edit/task-edit';
import { TaskStats } from '../task-stats/task-stats';

@Component({
  selector: 'app-tasks-page',
  imports: [ AsyncPipe, TaskStats],
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
  

@ViewChild('editContainer', { read: ViewContainerRef })
editContainer!: ViewContainerRef;

editTask(task: TaskItem): void {
  this.editContainer.clear();
  const ref = this.editContainer.createComponent(TaskEditComponent);
  ref.instance.title = task.title;
  ref.instance.taskId = task.id;
  
  ref.instance.onSave.subscribe((data) => {
    this.taskService.updateTask(data.id, data.title);
    this.editContainer.clear();
  });
  
  ref.instance.onCancel.subscribe(() => {
    this.editContainer.clear();
  });
}


}
