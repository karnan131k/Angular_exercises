import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicLayout]'
})
export class DynamicLayoutDirective {

  constructor(public viewRef:ViewContainerRef) { }
  delete(id){
    this.viewRef.remove(id);
  }
}
