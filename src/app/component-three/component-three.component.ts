import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-component-three',
  templateUrl: './component-three.component.html',
  styleUrls: ['./component-three.component.css']
})
export class ComponentThreeComponent implements OnInit {

  constructor(private messageService: MessageService) {
    
   }

  ngOnInit(): void {
    
    console.log('COMPONENTHREE');
     
    this.messageService.behaviourObs$.subscribe(sub=>{
      console.log("From component Three :- ",sub)
    });
  }

}
