![Image of Angular](https://angular.io/assets/images/logos/angular/angular.png)

# RAGE Angular

Hello, my name is George-Valentin Hulpoi. I have made this Angular Module for a Chromium Embedded Framework application (RAGE Multiplayer). In summary, you can call synchronized functions from Angular or Chromium Embedded Framework application with this module.

## Installation

You need to have **NodeJS** installed (You can download it from **[here](https://nodejs.org)**)
> npm install rage-angular@latest

### Import module

If you don't know how to import a module in Angular, **[read this article](https://angular.io/guide/ngmodule)**.

#### IMPORTANT!
If you don't inject the **RAGE Service** in an **active component**, the **RageJS.Init()** function never will be called.

Don't move the **Angular built files** in the **client_packages** folder. You have to create a **custom folder** in the **client_packages** folder and move the **Angular built files** in that folder.

Remove from **index.html** this part:

> <base href="/">
 
### The Middleman between Client and Angular

You have to add a javascript library to use this module.

Download the **[library](https://github.com/Armyw0w/RAGEAngular/blob/master/middleman.min.js)** and insert the script from below in **index.html**
> <script type="text/javascript" src="middleman.min.js"></script>
 
## Calling the Client from Angular (synchronized) 

This example will call a **client function** without waiting for a response from **client** (It's something like Promise).
```javascript
constructor(private rage: RAGE)
{
	rage.Client.call
	({
		fn: "testFunction",
		args: [
			10,
			'some string'
		]
	});
}
```
This example will call a **client function**... 
```javascript
constructor(private rage: RAGE)
{
	rage.Client.call
	({
		fn: "testFunction",
		args: [
			10,
			'some string'
		]
	},
	(response: any) =>
	{
		console.log(response);
	});
}
```
Before calling the **mp.trigger**, because we have **the callback function** we need to put the function in a some kind of register which have **all function** which are waiting for a **response** from the client.

It's better to not put the **callback parameter** if you don't send a **response** back to **Angular**.

Now let's go on the **client-side**, you have to add the [**Angular library**](https://github.com/Armyw0w/RAGEAngular/tree/master/Client)


```javascript
var Angular = require("./angular.min.js");

Angular.load("package://test/index.html");

Angular.listen("fnTest", function(arg1, arg2) 
{
	mp.gui.chat.push("received: " + arg1 + ", " + arg2);
	
	return 'My response is NO!';
});
```
The **responseId** parameter it's the unique id from that **register**.

And now the **console.log(response)** will print
> My response is: NO!

### !! If you don't send an object through sendFuncResponseToRange, don't put as first character the '{'
### !! In the function I check if the first character is '{', and if it is, the all string will be converted in an object

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

- [x] Add call **Client** function from **Angular** (sync)
- [x] Add better **documentation** (see the Source)
- [x] Removed arguments **limit**.
- [x] Remove posibility to send a object argument
- [x] Create a library for client-side
- [ ] Add call **Angular** function from **Client** (sync)
- [ ] Add all **RAGE functions/events**
