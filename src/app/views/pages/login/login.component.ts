import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { noSpace } from '../../../shared/custom-validators/nospacesvalidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm:FormGroup;
  formSubmitted: boolean = false;
  requestData: any = {};
  isLoading: boolean = false;

  constructor( private fb: FormBuilder,
    private helperService: HelperService,
    private commonService: CommonService,
    private router: Router) { }

 ngOnInit() {
      this.createForm();
    }

    createForm() {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, noSpace]],
        password: ['', [Validators.required, noSpace]]
      })
    }

    get f() {
      return this.loginForm.controls;
    }

    submitLoginForm() {
    this.formSubmitted = true;
    if(this.loginForm.invalid) return;
    console.log(this.loginForm.controls);
    this.requestData.url = 'admin/login';
    this.requestData.data = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }

    this.isLoading = true;
    this.commonService.postAPICall(this.requestData).subscribe((result)=>{
      this.isLoading = false;
      if(result.status == 200) {
        localStorage.setItem('admin-access-token',result.data.access_token);
        localStorage.setItem('admin-refresh-token',result.data.refresh_token);
        this.helperService.showSuccess(result.msg);
        this.router.navigate(['/dashboard']);
      }
      else{
        this.helperService.showError(result.msg);
      }
    },(err)=>{
      this.isLoading = false;
      this.helperService.showError(err.error.msg);
    })

  }
  

}
