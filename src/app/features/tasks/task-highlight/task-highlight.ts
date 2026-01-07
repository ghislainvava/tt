import { Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-task-highlight',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
   <div class="task-highlight">
      <h3>Tâche mise en avant</h3>
      <h2>{{ title }}</h2>
    </div>
  `,
  styleUrl: './task-highlight.css',
})
export class TaskHighlight {
  @Input() title = '';
}


