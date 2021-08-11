import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-multiply-component',
  templateUrl: './multiply-component.component.html',
  styleUrls: ['./multiply-component.component.css']
})
export class MultiplyComponentComponent implements OnInit {

  constructor(private message:MessageService) { }
  value1:number;
  value2:number;
  value3:number;
  result:number;
  multiply($event){
    $event.preventDefault();
    console.log("multiply")
    this.result= this.value1*this.value2*this.value3;
    console.log(this.value1)
    console.log(this.result)
  }
  emit(){
    this.message.mulResult=this.result;
  }
  ngOnInit(): void {
  }
}
