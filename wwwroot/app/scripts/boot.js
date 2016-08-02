"use strict";
// Imports for loading & configuring the in-memory web api
const http_1 = require('@angular/http');
const angular2_in_memory_web_api_1 = require('angular2-in-memory-web-api');
const in_memory_data_service_1 = require('./in-memory-data.service');
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const http_2 = require('@angular/http');
const app_component_1 = require('./app.component');
const app_routes_1 = require('./app.routes');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    app_routes_1.appRouterProviders,
    http_2.HTTP_PROVIDERS,
    { provide: http_1.XHRBackend, useClass: angular2_in_memory_web_api_1.InMemoryBackendService },
    { provide: angular2_in_memory_web_api_1.SEED_DATA, useClass: in_memory_data_service_1.InMemoryDataService } // in-mem server data
]);
