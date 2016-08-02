import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Fund } from './fund';
import { FundService } from './fund.service';

@Component({
  selector: 'my-fund-detail',
  templateUrl: 'app/fund-detail.component.html',
  styleUrls:  ['app/css/fund-detail.component.css']
})
export class FundDetailComponent implements OnInit, OnDestroy {
  @Input() fund: Fund;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false; // true if navigated here

  constructor(
    private fundService: FundService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.fundService.getfund(id)
            .then(fund => this.fund = fund);
      } else {
        this.navigated = false;
        this.fund = new Fund();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.fundService
        .save(this.fund)
        .then(fund => {
          this.fund = fund; // saved patient, w/ id if new
          this.goBack(fund);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
  goBack(savedFund: Fund = null) {
    this.close.emit(savedFund);
    if (this.navigated) { window.history.back(); }
  }
}