import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventAddComponent } from './event-add/event-add.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventEditComponent } from './event-edit/event-edit.component';

const routes: Routes = [
  {
    path: '',
    data: { 
      title: 'Events'
    },
    children: [
      {
        path: '',
        component: EventListComponent,
        data: {
          title: 'Events List'
        },
      },
      {
        path: 'add',
        component: EventAddComponent,
        data: {
          title: 'Events Create'
        },
      },
      {
        path: 'details/:id',
        component:  EventDetailsComponent,
        data: {
          title: 'Events Details'
        },
      },
      {
        path: 'edit/:id',
        component: EventEditComponent,
        data: {
          title: 'Events Update'
        },
      },
     
      
     
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
