var texts = require('./langs.js').texts();


var loginPage = tabris.create('Page', {
	id: 'loginPage',
	background: 'white',
	topLevel: true
});


tabris.create('TextView', {
	id: 'loginLabel',
	alignment: 'left'
}).appendTo(loginPage);

var login = tabris.create('TextInput', {
	id: 'loginField',
}).appendTo(loginPage);

tabris.create('TextView', {
	id: 'passwordLabel',
	alignment: 'left'
}).appendTo(loginPage);

var password = tabris.create('TextInput', {
	id: 'passwordField',
	type: 'password'
}).appendTo(loginPage);

var button = tabris.create('Button', {
	id: 'loginButton'
}).appendTo(loginPage);

button.on('select', function() {
	var welcomePage = require('./welcome.js').welcomePage;
  	welcomePage.open();
});



loginPage.apply({
	'#loginLabel': {layoutData: {left: 10, top: 18, width: 120}},
	'#loginField': {layoutData: {left: ['#loginLabel', 10], right: 10, baseline: '#loginLabel'}},
	'#passwordLabel': {layoutData: {left: 10, top: ['#loginLabel', 18], width: 120}},
	'#passwordField': {layoutData: {left: ['#passwordLabel', 10], right: 10, baseline: '#passwordLabel'}},
	'#loginButton': {layoutData: {right: 40, top: ['#passwordField',40]}},
}).apply(texts).open();
