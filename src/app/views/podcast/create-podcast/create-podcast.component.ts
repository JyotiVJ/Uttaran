import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';

@Component({
  selector: 'app-create-podcast',
  templateUrl: './create-podcast.component.html',
  styleUrls: ['./create-podcast.component.scss']
})
export class CreatePodcastComponent implements OnInit {

	addForm: FormGroup;
	formSubmitted: boolean        = false;
	subscriptions: Subscription[] = [];
	isLoading: boolean            = false;
	page                          = 1;

	isImageUrl: any               = 'assets/images/no_image.png';
    imgURL:string                 = '';
    isImageUrleObj:any;
    ImagePath:any;

    songFileObj:any;
	songFilePath: any = '';
	songFileLength:any= '0'

	songURL:any       = "";
    sonURL:any        = environment.songURL

     podcastCategoryList:any        = [];
  totalPodcastCategory: number = 0;


  constructor(private _formBuilder: FormBuilder,
		private commonService: CommonService,
		private helperService: HelperService,
		private router: Router) { }

  ngOnInit(): void {
  	this.createAddForm();
  	this.fetchPodcastCategoryList();
  }

   get f() {
       return this.addForm.controls;
      }

     // Create Form
	createAddForm() {
		this.addForm = this._formBuilder.group({
           podcast_category_id: [''],
			name : ['', [Validators.required, noSpace]],
			cover_image : ['', [Validators.required, noSpace]],
			length : ['', [Validators.required, noSpace]],
			file_name : ['', [Validators.required, noSpace]],
			details : ['', [Validators.required, noSpace]],
			
		})
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
	              this.isImageUrl = event.target.result;
	              this.ImagePath = result.data.filePath;
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

  	 // Upload Song File
  fileSongUpload(event) {
  	if (event.target.files && event.target.files[0]) {
  		const mainFile: File = event.target.files[0];
  		if (event.target.files[0].type.split('/')[1] != 'mp4' && event.target.files[0].type.split('/')[1] != 'mpeg') {
  			this.helperService.showError('Only mp4 files allowed');
  			return;
  		}	   
  		const reader = new FileReader();
	      reader.readAsDataURL(event.target.files[0]); // read file as data url
	      reader.onload = (event) => { 

	      	this.songFileObj = mainFile;

	      	let formData: FormData = new FormData();

	      	formData.append('file', this.songFileObj, this.songFileObj.name);
	      	this.subscriptions.push(
	      		this.commonService.postAPICall({
	      			url: 'admin/upload-podcast',
	      			data: formData
	      		}).subscribe(result => {
	      				//let result = event.;
	      				if(result.status == 200) {
	      				    this.songFilePath 	= result.data.filePath;
	      					this.songURL      	= this.sonURL + result.data.filePath;
	      					this.songFileLength = result.data.fileDuration.toString();
	      					console.log(this.songURL)
	      				}
	      				else{
	      					this.helperService.showError(result.msg);
	      				}
	      			
	      		},(err)=>{
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
			podcast_category_id: this.addForm.get('podcast_category_id').value,
			cover_picture :this.ImagePath,
			file_name: this.songURL,
			name : this.addForm.get('name').value,
			length : this.addForm.get('length').value,
			details : this.addForm.get('details').value,
		}
		this.isLoading = true;
		this.subscriptions.push(
			this.commonService.postAPICall({
				url: 'admin/add-podcast',
				data: postData
			}).subscribe((result)=>{
				this.isLoading = false;
				if(result.status == 200) {
					this.helperService.showSuccess(result.msg);
					this.router.navigate(['/podcast'])
					
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

	  fetchPodcastCategoryList(){
 
		    this.isLoading = true;
		    this.subscriptions.push(
		      this.commonService.getAPICall({
		        url: 'admin/fetch-podcast-category-list',
		  
		      }).subscribe((result)=>{
		        console.log(result);
		        this.isLoading = false;
		        if(result.status == 200) {
		          if(this.page == 1) {
		            this.podcastCategoryList = result.data.rows;  
		         }

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

}

