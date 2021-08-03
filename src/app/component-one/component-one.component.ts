import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


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
  predifineShapedrawing:boolean=false;
  predifineCircledrawing:boolean=false;
  radius:number;
  circleX:number;
  circleY:number;
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
    // this.generateShapeactive=true;
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
    // this.shapeCordinates.splice(0,this.shapeCordinates.length-1);
    // this.cordinates.splice(0,this.cordinates.length-1);
    this.cordinates=[];
    this.shapeCordinates=[];
    console.log(this.cordinates);
    console.log(this.shapeCordinates);
    console.log(this.line);
  }
  //mouse up and down event shape drawing
  predifinedLine:string="";
  predifinedCircleLine:string="";
  mouseEventCordinates = [];
  mouseDown($event){
    if (this.predifineShapedrawing==true || this.predifineCircledrawing==true) {
      console.log('mouseDown');
      console.log($event.offsetX,$event.offsetY);
      this.mouseEventCordinates.push({x:$event.offsetX, y:$event.offsetY});
      this.circleX = $event.offsetX;
      this.circleY = $event.offsetY
      console.log("circle center cordinates"+this.circleX, this.circleY);
    }
  }
  mouseUp($event){
    if(this.predifineShapedrawing==true || this.predifineCircledrawing==true){
    console.log('mouseuP');
    console.log($event.offsetX,$event.offsetY);
    this.mouseEventCordinates.push({x:$event.offsetX, y:$event.offsetY});
    console.log(this.mouseEventCordinates);
    var x= this.mouseEventCordinates[1].x-this.mouseEventCordinates[0].x;
    var y= this.mouseEventCordinates[1].y-this.mouseEventCordinates[0].y;
    console.log("x =" +x, 'y ='+y);
    // this.predifinedLine= "M "+this.mouseEventCordinates[0].x+" "+this.mouseEventCordinates[0].y+" "+"H "+(this.mouseEventCordinates[0].x+x)+" "+"V "+y+" "+"H "+x;
    this.predifinedLine= "M "+this.mouseEventCordinates[0].x+" "+this.mouseEventCordinates[0].y+" "+
    "L "+(this.mouseEventCordinates[0].x+x)+" "+this.mouseEventCordinates[0].y+" "+
    "L "+(this.mouseEventCordinates[0].x+x)+" "+(this.mouseEventCordinates[0].y+y)+" "+
    "L "+this.mouseEventCordinates[0].x+" "+(this.mouseEventCordinates[0].y+y)+" Z";
    if (this.predifineShapedrawing==true) {
      this.line=this.predifinedLine;
      console.log(this.predifinedLine);
      console.log("reactangle"+this.line);
    }

    //find radius
      this.radius = Math.sqrt((x*x) + (y*y));
      console.log("circle radius"+this.radius);
      this.predifinedCircleLine = "M "+this.circleX+" "+this.circleY+" "+
                                  "m -"+this.radius+" 0"+" "+
                                  'a '+this.radius+","+this.radius+" 0"+" 1,1 "+(this.radius*2)+",0"+" "+
                                  'a '+this.radius+","+this.radius+" 0"+" 1,1 -"+(this.radius*2)+",0";
      if (this.predifineCircledrawing==true) {
        this.line=this.predifinedCircleLine;
        console.log(this.predifinedCircleLine);
      }
    }
    

  }
  generatePredifinedShape(){
    this.predifineShapedrawing=true;
    this.line="";
  }
  generatePredifinedCircleShape(){
    this.line="";
    this.predifineCircledrawing=true;
    this.predifineShapedrawing=false;
  }

}
