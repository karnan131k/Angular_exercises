import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'demo-project';
  cordinates=[];
  shapeCordinates=[];
  line:string=" ";//M 10 10 L 90 10
  count=0;
  predifineShapedrawing:boolean=false;
  predifineCircledrawing:boolean=false;
  radius:number;
  circleX:number;
  circleY:number;
  shape_d_paths =[];
  predifinedLine:string="";
  predifinedCircleLine:string="";
  mouseEventCordinates = [];
  predifineRecangledrawing: boolean;
  customShape: boolean=false;
  shapeIndex:number;
  //for button colr change
  customtoggle: boolean=false;
  reactangletoggle: boolean=false;
  circletoggle: boolean=false;
  
  isSingleClick: Boolean = true; 
 
  // rondom color generate
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // drawing line with every mouse click for custom shape 
  mouseClick($event){
    console.log("hi");
    
    if (this.customShape==true) {
      this.count++;
      console.log($event);
      this.cordinates.push({x:$event.offsetX,y:$event.offsetY});
      if(this.cordinates.length>=2){
          if(this.cordinates[this.cordinates.length-1].x == this.cordinates[this.cordinates.length-2].x && this.cordinates[this.cordinates.length-1].y == this.cordinates[this.cordinates.length-2].y){
            this.cordinates.forEach(val => this.shapeCordinates.push(Object.assign({}, val)));
            console.log('change');
            this.cordinates.splice(0,this.cordinates.length-1);
            this.createShape();
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
      console.log("works");
    }
  }
  // generate custom shape after button click
  createShape(){
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
    this.shape_d_paths.push({customShape:this.line,color:this.getRandomColor(),centerX:'',centerY:''});
    this.cordinates=[];
    this.shapeCordinates=[];
    this.line="";
    console.log(this.cordinates);
    console.log(this.shapeCordinates);
    console.log(this.line);
  }

  //mouse up and down event shape drawing
  mouseDown($event){
    // this.cordinates=[];
    if (this.predifineRecangledrawing==true || this.predifineCircledrawing==true) {
      this.mouseEventCordinates.push({x:$event.offsetX, y:$event.offsetY});
      this.circleX = $event.offsetX;
      this.circleY = $event.offsetY
      console.log("circle center cordinates"+this.circleX, this.circleY);
    }
  }
  mouseUp($event){
    // this.cordinates=[];
    this.mouseEventCordinates.push({x:$event.offsetX, y:$event.offsetY});
    if (this.mouseEventCordinates.length==2) {
      var x= this.mouseEventCordinates[1].x-this.mouseEventCordinates[0].x;
      var y= this.mouseEventCordinates[1].y-this.mouseEventCordinates[0].y;
      this.radius = Math.sqrt((x*x) + (y*y));
      console.log("x =" +x, 'y ='+y);
      console.log("circle radius"+this.radius);
    }
    
    //react angle drawing
    if(this.predifineRecangledrawing==true){
      this.predifinedLine= "M "+this.mouseEventCordinates[0].x+" "+this.mouseEventCordinates[0].y+" "+
      "L "+(this.mouseEventCordinates[0].x+x)+" "+this.mouseEventCordinates[0].y+" "+
      "L "+(this.mouseEventCordinates[0].x+x)+" "+(this.mouseEventCordinates[0].y+y)+" "+
      "L "+this.mouseEventCordinates[0].x+" "+(this.mouseEventCordinates[0].y+y)+" Z";
      // this.line=this.predifinedLine;
      this.shape_d_paths.push({customShape:this.predifinedLine,color:this.getRandomColor(),centerX:'',centerY:''});
      console.log("reactangle"+this.predifinedLine);
      this.predifinedLine="";
    }
    // circle drawing
    if (this.predifineCircledrawing==true && this.radius>0) {
      this.predifinedCircleLine = "M "+this.circleX+" "+this.circleY+" "+
      "m -"+this.radius+" 0"+" "+
      'a '+this.radius+","+this.radius+" 0"+" 1,1 "+(this.radius*2)+",0"+" "+
      'a '+this.radius+","+this.radius+" 0"+" 1,1 -"+(this.radius*2)+",0";
      
      // this.line=this.predifinedCircleLine;
      this.shape_d_paths.push({customShape:this.predifinedCircleLine,color:this.getRandomColor(),centerX:this.circleX,centerY:this.circleY});
      this.predifinedCircleLine=""
      console.log("circle"+this.predifinedCircleLine);
    }
    //to set all related memories to initial values for new shape
    this.mouseEventCordinates=[];
    this.circleX;
    this.circleY;
  }
  generateShape(){
    this.customShape=true;
    this.predifineCircledrawing=false;
    this.predifineRecangledrawing=false;
    this.enableDisableRule(true,false,false);
    console.log('custom line '+this.cordinates);
  }
  generatePredifinedReactangleShape(){
    this.customShape=false;
    this.predifineCircledrawing=false;
    this.predifineRecangledrawing=true;
    this.enableDisableRule(false,true,false);
    console.log(this.shape_d_paths);
  }
  generatePredifinedCircleShape(){
    this.customShape=false;
    this.predifineCircledrawing=true;
    this.predifineRecangledrawing=false;
    this.enableDisableRule(false,false,true);
    console.log(this.shape_d_paths);
  }
  //chage olor of button
  enableDisableRule(custom:boolean, rect:boolean,cir:boolean) {
    this.customtoggle=custom;
    this.reactangletoggle=rect;
    this.circletoggle=cir;
  }

  selectedLine:string="";
  selectedShapeIndex:number;
  selectShape(i){
    console.log("select shape"+i);
    this.isSingleClick = true;
    setTimeout(()=>{
      if(this.isSingleClick){
           this.selectedShapeIndex=i;
           if(this.selectedLine==""){
             this.selectedLine=this.shape_d_paths[i].customShape;
             this.predifineCircledrawing=false //to avoid draw another circle
             //logic for moving circle
             if(this.shape_d_paths[i].centerX && this.shape_d_paths[i].centerY ){
               console.log("i am circle");
              
             }
           }else{
            this.selectedLine="";
            this.predifineCircledrawing=true //to enable draw another circle
           }

           console.log(this.selectedLine);
          //  this.selectedLine=this.shape_d_paths[i].customShape;
      }
   },250)
  }
  index:number;
  getShapeIndex(){
    this.isSingleClick = false;
    console.log("index"+this.selectedShapeIndex);
    if(this.selectedLine!=""){
      alert("Do you want to delete this shape ?");
    this.shape_d_paths.splice(this.selectedShapeIndex,1);
    this.selectedLine="";
    }
    
  }
  
  selectedShapeMovingCordinates=[];//selected shape mouse down and mous up codinates store array
  movingDistance; // moving length
  //selectedShapeMouseDown function for get mousedown cordinates
  selectedShapeMouseDown($event){
    console.log("i am from selectedShapeMouseDown");
    this.selectedShapeMovingCordinates.push({x:$event.offsetX, y:$event.offsetY});
  }
  //selectedShapeMouseUp function for get mouseup cordinates
  selectedShapeMouseUp($event){
    if(this.selectedLine!=""){
      console.log("i am from selectedShapeMouseUp");
      this.selectedShapeMovingCordinates.push({x:$event.offsetX, y:$event.offsetY});
      if (this.selectedShapeMovingCordinates.length==2) {
        var x= this.selectedShapeMovingCordinates[1].x-this.selectedShapeMovingCordinates[0].x;
        var y= this.selectedShapeMovingCordinates[1].y-this.selectedShapeMovingCordinates[0].y;
        this.movingDistance = Math.sqrt((x*x) + (y*y));
        console.log("x =" +x, 'y ='+y);
        console.log("moving distance "+this.movingDistance);
      }
    }
  }
}


