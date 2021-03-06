import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/service/message.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-substraction-component',
  templateUrl: './substraction-component.component.html',
  styleUrls: ['./substraction-component.component.css']
})
export class SubstractionComponentComponent implements OnInit {
  @Input() inputBoxDatas: any=[];
  constructor(private message:MessageService,private appcomponent:AppComponent) { }
  value1:number=0;
  value2:number=0;
  value3:number=0;
  result:number=0;
  substract($event:any){
    $event.preventDefault();
    console.log("substract")
    this.result= this.value1-this.value2-this.value3;
    console.log(this.value1)
    console.log(this.result)
    this.message.subResult=this.result;
  }
  delete(id:any){
    console.log("delete"+id)
    this.appcomponent.deleteComponet(id);
  }
  ngOnInit(): void {
  }
}
