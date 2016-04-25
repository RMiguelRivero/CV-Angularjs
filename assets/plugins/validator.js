window.Validator = (function(){
	"use strict";
	
	return new (function(){
		this.object = function (val) {return (typeof val === "object" && val) ? true : false; }
		this.fn = function (val){return (typeof val === 'function') ? true: false;}
		this.number = function (val) { return (typeof val === "number" && !isNan(val)) ? true : false; }
		this.bool = function (val) { return (typeof val === "boolean") ? true : false; }
		this.string = function (val) { return (typeof val === "string") ? true : false; }
		this.array = function (val){return (typeof val === "object" && val && this.number(val.length) ) ? true : false; }
		this.nonEmptyString = function (val){return (typeof val === "string" && val.length > 0)? true: false;}
		this.nonEmptyArray = function (val){return (typeof val === "object" && val && val.length > 0)? true: false;}
		this.nonEmptyHash = function (val) {
			if( !this.object(val)) return false;
			for (var i in val){
				if(val.hasOwnProperty(i)) return true;
			}
			return false;
		}
		this.jQuery = function (val){return (typeof val === "object" && val && val.length && typeof val.get === "function") ? true : false;}
		this.defined = function (val){return (typeof val !== "undefined") ? true : false;}

		return this;
	})();

	// var validator = new Validator();
}());