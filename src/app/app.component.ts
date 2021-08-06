import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common'; 
import { Guid } from 'guid-typescript';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public id: Guid;
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
  selectedShapeControlPoints=[];
  predifineRecangledrawing: boolean;
  customShape: boolean=false;
  shapeIndex:number;
  //for button colr change
  customtoggle: boolean=false;
  reactangletoggle: boolean=false;
  circletoggle: boolean=false;
  
  isSingleClick: Boolean = true; 
//  -----------------------------------------
    // SHAPE moving
  selectedShapeMovingCordinates=[];//selected shape mouse down and mous up codinates store array
  movingDistance:number; // moving length
  newCircleCenterX:number;
  newCircleCenterY:number;

  selectedLine:string="";
  selectedShapeIndex:number;
 
  constructor(@Inject(DOCUMENT) document){

  }
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
    if (this.customShape==true) {
      this.count++;
      this.cordinates.push({x:$event.offsetX,y:$event.offsetY});
      if(this.cordinates.length>=2){
          if(this.cordinates[this.cordinates.length-1].x == this.cordinates[this.cordinates.length-2].x && this.cordinates[this.cordinates.length-1].y == this.cordinates[this.cordinates.length-2].y){
            this.cordinates.forEach(val => this.shapeCordinates.push(Object.assign({}, val)));
            this.cordinates.splice(0,this.cordinates.length-1);
            this.createShape();
          }
      }
      if(this.count==1){
        this.line +="M "+$event.offsetX+" "+$event.offsetY+" ";
      }
      this.line +="L "+$event.offsetX+" "+$event.offsetY+" ";
    }
  }
  // generate custom shape after button click
  createShape(){
    // this.generateShapeactive=true;
    this.line="";
    for (let i = 0; i < this.shapeCordinates.length-1; i++) {
      const element = this.shapeCordinates[i];
      if(i==0){
        const elementzero = this.shapeCordinates[i];
        this.line = "M "+elementzero.x+" "+elementzero.y+" ";
      }
      this.line +="L "+element.x+" "+element.y+" ";
    }
    this.line=this.line+" Z";
    this.shape_d_paths.push({
                              customShape:this.line,
                              color:this.getRandomColor(),
                              centerX:'',
                              centerY:'',
                              id:Guid.create()});
    this.cordinates=[];
    this.shapeCordinates=[];
    this.line="";
  }

  //mouse up and down event shape drawing
  mouseDown($event){
    // this.cordinates=[];
    if (this.predifineRecangledrawing==true || this.predifineCircledrawing==true) {
      this.mouseEventCordinates.push({x:$event.offsetX, y:$event.offsetY});
      this.circleX = $event.offsetX;
      this.circleY = $event.offsetY
    }
  }
  mouseUp($event){
    // this.cordinates=[];
    this.mouseEventCordinates.push({x:$event.offsetX, y:$event.offsetY});
    if (this.mouseEventCordinates.length==2) {
      var x= this.mouseEventCordinates[1].x-this.mouseEventCordinates[0].x;
      var y= this.mouseEventCordinates[1].y-this.mouseEventCordinates[0].y;
      this.radius = Math.sqrt((x*x) + (y*y));
    }
    
    //react angle drawing
    if(this.predifineRecangledrawing==true){
      this.predifinedLine= "M "+this.mouseEventCordinates[0].x+" "+this.mouseEventCordinates[0].y+" "+
      "L "+(this.mouseEventCordinates[0].x+x)+" "+this.mouseEventCordinates[0].y+" "+
      "L "+(this.mouseEventCordinates[0].x+x)+" "+(this.mouseEventCordinates[0].y+y)+" "+
      "L "+this.mouseEventCordinates[0].x+" "+(this.mouseEventCordinates[0].y+y)+" Z";
      // this.line=this.predifinedLine;
      this.shape_d_paths.push({
                                customShape:this.predifinedLine,
                                color:this.getRandomColor(),
                                centerX:'',
                                centerY:'',
                                id:Guid.create()
                              });
      this.predifinedLine="";
    }
    // circle drawing
    if (this.predifineCircledrawing==true && this.radius>0) {
      this.predifinedCircleLine = "M "+this.circleX+" "+this.circleY+" "+
      "m -"+this.radius+" 0"+" "+
      'a '+this.radius+","+this.radius+" 0"+" 1,1 "+(this.radius*2)+",0"+" "+
      'a '+this.radius+","+this.radius+" 0"+" 1,1 -"+(this.radius*2)+",0";
      
      // this.line=this.predifinedCircleLine;
      this.shape_d_paths.push({
                                customShape:this.predifinedCircleLine,
                                color:this.getRandomColor(),
                                centerX:this.circleX,
                                centerY:this.circleY,
                                id:Guid.create()
                              });
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
// -----------------------------------------------
  
  selectShape(i){
    console.log("select shape"+i);
    this.isSingleClick = true;
    setTimeout(()=>{
      if(this.isSingleClick){
           this.selectedShapeIndex=i;
           //for circle moveing
           this.selectedShapeMovingCordinates.push({x:this.shape_d_paths[this.selectedShapeIndex].centerX, y:this.shape_d_paths[this.selectedShapeIndex].centerY});
           console.log("shape selected");
           
           
           if(this.selectedLine==""){
             var gpathId:string = this.shape_d_paths[i].id;
             var groupElement =document.getElementById(gpathId);// document.querySelector('#selectedGroup');
             console.log("id"+gpathId)
            var bboxGroup = (groupElement as any).getBBox();
            console.log(bboxGroup);
            //selected line gererate
            this.selectedLine= "M "+bboxGroup.x+" "+bboxGroup.y+" "+
                               "L "+(bboxGroup.x+bboxGroup.width)+" "+bboxGroup.y+" "+
                               "L "+(bboxGroup.x+bboxGroup.width)+" "+(bboxGroup.y+bboxGroup.height)+" "+
                               "L "+bboxGroup.x+" "+(bboxGroup.y+bboxGroup.height)+" z";
                               console.log(this.selectedLine);
            //selected shape contro points generate
           
            // this.selectedShapeControlPoints.push( {cx: bboxGroup.x, cy: bboxGroup.y});
            this.selectedShapeControlPoints=[
              {cx: bboxGroup.x, cy: bboxGroup.y},
              {cx: (bboxGroup.x+bboxGroup.width), cy: bboxGroup.y},
              {cx: (bboxGroup.x+bboxGroup.width), cy: (bboxGroup.y+bboxGroup.height)},
              {cx: bboxGroup.x, cy: (bboxGroup.y+bboxGroup.height)},

              {cx: (bboxGroup.x+(bboxGroup.width)/2), cy: bboxGroup.y},
              {cx: (bboxGroup.x+(bboxGroup.width)/2), cy: (bboxGroup.y+bboxGroup.height)},
              {cx: bboxGroup.x, cy: (bboxGroup.y+(bboxGroup.height)/2)},
              {cx: (bboxGroup.x+bboxGroup.width), cy: (bboxGroup.y+(bboxGroup.height)/2)}
            ];
            console.log(this.selectedShapeControlPoints);
             this.predifineCircledrawing=false //to avoid draw another circle
            //  logic for moving circle
            //  if((this.selectedShapeMovingCordinates.length==2) && this.movingDistance>0){
            //    console.log("i am circle");
            //    var newMovedCircleLine = "M "+this.newCircleCenterX+" "+this.newCircleCenterY+" "+
            //    "m -"+this.movingDistance+" 0"+" "+
            //    'a '+this.movingDistance+","+this.movingDistance+" 0"+" 1,1 "+(this.movingDistance*2)+",0"+" "+
            //    'a '+this.movingDistance+","+this.movingDistance+" 0"+" 1,1 -"+(this.movingDistance*2)+",0";
            //    this.selectedLine=this.shape_d_paths[i]= newMovedCircleLine;
            //    this.selectedLine= newMovedCircleLine;
            //    console.log(newMovedCircleLine);
            //  }
           }else{
            this.selectedLine="";
            this.predifineCircledrawing=true //to enable draw another circle
            this.selectedShapeMovingCordinates=[]; // to delete the moving start point
           }
           
          //  this.selectedLine=this.shape_d_paths[i].customShape;
      }
   },250)
  }

  index:number;
  deleteShapeIndex(){
    this.isSingleClick = false;
    console.log("index"+this.selectedShapeIndex);
    if(this.selectedLine!=""){
      alert("Do you want to delete this shape ?");
    this.shape_d_paths.splice(this.selectedShapeIndex,1);
    this.selectedLine="";
    this.predifineCircledrawing=true //to enable draw another circle
    }
  }
  
  //selectedShapeMouseDown function for get mousedown cordinates
  selectedShapeMouseDown($event){
    console.log("i am from selectedShapeMouseDown");
    // this.selectedShapeMovingCordinates.push({x:$event.offsetX, y:$event.offsetY});
    // this.selectedShapeMovingCordinates.push({x:this.shape_d_paths[this.selectedShapeIndex].centerX, y:this.shape_d_paths[this.selectedShapeIndex].centerY});
    this.selectedShapeMovingCordinates=[];
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
        this.newCircleCenterX=this.selectedShapeMovingCordinates[1].x;
        this.newCircleCenterY=this.selectedShapeMovingCordinates[1].y;
        console.log("x =" +x, 'y ='+y);
        console.log("moving distance "+this.movingDistance);
        console.log("moving center point "+this.newCircleCenterX,this.newCircleCenterY);
        console.log("length",this.selectedShapeMovingCordinates.length)
      }
    }
  }
  // drag event
  dragEvent($event){
    // console.log($event)
    var selectedElement = false;
    var svg = event.target;
    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);
    function startDrag(event) {
      if (event.target.classList.contains('draggable')) {
        selectedElement = event.target;
        console.log(selectedElement);
      }
    }
    function drag(event) {
        if (selectedElement) {
            
        }
    }
    function endDrag(event) {
        selectedElement = null;
    }
  }
  
   
}


