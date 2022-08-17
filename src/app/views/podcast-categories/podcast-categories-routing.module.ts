import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePodcastCategoriesComponent } from './create-podcast-categories/create-podcast-categories.component';
import { ListPodcastCategoriesComponent } from './list-podcast-categories/list-podcast-categories.component';
import { DetailsPodcastCategoriesComponent } from './details-podcast-categories/details-podcast-categories.component';
import { EditPodcastCategoriesComponent } from './edit-podcast-categories/edit-podcast-categories.component';

const routes: Routes = [ 
  {
    path: '',
    data: { 
      title: 'PODCAST CATEGORIES'
    },
    children: [
      {
        path: '',
        component: ListPodcastCategoriesComponent,
        data: {
          title: 'Podcast Categories List'
        },
      },
      {
        path: 'add',
        component: CreatePodcastCategoriesComponent,
        data: {
          title: 'Podcast Categories Add'
        },
      },
       {
        path: 'edit/:id',
        component: EditPodcastCategoriesComponent,
        data: {
          title: 'Podcast Categories Edit'
        }
      },
       {
        path: 'details/:id',
        component: DetailsPodcastCategoriesComponent,
        data: {
          title: 'Podcast Categories Details'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodcastCategoriesRoutingModule { }
