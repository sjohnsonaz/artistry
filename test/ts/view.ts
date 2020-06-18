declare var require: any;
const viewIndex = require('../views/index.hbs');

document.addEventListener("DOMContentLoaded", function () {
	var div = document.createElement('div');
	div.innerHTML = viewIndex({});
	var frag = document.createDocumentFragment();
	var child;
	while (div.firstChild) {
		frag.appendChild(div.removeChild(div.firstChild));
	}
	document.body.appendChild(frag);
});