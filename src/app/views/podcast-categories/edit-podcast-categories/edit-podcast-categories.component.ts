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
  selector: 'app-edit-podcast-categories',
  templateUrl: './edit-podcast-categories.component.html',
  styleUrls: ['./edit-podcast-categories.component.scss']
})
export class EditPodcastCategoriesComponent implements OnInit {

	addForm: FormGroup;
	formSubmitted: boolean = false;
	subscriptions: Subscription[] = [];
	isLoading: boolean = false;
	page = 1;
	isImageUrl: any = 'assets/images/no_image.png';
	imgURL:string     = environment.imageURL;
	isImageUrleObj:any;
    EventImagePath:any;
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
    );   }

  ngOnInit(): void {
  	this.fetchPodcastCategory();
  	this.createAddForm();
  }

    // Create Form
	createAddForm() {
		this.addForm = this._formBuilder.group({

		    name : ['', [Validators.required, noSpace]],
			cover_image : ['', [Validators.required, noSpace]],
			details : ['', [Validators.required, noSpace]],

		})
	}

  get f() {
    return this.addForm.controls;
  }

   fileUpload(event) {
	    if (event.target.files && event.target.files[0]) {
	      const mainFile: File = event.target.files[0];
	      if (event.target.files[0].type.split('/')[1] != 'png' && event.target.files[0].type.split('/')[1] != 'jpg' && event.target.files[0].type.split('/')[1] != 'jpeg') {
	        this.helperService.showError('Only JPG/JPEG/PNG files allowed');
	        return;
	      }	   
	      const reader = new FileReader();
	      reader.readAsDataURL(event.target.files[0]); // read file as data url
	      reader.onload = (event) => { 
	      
	      	this.isImageUrleObj = mainFile;

	      	let formData: FormData = new FormData();

	        this.isLoading = true
	        formData.append('file', this.isImageUrleObj, this.isImageUrleObj.name);
	        this.subscriptions.push(
	          this.commonService.postAPICall({
	            url: 'admin/upload-podcast-image',
	            data: formData
	          }).subscribe((result)=>{
	            this.isLoading = false;
	            if(result.status == 200) {
	              this.imageStatus        = 0;	
	              this.isImageUrl         = event.target.result;
	              this.ImagePath          = result.data.filePath;
	            }
	            else{
	              this.helperService.showError(result.msg);
	            }
	          },(err)=>{
	            this.isLoading = false;
	            this.helperService.showError(err.error.msg);
	          })
	        )	      	
	      };
	    }
  	}


 submitPodcastCateories(){
     this.formSubmitted = true;
		console.log(this.addForm);
		if(this.addForm.invalid) return;

		let postData = {
			cover_image : this.ImagePath,
			name : this.addForm.get('name').value,
			details : this.addForm.get('details').value,
		}
		
		 this.isLoading = true;
		  this.subscriptions.push(
			this.commonService.putAPICall({
				url: 'admin/update-podacast-category/'+ this.podcast_category_id,
				data: postData
			}).subscribe((result)=>{
				this.isLoading = false;
				if(result.status == 200) {
					this.helperService.showSuccess(result.msg);
					this.router.navigate(['/podcast-categories'])
					
				}
				else{
					this.helperService.showError(result.msg);
				}
			},(err)=>{
				this.isLoading = false;
				this.helperService.showError(err.error.msg);
			})
			)
	}

  fetchPodcastCategory() {
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
						this.isImageUrl = this.imgURL + this.getPodcastCategory.cover_image;

					    }else{
						  this.isImageUrl = "";
					     }
					this.ImagePath = result.data.cover_image;
			        this.addForm.patchValue({

			        name: this.getPodcastCategory.name,
			       // cover_image: this.getPodcastCategory.cover_image,
			     
			        details: this.getPodcastCategory.details,
	            
	          })
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
 