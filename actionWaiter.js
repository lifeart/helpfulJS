  function ActionWaiter(config) {
	  
    if (!config) config = {};
    this.i = config.startIndex || 0;
    this.limit = (arguments.length >= 2)?(Array.isArray(arguments[0])?arguments[0].length:arguments[0]):(config.total || config.endIndex || (config.events)?config.events.length:0);
    this.callback = ( arguments.length >= 2 ) ? arguments[1] : ( config.callback || null );
    this.confirm = ( arguments.length == 3 ) ? arguments[2] : false;
    this.eventsArray = ( arguments.length == 3 ) ? arguments[0] : [];
    this.errTimeOut = false; // it can be callback
    this.runErrorCallback = function() {
      if (this.errTimeOut) this.errTimeOut();
    }

    this.eventNames = [];

    for (var i = 0; i < this.eventsArray.length; i++) {
      var eventCounter =  this.eventsArray[i].split(':');
      if (eventCounter.length===2) {
        var j = parseInt(eventCounter[1]);

        if (isNaN(j)||!j) j = 1;
        for (var k = 0; k<j ;k++) {
          this.eventNames.push(eventCounter[0]);
        }
      } else this.eventNames.push(this.eventsArray[i]);
    }

    if (this.limit!==this.eventNames.length) this.limit = this.eventNames.length;

    this.dataSet = [];

    this.up = function(fname,data){
      if (this.confirm) {
        if (!fname) return console.log('no Function name!');
        var eventIndex = this.eventNames.indexOf(fname);
        if (eventIndex>-1) {
          if (data) {
            var ev = {
              index: eventIndex,
              name: fname,
              data: data
            };
            this.dataSet.push(ev);
          }
          this.eventNames.splice(eventIndex,1);
          this.i++;
        } else {
          console.log(this.eventNames);
          return console.log('wrong Event! "'+fname+'"');
        }
      } else {
        this.i++;
      }
      if (this.limit === this.i) {
        return this.callback(this.dataSet);
      }
    };
    this.setCounter = function(index) {
      this.i = index;
    };
    this.setLimit = function(index) {
      this.limit = index;
    };
    if (!this.limit) this.callback();
    return this;
};
