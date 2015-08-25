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

var imageView = tabris.create('ImageView', {
    layoutData: {top: [button, 20], left: 20, right: 20, bottom: 20}
  }).appendTo(page2);

function onSuccess(imageUrl) {
  imageView.set('image', {src: imageUrl});
  cordova.plugins.notification.badge.set(1);
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

  navigator.geolocation.getCurrentPosition(onSuccess, onError);

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


// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}




page2.apply(texts);
exports.drawer = drawer;
exports.settingsPage = settingsPage;