/* global setTimeout */
// # EventEmitter class
// Simple re-implementation of Angular 2's [EventEmitter](https://github.com/angular/angular/blob/master/modules/angular2/src/core/facade/async.ts#L137)
import Subject from '@reactivex/rxjs/dist/cjs/Subject';

export class EventEmitter{
  _subject = new Subject();

  observer(generator){
    return this._subject.subscribe(
        value => setTimeout(() => generator.next(value)),
        error => generator.throw ? generator.throw(error) : null,
        () => generator.return ? generator.return() : null
      );
  }

  toRx(){
    return this._subject;
  }

  next(value){
    this._subject.next(value);
  }

  throw(error){
    this._subject.error(error);
  }

  return(){
    this._subject.complete();
  }
}
