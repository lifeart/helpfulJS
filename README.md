# helpfulJS
Helpful JS code

### inputLimit.js =>

Example: 
  
 ```
  <input id="one">
  <input id="two">
  <input id="three">
  ```
  
Sum of chars in these inputs should be <= 190
  
  `setInputsLimit(['one','two','three'],190);`


### actionWaiter.js =>

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

After this allDoneCallback called;
