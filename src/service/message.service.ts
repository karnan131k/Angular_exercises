import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private behaviourSubject: BehaviorSubject<any>;
  behaviourObs$ : Observable<any>;
  constructor() {
    this.behaviourSubject = new BehaviorSubject<any>(1000);
    this.behaviourObs$ = this.behaviourSubject.asObservable();
   }
   sendData(data: number){
    this.behaviourSubject.next(data);
   }
}
