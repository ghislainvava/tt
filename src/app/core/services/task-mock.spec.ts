import { TestBed } from '@angular/core/testing';
import { Task } from './task';

describe('Task Service', () => {
  let service: Task;

  beforeEach(() => {
    // ✅ ARRANGE (préparation du contexte de test)
    // Ici, on demande à Angular de créer un mini-environnement de tests
    // dans lequel le service Task peut être instancié via l'injection.
    TestBed.configureTestingModule({
      providers: [Task] // "Task" est un provider : Angular sait comment le créer
    });

    // ✅ ARRANGE (récupérer l'instance réelle du service)
    // TestBed.inject(Task) = équivalent "Angular" de new Task(...),
    // mais avec gestion des dépendances (injection).
    service = TestBed.inject(Task);

    // ✅ ARRANGE (état propre)
    // Très important : chaque test doit partir d'un état connu.
    // Ici on vide la liste pour éviter que les tests se contaminent entre eux.
    service.clearTasks();
  });

  it('devrait être créé', () => {
    // ✅ ASSERT
    // On vérifie simplement que le service existe bien (instanciation OK).
    expect(service).toBeTruthy();
  });

  it('devrait ajouter une tâche', () => {
    // ✅ ACT
    // On exécute l'action à tester : ajouter une tâche.
    service.addTask('Apprendre les tests');

    // ✅ ASSERT
    // On récupère l'état actuel du service.
    const tasks = service.getTasks();

    // 1) Il doit y avoir exactement 1 tâche après l'ajout
    expect(tasks.length).toBe(1);

    // 2) La tâche ajoutée doit avoir le bon titre
    expect(tasks[0].title).toBe('Apprendre les tests');

    // 3) Et elle ne doit pas être terminée par défaut
    expect(tasks[0].completed).toBe(false);
  });

  it('devrait supprimer une tâche', () => {
    // ✅ ARRANGE
    // On crée d'abord une tâche pour avoir quelque chose à supprimer.
    service.addTask('Tâche temporaire');

    // On récupère l'id de la tâche créée (il servira à la suppression)
    const taskId = service.getTasks()[0].id;

    // ✅ ACT
    // On supprime la tâche.
    service.deleteTask(taskId);

    // ✅ ASSERT
    // Après suppression, la liste doit être vide.
    expect(service.getTasks().length).toBe(0);
  });

  it('devrait marquer une tâche comme terminée', () => {
    // ✅ ARRANGE
    // On ajoute une tâche pour ensuite tester le "toggle".
    service.addTask('Tâche à terminer');
    const taskId = service.getTasks()[0].id;

    // ✅ ACT
    // toggleTask(id) inverse l'état completed : false → true
    service.toggleTask(taskId);

    // ✅ ASSERT
    // On vérifie que la tâche est bien passée en "terminée".
    const task = service.getTasks()[0];
    expect(task.completed).toBe(true);
  });
});