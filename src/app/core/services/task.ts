import { Injectable } from '@angular/core';
import { BehaviorSubject, of, tap } from 'rxjs';

export interface TaskItem {
  id: number;
  title: string;
  completed:boolean //ajout pourtâche terminée
}

@Injectable({
  providedIn: 'root',
})
export class Task {
  private tasks = [
    { id: 1, title: 'préparer le cours Angular', completed: false},
    { id: 2, title: 'Relire le module Rxjs', completed: false},
    { id: 3, title: 'Corriger les TPs', completed: false },
   
  ];

  private nextId = 4;

   // BehaviorSubject qui stocke la liste de tâches (valeur initiale)
  private tasksSubject = new BehaviorSubject<TaskItem[]>(this.tasks);

  // Observable public que le composant écoute
tasks$ = this.tasksSubject.asObservable().pipe(
  tap(tasks => console.log('Nouvelle liste :', tasks))
);


  // Ajouter une tâche + réémettre la nouvelle liste
  addTask(title: string) :void {
    const currentTasks = this.tasksSubject.value;
    const newTask: TaskItem = { 
      id: this.nextId++,
      title,
      completed: false 
  };
    const updatedTasks = [...currentTasks, newTask];
    this.tasksSubject.next(updatedTasks);    // 👈 mise à jour
  }
  
  //suprimer une tâche + réémettre la nouvelle liste
  deleteTask(id: number): void {
    const currentTasks = this.tasksSubject.value;
    const updatedTasks = currentTasks.filter(task => task.id !== id); 
    this.tasksSubject.next(updatedTasks);//mettre à jour la liste sans la tâche supprimée
  }


  toggleTask(id: number): void {
  const currentTasks = this.tasksSubject.value;
  const updatedTasks = currentTasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  this.tasksSubject.next(updatedTasks);
}

updateTask(id: number, newTitle: string): void {
  const currentTasks = this.tasksSubject.value;
  const updatedTasks = currentTasks.map(task =>
    task.id === id ? { ...task, title: newTitle } : task
  );
  this.tasksSubject.next(updatedTasks);
}

}