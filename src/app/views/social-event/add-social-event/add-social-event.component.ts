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
  selector: 'app-add-social-event',
  templateUrl: './add-social-event.component.html',
  styleUrls: ['./add-social-event.component.scss']
})
export class AddSocialEventComponent implements OnInit {

	addForm: FormGroup;
	formSubmitted: boolean        = false;
	subscriptions: Subscription[] = [];
	isLoading: boolean            = false;
	page                          = 1;

	isImageUrl: any               = 'assets/images/no_image.png';
    imgURL:string                 = '';
    isImageUrleObj:any;
    ImagePath:any;

	hidden: any                   = true;
	isVehicleImageUrl: any        = [];
	isVehicleImageUrleObj: any    = [];
	imageError:boolean            = false;
	imageSubmitted:any            = false;
	extraHidden                   = true;

  constructor(private _formBuilder: FormBuilder,
		private commonService: CommonService,
		private helperService: HelperService,
		private router: Router) { }

  ngOnInit(): void {
  }

  onSelectFile(event) {
    this.imageSubmitted = true;
    if (event.target.files.length>0) {
    
    for (let i=0; i<event.target.files.length; i++){

     if (event.target.files && event.target.files[i]) {

     const mainFile: File = event.target.files[i];
     if (event.target.files[i].type.split('/')[1] != 'png' && event.target.files[i].type.split('/')[1] != 'jpg' && event.target.files[i].type.split('/')[1] != 'jpeg') {
      this.helperService.showError('Only JPG/JPEG/PNG files allowed');
      return;
    }    
    const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]); // read file as data url
      reader.onload = (event) => { 
        this.isVehicleImageUrl.push(event.target.result);
        this.isVehicleImageUrleObj.push(mainFile);
        console.log(this.isVehicleImageUrleObj)
      };
    }
  }
 }
      let formData: FormData = new FormData();
        
          for (let i=0; i<this.isVehicleImageUrleObj.length; i++){
           formData.append('file[]', this.isVehicleImageUrleObj[i], this.isVehicleImageUrleObj[i].name);
          }
          formData.append('social_event_id', '1');
		   this.subscriptions.push(
		      this.commonService.postAPICall({
		        url: 'admin/upload-social-events-images',
		        data: formData
		      }).subscribe((result)=>{

		         if(result.status == 200) {
		         	console.log("jznhk")
		          //this.router.navigate(['sell-items/vehicle-listing']);
		          this.helperService.showSuccess(result.msg);
		          
		         }
		         else{

		        }
		         },(err)=>{
		         this.isLoading = false;
		          this.helperService.showError(err.error.message);
		         })
		      )
             }
           }
  //  submitVehicles(){

  //   console.log('fjhf');
  //   this.formSubmitted = true;
  //   if(this.vehicleForm.invalid) return;
  //   if (this.countryId == '') return;
  //   if (this.countryFrorCurrency == '') return;
  //   console.log(this.vehicleForm);

  //    let formData: FormData = new FormData();
        
  //         for (let i=0; i<this.isVehicleImageUrleObj.length; i++){
  //        formData.append('vehicleImages[]', this.isVehicleImageUrleObj[i], this.isVehicleImageUrleObj[i].name);}
        
  //         }
    
  //   this.isLoading = true;
  //   this.spinner.show();
  //    this.subscriptions.push(
  //     this.commonService.postAPICall({
  //       url: 'vehicle/create-new-vehicle',
  //       data: formData
  //     }).subscribe((result)=>{

  //       this.isLoading = false;
  //       this.spinner.hide();
  //        if(result.statusCode == 201) {
  //         this.router.navigate(['sell-items/vehicle-listing']);
  //         this.helperService.showSuccess(result.message);
          
  //        }
  //        else{
  //         if (result.statusCode != 400) {
  //             this.helperService.showError(result.message);
  //          }
  //         this.helperService.showError(result.data.errors[0].message);
  //       }
  //        },(err)=>{
  //        this.isLoading = false;
  //         this.helperService.showError(err.error.message);
  //        })
  //     )
  // }


 