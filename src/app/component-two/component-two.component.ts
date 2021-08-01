import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-component-two',
  templateUrl: './component-two.component.html',
  styleUrls: ['./component-two.component.css']
})
export class ComponentTwoComponent implements OnInit {

  constructor(private messageService: MessageService) {
    this.messageService.behaviourObs$.subscribe(sub=>{
      console.log("From component Two :- ",sub)
    })
   }

  ngOnInit(): void {
  }

}
