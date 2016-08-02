import { Component, OnInit } from '@angular/core';
import { Router }           from '@angular/router';

import { Patient }        from './patient';
import { PatientService } from './patient.service';
import { PatientSearchComponent } from './patient-search.component';

import { Fund }        from './fund';
import { FundService } from './fund.service';
import { FundSearchComponent } from './fund-search.component';

import {Pagination} from './pagination.component';
import {Pager} from './pager.component';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls:  ['app/css/dashboard.component.css'],
  directives: [PatientSearchComponent, FundSearchComponent, Pagination, Pager]
})
export class DashboardComponent implements OnInit {
  patients: Patient[] = [];
  funds: Fund[] = [];
    
    //this array contains the image we will show for each page
    private slides:Array<any> = [];
    //print to the user the selected page
    currentSelectedPage:string="";
    //print to the user the total iterms per page
    currentItemsPerPage:string="";
    //the maximum buttons to show
    private maxSize:number = 3;
    //the number of pages you want to print
    private totalResults:number = 60;
    //the current page
    private currentPage:number = 2;

  constructor(
    private router: Router,
    private patientService: PatientService,
    private fundService: FundService) {
      this.slides.push(
            {image:'http://www.angulartypescript.com/wp-content/uploads/2016/03/car1.jpg',text:'BMW 1'},
            {image:'http://www.angulartypescript.com/wp-content/uploads/2016/03/car2.jpg',text:'BMW 2'},
            {image:'http://www.angulartypescript.com/wp-content/uploads/2016/03/car3.jpg',text:'BMW 3'},
            {image:'http://www.angulartypescript.com/wp-content/uploads/2016/03/car4.jpg',text:'BMW 4'},
            {image:'http://www.angulartypescript.com/wp-content/uploads/2016/03/car5.jpg',text:'BMW 5'},
            {image:'http://www.angulartypescript.com/wp-content/uploads/2016/03/car6.jpg',text:'BMW 6'}
        );
    }
  
  private setCurrentPage(pageNo:number):void {
        this.currentPage = pageNo;
    };

    private currentPageChanged(event:any):void {
        this.currentSelectedPage = ' is : ' + event.page;
        this.currentItemsPerPage = ' is : ' +  event.itemsPerPage;
    };

  ngOnInit() {
    this.patientService.getPatientes()
       //.then(patients => this.patients = patients);
      .then(patients => this.patients = patients.slice(1, 5));
    this.fundService.getFunds()
        .then(funds => this.funds = funds.slice(1, 5));
  }

  gotoDetail(patient: Patient) {
    let link = ['/detail', patient.id];
    this.router.navigate(link);
  }

  gotoFundDetail(fund: Fund){
    let link = ['/funddetail', fund.id];
    this.router.navigate(link);
  }
}