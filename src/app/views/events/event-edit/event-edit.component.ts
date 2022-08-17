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
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {

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
	event_id:any = '';
	getEvent:any = '';

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
			event_status : ['', [Validators.required, noSpace]],
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


 submitEvents(){
     this.formSubmitted = true;
		console.log(this.addForm);
		if(this.addForm.invalid) return;

		let postData = {
			event_image : this.ImagePath,
			event_title : this.addForm.get('event_title').value,
			event_description : this.addForm.get('event_description').value,
			event_location : this.addForm.get('event_location').value,
			event_date : this.addForm.get('event_date').value,
			event_type : this.addForm.get('event_type').value,
			event_status : this.addForm.get('event_status').value
		}
		 this.isLoading = true;
		  this.subscriptions.push(
			this.commonService.putAPICall({
				url: 'admin/update-event/'+ this.event_id,
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
           	if (this.getEvent.event_image) {
					this.imageStatus = 1;
					this.imgURL = this.imgURL + this.getEvent.event_image;

				    }else{
					  this.imgURL = "";
				 }
				this.ImagePath = result.data.event_image;
		        this.addForm.patchValue({
		        event_title: this.getEvent.event_title,
		        event_status: this.getEvent.event_status,
		        event_description: this.getEvent.event_description,
		        event_location: this.getEvent.event_location,
		        event_date: moment(this.getEvent.event_date).format('YYYY-MM-DD'),
		        event_type: this.getEvent.event_type,
            
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
