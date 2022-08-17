import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscriptions: Subscription[] = [];
  addForm: FormGroup;
  formSubmitted: boolean = false;
  page: number         = 1;
  isLoading: boolean   = false;
  currentPage:any      = 1;
  public Editor = ClassicEditor;
  home: any = {}

  constructor(private commonService: CommonService,
    private helperService: HelperService,
    private _formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
  	this.fetchHome();
  	this.createAddForm();
  }

   // Create Form
  createAddForm() {
    this.addForm = this._formBuilder.group({
      sub_title: ['', [Validators.required, noSpace]],
      title_one : ['', [Validators.required, noSpace]],
      title_two: ['', [Validators.required, noSpace]],
      youtube_link: ['', [Validators.required, noSpace]],
    })
  }


   // Fetch Home
  fetchHome() {
    this.isLoading = true;
    this.subscriptions.push(
      this.commonService.getAPICall({
        url: 'admin/fetch-homes',
        
      }).subscribe((result)=>{
        this.isLoading = false;
        if(result.status == 200) {
          this.home = result.data;
            this.addForm.patchValue({
            sub_title: this.home.sub_title,
            title_one: this.home.title_one, 	
            title_two: this.home.title_two,
            youtube_link: this.home.youtube_link,
            
          })
        } 
        else{
          this.home = {};
          this.helperService.showError(result.msg);
        }
      },(err)=>{
        this.isLoading = false;
        this.home = {};
        this.helperService.showError(err.error.msg)
      })
    )
  }


 // Update Home
	updateHome() {
		this.formSubmitted = true;
		if(this.addForm.invalid) return;
		this.isLoading = true;

		
		let postData = {
			
			sub_title : this.addForm.get('sub_title').value,
			title_one : this.addForm.get('title_one').value,
			title_two : this.addForm.get('title_two').value,
			youtube_link : this.addForm.get('youtube_link').value,
		}
		
		this.subscriptions.push(
		  this.commonService.putAPICall({
		    url: 'admin/update-homes',
		    data: postData
		  }).subscribe((result)=>{
		    this.isLoading = false;
		    if(result.status == 200) {
		      this.helperService.showSuccess(result.msg);
		      this.router.navigate(['cms/home'])
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
