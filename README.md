![Image of RAGE](https://se7en.ws/wp-content/uploads/2017/03/ragemp-logo.png) ![Image of Angular](https://angular.io/assets/images/logos/angular/angular.png)

# RAGE Angular

Hi, my name is Armyw0w, I made this Module to integrate Angular in RAGE Multiplayer (for the CEF more exactly)

## Installation

You need NodeJS installed (You can download it from [here](https://nodejs.org))
> npm install rage-angular@latest

## Import module

I hope you know to import the module, if not, you should take a look [here](https://angular.io/guide/ngmodule)

### IMPORTANT!
If you don't inject the RAGE in a component the RAGEInit() callback it will never be called.
 
## The real middle-man between Client and Angular

You need to add a script after/before build in index.html, in that script you will hook the functions (Client <=> Middle-man <=> Angular)

```javascript
<script>
var RLoaded = false;
function RAGEInit() {
    RLoaded = true; // Condition for calling the Angular
    // If you want to call some functions here (RAGE Angular) you need to add a Timeout with +500ms
    // Why? Seems like EventEmitter doesn't work immediately after the service is injected
}

function CustomFunction() {
    if(RLoaded) {
        // RAGE.call ( function name / id, ..arguments)
        // You can set a ID for function for faster check
        RAGE.call('CustomFunction', 'arg1', 5, {test: 'Wow'});
    }
}

/*
Do not edit this function!!!
*/ 
function callClient(func, ...args) {
    mp.trigger(func, args);
}
</script>
```

You can delete CustomFunction and add:
```javascript
function RAGECall(func, args) {
    if(RLoaded) {
        RAGE.call(func, args);
    }
}
```
And now you can call any function with this.
### IMPORTANT! You can call RAGE.call, but be carefully, the module needs to be loaded.
### RAGE.call will be undefined if module isn't loaded

## Listening the custom events in Angular

```javascript
import { Component } from '@angular/core';
import { RAGE } from 'rage-angular';

@Component({
  selector: 'my-component'
})
export class ChatComponent {
    constructor(private Rage: RAGE) {
        Rage.listen.subscribe(
            (data) => {
                console.log(data);
            }
        );
    }
}
```
#### The Rage.listen will send a RAGEEvent, you have the interface here:
```javascript
interface RAGEEvent {
    func: string | number;
    args: any[];
}
```

## TO DO

* Import all RAGE Multiplayer Functions (waiting for better docs)
* Async functions
