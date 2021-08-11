import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicLayout]'
})
export class DynamicLayoutDirective {

  constructor(public viewRef:ViewContainerRef) { }

}
