function toJSON(input) {
	this.response = $.stringyfy(input);
	return response;
}

function fromJSON (key) {
	this.obj = $.parseJSON();
	return obj;
}

function toLS(key, value) {
	this.entry = key;
	this.data = toJSON(value); 
	localStorage.setItem(key,value);
	console.log(key, 'was added tto LS');
}

function fromLS(key) {
	console.log(key, ' got from LS');
	this.data = localStorage.getItem(key);
	this.response = fromJSON(data);
	return response;
}

function clearLS () {
	clearlocalStorage();
	console.log('LS cleared');
}