import { Component, OnInit } from '@angular/core'; 
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { Subscription } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import * as moment from "moment";
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

	subscriptions: Subscription[] = [];
	isLoading: boolean = false;
	page = 1;
	isImageUrl: any = 'assets/images/no_image.png';
	imgURL:string     = environment.imageURL;
	isImageUrleObj:any;
  EventImagePath:any;
  imageStatus:number = 0;
	ImagePath:any;
	event_id:any = '';
	getEvent:any = '';
	getEventDate:any = '';

  constructor(private _formBuilder: FormBuilder,
		private commonService: CommonService,
		private helperService: HelperService,
		private router: Router,private activatedRoute: ActivatedRoute) {this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.event_id = atob(params["id"]);
      })
    );   }


  ngOnInit(): void {
  	this.fetchEvent();
  }

    fetchEvent() {
    this.isLoading = true;
    this.subscriptions.push(
      this.commonService 
        .getAPICall({
          url: "admin/event-details/" + this.event_id,
        })
        .subscribe(
          (result) => {
            this.isLoading = false;
            if (result.status == 200) {
             
              this.getEvent = result.data;
              this.getEventDate = moment(this.getEvent.event_date).format('YYYY-MM-DD');
           	if (this.getEvent.event_image) {

					this.imageStatus = 1;
					this.imgURL = this.imgURL + this.getEvent.event_image;

				}else{
					this.imgURL = "";
				}
				this.ImagePath = result.data.event_image;
               
		      
            } else {
              this.helperService.showError(result.message);
            }
          },
          (err) => {
            this.isLoading = false;
            this.helperService.showError(err.error.message);
          }
        )
    );
  }

}
