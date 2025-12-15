import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [],  // Pas de FormsModule !
  template: `
    <div class="task-edit">
      <h3>Éditer la tâche</h3>
      <input 
        #editInput 
        [value]="title" 
        placeholder="Nouveau titre"
      />
      <button (click)="save(editInput.value)">Sauvegarder</button>
      <button (click)="cancel()">Annuler</button>
    </div>
  `,
  styles: [`
    .task-edit {
      background: #f0f0f0;
      padding: 20px;
      border-radius: 8px;
      margin: 10px 0;
    }
    input {
      padding: 8px;
      margin-right: 10px;
      font-size: 1em;
      width: 300px;
    }
  `]
})
export class TaskEditComponent {
  @Input() title = '';
  @Input() taskId = 0;
  @Output() onSave = new EventEmitter<{id: number, title: string}>();
  @Output() onCancel = new EventEmitter<void>();

  save(newTitle: string) {
    if (newTitle.trim()) {
      this.onSave.emit({ id: this.taskId, title: newTitle });
    }
  }

  cancel() {
    this.onCancel.emit();
  }
}