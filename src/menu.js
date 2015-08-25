var texts = require('./langs.js').texts();

var drawer = tabris.create('Drawer');
drawer.append(tabris.create('PageSelector'));

var settingsPage = tabris.create('Page', {
	id: 'settingsPage',
	background: 'white',
	topLevel: true
});

tabris.create('Picker', {id: 'langPicker', layoutData: {left: 10, top: 10, right: 10}})
  .on('change:selection', function(widget, selection, options) {
    if (options.index > 0) {
      this.set('selectionIndex', 0);
      settingsPage.apply(require('./lang/' + selection + '.json'));
    }
  }).appendTo(settingsPage);

settingsPage.apply(texts);

var page2 = tabris.create('Page', {
	id: 'menuPage2',
	background: 'white',
	topLevel:true
});

var button = tabris.create('Button', {
	id: 'labelButton',
	layoutData: {centerX: 0, top: 100}
}).appendTo(page2);

var button2 = tabris.create('Button', {
	id: 'GPSButton',
	layoutData: {centerX: 0, top: 300}
}).appendTo(page2);

var imageView = tabris.create('ImageView', {
    layoutData: {top: [button, 20], left: 20, right: 20, bottom: 20}
  }).appendTo(page2);

function onSuccess(imageUrl) {
  imageView.set('image', {src: imageUrl});
  cordova.plugins.notification.badge.increase();
}
function onFail(message) {
  console.log('Camera failed because: ' + message);
}


button.on('select', function() {
  navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      targetWidth: 1024,
      targetHeight: 1024,
      destinationType: window.Camera.DestinationType.FILE_URI
    });

});

button2.on('select',function() {
	window.plugins.GPSLocator.getLocation(function(result) {
    alert(JSON.stringify(result));//result[0]:latitude,result[1]:longitude.
    },function(e){
        alert(JSON.stringify(e));//Error Message
    });
});

tabris.create('Button', {
    layoutData: {left: 10, top: 10, right: 10},
    text: 'Scan Barcode'
  }).on('select', scanBarcode).appendTo(page2);

  var resultView = tabris.create('TextView', {
    layoutData: {top: [page2.children().last(), 20], left: 20, right: 20},
    markupEnabled: true
  }).appendTo(page2);

  function scanBarcode() {
    cordova.plugins.barcodeScanner.scan(function(result) {
      resultView.set('text', result.cancelled ?
                             '<b>Scan cancelled</b>' :
                             '<b>Scan result:</b> ' + result.text + ' (' + result.format + ')');
    }, function(error) {
      resultView.set('text', '<b>Error:</b> ' + error);
    });
  }


page2.apply(texts);
exports.drawer = drawer;
exports.settingsPage = settingsPage;