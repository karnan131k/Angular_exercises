import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export enum componentType{
  ADD,
  SUB,
  MUL,
  DIV
}
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  additionResult:number;
  subResult:number;
  mulResult:number;
  divResult:number;
  dynamicData=[
    {
      isInput1:true,
      isInput2:true,
      isInput3:true,
      component:componentType.ADD
    },
    {
      isInput1:true,
      isInput3:true,
      component:componentType.SUB
    },
    {
      isInput2:true,
      isInput3:true,
      component:componentType.MUL
    },
    {
      isInput1:true,
      isInput3:true,
      component:componentType.DIV
    }
  ];

  private behaviourSubject: BehaviorSubject<any>=new BehaviorSubject<any>(0);
  behaviourObs$ : Observable<any>=this.behaviourSubject.asObservable();

   setData(data: number){
    this.behaviourSubject.next(data);
   }

   getdynamicData(){
     return this.dynamicData;
   }
}
