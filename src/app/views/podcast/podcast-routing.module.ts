import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePodcastComponent } from './create-podcast/create-podcast.component';
import { ListPodcastComponent } from './list-podcast/list-podcast.component';
import { DetailsPodcastComponent } from './details-podcast/details-podcast.component';
import { EditPodcastComponent } from './edit-podcast/edit-podcast.component';

const routes: Routes = [ 
  {
    path: '',
    data: { 
      title: 'PODCAST'
    },
    children: [
      {
        path: '',
        component: ListPodcastComponent,
        data: {
          title: 'Podcast List'
        },
      },
      {
        path: 'add',
        component: CreatePodcastComponent,
        data: {
          title: 'Podcast Add'
        },
      },
       {
        path: 'edit/:id',
        component: EditPodcastComponent,
        data: {
          title: 'Podcast Edit'
        }
      },
       {
        path: 'details/:id',
        component: DetailsPodcastComponent,
        data: {
          title: 'Podcast Details'
        }
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodcastRoutingModule { }
