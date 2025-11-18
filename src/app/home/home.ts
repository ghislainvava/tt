import { Component, inject } from '@angular/core'; 
import { AsyncPipe } from '@angular/common';
import { Task } from '../core/services/task';

@Component({
  selector: 'app-home',
  imports: [ AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private taskService = inject(Task);

  // On se branche directement sur le BehaviorSubject
  tasks$ = this.taskService.tasks$;

  count = 0;

  ngOnInit() {
    setInterval(() => {
      this.count++;
    }, 500);
  }

  addTask() {
    this.taskService.addTask('Nouvelle tâche ' + Date.now());
  }

  refreshTasks() {
    this.taskService.refreshTasks();
  }
}