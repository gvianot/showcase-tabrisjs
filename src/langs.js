exports.texts = function() {
  var lang = tabris.device.get('language').replace(/-.*/, '');
  try {
    return require('./lang/' + lang + '.json');
  } catch (ex) {
    return require('./lang/en.json');
  }
};
