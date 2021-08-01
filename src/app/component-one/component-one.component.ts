import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.css']
})
export class ComponentOneComponent implements OnInit {
  
  constructor(private messageService: MessageService) {
    this.messageService.behaviourObs$.subscribe(sub=>{
      console.log("From component One :- ",sub)
    })
   }
   emit(){
     this.messageService.sendData(Math.random());
   }
  ngOnInit(): void {
      
  }

}
