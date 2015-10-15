import {Inject, Service} from '../index';

let eventsToDispatch = {};

var dispatcher = undefined;

function resolve(ngModule){

  @Inject('$rootScope')
  @Service
  class EventDispatcher {
    constructor($rootScope){
      this.$rootScope = $rootScope;
      Object.keys(eventsToDispatch).forEach((eventName) => {
        eventsToDispatch[eventName].forEach((handler) => {
          this.addSubscriber(eventName, handler)
        })
      })
      dispatcher = this;
    }

    dispatch(eventName, param) {
      this.$rootScope.$emit(eventName, param);
    }

    addSubscriber(eventName, handler) {
      this.$rootScope.$on(eventName, handler);
    }

  }

  return EventDispatcher;
}

function subscribe(eventName, handler) {
  if (dispatcher) {
    dispatcher.addSubscriber(eventName, handler)
  }

  eventsToDispatch[eventName] = eventsToDispatch[eventName] || [];
  eventsToDispatch[eventName].push(handler);
}

function dispatch(eventName, param) {
  if (dispatcher) {
    dispatcher.dispatch(eventName, param)
  }
}

export default { resolve, dispatch, subscribe };
