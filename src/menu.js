var texts = (function() {
  var lang = tabris.device.get('language').replace(/-.*/, '');
  try {
    return require('./lang/' + lang + '.json');
  } catch (ex) {
    return require('./lang/en.json');
  }
}());



var drawer = tabris.create('Drawer');
drawer.append(tabris.create('PageSelector'));

var page = tabris.create('Page', {
  id: 'settingsPage',
  background: 'white',
  topLevel: true
});

tabris.create('Picker', {id: 'langPicker', layoutData: {left: 10, top: 10, right: 10}})
  .on('change:selection', function(widget, selection, options) {
    if (options.index > 0) {
      this.set('selectionIndex', 0);
      page.apply(require('./lang/' + selection + '.json'));
    }
  }).appendTo(page);

page.apply(texts);

var page2 = tabris.create('Page', {
  id: 'menuPage2',
  background: 'white',
  topLevel: true
});

var button = tabris.create('Button', {
  id: 'labelButton',
  layoutData: {centerX: 0, top: 100}
}).appendTo(page2);

var textView = tabris.create('TextView', {
  font: '24px',
  layoutData: {centerX: 0, top: [button, 50]}
}).appendTo(page2);

button.on('select', function() {
  textView.set('text', 'Totally Rock!');
});



page2.apply(texts);


drawer.open();
