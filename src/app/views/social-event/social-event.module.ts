import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialEventRoutingModule } from './social-event-routing.module';
import { ListSocialEventComponent } from './list-social-event/list-social-event.component';
import { AddSocialEventComponent } from './add-social-event/add-social-event.component';
import { EditSocialEventComponent } from './edit-social-event/edit-social-event.component';
import { DetailsSocialEventComponent } from './details-social-event/details-social-event.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ListSocialEventComponent,
    AddSocialEventComponent,
    EditSocialEventComponent,
    DetailsSocialEventComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    SocialEventRoutingModule
  ]
})
export class SocialEventModule { }
