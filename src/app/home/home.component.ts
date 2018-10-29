import { Subscription, Observable, Observer, interval } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberObservableSubscription: Subscription;
  costumObservableSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    const numbers = interval(1000).pipe(map(
      (data: number) => { return data * 2;}
    ));
    this.numberObservableSubscription = numbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );



    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first data package');
      }, 1000);
      setTimeout(() => {
        observer.next('second data package');
      }, 2000);
      setTimeout(() => {
        // observer.error('this does not work');
        observer.complete();
      }, 3000);
      setTimeout(() => {
        observer.next('second data package');
      }, 4000);
    });
    this.costumObservableSubscription = myObservable.subscribe(
      (dataa: string) => { console.log(dataa); },
      (error: string) => { console.log(error); },
      () => { console.log('completed'); }
    );
  }
  ngOnDestroy(): void {

  this.numberObservableSubscription.unsubscribe();
  this.costumObservableSubscription.unsubscribe();
  }

}
