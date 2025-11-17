import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Task {
  private tasks = [
    { id: 1, title: 'préparer le cours Angular' },
    { id: 2, title: 'Relire le module Rxjs' },
    { id: 3, title: 'Corriger les TPs' },
   
  ];

  getTasks() {
    return of(this.tasks).pipe(delay(1000));
  }
  
}
