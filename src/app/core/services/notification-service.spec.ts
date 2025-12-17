// import { NotificationService } from './notification-service';

// fdescribe('NotificationService (sans TestBed)', () => {
//   let service: NotificationService;
//   let values: any[];

//   beforeEach(() => {
//     jasmine.clock().install();

//     service = new NotificationService();
//     values = [];

//     service.notification$.subscribe(v => values.push(v));
//   });

//   afterEach(() => {
//     jasmine.clock().uninstall();
//   });

//   it('doit afficher une notification puis la masquer automatiquement', () => {
//     // ACT : afficher une notification
//     service.show('Hello', 'success');

//     // ASSERT 1 : notification émise
//     expect(values[values.length - 1]).toEqual({
//       message: 'Hello',
//       type: 'success',
//     });

//     // ACT : attendre 3 secondes
//     jasmine.clock().tick(3000);

//     // ASSERT 2 : notification masquée
//     expect(values[values.length - 1]).toBeNull();
//   });
// });