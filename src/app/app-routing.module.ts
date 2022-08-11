import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardResolver } from './modules/dashboard/dashboard.resolver';
// import { NavigationComponent } from './components/navigation/navigation.component';

const routes: Routes = [


  // Routes for navigation 
  { path: '', pathMatch: "full", redirectTo: "/dashboard" },

  // Routes for  dashboard
  {
    path: 'dashboard',
    resolve: {
      events: DashboardResolver,
  },
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },


]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
