# helpfulJS
Helpful JS code

### inputLimit.js =>

Example: 
  
 ```
  <input id="one">
  <input id="two">
  <input id="three">
  ```

This class is input helper for controling sum of length for related inputs.
Sum of chars in these inputs should be <= 190
  
  `setInputsLimit(['one','two','three'],190);`


### actionWaiter.js =>

This class is some like $.Deferred();

Usefull for asynch model loading

Example: 

``` 
var AW = new ActionWaiter(['type','size','image','name'],allDoneCallback,(bool) NameMatch);
```

Then do some like:

```	
	AW.up('type',result);
	AW.up('size',result);
	AW.up('image',result);
	AW.up('name',result);
```	

after this allDoneCallback called with result data array of objects
Example of the data array Object:

```	
  [{
    index: eventIndex,
    name: fname, //type,size,image,name
    data: data
	}];
```

Init variants:

```
var AW = new ActionWaiter(5,allDoneCallback);

AW.up(); 
AW.up(null); 
AW.up([]); 
AW.up(undefined); 
AW.up(); 

```
or: 
```
var AW = new ActionWaiter(['callMe:2','callhe','callShe:3'],allDoneCallback,true);

AW.up('callShe');
AW.up('callShe');
AW.up('callShe');
AW.up('callMe');
AW.up('callhe');
AW.up('callMe');
```

After this `allDoneCallback(result)` called;


### localStorage.js =>

`Storage` this is helper class extends `localStorage` functionality, using `globalKey`.

Example:

Standart local storage look like: 

`DOMAIN.SOTORAGE[KEY]=VALUE`;

`Storage` with `globalKey` look like:

`DOMAIN.SOTORAGE[globalKey][KEY]=VALUE`;

If more then one JS APP used in one domain it help to keep all storage data personally for each app;

```
// window.localStorage.toJSON() : null;

var storageOne = new Storage('appOne'); 

// window.localStorage.toJSON(): {appOne:null}

var storageTwo = new Storage('appTwo'); 

// window.localStorage.toJSON(): {appOne:null,appTwo:null}

storageOne.set('id',1);
storageTwo.set('id',2);

storageOne.get('id') -> 1
storageTwo.get('id') -> 2

// window.localStorage.toJSON(): {appOne:{id:1},appTwo:{id:2}}

window.localStorage.get('id') -> null
window.localStorage.get('appOne').toJSON().id -> 1

storageOne.clear(); -> // window.localStorage.toJSON(): {appTwo:null}

```
