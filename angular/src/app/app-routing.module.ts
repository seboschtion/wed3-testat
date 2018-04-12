import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const appRoutes: Routes = [
  // TODO: Add routing of lazy loaded dashboard Module (with guards) here...
  // { path: 'dashboard', component: , pathMatch: 'full' },
  // TODO: Add routing of eagerly loaded modules here...
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
