import { Component, inject, ViewChild, ViewContainerRef} from '@angular/core'; 
import { AsyncPipe } from '@angular/common';
import { delay, of } from 'rxjs';
import { Task } from '../core/services/task';
import { TaskHighlight } from '../features/tasks/task-highlight/task-highlight';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-home',
  imports: [RouterLink, AsyncPipe],    
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private taskService = inject(Task);

  tasks$ = this.taskService.tasks$;

  @ViewChild('highlightContainer', { read: ViewContainerRef })
  highlightContainer!: ViewContainerRef;

  highlight(task: any) {
    // Nettoyer le conteneur avant d'afficher une nouvelle tâche en avant
    this.highlightContainer.clear();

    const ref = this.highlightContainer.createComponent(TaskHighlight);

    // On transmet la valeur au composant dynamique
    ref.instance.title = task.title;
  }

 messageAccueil$ = of("Bonjour", "à", "tous").pipe(
 delay(1000)
);


  
}