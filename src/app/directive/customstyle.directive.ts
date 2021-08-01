import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustomstyle]'
})
export class CustomstyleDirective {

  constructor(private el:ElementRef) { 
   
  }
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  @HostListener('click') onClick(){
    this.el.nativeElement.style.backgroundColor = this.getRandomColor();
  }

}
