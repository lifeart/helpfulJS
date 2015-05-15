function setInputsLimit(selectors,limit) {
	
	this.els = [];
	this.inputLimit = limit;
	
	for (var i = 0; i < selectors.length; i++) {
		this.els.push(document.getElementById(selectors[i]));
	}
	
	this.setMaxValues = function() {
		this.els.forEach(function(el){
			el.setAttribute('maxlength',limit);
		});
	}
	
	this.events = ['change','keyup','paste'];
	
	var self = this;
	
	this.addChangeEvents = function() {
		this.els.forEach(function(el){
			for (var i = 0; i < self.events.length; i++) {
				el.addEventListener(self.events[i], self.inputChangeEvent);
			}
		});
	}
	
	this.currentLength = {
		total: 0,
		els: []
	};
	
	this.calcCurrentLength = function() {
		this.currentLength.total = 0;
		this.els.forEach(function(el){
			self.currentLength.total += el.value.length;
		});
	}
	
	this.lengthControl = function(el) {
		
		if ( this.currentLength.total < this.inputLimit ) {
			this.els.forEach(function(element){
				element.setAttribute('maxlength',self.inputLimit+element.value.length-self.currentLength.total);
			});
		}
		
		if ( this.currentLength.total === this.inputLimit ) {
			this.els.forEach(function(element){
				element.setAttribute('maxlength',element.value.length);
			});
		}
		
		if ( this.currentLength.total > this.inputLimit ) {
			el.value = el.value.slice(this.inputLimit-this.currentLength.total);
		}

	}
	
	this.inputChangeEvent = function(e) {
		var el = e.currentTarget;
		self.calcCurrentLength.call(self);
		self.lengthControl.call(self,el);
	}

	
	this.setMaxValues();
	this.addChangeEvents();
}
