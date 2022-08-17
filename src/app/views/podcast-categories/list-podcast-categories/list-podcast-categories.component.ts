import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-podcast-categories',
  templateUrl: './list-podcast-categories.component.html',
  styleUrls: ['./list-podcast-categories.component.scss']
})
export class ListPodcastCategoriesComponent implements OnInit {

  subscriptions: Subscription[] = [];
  page: number         = 1;
  size:any             = 10;
  isLoading: boolean   = false;
  currentPage:any      = 1;
  podcastCategoryList:any        = [];
  totalPodcastCategory: number = 0;

  eventOn:any = 1;
  eventOff:any = 0;

  search: string       = '';
  searchStatus:number  = 0;
  sortType:any         =  'DESC';
  imgURL: string       = environment.imageURL;


  constructor(private commonService: CommonService,
    private helperService: HelperService,
    private router: Router) { }

  ngOnInit(): void {
  	this.fetchPodcastCategoryList();
  }

   fetchPodcastCategoryList(){
    let requestConfig = {
      page: this.page,
      search: this.search,
      size: this.size,
     
    }
    requestConfig = JSON.parse(JSON.stringify(requestConfig));
    if (this.searchStatus==0) {
      this.isLoading = true;
    }
    
    this.subscriptions.push(
      this.commonService.getAPICall({
        url: 'admin/fetch-podcast-category-list',
        data: requestConfig
      }).subscribe((result)=>{
        console.log(result);
        this.isLoading = false;
        if(result.status == 200) {
          if(this.page == 1) {
            this.podcastCategoryList = [];
            this.totalPodcastCategory = result.data.count;
            
            for(let item of result.data.rows) {
            if(item.cover_image) {
              item.imgURL = this.imgURL + item.cover_image;
              console.log(item.imgURL)  
               }
               
            this.podcastCategoryList.push(item); 
           }
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

  navigateToEdit(podcastId){
   this.router.navigate(['podcast-categories/edit/'+btoa(podcastId)])
 }

 navigateToEditDetails(podcastId){
   this.router.navigate(['podcast-categories/details/'+btoa(podcastId)])
 }



}
