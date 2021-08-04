import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.css']
})
export class ComponentOneComponent implements OnInit {
  
 
  constructor(private messageService: MessageService) {
    
   }
   ngOnInit(): void {
    console.log('COMPONENTONE');
    this.messageService.behaviourObs$.subscribe(sub=>{
      console.log("From component One :- ",sub)
    })
  }
  emit(){
    this.messageService.setData(Math.random());
  }
  

}
