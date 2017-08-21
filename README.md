# RAGE Angular

Hi, my name is Armyw0w, I made this Module to integrate Angular in RAGE Multiplayer (for the CEF more exactly)

## Installation

You need NodeJS installed (You can download it from [here](https://nodejs.org))
> npm install rage-angular@latest

## Import module

I hope you know to import the module, if not, you should take a look [here](https://angular.io/guide/ngmodule)

### IMPORTANT!
If you don't import the RAGE in a component the RAGEInit() callback it will never be called.
 
## The real middle-man between Client and Angular

You need to add a script after/before build in index.html, in that script you will hook the functions (Client <=> Middle-man <=> Angular)

```javascript
<script>
function RAGEInit() {
    alert ( 'Woah, the Angular loaded RAGE Service, now I can use all these functions');
    // No functions now :(
}
</script>
```
