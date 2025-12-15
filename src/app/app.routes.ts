import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { TasksPage } from './features/tasks/tasks-page/tasks-page';

export const routes: Routes = [

    { path:'', component:Home},
    { path:'about', component:About },
    { path:'tasks', component: TasksPage }

    // {
    //     path: 'tasks',
    //     loadChildren: () => 
    //         import('./features/tasks/tasks-page/routes').then(m => m.TASKS_ROUTES)
    // }

];