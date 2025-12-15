import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { Task } from '../../../core/services/task';
import { AsyncPipe } from '@angular/common';
import { TaskHighlight } from '../task-highlight/task-highlight';

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


  addTask(title: string) {
    this.taskService.addTask(title);
  }

 
highlight(task: any) {
  this.highlightContainer.clear();
  const ref = this.highlightContainer.createComponent(TaskHighlight);
  ref.instance.title = task.title;
}

  

}
