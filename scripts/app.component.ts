import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { PatientService }     from './patient.service';
import { FundService }     from './fund.service';

import './rxjs-extensions';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/css/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    PatientService,
    FundService
  ]
})
export class AppComponent {
  title = 'Patient Care Demo';
}
