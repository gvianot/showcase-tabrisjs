var texts = require('./langs.js').texts();


var welcomePage = tabris.create('Page', {
	id: 'welcomePage',
	background: 'white'
});

var textView = tabris.create('TextView', {
	id: 'welcomeText',
	font: '24px'
}).appendTo(welcomePage);






var button = tabris.create('Button', {
	id: 'welcomeButton'
}).appendTo(welcomePage);

button.on('select', function() {
	var xhr = new tabris.XMLHttpRequest();
	xhr.onreadystatechange = function() {
	if (xhr.readyState === xhr.DONE) {
	  window.plugins.toast.showShortTop('Reading OK '+ xhr.responseText);
	}
};
	xhr.open('GET', 'http://www.telize.com/geoip');
	xhr.send();


	var settingsPage = require('./menu.js').settingsPage;
	settingsPage.open();
});


welcomePage.apply({
	'#welcomeButton': {layoutData: {right: 40, top: ['#welcomeText',40]}}}).apply(texts);

exports.welcomePage = welcomePage;