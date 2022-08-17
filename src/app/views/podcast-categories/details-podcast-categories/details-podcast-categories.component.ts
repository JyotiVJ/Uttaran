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
  selector: 'app-details-podcast-categories',
  templateUrl: './details-podcast-categories.component.html',
  styleUrls: ['./details-podcast-categories.component.scss']
})
export class DetailsPodcastCategoriesComponent implements OnInit {

	subscriptions: Subscription[] = [];
	isLoading: boolean = false;
	page = 1;
	isImageUrl: any   = 'assets/images/no_image.png';
	imgURL:string     = environment.imageURL;
	isImageUrleObj:any;
	imageStatus:number = 0;
	ImagePath:any;
	podcast_category_id:any = '';
	getPodcastCategory:any = '';
	

  constructor(private _formBuilder: FormBuilder,
		private commonService: CommonService,
		private helperService: HelperService,
		private router: Router,private activatedRoute: ActivatedRoute) {this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.podcast_category_id = atob(params["id"]);
      })
    );   
    }

    

  ngOnInit(): void {
  	this.fetchPodcastCategoryDetails();
  }

    fetchPodcastCategoryDetails() {
    this.isLoading = true;
    this.subscriptions.push(
      this.commonService 
        .getAPICall({
          url: "admin/fetch-podcast-category-details/" + this.podcast_category_id,
        })
        .subscribe(
          (result) => {
            this.isLoading = false;
            if (result.status == 200) {
             
              this.getPodcastCategory = result.data;
              	if (this.getPodcastCategory.cover_image) {

					this.imageStatus = 1;
					this.imgURL = this.imgURL + this.getPodcastCategory.cover_image;

				}else{
					this.imgURL = "";
				}
				this.ImagePath = result.data.cover_image;
               
		      
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
 