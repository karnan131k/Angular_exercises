import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/service/message.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-addtion-component',
  templateUrl: './addtion-component.component.html',
  styleUrls: ['./addtion-component.component.css']
})
export class AddtionComponentComponent implements OnInit {
  constructor(private message:MessageService,private appcomponent:AppComponent) { }
  @Input() inputBoxDatas: any=[];
  @Input() clear : any;
  resultBoxDatas:any =[];
  value1:any=0;
  value2:any=0;
  value3:any=0;
  result:any=0;
  addition($event){
    $event.preventDefault();
    console.log("addition")
    this.result= this.value1+this.value2+this.value3;
    console.log(this.value1)
    console.log(this.result)
    this.message.additionResult=this.result
  }
  delete(id:any){
    console.log("delete"+id)
    this.appcomponent.deleteComponet(id);
  }
  ngOnInit(): void {
    console.log(this.inputBoxDatas)
  }
  
}
