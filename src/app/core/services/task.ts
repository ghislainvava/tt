import { Injectable } from '@angular/core';
import { BehaviorSubject, of, tap } from 'rxjs';

export interface TaskItem {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class Task {
  private tasks = [
    { id: 1, title: 'préparer le cours Angular' },
    { id: 2, title: 'Relire le module Rxjs' },
    { id: 3, title: 'Corriger les TPs' },
   
  ];

  private nextId = 4;

   // BehaviorSubject qui stocke la liste de tâches (valeur initiale)
  private tasksSubject = new BehaviorSubject<TaskItem[]>(this.tasks);

  // Observable public que le composant écoute
tasks$ = this.tasksSubject.asObservable().pipe(
  tap(tasks => console.log('Nouvelle liste :', tasks))
);
  // Ajouter une tâche + réémettre la nouvelle liste
  addTask(title: string) {
    const newTask: TaskItem = { id: this.nextId++, title };
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);    // 👈 mise à jour
  }
  

}