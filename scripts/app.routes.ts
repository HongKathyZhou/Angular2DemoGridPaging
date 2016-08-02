
import { provideRouter, RouterConfig }  from '@angular/router';
import { PatientsComponent } from './patients.component';
import {DashboardComponent} from './dashboard.component';
import {PatientDetailComponent} from './patient-detail.component';
import { FundsComponent } from './funds.component';
import { FundDetailComponent } from './fund-detail.component';

const routes: RouterConfig = [
    {
      path: '',
      redirectTo: '/dashboard',
      pathMatch: 'full'
    },
    {
      path: 'detail/:id',
      component: PatientDetailComponent
    },
        {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'patients',
      component: PatientsComponent
    },
    {
      path: 'funds',
      component: FundsComponent
    },
    {
      path: 'funddetail/:id',
      component: FundDetailComponent
    }
];

export const appRouterProviders = [
  provideRouter(routes)
];
