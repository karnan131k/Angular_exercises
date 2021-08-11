import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-division-component',
  templateUrl: './division-component.component.html',
  styleUrls: ['./division-component.component.css']
})
export class DivisionComponentComponent implements OnInit {

  constructor(private message:MessageService) { }
  value1:number;
  value2:number;
  value3:number;
  result:number;
  division($event){
    $event.preventDefault();
    console.log("division")
    this.result= this.value1/this.value2/this.value3;
    console.log(this.value1)
    console.log(this.result)
    this.message.divResult=this.result;
  }
  
  ngOnInit(): void {
  }
}
