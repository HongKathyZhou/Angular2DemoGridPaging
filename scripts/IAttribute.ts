import {Directive, TemplateRef, ViewContainerRef, Inject} from '@angular/core';

export interface IAttribute {
    [key: string]: any;
}

@Directive({
    selector: '[ngTransclude]',
    properties: ['ngTransclude']
})
export class NgTransclude<T> {
    private _ngTransclude: TemplateRef<T>;

    private set ngTransclude(templateRef:TemplateRef<T>) {
        this._ngTransclude = templateRef;
        if (templateRef) {
            this.viewRef.createEmbeddedView(templateRef);
        }
    }

    private get ngTransclude() {
        return this._ngTransclude;
    }

    constructor(@Inject(ViewContainerRef) public viewRef:ViewContainerRef) {
    }
}
