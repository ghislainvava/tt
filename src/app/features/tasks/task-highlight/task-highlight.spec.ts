import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskHighlight } from './task-highlight';

describe('TaskHighlight', () => {
            let component: TaskHighlight;
            let fixture: ComponentFixture<TaskHighlight>;

            beforeEach(async () => {
                // Configuration du module de test
                await TestBed.configureTestingModule({
                imports: [TaskHighlight]
                }).compileComponents();

                // Création du composant
                fixture = TestBed.createComponent(TaskHighlight);
                component = fixture.componentInstance;
            });

            it('devrait afficher le titre dans le DOM', () => {
                // ARRANGE : Définir le titre
                component.title = 'préparer le cours Angular';
                
                // ACT : Mettre à jour le template
                fixture.detectChanges(); // ⚠️ IMPORTANT !

                // ASSERT : Vérifier le DOM 
                const compiled = fixture.nativeElement;
                expect(compiled.querySelector('h2')?.textContent)
                .toContain('préparer le cours Angular');
            });
            });