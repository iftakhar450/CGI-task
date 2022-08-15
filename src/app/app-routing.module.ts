import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardResolver } from './modules/dashboard/dashboard.resolver';

const routes: Routes = [
  // Routes for navigation
  { path: '', pathMatch: 'full', redirectTo: '/login' },

  // Routes for  dashboard
  {
    path: 'dashboard',
    component: LayoutComponent,
    resolve: {
      events: DashboardResolver
    },
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      )
  },
  { path: 'login', loadChildren: () => import('./modules/auth/login/login.module').then(m => m.LoginModule) },

  { path: '**', redirectTo: '/login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
