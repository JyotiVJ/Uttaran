import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PodcastRoutingModule } from './podcast-routing.module';
import { CreatePodcastComponent } from './create-podcast/create-podcast.component';
import { ListPodcastComponent } from './list-podcast/list-podcast.component';
import { DetailsPodcastComponent } from './details-podcast/details-podcast.component';
import { EditPodcastComponent } from './edit-podcast/edit-podcast.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CreatePodcastComponent,
    ListPodcastComponent,
    DetailsPodcastComponent,
    EditPodcastComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    PodcastRoutingModule
  ]
})
export class PodcastModule { }
