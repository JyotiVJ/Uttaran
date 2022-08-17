import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSocialEventComponent } from './list-social-event/list-social-event.component';
import { AddSocialEventComponent } from './add-social-event/add-social-event.component';
import { EditSocialEventComponent } from './edit-social-event/edit-social-event.component';
import { DetailsSocialEventComponent } from './details-social-event/details-social-event.component';


const routes: Routes = [ 
  {
    path: '',
    data: { 
      title: 'PODCAST CATEGORIES'
    },
    children: [
      {
        path: '',
        component: ListSocialEventComponent,
        data: {
          title: 'Social Event List'
        },
      },
      {
        path: 'add',
        component: AddSocialEventComponent,
        data: {
          title: 'Add Social Event'
        },
      },
       {
        path: 'edit/:id',
        component: EditSocialEventComponent,
        data: {
          title: 'Social Event Edit'
        }
      },
       {
        path: 'details/:id',
        component: DetailsSocialEventComponent,
        data: {
          title: 'Social Event Details'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialEventRoutingModule { }
