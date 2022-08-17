import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from '../../../../environments/environment';

import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  subscriptions: Subscription[] = [];
  addForm: FormGroup;
  formSubmitted: boolean = false;
  page: number         = 1;
  isLoading: boolean   = false;
  currentPage:any      = 1;
  public Editor        = ClassicEditor;

  about_us: any        = {}

  imageUrl:any         = 'assets/images/no_image.png'; 
  imageUrlObj:any      = '';
  imageStatus:number   = 0;
  imgURL:string        = environment.imageURL;


  constructor(private commonService: CommonService,
    private helperService: HelperService,
    private _formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
  	this.fetchAboutUs();
  	this.createAddForm();
  }

       // Create Form
  createAddForm() {
    this.addForm = this._formBuilder.group({
      aboutUs_title: ['', [Validators.required, noSpace]],
      aboutUs_body : ['', [Validators.required, noSpace]],
      aboutUs_image: [''],
     
    })
  }

   

   // Fetch About Us Details
  fetchAboutUs() {
    this.isLoading = true;
    this.subscriptions.push(
      this.commonService.getAPICall({
        url: 'admin/fetch-aboutUs',
        
      }).subscribe((result)=>{
        this.isLoading = false;
        if(result.status == 200) {
          this.about_us = result.data;
          console.log(this.about_us);

        if (this.about_us.aboutUs_image) {
			this.imgURL = this.imgURL + this.about_us.aboutUs_image;
			this.imageStatus = 1;
		}else{
			this.imgURL = this.imageUrl;
		}
            this.addForm.patchValue({
            aboutUs_title: this.about_us.aboutUs_title,
            aboutUs_body: this.about_us.aboutUs_body,
            
          })
        } 
        else{
          this.about_us = {};
          this.helperService.showError(result.msg);
        }
      },(err)=>{
        this.isLoading = false;
        this.about_us = {};
        this.helperService.showError(err.error.msg)
      })
    )
  }

   editfileUpload(event) {
	    if (event.target.files && event.target.files[0]) {
	      const mainFile: File = event.target.files[0];
	      if (event.target.files[0].type.split('/')[1] != 'png' && event.target.files[0].type.split('/')[1] != 'jpg' && event.target.files[0].type.split('/')[1] != 'jpeg') {
	        this.helperService.showError('Only JPG/JPEG/PNG files allowed');
	        return;
	      }	   
	      const reader = new FileReader();
	      reader.readAsDataURL(event.target.files[0]); // read file as data url
	      reader.onload = (event) => { 
	      
	      	this.imageUrlObj = mainFile;

	      	let formData: FormData = new FormData();

	        this.isLoading = true
	        formData.append('file', this.imageUrlObj, this.imageUrlObj.name);
	        this.subscriptions.push(
	          this.commonService.postAPICall({
	            url: 'admin/upload-event-image',
	            data: formData
	          }).subscribe((result)=>{
	            this.isLoading = false;
	            if(result.status == 200) {
	              this.imageStatus        = 0;	
	              this.imageUrl         = event.target.result;
	              this.imageUrlObj          = result.data.filePath;
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
  	
   // Update About Us
	updateAboutUs() {
		this.formSubmitted = true;
		if(this.addForm.invalid) return;
		this.isLoading = true;

		
		let postData = {
			aboutUs_image : this.imageUrlObj,
			aboutUs_title : this.addForm.get('aboutUs_title').value,
			aboutUs_body : this.addForm.get('aboutUs_body').value,
		}
		
		this.subscriptions.push(
		  this.commonService.putAPICall({
		    url: 'admin/update-aboutUs',
		    data: postData
		  }).subscribe((result)=>{
		    this.isLoading = false;
		    if(result.status == 200) {
		      this.helperService.showSuccess(result.msg);
		      this.router.navigate(['cms/about-us'])
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
