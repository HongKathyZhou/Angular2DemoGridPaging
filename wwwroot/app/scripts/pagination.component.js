"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const core_1 = require('@angular/core');
const common_1 = require('@angular/common');
const paginationConfig = {
    maxSize: void 0,
    itemsPerPage: 10,
    boundaryLinks: false,
    directionLinks: true,
    firstText: 'First',
    previousText: 'Previous',
    nextText: 'Next',
    lastText: 'Last',
    rotate: true
};
const PAGINATION_TEMPLATE = `
  <ul class="pagination" [ngClass]="classMap">
    <li class="pagination-first page-item"
        *ngIf="boundaryLinks"
        [class.disabled]="noPrevious()||disabled">
      <a class="page-link" href (click)="selectPage(1, $event)" [innerHTML]="getText('first')"></a>
    </li>

    <li class="pagination-prev page-item"
        *ngIf="directionLinks"
        [class.disabled]="noPrevious()||disabled">
      <a class="page-link" href (click)="selectPage(page - 1, $event)" [innerHTML]="getText('previous')"></a>
      </li>

    <li *ngFor="#pg of pages"
        [class.active]="pg.active"
        [class.disabled]="disabled&&!pg.active"
        class="pagination-page page-item">
      <a class="page-link" href (click)="selectPage(pg.number, $event)" [innerHTML]="pg.text"></a>
    </li>

    <li class="pagination-next page-item"
        *ngIf="directionLinks"
        [class.disabled]="noNext()">
      <a class="page-link" href (click)="selectPage(page + 1, $event)" [innerHTML]="getText('next')"></a></li>

    <li class="pagination-last page-item"
        *ngIf="boundaryLinks"
        [class.disabled]="noNext()">
      <a class="page-link" href (click)="selectPage(totalPages, $event)" [innerHTML]="getText('last')"></a></li>
  </ul>
  `;
let Pagination = class Pagination {
    constructor(cd, renderer, elementRef) {
        this.cd = cd;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.numPages = new core_1.EventEmitter();
        this.pageChanged = new core_1.EventEmitter();
        this.inited = false;
        this.onChange = (_) => {
        };
        this.onTouched = () => {
        };
        cd.valueAccessor = this;
        this.config = this.config || paginationConfig;
    }
    get itemsPerPage() {
        return this._itemsPerPage;
    }
    set itemsPerPage(v) {
        this._itemsPerPage = v;
        this.totalPages = this.calculateTotalPages();
    }
    get totalItems() {
        return this._totalItems;
    }
    set totalItems(v) {
        this._totalItems = v;
        this.totalPages = this.calculateTotalPages();
    }
    get totalPages() {
        return this._totalPages;
    }
    set totalPages(v) {
        this._totalPages = v;
        this.numPages.emit(v);
        if (this.inited) {
            this.selectPage(this.page);
        }
    }
    set page(value) {
        const _previous = this._page;
        this._page = (value > this.totalPages) ? this.totalPages : (value || 1);
        if (_previous === this._page || typeof _previous === 'undefined') {
            return;
        }
        this.pageChanged.emit({
            page: this._page,
            itemsPerPage: this.itemsPerPage
        });
    }
    get page() {
        return this._page;
    }
    ngOnInit() {
        this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
        // watch for maxSize
        this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : paginationConfig.maxSize;
        this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : paginationConfig.rotate;
        this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : paginationConfig.boundaryLinks;
        this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : paginationConfig.directionLinks;
        // base class
        this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : paginationConfig.itemsPerPage;
        this.totalPages = this.calculateTotalPages();
        // this class
        this.pages = this.getPages(this.page, this.totalPages);
        this.page = this.cd.value;
        this.inited = true;
    }
    writeValue(value) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    }
    selectPage(page, event) {
        if (event) {
            event.preventDefault();
        }
        if (!this.disabled) {
            if (event && event.target) {
                let target = event.target;
                target.blur();
            }
            this.writeValue(page);
            this.cd.viewToModelUpdate(this.page);
        }
    }
    getText(key) {
        return this[key + 'Text'] || paginationConfig[key + 'Text'];
    }
    noPrevious() {
        return this.page === 1;
    }
    noNext() {
        return this.page === this.totalPages;
    }
    // Create page object used in template
    makePage(number, text, isActive) {
        return {
            number: number,
            text: text,
            active: isActive
        };
    }
    getPages(currentPage, totalPages) {
        let pages = [];
        // Default page limits
        let startPage = 1;
        let endPage = totalPages;
        let isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
        // recompute if maxSize
        if (isMaxSized) {
            if (this.rotate) {
                // Current page is displayed in the middle of the visible ones
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;
                // Adjust if limit is exceeded
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize + 1;
                }
            }
            else {
                // Visible pages are paginated with maxSize
                startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;
                // Adjust last page if limit is exceeded
                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
        }
        // Add page number links
        for (var number = startPage; number <= endPage; number++) {
            let page = this.makePage(number, number.toString(), number === currentPage);
            pages.push(page);
        }
        // Add links to move between page sets
        if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
                let previousPageSet = this.makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }
            if (endPage < totalPages) {
                let nextPageSet = this.makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
        }
        return pages;
    }
    // base class
    calculateTotalPages() {
        let totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], Pagination.prototype, "maxSize", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Pagination.prototype, "boundaryLinks", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Pagination.prototype, "directionLinks", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Pagination.prototype, "firstText", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Pagination.prototype, "previousText", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Pagination.prototype, "nextText", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], Pagination.prototype, "lastText", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Pagination.prototype, "rotate", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], Pagination.prototype, "disabled", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], Pagination.prototype, "numPages", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', core_1.EventEmitter)
], Pagination.prototype, "pageChanged", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], Pagination.prototype, "itemsPerPage", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], Pagination.prototype, "totalItems", null);
Pagination = __decorate([
    core_1.Component({
        selector: 'pagination[ngModel]',
        template: PAGINATION_TEMPLATE,
        directives: [common_1.NgFor, common_1.NgIf]
    }),
    __param(0, core_1.Self()), 
    __metadata('design:paramtypes', [common_1.NgModel, core_1.Renderer, core_1.ElementRef])
], Pagination);
exports.Pagination = Pagination;
