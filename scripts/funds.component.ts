import { Component, OnInit } from '@angular/core';
import { Fund } from './fund';
import { FundDetailComponent } from './fund-detail.component';
import { FundService } from './fund.service';
import { Router } from '@angular/router';
import {OrderByPipe} from './orderby';
import {Pagination} from './pagination.component';
import {Pager} from './pager.component';

@Component({
  selector: 'my-funds',
   templateUrl: 'app/funds.component.html',
   styleUrls:  ['app/css/funds.component.css'],
   directives: [FundDetailComponent, Pagination, Pager],
   pipes: [ OrderByPipe ]
})

export class FundsComponent implements OnInit {
  funds: Fund[];
  selectedFund: Fund;
  addingFund = false;
  error: any;

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

  getFunds() {
    this.fundService
        .getFunds()
        .then(funds => this.funds = funds)
        .catch(error => this.error = error);
  }

  addFund() {
    this.addingFund = true;
    this.selectedFund = null;
  }

  close(savedFund: Fund) {
    this.addingFund = false;
    if (savedFund) { this.getFunds(); }
  }

  deleteFund(fund: Fund, event: any) {
    event.stopPropagation();
    this.fundService
        .delete(fund)
        .then(res => {
          this.funds = this.funds.filter(f => f !== fund);
          if (this.selectedFund === fund) { this.selectedFund = null; }
        })
        .catch(error => this.error = error);
  }

  ngOnInit() {
    this.getFunds();
  }

  onSelect(fund: Fund) {
    this.selectedFund = fund;
    this.addingFund = false;
  }

  gotoFundDetail() {
    this.router.navigate(['/funddetail', this.selectedFund.id]);
  }
}
