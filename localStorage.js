function Storage(globalKey) {

	this.active = false;
	self = this;
	this.globalKey = globalKey || false;
	
	
	this.init = function() {
		this.active = this.isLocalStorageAvailable();
	}

	this.isLocalStorageAvailable = function() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}

	this.clear = function() {
		if (this.active) {
			if (this.globalKey) {
				localStorage.removeItem(this.globalKey);
			} else 
			localStorage.clear();
			return true;
		}
		else return false;
	}
	
	this.set = function(key,value) {
		if (!this.active) return false;
		try {
			if (this.globalKey) {
				var el = JSON.parse(localStorage.getItem(this.globalKey));
				if (!el) el = {};
				el[key] = value;
				localStorage.setItem(this.globalKey,JSON.stringify(el));
			}
			else 
			localStorage.setItem(key, JSON.stringify(value));
		} catch (e) {
			if (e == QUOTA_EXCEEDED_ERR) {
				return false;
			}
		}
	}
	
	this.get = function(key) {
		if (!this.active) return false;
		var result = '';
		if (this.globalKey) {
			var el = JSON.parse(localStorage.getItem(this.globalKey));
			if (!el||!el[key]) return false;
			result = el[key];
			return result?result:false;
		} else {
			result = JSON.parse(localStorage.getItem(key));
			return result?result:false;
		}
	}
	
	this.remove = function(key) {
		if (!this.active) return false;
		if (this.globalKey) {
			var el = JSON.parse(localStorage.getItem(this.globalKey));
			if (el) {
				delete el[key];
				localStorage.setItem(this.globalKey,JSON.stringify(el));
			}
		} else localStorage.removeItem(key);
		return true;
	}
	
	this.init();
}
