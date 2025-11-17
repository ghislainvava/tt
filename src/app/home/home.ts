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
  // Injection moderne sans constructor
  private taskService = inject(Task);

  // (getTasks() renvoie un Observable)
  tasks$ = this.taskService.getTasks();

  ngOnInit() {
    console.log('ngOnInit exécuté');
  }
}