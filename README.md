![Image of Angular](https://angular.io/assets/images/logos/angular/angular.png)

# RAGE Angular

Hi, my name is Armyw0w, I made this Module to integrate Angular in RAGE Multiplayer (for the CEF more exactly)

## Installation

You need **NodeJS** installed (You can download it from **[here](https://nodejs.org)**)
> npm install rage-angular@latest

### Import module

I hope you know to import the module, if not, you should take a look **[here](https://angular.io/guide/ngmodule)**

#### IMPORTANT!
If you don't inject the **RAGE** in a **component** the **RageJS.Init()** callback it will never be called.

Don't put the **Angular builded files** in **client_packages**, the application it will **never work**!!!
 
### Adding the Middleman between Client and Angular

You need to add a javascript library to use the module.

Get the **[library](https://github.com/Armyw0w/RAGEAngular/blob/master/middleman.min.js)** and put in the **index.html**
 
> <script type="text/javascript" src="middleman.min.js"></script>
 
## Calling the Client from Angular (synchronized) 

Now you can **call a function** from Angular to client (with *mp.trigger*) and wait for a response from client **(optional)**

This is a *sample example* about how to call a **client function** without **the callback function**
```javascript
constructor(private rage: RAGE)
{
	rage.Client.call(
    	{
		fn: "testFunction",
		args: [
			10,
			'some string'
		]
	});
}
```
Now let's start talking about **the callback function**
```javascript
constructor(private rage: RAGE)
{
	rage.Client.call(
    	{
		fn: "testFunction",
		args: [
			10,
			'some string'
		]
	},
	(response: any) => {
		console.log(response);
	});
}
```
Before calling the **mp.trigger**, because we have **the callback function** we need to put the function in a some kind of register which have **all function** which are waiting for a **response** from the client.

It's better to not put the **callback parameter** if you don't send a **response** back to **Angular**.

Now let's go on the client-side
```javascript
angular = mp.browsers.new('package://Angular/index.html');

mp.events.add('testFunction', function(responseId, arg1, arg2) {
	// responseId could be undefined if you haven't the callback function set
	mp.gui.chat.push("received: " + arg1 + ", " + arg2);
	mp.gui.chat.push("we send a response to : " + responseId);
	
	// Sending back a response
	angular.execute("RageJS.sendFuncResponseToRAGE('" + responseId + "','testFunction','My response is: NO!');");
});
```
### I will do a library for Client-side, the aboxe example it's just to show you how to catch the call.
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
- [x] Removed arguments **limit***.
- [ ] Add call **Angular** function from **Client** (sync)
- [ ] Remove posibility to send a object argument
- [ ] Add all **RAGE functions/events**
- [ ] Create a library for client-side
