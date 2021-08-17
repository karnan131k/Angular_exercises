import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/service/message.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-division-component',
  templateUrl: './division-component.component.html',
  styleUrls: ['./division-component.component.css']
})
export class DivisionComponentComponent implements OnInit {
  @Input() inputBoxDatas: any=[];

  constructor(private message:MessageService,private appcomponent:AppComponent) { }
  value1:number=1;
  value2:number=1;
  value3:number=1;
  result:number=1;
  division($event){
    $event.preventDefault();
    console.log("division")
    this.result= this.value1/this.value2/this.value3;
    console.log(this.value1)
    console.log(this.result)
    this.message.divResult=this.result;
  }
  delete(id:any){
    console.log("delete"+id)
    this.appcomponent.deleteComponet(id);
  }
  ngOnInit(): void {
  }
}
