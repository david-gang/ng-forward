/* global setTimeout */
// # EventEmitter class
// Simple re-implementation of Angular 2's [EventEmitter](https://github.com/angular/angular/blob/master/modules/angular2/src/facade/async.ts#L97)
import eventDispatcher from "./event-dispatcher.js";

const uuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

export class EventEmitter{

  constructor() {
    this.nextUuid = uuid();
    this.throwUuid = uuid();
    this.returnUuid = uuid();
  }

  observer(generator){
    eventDispatcher.subscribe(this.nextUuid, generator.next);
    if (generator.throw) eventDispatcher.subscribe(this.throwUuid, generator.throw);
    if (generator.complete) eventDispatcher.subscribe(this.returnUuid, generator.return);
  }

  next(value){
    eventDispatcher.dispatch(this.nextUuid, value)
  }

  throw(error){
    eventDispatcher.dispatch(this.throwUuid, error)
  }

  return(){
    eventDispatcher.dispatch(this.returnUuid);
  }
}
