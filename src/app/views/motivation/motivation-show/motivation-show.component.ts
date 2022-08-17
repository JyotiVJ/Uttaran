import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-motivation-show',
  templateUrl: './motivation-show.component.html',
  styleUrls: ['./motivation-show.component.scss']
})
export class MotivationShowComponent implements OnInit {

  subscriptions: Subscription[] = [];
  addForm: FormGroup;
  formSubmitted: boolean = false;
  page: number           = 1;
  isLoading: boolean     = false;
  currentPage:any        = 1;
  motivation:any         = '';
  public Editor          = ClassicEditor;
 

  constructor(private commonService: CommonService,
    private helperService: HelperService,
    private _formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.createAddForm();
    this.fetchMotivation();
  } 

  // Create Form
  createAddForm() {
    this.addForm = this._formBuilder.group({
      motivation_title: ['', [Validators.required, noSpace]],
      social : ['', [Validators.required, noSpace]],
      cultural: ['', [Validators.required, noSpace]],
      educational: ['', [Validators.required, noSpace]],
    })
  }

   // Fetch Motivation
   fetchMotivation() {
    this.isLoading = true;
    this.subscriptions.push(
      this.commonService.getAPICall({
        url: 'admin/fetch-motivation',
        
      }).subscribe((result)=>{
        this.isLoading = false;
        if(result.status == 200) {
          this.motivation = result.data;
            this.addForm.patchValue({
              motivation_title: this.motivation.motivation_title,
              social: this.motivation.social, 	
              cultural: this.motivation.cultural,
              educational: this.motivation.educational,
            
          })
        } 
        else{
          this.motivation = '';
          this.helperService.showError(result.msg);
        }
      },(err)=>{
        this.isLoading = false;
        this.helperService.showError(err.error.msg)
      })
    )
  }

  // Update Motivation
	updateMotivation() {
		this.formSubmitted = true;
		if(this.addForm.invalid) return;
		this.isLoading = true;
		let postData = {
			
			motivation_title : this.addForm.get('motivation_title').value,
			social : this.addForm.get('social').value,
			cultural : this.addForm.get('cultural').value,
			educational : this.addForm.get('educational').value,
		}
		this.subscriptions.push(
		  this.commonService.putAPICall({ 
		    url: 'admin/update-motivation',
		    data: postData
		  }).subscribe((result)=>{
		    this.isLoading = false;
		    if(result.status == 200) {
		      this.helperService.showSuccess(result.msg);
		      this.router.navigate(['motivation/motivation'])
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
