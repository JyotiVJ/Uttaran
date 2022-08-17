import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { Subscription } from 'rxjs';
import { Router , ActivatedRoute } from '@angular/router';
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';

@Component({
  selector: 'app-details-podcast',
  templateUrl: './details-podcast.component.html',
  styleUrls: ['./details-podcast.component.scss']
})
export class DetailsPodcastComponent implements OnInit {

    subscriptions: Subscription[] = [];
	isLoading: boolean            = false;
	page                          = 1;

	isImageUrl: any               = 'assets/images/no_image.png';
    imgURL:any                    = environment.imageURL;
    isImageUrleObj:any;
    ImagePath:any;

    songFileObj:any;
	songFilePath: any = '';
	songFileLength:any= '0'

	songURL:any       = "";
    sonURL:any        = environment.songURL;
    podcast_id:any    = '';

    getPodcast:any = ''; 

    podcastCategoryList:any        = [];
    totalPodcastCategory:number   = 0;

    imageStatus = 0;


  constructor(private _formBuilder: FormBuilder,
		private commonService: CommonService,
		private helperService: HelperService,
		private router: Router,private activatedRoute: ActivatedRoute) {this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.podcast_id = atob(params["id"]);
      })
    );   }

  ngOnInit(): void {
  	this.fetchPodcast();
  }

   fetchPodcast() {
    this.isLoading = true;
    this.subscriptions.push(
      this.commonService 
        .getAPICall({
          url: "admin/fetch-podcast-details/" + this.podcast_id,
        })
        .subscribe(
          (result) => {
            this.isLoading = false;
            if (result.status == 200) {
             
              this.getPodcast = result.data;

	           	 if (this.getPodcast.cover_picture) {
						this.imageStatus = 1;
						this.isImageUrl = this.imgURL + this.getPodcast.cover_picture;
					    }else{
						  this.isImageUrl = "";
					     }
					this.ImagePath = result.data.cover_picture;
					this.songURL = result.data.file_name;
					console.log(this.songURL)
			        
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
