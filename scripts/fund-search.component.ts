import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { FundSearchService } from './fund-search.service';
import { Fund } from './fund';

@Component({
  selector: 'fund-search',
  templateUrl: 'app/fund-search.component.html',
  providers: [FundSearchService]
})

export class FundSearchComponent implements OnInit {
  funds: Observable<Fund[]>;
  searchSubject = new Subject<string>();

  constructor(
    private fundSearchService: FundSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string) { this.searchSubject.next(term); }

  ngOnInit() {
    this.funds = this.searchSubject
      .asObservable()           // cast as Observable
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.fundSearchService.search(term)
        // or the observable of empty patients if no search term
        : Observable.of<Fund[]>([]))

      .catch(error => {
        // Todo: real error handling
        console.log(error);
        return Observable.of<Fund[]>([]);
      });
  }

  gotoFundDetail(fund: Fund) {
    let link = ['/funddetail', fund.id];
    this.router.navigate(link);
  }
}