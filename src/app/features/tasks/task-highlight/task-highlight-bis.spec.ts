import { TaskHighlight } from './task-highlight';

// fdescribe('TaskHighlight ', () => {

//   it('devrait initialiser title avec une chaîne vide', () => {
//     const component = new TaskHighlight();
//     expect(component.title).toBe('');
//   });

//   it('devrait permettre de changer le titre', () => {
//     const component = new TaskHighlight();
//     component.title = 'Tâche en avant';
//     expect(component.title).toBe('Tâche en avant');
//   });

// });

fdescribe('TaskHighlight (exercices erreurs)', () => {

  it('doit provoquer une erreur simple d’assertion', () => {
    const component = new TaskHighlight();
    expect(component.title).toBe('Toto'); // 
  });

  it('doit provoquer une erreur DOM sans TestBed', () => {
    const component = new TaskHighlight();
    component.title = 'Bonjour';

    const compiled = (component as any).nativeElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Bonjour');
  });
});