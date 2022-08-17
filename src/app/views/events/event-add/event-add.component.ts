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
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {

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

			event_title : ['', [Validators.required, noSpace]],
			event_description : ['', [Validators.required, noSpace]],
			event_location : ['', [Validators.required, noSpace]],
			event_date : ['', [Validators.required, noSpace]],
			event_type : ['', [Validators.required, noSpace]],
			event_image : [''],
				
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
	            url: 'admin/upload-event-image',
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


  submitEvents(){
     this.formSubmitted = true;
		console.log(this.addForm);
		if(this.addForm.invalid) return;

		let postData = {
			//event_image : this.addForm.get('event_image').value,
			event_image :this.ImagePath,
			event_title : this.addForm.get('event_title').value,
			event_description : this.addForm.get('event_description').value,
			event_location : this.addForm.get('event_location').value,
			event_date : this.addForm.get('event_date').value,
			event_type : this.addForm.get('event_type').value
		}
		this.isLoading = true;
		this.subscriptions.push(
			this.commonService.postAPICall({
				url: 'admin/create-event',
				data: postData
			}).subscribe((result)=>{
				this.isLoading = false;
				if(result.status == 200) {
					this.helperService.showSuccess(result.msg);
					this.router.navigate(['/events'])
					
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
