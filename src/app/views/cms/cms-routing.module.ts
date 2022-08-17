import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [{
  path: '',
  data: {
    title: 'CMS'
  },
  children: [
    {
      path: '',
      redirectTo: 'cms'
    },
    {
      path: 'about-us',
      component: AboutUsComponent,
      data: {
        title: 'Privacy Policy'
      },
    },
    {
      path: 'home',
      component: HomeComponent,
      data: {
        title: 'Terms & Conditions'
      },
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
