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
  selector: 'app-create-podcast-categories',
  templateUrl: './create-podcast-categories.component.html',
  styleUrls: ['./create-podcast-categories.component.scss']
})
export class CreatePodcastCategoriesComponent implements OnInit {

    addForm: FormGroup;
	formSubmitted: boolean        = false;
	subscriptions: Subscription[] = [];
	isLoading: boolean            = false;
	page                          = 1;

	isImageUrl: any               = 'assets/images/no_image.png';
    imgURL:string                 = '';
    isImageUrleObj:any;
    ImagePath:any;

  constructor(private _formBuilder: FormBuilder,
		private commonService: CommonService,
		private helperService: HelperService,
		private router: Router) { }

  ngOnInit(): void {
  	this.createAddForm();
  }

     // Create Form
	createAddForm() {
		this.addForm = this._formBuilder.group({

			name : ['', [Validators.required, noSpace]],
			cover_image : ['', [Validators.required, noSpace]],
			length : ['', [Validators.required, noSpace]],
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
	              this.isImageUrl     = event.target.result;
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


  	 submitPodcastCateories(){
     this.formSubmitted = true;
		console.log(this.addForm);
		if(this.addForm.invalid) return;

		let postData = {
			
			cover_image :this.ImagePath,
			name : this.addForm.get('name').value,
			length : this.addForm.get('length').value,
			details : this.addForm.get('details').value,
		}
		this.isLoading = true;
		this.subscriptions.push(
			this.commonService.postAPICall({
				url: 'admin/add-podacast-category',
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


}
