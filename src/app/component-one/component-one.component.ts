import { Component, OnInit } from '@angular/core';


import { MessageService } from 'src/service/message.service';

@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.css']
})
export class ComponentOneComponent implements OnInit {
  
  cordinates=[];
  shapeCordinates=[];
  line:string=" ";//M 10 10 L 90 10
  count=0;
  constructor(private messageService: MessageService) {
    
   }
   ngOnInit(): void {
    console.log('COMPONENTONE');
    this.messageService.behaviourObs$.subscribe(sub=>{
      console.log("From component One :- ",sub)
    })
  }
  emit(){
    this.messageService.setData(Math.random());
  }
  mouseClick($event){
    this.count++;
    console.log($event);
    this.cordinates.push({x:$event.offsetX,y:$event.offsetY});
    if(this.cordinates.length>=2){
        if(this.cordinates[this.cordinates.length-1].x == this.cordinates[this.cordinates.length-2].x && this.cordinates[this.cordinates.length-1].y == this.cordinates[this.cordinates.length-2].y){
          // this.shapeCordinates = this.cordinates;
          this.cordinates.forEach(val => this.shapeCordinates.push(Object.assign({}, val)));
          console.log('change');
          this.cordinates.splice(0,this.cordinates.length-1);
        }
    }
    if(this.count==1){
      this.line +="M "+$event.offsetX+" "+$event.offsetY+" ";
    }
    this.line +="L "+$event.offsetX+" "+$event.offsetY+" ";
    console.log(this.line);
    console.log(this.cordinates);
    console.log(this.shapeCordinates);
    console.log($event.offsetX,$event.offsetY);
  }
  generateShape(){
    this.line="";
    for (let i = 0; i < this.shapeCordinates.length-1; i++) {
      const element = this.shapeCordinates[i];
      console.log(element.x,element.y);
      if(i==0){
        const elementzero = this.shapeCordinates[i];
        this.line = "M "+elementzero.x+" "+elementzero.y+" ";
        console.log(this.line);
        console.log("cor"+elementzero.x,elementzero.y);
      }
      this.line +="L "+element.x+" "+element.y+" ";
    }
    this.line=this.line+" Z";
    this.shapeCordinates.splice(0,this.shapeCordinates.length-1);
    this.cordinates.splice(0,this.cordinates.length-1);
    console.log(this.line);
  }

}
