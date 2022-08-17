import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotivationShowComponent } from './motivation-show/motivation-show.component';


const routes: Routes = [{
  path: '',
  data: {
    title: 'MOTIVATION'
  },
  children: [
    {
      path: '',
      redirectTo: 'motivation'
    },
    {
      path: 'motivation',
      component: MotivationShowComponent,
      data: {
        title: 'Motivation'
      },
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotivationRoutingModule { }
