![Image of Angular](https://angular.io/assets/images/logos/angular/angular.png)

# RAGE Angular

Hi, my name is Armyw0w, I made this Module to integrate Angular in RAGE Multiplayer (for the CEF more exactly)

## Installation

You need **NodeJS** installed (You can download it from **[here](https://nodejs.org)**)
> npm install rage-angular@latest

### Import module

I hope you know to import the module, if not, you should take a look **[here](https://angular.io/guide/ngmodule)**

#### IMPORTANT!
If you don't inject the **RAGE** in a **component** the **RAGEInit()** callback it will never be called.
 
### Adding the Middleman between Client and Angular

You need to add a javascript library to use the module.
Get the **[library](https://github.com/Armyw0w/RAGEAngular/blob/master/middleman.min.js)** and put in the **index.html**
 
> <script type="text/javascript" src="middleman.min.js"></script>
 
## Listening the custom events in Angular
### !! This it will be rewriten !!

```javascript
import { Component } from '@angular/core'; 
import { RAGE } from 'rage-angular'; 

@Component({ 
	selector: 'my-component' 
}) 
export class ChatComponent 
{ 
	private sub: any;

	constructor(private Rage: RAGE) { 
		this.sub = Rage.listen.subscribe( 
			(data) => { 
				console.log(data); 
			} 
		); 
	} 
	
	ngOnDestroy() {
		this.sub.unsubscribe();
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

So you can verify if sent event is yours
```javascript
import { Component } from '@angular/core'; 
import { RAGE } from 'rage-angular'; 

@Component({ 
	selector: 'my-component' 
}) 
export class ChatComponent 
{ 
	private sub: any;

	constructor(private Rage: RAGE) { 
		this.sub = Rage.listen.subscribe( 
			(data) => { 
				if (data.func === 'MyNewEvent') { 
					// Great 
					alert ( data.args[0] ); 
				}
				else if ( data.func === 0 ) { 
					// Great 
					alert ( data.args[0] ); 
				} 
			} 
		); 
	} 
	
	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
```

## TO DO

* Creating a event out of listen.
* Import all RAGE Multiplayer Functions (waiting for better docs)
* Async functions
