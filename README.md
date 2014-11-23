# qamoos #

**qamoos** is a multilingual index package for node.js.

**qamoos** is a small dictionnary to manage internationalization of an application. You can define indexes of messages in different languages and access to them with a code.

## How does it work ? ##
You should define different messages inside a **qamoos** defined by its name. Data is stored in a global variable so you can define it once in the project and use it while needed.

**First define a qamoos ** (run this once in the project)
```javascript
var Qamoos = require("qamoos");

var myBook = Qamoos.define("myBook");

myBook.set('run', {"fr":"Serveur a l'ecoute du port " , en:"Server listening port " });
myBook.set('name', {"fr":"Nom de l'application" , en:"appName" });
myBook.set('def', {"fr":"defaut" , "en":"default"});
```

Now, somewhere in your project, when you need a translation:
```javascript
var Qamoos = require("qamoos");
var myBook = Qamoos.define("myBook");

console.log(myBook.get('run'),81);
Qamoos.lang("fr"); // define french as default language (english is the default value)
console.log(myBook.get('run'),81);
```

## Data persistence ##
 - The '**qamoos**' dictionnary is stored in a server variable, ie in global object, so that it can be accessible from any module.
 - Language information is stored as a session variable ie as a cookie, so it could be changed for each session.

You can create a **qamoos** for each module or application. The data is grouped as ONE global object in the server and shared by users and sessions.

## Error messages ##
You can attribute a code to your messages and get the translation in the form of an error object:

```javascript
var Qamoos = require("qamoos");
var myBook = Qamoos.define("myBook");

myBook.set('badLogin', {fr:"Login incorrect", en:"Bad login"},-101);
myBook.set('badPassword', {fr:"Mot de passe incorrect", en:"Bad password"},-102);


console.log(myBook.getErr('badLogin'),81);
```

Will give you:
```javascript
{ err:-101, msg:'Bad login'}
```
