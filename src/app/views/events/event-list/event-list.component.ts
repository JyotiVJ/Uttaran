import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/Common/common.service';
import { HelperService } from '../../../core/services/Helper/helper.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  subscriptions: Subscription[] = [];
  page: number         = 1;
  size:any             = 10;
  isLoading: boolean   = false;
  currentPage:any      = 1;
  eventList:any        = [];
  toatalEvents: number = 0;

  eventOn:any = 1;
  eventOff:any = 0;

  search: string       = '';
  searchStatus:number  = 0;
  sortType:any         =  'DESC';
  imgURL: string       = environment.imageURL;

  constructor( private commonService: CommonService,
    private helperService: HelperService,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchEventList();
  }

  fetchEventList(){
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
        url: 'admin/event-list',
        data: requestConfig
      }).subscribe((result)=>{
        console.log(result);
        this.isLoading = false;
        if(result.status == 200) {
          if(this.page == 1) {
            this.eventList = [];
            this.toatalEvents = result.data.count;
            console.log(this.toatalEvents)
            for(let item of result.data.rows) {
            if(item.event_image) {
              item.imgURL = this.imgURL + item.event_image;
               }  
            this.eventList.push(item);
            
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

  // Start Search
  startSearch() {
    if((this.search && this.search.length >= 3) || (this.search === '')) {
      this.page = 1;
      this.searchStatus = 1;
      this.fetchEventList();
    }
  }

   // Clear Search
  clearSearch() {
    if(this.search) {
      this.search = '';
      this.page = 1;
      this.fetchEventList();
    }
  }

    // On Scroll Pagination
    onScroll() {
      console.log('hdbjd')
      if (this.isLoading) {
        return
      }
      if (this.toatalEvents > this.eventList.length) {
        this.size++;
        this.fetchEventList();
      }
    } 

  openDeleteConfirmation(eventId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this Event ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          this.deleteEvent(eventId)
        } 
      })
  }

   deleteEvent(eventId){
      this.isLoading = true;
      this.subscriptions.push(
        this.commonService.deleteAPICall({
          url :'admin/delete-event/' + eventId,
        }).subscribe((result)=>{
          this.isLoading = false;
          if(result.status == 200) {
            this.helperService.showSuccess(result.msg);
            this.currentPage = 1;
            this.eventList = [];
            this.fetchEventList();
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

   // Open Status Change Confirmation
  openStatusChange(eventId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to change status of this Event ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.statusChange(eventId)
      } 
    })
  }

    // Open Status Change Confirmation
  openStatusReChange(eventId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to change status of this Event ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.statusChangeAgain(eventId)
      } 
    })
  }


  // Status Change Advertisement
  statusChange(eventId) {
     let requestConfig = { 
      event_status: this.eventOff,  
    }
     requestConfig = JSON.parse(JSON.stringify(requestConfig));
     this.isLoading = true;
    this.subscriptions.push(
      this.commonService.putAPICall({
        url: 'admin/change-event-status/' + eventId, 
        data: requestConfig
      }).subscribe((result)=>{
        this.isLoading = false;
        if(result.status == 200) {
          this.fetchEventList();
          this.helperService.showSuccess(result.msg);
         // this.page = 1;
          window.location.reload();
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


  

    // Status Change Advertisement
  statusChangeAgain(eventId) {
     let requestConfig = {
     event_status: this.eventOn,
    }
     requestConfig = JSON.parse(JSON.stringify(requestConfig));
    this.isLoading = true;
    this.subscriptions.push(
      this.commonService.putAPICall({
        url: `admin/change-event-status/` + eventId,
        data: requestConfig
      }).subscribe((result)=>{
        this.isLoading = false;
        if(result.status == 200) {
          this.helperService.showSuccess(result.msg);
          this.page = 1;
          window.location.reload();
        }
        else{
          this.helperService.showError(result.msg);
        }
      },(err)=>{
        this.isLoading = false;
        this.helperService.showError(err.error.msg);
      }))
     }

 
 

 navigateToDetails(eventId){
   this.router.navigate(['events/details/'+btoa(eventId)])
 }
 
 navigateToEdit(eventId){
   this.router.navigate(['events/edit/'+btoa(eventId)])
 }

}
