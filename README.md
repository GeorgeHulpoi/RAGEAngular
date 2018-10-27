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
```<base href="/">```
 
### The Middleman between Client and Angular

You have to add a javascript library to use this module.

Download the **[library](https://github.com/GeorgeHulpoi/RAGEAngular/blob/master/middleman.min.js)** and insert the script from below in **index.html**
> <script type="text/javascript" src="middleman.min.js"></script>
 
## Calling the Client from Angular (synchronized) 

The example below will call a **client function** (a function outside of the CEF) without waiting for a response.
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
This example below will call a **client function** and the **function parameter** will be called with the response from **client**.
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
Because the **mp.trigger** doesn't return a response from the **client**, the **called function** is stored in the module in the form of id. The module call the **client** with the id and arguments and send back the response + the id stored in the module. In this way I call the **response function parameter** with the **response**.

I recomand you to not add the **response function parameter** if you don't **need** or don't **send** a response back to Angular.

Now let's go on the **client-side**, you must add the [**Angular library**](https://github.com/GeorgeHulpoi/RAGEAngular/tree/master/Client)


```javascript
var Angular = require("./angular.min.js");

Angular.load("package://test/index.html");

Angular.listen("fnTest", function(arg1, arg2) 
{
	mp.gui.chat.push("received: " + arg1 + ", " + arg2);
	
	return 'My response is NO!';
});
```
The **responseId** parameter it's the id created in **Angular**.

Now the **console.log(response)** from **response function parameter** will print:
> My response is: NO!

### !! If you don't send an object through sendFuncResponseToRange, don't set the first character "{".
#### The function check if the first character is '{', and if it's true, the string will be converted into an object.

## TO DO

- [ ] Call **Angular** function from the **Client** (sync)
- [ ] Listen the flow of the called functions.
- [ ] Add all **RAGE functions/events**
