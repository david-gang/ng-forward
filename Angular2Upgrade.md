# Angular2 Upgrade

This document will explain the upgrade process of angular2 with ng-forward. 
It is assumed that you read the [general upgrade documentation] (https://angular.io/docs/ts/latest/guide/upgrade.html).


##Bootstrapping

The first part to change is the bootstrapping. If we take the code from the [walkthrough](https://github.com/ngUpgraders/ng-forward/blob/master/Walkthrough.md#bootstrapping-apps)

Here we have the app.ts before the upgrade:

```js
@Component({
    selector: 'app',
    providers: [TestService, "ui.router"]
    directives: [InnerApp, Nested],
    template: `
        <h1>App</h1>
        <nested></nested>
        <p>Trigger count: {{ ctrl.triggers }}</p>

        <h4>One Way Binding to Child:</h4>
        <input ng-model="ctrl.message1"/>

        <h4>Two Way Binding to/from Child:</h4>
        <input ng-model="ctrl.message2"/>

        <hr/>

        <inner-app (event1)="ctrl.onIncrement()" (event2)="ctrl.onIncrement()"
                   [message1]="ctrl.message1" [(message2)]="ctrl.message2" message3="Hey, inner app... nothin'">
        </inner-app>
    `
})
class AppCtrl{
    constructor(){
        this.triggers = 0;
        this.message1 = 'Hey, inner app, you can not change this';
        this.message2 = 'Hey, inner app, change me';
    }

    onIncrement(){
        this.triggers++;
    }
}

bootstrap(AppCtrl);

```


We will first create an upgrade module called upgrade_adapter.ts:

```js
import {UpgradeAdapter} from 'angular2/upgrade';
export const upgradeAdapter = new UpgradeAdapter();
```

Then we change our app.ts the following way:

```js
import {upgradeAdapter} from './upgrade_adapter';
import {bundle} from 'ng-forward';

@Component({
    selector: 'app',
    providers: [TestService, "ui.router"]
    directives: [InnerApp, Nested],
    template: `
        <h1>App</h1>
        <nested></nested>
        <p>Trigger count: {{ ctrl.triggers }}</p>

        <h4>One Way Binding to Child:</h4>
        <input ng-model="ctrl.message1"/>

        <h4>Two Way Binding to/from Child:</h4>
        <input ng-model="ctrl.message2"/>

        <hr/>

        <inner-app (event1)="ctrl.onIncrement()" (event2)="ctrl.onIncrement()"
                   [message1]="ctrl.message1" [(message2)]="ctrl.message2" message3="Hey, inner app... nothin'">
        </inner-app>
    `
})
class AppCtrl{
    constructor(){
        this.triggers = 0;
        this.message1 = 'Hey, inner app, you can not change this';
        this.message2 = 'Hey, inner app, change me';
    }

    onIncrement(){
        this.triggers++;
    }
}

bundle('app', AppCtrl);

upgradeAdapter.bootstrap(document.body, ['app'], {strictDi: true});
```

This way we have already an angular 2 application in the air 

##Converting ng-forward components to angular2 components

##Using angular2 and ng-forward components together



