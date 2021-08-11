import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-addtion-component',
  templateUrl: './addtion-component.component.html',
  styleUrls: ['./addtion-component.component.css']
})
export class AddtionComponentComponent implements OnInit {

  constructor(private message:MessageService) { }
  value1:number;
  value2:number;
  value3:number;
  result:number;
  addition($event){
    $event.preventDefault();
    console.log("addition")
    this.result= this.value1+this.value2+this.value3;
    console.log(this.value1)
    console.log(this.result)
  }
  emit(){
    this.message.addResult(this.result);
  }
  ngOnInit(): void {
  }
}
