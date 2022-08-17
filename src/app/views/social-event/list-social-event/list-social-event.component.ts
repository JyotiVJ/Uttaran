import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-social-event',
  templateUrl: './list-social-event.component.html',
  styleUrls: ['./list-social-event.component.scss']
})
export class ListSocialEventComponent implements OnInit {

  subscriptions: Subscription[] = [];
  page: number         = 1;
  size:any             = 10;
  isLoading: boolean   = false;
  currentPage:any      = 1;
  podcastList:any        = [];
  totalPodcast: number = 0;
 
  search: string       = '';
  searchStatus:number  = 0;
  sortType:any         =  'DESC';
  imgURL: string       = environment.imageURL;
  sonURL:any           = environment.songURL

  constructor(private commonService: CommonService,
    private helperService: HelperService,
    private router: Router) { }

  ngOnInit(): void {
  }

  
  //  fetchPodcastList(){
  //   let requestConfig = {
  //     page: this.page,
  //     search: this.search,
  //     size: this.size,
     
  //   }
  //   requestConfig = JSON.parse(JSON.stringify(requestConfig));
  //   if (this.searchStatus==0) {
  //     this.isLoading = true;
  //   }
    
  //   this.subscriptions.push(
  //     this.commonService.getAPICall({
  //       url: 'admin/fetch-podcast-list',
  //       data: requestConfig
  //     }).subscribe((result)=>{
  //       console.log(result);
  //       this.isLoading = false;
  //       if(result.status == 200) {
  //         if(this.page == 1) {
  //           this.podcastList = [];
  //           this.totalPodcast = result.data.count;
            
  //           for(let item of result.data.rows) {
  //            if(item.cover_picture) {
  //              item.imgURL = this.imgURL + item.cover_picture;
  //              console.log(item.imgURL)  
  //              }

  //              if(item.file_name) {
  //              item.songURL = item.file_name;
  //              console.log(item.songURL)  
  //              }
               
  //           this.podcastList.push(item); 
  //          }
  //        }

  //       }
  //       else{
  //         this.helperService.showError(result.msg);
  //       }
  //     },(err)=>{
  //       this.isLoading = false;
  //       this.helperService.showError(err.error.msg);
  //     })
  //   )
  // }

 // navigateToEdit(podcastId){
 //   this.router.navigate(['podcast/edit/'+btoa(podcastId)])
 // }

 // navigateToDetails(podcastId){
 //   this.router.navigate(['podcast/details/'+btoa(podcastId)])
 // }

}
 