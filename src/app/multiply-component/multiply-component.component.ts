import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/service/message.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-multiply-component',
  templateUrl: './multiply-component.component.html',
  styleUrls: ['./multiply-component.component.css']
})
export class MultiplyComponentComponent implements OnInit {
  @Input() inputBoxDatas: any=[];
  constructor(private message:MessageService,private appcomponent:AppComponent) { }
  value1:number=1;
  value2:number=1;
  value3:number=1;
  result:number=1;
  multiply($event){
    $event.preventDefault();
    console.log("multiply")
    this.result= this.value1*this.value2*this.value3;
    console.log(this.value1)
    console.log(this.result)
    this.message.mulResult=this.result;
  }
  delete(id:any){
    console.log("delete"+id)
    this.appcomponent.deleteComponet(id);
  }
  ngOnInit(): void {
  }
}
