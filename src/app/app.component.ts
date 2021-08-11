import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject,ViewChild,ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common'; 
import { Guid } from 'guid-typescript';
import { DynamicLayoutDirective } from './directive/dynamic-layout.directive';
import { AddtionComponentComponent } from './addtion-component/addtion-component.component';
import { SubstractionComponentComponent } from './substraction-component/substraction-component.component';
import { MultiplyComponentComponent } from './multiply-component/multiply-component.component';
import { DivisionComponentComponent } from './division-component/division-component.component';
import { LayoutboxComponent } from './layoutbox/layoutbox.component';
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
  trasilate: any;
  tx: number=0;
  ty: number=0;
  translate: any;
  customStart: any;
  customStartPoints=[];
  editableShapeIndex: number;
  matchingindex: any;
  shapeDpathCordinates=[];
  rotateLine: string;
  rotatePointX: any;
  rotatePoint=[];
  rotationCordinatesPoint=[];
  rotateShapeIndex: any;
  rotationAngle: number;
  isCustomMove: boolean=false;
  rotationCenterX: any;
  rotationCenterY: any;
  drawingShapeX: number;
  drawingShapeY: number;

  @ViewChild(DynamicLayoutDirective,{static:true})
  childRef:DynamicLayoutDirective;
  components = [AddtionComponentComponent,SubstractionComponentComponent,MultiplyComponentComponent,DivisionComponentComponent,LayoutboxComponent];
  constructor(@Inject(DOCUMENT) document,public factoryRes:ComponentFactoryResolver){

  }
  loadComponent(id){
    // this.childRef.viewRef.clear();
    const resolveFactory = this.factoryRes.resolveComponentFactory(this.components[id]);
    this.childRef.viewRef.createComponent(resolveFactory);
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
                              width:'',
                              height:'',
                              radius:'',
                              name:'custom',
                              id:Guid.create()});
    this.cordinates=[];
    this.shapeCordinates=[];
    this.line="";
  }

  isDrawShape:boolean=false;
  //mouse up and down event shape drawing
  mouseDown($event){
    // this.cordinates=[];
    if (this.predifineRecangledrawing==true || this.predifineCircledrawing==true) {
      this.mouseEventCordinates[0]=({x:$event.offsetX, y:$event.offsetY});
      this.circleX = $event.offsetX;
      this.circleY = $event.offsetY
    }
    this.isDrawShape=  true;
  }
  drawShape($event){
    if (this.isDrawShape==true) {
      // console.log($event);
      this.mouseEventCordinates[1]=({x:$event.offsetX, y:$event.offsetY});
    if (this.mouseEventCordinates.length==2) {
      this.drawingShapeX= this.mouseEventCordinates[1].x-this.mouseEventCordinates[0].x;
      this.drawingShapeY= this.mouseEventCordinates[1].y-this.mouseEventCordinates[0].y;
      this.radius = Math.sqrt(( this.drawingShapeX* this.drawingShapeX) + ( this.drawingShapeY* this.drawingShapeY));
    }
    
    //react angle drawing
    if(this.predifineRecangledrawing==true){
      this.predifinedLine= "M "+this.mouseEventCordinates[0].x+" "+this.mouseEventCordinates[0].y+" "+
      "L "+(this.mouseEventCordinates[0].x+ this.drawingShapeX)+" "+this.mouseEventCordinates[0].y+" "+
      "L "+(this.mouseEventCordinates[0].x+ this.drawingShapeX)+" "+(this.mouseEventCordinates[0].y+ this.drawingShapeY)+" "+
      "L "+this.mouseEventCordinates[0].x+" "+(this.mouseEventCordinates[0].y+ this.drawingShapeY)+" Z";
      this.line=this.predifinedLine;
     
    }
    // circle drawing
    if (this.predifineCircledrawing==true && this.radius>0) {
      this.predifinedCircleLine = "M "+this.circleX+" "+this.circleY+" "+
      "m -"+this.radius+" 0"+" "+
      'a '+this.radius+","+this.radius+" 0"+" 1,1 "+(this.radius*2)+",0"+" "+
      'a '+this.radius+","+this.radius+" 0"+" 1,1 -"+(this.radius*2)+",0";
      
      this.line=this.predifinedCircleLine;
      
      // this.predifinedCircleLine=""
      // console.log("circle"+this.predifinedCircleLine);
    }
      
    }

  }
  mouseUp($event){
    // this.cordinates=[];
    if(this.predifineRecangledrawing==true)
    {
      this.shape_d_paths.push({
                                  customShape:this.predifinedLine,
                                  color:this.getRandomColor(),
                                  centerX:this.mouseEventCordinates[0].x+(this.drawingShapeX/2),
                                  centerY:this.mouseEventCordinates[0].y+(this.drawingShapeY/2),
                                  width:this.drawingShapeX,
                                  height:this.drawingShapeY,
                                  radius:'',
                                  name:'rect',
                                  id:Guid.create()
                                });
      this.predifinedLine="";
      this.line="";
    }
    if(this.predifineCircledrawing==true) {
      this.shape_d_paths.push({
                                  customShape:this.predifinedCircleLine,
                                  color:this.getRandomColor(),
                                  centerX:this.circleX,
                                  centerY:this.circleY,
                                  radius:this.radius,
                                  width:'',
                                  height:'',
                                  name:'circle',
                                  id:Guid.create()
                                });
    this.predifinedCircleLine="";
    this.line="";
    }
    //to set all related memories to initial values for new shape
    this.mouseEventCordinates=[];
    this.circleX;
    this.circleY;
    this.isDrawShape=  false;
    this.drawingShapeX;
    this.drawingShapeY;
    
    this.radius;
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
editablepoints=[];
  clickevent =0;
  selectShape(i){
    this.clickevent++;
    console.log("select shape"+i);
    setTimeout(()=>{
      if(this.clickevent===1){
           this.selectedShapeIndex=i;
           this.rotateShapeIndex=i;
           //for circle moveing
          //  this.selectedShapeMovingCordinates.push({x:this.shape_d_paths[this.selectedShapeIndex].centerX, y:this.shape_d_paths[this.selectedShapeIndex].centerY});
           console.log("shape selected");
           if(this.selectedLine==""){
            var gpathId:string = this.shape_d_paths[i].id;
            //calculate the svgbox and control ponts
            this.drawSvgBox(gpathId);
            this.predifineCircledrawing=false; //to avoid draw another circle
            this.predifineRecangledrawing=false; // to avoid draw react angle
           }else{
             console.log("un select the shape")
            this.selectedLine="";
            this.selectedShapeControlPoints=[];
            this.predifineCircledrawing=true //to enable draw another circle
            this.selectedShapeMovingCordinates=[]; // to delete the moving start point and end point
           }
           
          //  this.selectedLine=this.shape_d_paths[i].customShape;
      }
      else if(this.clickevent===2){
        console.log("double click")
        this.selectedLine=""; // to remove getBbOX BORDER
        if (this.shape_d_paths[this.selectedShapeIndex].name=="rect") {
        //   var groupElement =document.getElementById(this.shape_d_paths[this.selectedShapeIndex].id);// document.querySelector('#selectedGroup');
        // console.log("id"+gpathId);
        // var bboxGroup = (groupElement as any).getBBox();
        // this.editablepoints=[
        //   {cx: bboxGroup.x, cy: bboxGroup.y,pointer:'nw-resize'},
        //   {cx: (bboxGroup.x+bboxGroup.width), cy: bboxGroup.y,pointer:'ne-resize'},
        //   {cx: (bboxGroup.x+bboxGroup.width), cy: (bboxGroup.y+bboxGroup.height),pointer:'se-resize'},
        //   {cx: bboxGroup.x, cy: (bboxGroup.y+bboxGroup.height),pointer:'sw-resize'},
        // ];
        this.editableShapeIndex=this.selectedShapeIndex;
        // console.log(this.editablepoints);
        const points = this.converLinePathToArray(this.shape_d_paths[this.editableShapeIndex].customShape);
        for (let index = 0; index < points.length; index++) {
          
          this.editablepoints[index]=({cx:points[index].x,cy:points[index].y});
        }
        console.log(this.editablepoints);
        }
        //write code here for custome shape control points
      }
      this.clickevent=0;
   },250)
  }
  

  index:number;
  deleteShapeIndex(){
    console.log("index"+this.selectedShapeIndex);
    if(this.selectedLine!=""){
      alert("Do you want to delete this shape ?");
    this.shape_d_paths.splice(this.selectedShapeIndex,1);
    this.selectedLine="";
    this.selectedShapeControlPoints=[];
    this.predifineCircledrawing=true //to enable draw another circle
    }
  }
  isSelected:boolean=false;
  //selectedShapeMouseDown function for get mousedown cordinates
  selectedShapeMouseDown($event){
    // this.selectedShapeMovingCordinates.push({x:$event.offsetX, y:$event.offsetY});
    setTimeout(() => {
      if (this.selectedLine != "") {
        console.log("i am from selectedShapeMouseDown");
        this.selectedShapeMovingCordinates[0]=({x:this.shape_d_paths[this.selectedShapeIndex].centerX, y:this.shape_d_paths[this.selectedShapeIndex].centerY});
        console.log(this.selectedShapeMovingCordinates)
      }else{
        
      }
     this.isSelected=true; 
    }, 200);
    this.isSelected=false; 
    this.isCustomMove=true
    // this.selectedShapeMovingCordinates=[];
  }
  customShapeMove($event){
    if (this.isCustomMove==true) {
      // console.log($event)
      var resizeUppointX = $event.offsetX;
      var resizeUppointY = $event.offsetY;
      var groupElement =document.getElementById(this.shape_d_paths[this.rotateShapeIndex].id);// document.querySelector('#selectedGroup');
      var bboxGroup = (groupElement as any).getBBox();
      var x= bboxGroup.x+(bboxGroup.width/2);
      var y= bboxGroup.y-(bboxGroup.height/2);
      var tx=resizeUppointX-x;
      var ty=resizeUppointY-y;
      this.tx=tx;
      this.ty=ty;
    }

  }
  //selectedShapeMouseUp function for get mouseup cordinates
  selectedShapeMouseUp($event){
    if(this.isSelected==true){
      if(this.selectedLine !="" ){
        console.log("i am from selectedShapeMouseUp");
        this.selectedShapeMovingCordinates[1]=({x:$event.offsetX, y:$event.offsetY});
        console.log(this.selectedShapeMovingCordinates)
        if (this.selectedShapeMovingCordinates.length==2) {
          var x= this.selectedShapeMovingCordinates[1].x-this.selectedShapeMovingCordinates[0].x;
          var y= this.selectedShapeMovingCordinates[1].y-this.selectedShapeMovingCordinates[0].y;
          this.movingDistance = Math.sqrt((x*x) + (y*y));
          this.newCircleCenterX=this.selectedShapeMovingCordinates[1].x;
          this.newCircleCenterY=this.selectedShapeMovingCordinates[1].y;
          console.log("x =" +x, 'y ='+y);
          console.log("moving distance "+this.movingDistance);
          console.log("moving center point "+this.newCircleCenterX,this.newCircleCenterY);
          console.log("length",this.selectedShapeMovingCordinates.length);
  
          if(this.shape_d_paths[this.selectedShapeIndex].name=="rect"){
                console.log("moving square");
                var x=this.selectedShapeMovingCordinates[1].x-((this.shape_d_paths[this.selectedShapeIndex].width)/2);
                var y=this.selectedShapeMovingCordinates[1].y-((this.shape_d_paths[this.selectedShapeIndex].height)/2);
                var w=this.shape_d_paths[this.selectedShapeIndex].width;
                var h=this.shape_d_paths[this.selectedShapeIndex].height;
                var newSquareLine= "M "+x+" "+y+" "+
                                   "L "+(x+w)+" "+y+" "+
                                   "L "+(x+w)+" "+(y+h)+" "+
                                   "L "+x+" "+(y+h)+" Z";
                 console.log(this.shape_d_paths[this.selectedShapeIndex].customShape);
                 this.shape_d_paths[this.selectedShapeIndex].customShape=newSquareLine;
                 this.shape_d_paths[this.selectedShapeIndex].centerX=x+(x/2);
                 this.shape_d_paths[this.selectedShapeIndex].centerY=y+(y/2);
                 console.log(this.shape_d_paths[this.selectedShapeIndex].customShape)
                 this.selectedLine="";
                this.selectedShapeControlPoints=[];
  
          }else if(this.shape_d_paths[this.selectedShapeIndex].name=="circle"){
              console.log("moving circle")
                 var newMovedCircleLine = "M "+this.newCircleCenterX+" "+this.newCircleCenterY+" "+
                 "m -"+this.shape_d_paths[this.selectedShapeIndex].radius+" 0"+" "+
                 'a '+this.shape_d_paths[this.selectedShapeIndex].radius+","+this.shape_d_paths[this.selectedShapeIndex].radius+" 0"+" 1,1 "+(this.shape_d_paths[this.selectedShapeIndex].radius*2)+",0"+" "+
                 'a '+this.shape_d_paths[this.selectedShapeIndex].radius+","+this.shape_d_paths[this.selectedShapeIndex].radius+" 0"+" 1,1 -"+(this.shape_d_paths[this.selectedShapeIndex].radius*2)+",0";
                 console.log(this.shape_d_paths[this.selectedShapeIndex].customShape)
                 this.shape_d_paths[this.selectedShapeIndex].customShape=newMovedCircleLine;
                 this.shape_d_paths[this.selectedShapeIndex].centerX=this.newCircleCenterX;
                 this.shape_d_paths[this.selectedShapeIndex].centerY=this.newCircleCenterY;
                 console.log(this.shape_d_paths[this.selectedShapeIndex].customShape)
                 console.log(newMovedCircleLine);
                //  this.selectedLine= newMovedCircleLine;
                //  var gpathId:string = this.shape_d_paths[this.selectedShapeIndex].id;
                //  this.drawSvgBox(gpathId);;
                this.selectedLine="";
                this.selectedShapeControlPoints=[];
          }else{
            console.log("custom shape movung");
            
            // var tx=this.selectedShapeMovingCordinates[1].x-this.customStartPoints[0].x;
            // var ty=this.selectedShapeMovingCordinates[1].y-this.customStartPoints[0].y;
            // this.tx=tx;
            // this.ty=ty;
            // this.customStartPoints=[];
            // this.selectedLine="";
            // this.selectedShapeControlPoints=[];
            // this.rotateLine="";
            // this.rotatePoint=[];
            
          }
        }
      }
    }
    this.isSelected=false;
    this.isCustomMove=false;
    this.customStartPoints=[];
            this.selectedLine="";
            this.selectedShapeControlPoints=[];
            this.rotateLine="";
            this.rotatePoint=[];
  }
  
  drawSvgBox(gpathId){
    var groupElement =document.getElementById(gpathId);// document.querySelector('#selectedGroup');
            console.log("id"+gpathId);
            var bboxGroup = (groupElement as any).getBBox();
            console.log(bboxGroup);
            //for custom shape starting moving points
            this.customStartPoints[0]=({x:bboxGroup.x,y:bboxGroup.y});
            //selected line gererate
            this.selectedLine= "M "+bboxGroup.x+" "+bboxGroup.y+" "+
                               "L "+(bboxGroup.x+bboxGroup.width)+" "+bboxGroup.y+" "+
                               "L "+(bboxGroup.x+bboxGroup.width)+" "+(bboxGroup.y+bboxGroup.height)+" "+
                               "L "+bboxGroup.x+" "+(bboxGroup.y+bboxGroup.height)+" z";
                               console.log(this.selectedLine);
            //selected shape contro points generate
          
            // this.selectedShapeControlPoints.push( {cx: bboxGroup.x, cy: bboxGroup.y});
            this.selectedShapeControlPoints=[
              {cx: bboxGroup.x, cy: bboxGroup.y,pointer:'nw-resize'},
              {cx: (bboxGroup.x+bboxGroup.width), cy: bboxGroup.y,pointer:'ne-resize'},
              {cx: (bboxGroup.x+bboxGroup.width), cy: (bboxGroup.y+bboxGroup.height),pointer:'se-resize'},
              {cx: bboxGroup.x, cy: (bboxGroup.y+bboxGroup.height),pointer:'sw-resize'},

              {cx: (bboxGroup.x+(bboxGroup.width)/2), cy: bboxGroup.y,pointer:'n-resize'},
              {cx: (bboxGroup.x+(bboxGroup.width)/2), cy: (bboxGroup.y+bboxGroup.height),pointer:'s-resize'},
              {cx: bboxGroup.x, cy: (bboxGroup.y+(bboxGroup.height)/2),pointer:'w-resize'},
              {cx: (bboxGroup.x+bboxGroup.width), cy: (bboxGroup.y+(bboxGroup.height)/2),pointer:'e-resize'},

              
            ];
            //rotation point
            this.rotatePoint[0]=({cx: (bboxGroup.x+(bboxGroup.width)/2), cy: (bboxGroup.y-20),pointer:'alias'});
           
            //rotate icon line
            this.rotateLine = "M "+(bboxGroup.x+(bboxGroup.width)/2)+" "+bboxGroup.y+" "+
                              "L "+(bboxGroup.x+(bboxGroup.width)/2)+" "+(bboxGroup.y-20)+" Z"+
            console.log(this.selectedShapeControlPoints);
  }

  reshape:boolean=false;
  reShapeClickDownPoint($event){
    setTimeout(() => {
      console.log("reshape click point selected");
      console.log($event.offsetX,$event.offsetY);
      console.log(this.editablepoints)
      console.log(this.shape_d_paths[this.editableShapeIndex].customShape);
      console.log(this.converLinePathToArray(this.shape_d_paths[this.editableShapeIndex].customShape));
      if( this.editablepoints.length>0){
        const mouseupCordinate = ({x:$event.offsetX,y:$event.offsetY});
      this.shapeDpathCordinates = this.converLinePathToArray(this.shape_d_paths[this.editableShapeIndex].customShape);
      this.matchingindex = this.findStartingPoint(mouseupCordinate,this.shapeDpathCordinates);
      console.log(this.matchingindex);
      }
      this.reshape=true;
    }, 200);
    
  }

  reShapeClickUpPoint($event){
    if (this.reshape==true) {
      console.log("reshape mouse click up point");
    console.log($event.offsetX,$event.offsetY);
    this.shapeDpathCordinates[this.matchingindex]=({x:$event.offsetX,y:$event.offsetY});
    const newmodfiedShapeDpath = this.createNewModifiedShape(this.shapeDpathCordinates);
    this.shape_d_paths[this.editableShapeIndex].customShape=newmodfiedShapeDpath;
    this.selectedLine=newmodfiedShapeDpath;
    const points = this.converLinePathToArray(this.shape_d_paths[this.editableShapeIndex].customShape);
        for (let index = 0; index < points.length; index++) {
          
          this.editablepoints[index]=({cx:points[index].x,cy:points[index].y});
        }
        setTimeout(() => {
          this.editablepoints=[];
          this.selectedShapeIndex;
          this.selectedLine="";
          this.predifineRecangledrawing=true;
        }, 10000);
        
    // this.editablepoints=[];
    // this.shapeDpathCordinates=[];
      //  this.editablepoints=[];
      //  this.shapeDpathCordinates=[];
      //  this.selectedLine="";
      //  this.selectedShapeControlPoints=[];
      //  this.predifineRecangledrawing=true; //to enable draw another circle
      //  this.selectedShapeMovingCordinates=[]; // to delete the moving start point and end point
    }
    this.reshape=false;

  }
  // convert d path to arry of cordinates
  converLinePathToArray(linePath){
    const arrpoints=[];
    const arr=linePath.split(" ")
    for (let index = 0; index < arr.length; index=index+3) {
      var next=1; var nextone=2;
      if (typeof(arr[index] != 'number')) {
         arrpoints.push({x:arr[index+next],y:arr[index+nextone]})
      }
    }
    return arrpoints;
  }
  findStartingPoint(mouseupPoints, editablepointsArray){
    var indexing;
    console.log(mouseupPoints.x); console.log(editablepointsArray)
    for (let index = 0; index < editablepointsArray.length-1; index++) {
      console.log(parseFloat(editablepointsArray[index].x)-5);
      console.log(parseFloat(editablepointsArray[index].x)+5);
      var xmin = parseFloat(editablepointsArray[index].x)-5;
      var xmax = parseFloat(editablepointsArray[index].x)+5;
      var ymin = parseFloat(editablepointsArray[index].y)-5;
      var ymax = parseFloat(editablepointsArray[index].y)+5;
      console.log(xmin,xmax,ymin,ymax);
      if ( ( (xmin <= mouseupPoints.x) && (mouseupPoints.x<=xmax) ) && ( (ymin <= mouseupPoints.y) && (mouseupPoints.y<=ymax) )) {
        console.log("matched"+index);
        indexing= index;
        break;
        
      }
    }
    return indexing;
  }
  createNewModifiedShape(currentshapecodinates){
    // this.generateShapeactive=true;
    var line="";
    for (let i = 0; i < currentshapecodinates.length-1; i++) {
      const element = currentshapecodinates[i];
      if(i==0){
        const elementzero = currentshapecodinates[i];
        line = "M "+elementzero.x+" "+elementzero.y+" ";
      }
      line +="L "+element.x+" "+element.y+" ";
    }
    line=line+" Z";
    return line;
  }
  // resize event
  isResize: boolean=false;

  reSizeClickDownPoint($event){
    setTimeout(() => {
      console.log("i am from resize down");

      this.isResize=true;
      this.isSelected=false;
    }, 200);
    this.isResize=false;
  }
  reSizeClickUpPoint($event){
    if (this.isResize==true) {
      console.log("i am from resize up ");
      var resizeUppointX = $event.offsetX;
      var resizeUppointY = $event.offsetY;
      var newwidth = resizeUppointX-this.shape_d_paths[this.selectedShapeIndex].centerX;
      var newheight= resizeUppointY-this.shape_d_paths[this.selectedShapeIndex].centerY;
      var newradius =  Math.sqrt((newwidth*newwidth) + (newheight*newheight));
      if (this.shape_d_paths[this.selectedShapeIndex].name=="circle") {
        var newCircleLine = "M "+this.shape_d_paths[this.selectedShapeIndex].centerX+" "+this.shape_d_paths[this.selectedShapeIndex].centerY+" "+
        "m -"+newradius+" 0"+" "+
        'a '+newradius+","+newradius+" 0"+" 1,1 "+(newradius*2)+",0"+" "+
        'a '+newradius+","+newradius+" 0"+" 1,1 -"+(newradius*2)+",0";
        // var gpathId:string = this.shape_d_paths[this.selectedShapeIndex].id;
        // this.drawSvgBox(gpathId)
        this.shape_d_paths[this.selectedShapeIndex].customShape = newCircleLine;
        this.selectedLine="";
        this.selectedShapeControlPoints=[];
      }
      else if(this.shape_d_paths[this.selectedShapeIndex].name=="rect"){
        console.log("rectangle reshape")
        var x = this.shape_d_paths[this.selectedShapeIndex].centerX+newwidth ;
        var y = this.shape_d_paths[this.selectedShapeIndex].centerY-(newheight) ;
        console.log(x,y);
        var w = newwidth*2;
        var h= newheight*2;
        // var newSquareLine= "M "+startingpointX+" "+startingpointY+" "+
        //                          "L "+(startingpointX+squarewidth)+" "+startingpointY+" "+
        //                          "L "+(startingpointX+squarewidth)+" "+(startingpointY+squareHeight)+" "+
        //                          "L "+startingpointX+" "+(startingpointY+squareHeight)+" Z";
        var newSquareLine= "M "+(x)+" "+(y)+" "+
                            "L "+(x)+" "+(y+h)+" "+
                            "L "+(x-w)+" "+(y+h)+" "+
                            "L "+(x-w)+" "+(y)+" Z";
      console.log(this.shape_d_paths[this.selectedShapeIndex]);
      this.shape_d_paths[this.selectedShapeIndex].customShape = newSquareLine;
      console.log(this.shape_d_paths[this.selectedShapeIndex]);
      this.selectedLine="";
      this.selectedShapeControlPoints=[];
      this.rotateLine="";
      this.rotatePoint=[];
      }else{

      }
    }
    this.isResize=false;
  }
  
   //rotation
   isRotate:boolean=false;
   rotateClickDownPoint(){
    console.log("i am from rotate down"+this.rotateShapeIndex);
    this.rotationCordinatesPoint[0]=({x:(this.shape_d_paths[this.rotateShapeIndex].centerX),y:(this.shape_d_paths[this.rotateShapeIndex].centerY)});  
    console.log(this.rotationCordinatesPoint)  
    this.isRotate=true;
  }
  rotationMouseMove($event){
    if(this.isRotate==true){
      console.log("i am from rotate up")
      console.log($event)
      var rotateUppointX = $event.offsetX;
      var rotateUppointY = $event.offsetY;
      // var angle = Math.atan2(rotateUppointX - this.rotationCordinatesPoint[0].x, - (rotateUppointY - this.rotationCordinatesPoint[0].y) )*(180 / Math.PI);  
     
      var groupElement =document.getElementById(this.shape_d_paths[this.rotateShapeIndex].id);// document.querySelector('#selectedGroup');
      var bboxGroup = (groupElement as any).getBBox();
      var x= bboxGroup.x+(bboxGroup.width/2);
      var y= bboxGroup.y-(bboxGroup.height/2);
      var angle = Math.atan2(rotateUppointX - x, - (rotateUppointY - y) )*(180 / Math.PI);  
      this.rotationAngle= angle;
      this.rotationCenterX=this.shape_d_paths[this.rotateShapeIndex].centerX;
      this.rotationCenterY=this.shape_d_paths[this.rotateShapeIndex].centerY;
      console.log(x,y,this.rotationCenterX,this.rotationCenterY)
      console.log(angle);
    }
  }
  
   rotateClickUpPoint($event){
    if(this.isRotate==true){
      console.log("i am from rotate up")
      console.log($event)
      // var rotateUppointX = $event.offsetX;
      // var rotateUppointY = $event.offsetY;
      // var angle = Math.atan2(rotateUppointX - this.rotationCordinatesPoint[0].x, - (rotateUppointY - this.rotationCordinatesPoint[0].y) )*(180 / Math.PI);  
      // // var angle = Math.atan2(rotateUppointX - 200, - (rotateUppointY - 300) )*(180 / Math.PI);  
      // this.rotationAngle= angle;
      // console.log(angle)    ;
    }
    this.isRotate=false;
    // this.rotateShapeIndex="";
    this.selectedLine="";
    this.selectedShapeControlPoints=[];
    this.rotatePoint=[];
    this.rotateLine="";
    // this.rotationAngle=0;
    // this.rotationCenterX="";
    // this.rotationCenterY="";
   }


  

}


