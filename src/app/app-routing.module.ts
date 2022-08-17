import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { AuthGuardService } from './core/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),
          canActivate: [AuthGuardService]
      },    
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./views/events/events.module').then((m) => m.EventsModule),
          canActivate: [AuthGuardService]
      },
       {
        path: 'cms',
        loadChildren: () =>
          import('./views/cms/cms.module').then((m) => m.CmsModule),
          canActivate: [AuthGuardService]
      },
      {
        path: 'motivation',
        loadChildren: () =>
          import('./views/motivation/motivation.module').then((m) => m.MotivationModule),
          canActivate: [AuthGuardService]
      },
      {
        path: 'podcast',
        loadChildren: () =>
          import('./views/podcast/podcast.module').then((m) => m.PodcastModule),
          canActivate: [AuthGuardService]
      },
      {
        path: 'podcast-categories',
        loadChildren: () =>
          import('./views/podcast-categories/podcast-categories.module').then((m) => m.PodcastCategoriesModule),
          canActivate: [AuthGuardService]
      },
      {
        path: 'social-event',
        loadChildren: () =>
          import('./views/social-event/social-event.module').then((m) => m.SocialEventModule),
          canActivate: [AuthGuardService]
      },
    ]
  },

  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
