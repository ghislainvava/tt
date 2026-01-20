import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, of, tap ,} from 'rxjs';
import { NotificationService } from './notification-service';

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
  tap(tasks => console.log('Nouvelle liste :', tasks)),
  tap(tasks => console.log(' Nombre de tâches:', tasks.length))
);

private notificationService = inject(NotificationService);


  // Ajouter une tâche + réémettre la nouvelle liste
  addTask(title: string) :void {
    const currentTasks = this.tasksSubject.value;
    const newTask: TaskItem = { 
      id: this.nextId++,
      title,
      completed: false 
  };
    this.tasksSubject.next([...currentTasks, newTask]); // ✅ NOUVELLE RÉFÉRENCE
    this.notificationService.show(`Tâche "${title}" ajoutée !`, 'success');
  }
  
  //suprimer une tâche + réémettre la nouvelle liste
  deleteTask(id: number): void {
  const currentTasks = this.tasksSubject.value;
  const task = currentTasks.find(t => t.id === id);
  const updatedTasks = currentTasks.filter(t => t.id !== id); 
  this.tasksSubject.next(updatedTasks);
  
  if (task) {
    this.notificationService.show(`Tâche "${task.title}" supprimée`, 'info');
  }
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

getTasks(): TaskItem[] {
  return this.tasksSubject.value;
}

clearTasks(): void {
  this.tasksSubject.next([]);
  this.nextId = 1;
}


}