import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  additionResult:number;
  subResult:number;
  mulResult:number;
  divResult:number;

  private behaviourSubject: BehaviorSubject<any>=new BehaviorSubject<any>(0);
  behaviourObs$ : Observable<any>=this.behaviourSubject.asObservable();

   setData(data: number){
    this.behaviourSubject.next(data);
   }
   addResult(data: number){
     this.additionResult=data;
   }
}
