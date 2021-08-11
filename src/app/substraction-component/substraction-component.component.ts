import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-substraction-component',
  templateUrl: './substraction-component.component.html',
  styleUrls: ['./substraction-component.component.css']
})
export class SubstractionComponentComponent implements OnInit {

  constructor(private message:MessageService) { }
  value1:number;
  value2:number;
  value3:number;
  result:number;
  substract($event){
    $event.preventDefault();
    console.log("substract")
    this.result= this.value1-this.value2-this.value3;
    console.log(this.value1)
    console.log(this.result)
  }
  emit(){
    this.message.subResult=this.result;
  }
  ngOnInit(): void {
  }
}
