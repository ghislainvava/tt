import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskHighlight } from './task-highlight';

describe('TaskHighlight Component', () => {
  let component: TaskHighlight;
  let fixture: ComponentFixture<TaskHighlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskHighlight]  // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(TaskHighlight);
    component = fixture.componentInstance;
  });

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it('devrait afficher le titre passé en @Input', () => {
    // ARRANGE : Définir la valeur de @Input
    component.title = 'Apprendre Angular';
    
    // ACT : Déclencher la détection de changements
    fixture.detectChanges();
    
    // ASSERT : Vérifier que le titre s'affiche
    const element = fixture.nativeElement;
    const h2 = element.querySelector('h2');
    expect(h2.textContent).toBe('Apprendre Angular');
  });

  it('devrait avoir un titre vide par défaut', () => {
    expect(component.title).toBe('');
  });
});