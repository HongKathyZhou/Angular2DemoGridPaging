"use strict";
const router_1 = require('@angular/router');
const patients_component_1 = require('./patients.component');
const dashboard_component_1 = require('./dashboard.component');
const patient_detail_component_1 = require('./patient-detail.component');
const funds_component_1 = require('./funds.component');
const fund_detail_component_1 = require('./fund-detail.component');
const routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'detail/:id',
        component: patient_detail_component_1.PatientDetailComponent
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'patients',
        component: patients_component_1.PatientsComponent
    },
    {
        path: 'funds',
        component: funds_component_1.FundsComponent
    },
    {
        path: 'funddetail/:id',
        component: fund_detail_component_1.FundDetailComponent
    }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
