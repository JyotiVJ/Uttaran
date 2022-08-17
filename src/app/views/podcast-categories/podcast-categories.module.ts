import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PodcastCategoriesRoutingModule } from './podcast-categories-routing.module';
import { CreatePodcastCategoriesComponent } from './create-podcast-categories/create-podcast-categories.component';
import { ListPodcastCategoriesComponent } from './list-podcast-categories/list-podcast-categories.component';
import { DetailsPodcastCategoriesComponent } from './details-podcast-categories/details-podcast-categories.component';
import { EditPodcastCategoriesComponent } from './edit-podcast-categories/edit-podcast-categories.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CreatePodcastCategoriesComponent,
    ListPodcastCategoriesComponent,
    DetailsPodcastCategoriesComponent,
    EditPodcastCategoriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    PodcastCategoriesRoutingModule
  ]
})
export class PodcastCategoriesModule { }
