const path = require('path');

let _app = null;
function apply(app) {
  _app = app;

  let hasPreload = false;
  const preloadPath = path.join(__dirname, 'preload.js');

  // Go through the app's args list and try to find the 'preload.js' file in it
  for (var i = 0; i < _app.args.length; i++) {
    if (_app.args[i] === preloadPath) {
      hasPreload = true;
      break;
    }
  }

  // If the 'preload.js' file hasn't been added to the args list, add it
  if (!hasPreload) {
    _app.args.unshift(path.join(__dirname, 'preload.js'));
    _app.args.unshift('--require');
  }

  return _app;
}

function mock(options) {
  return _app.electron.ipcRenderer.sendSync('SPECTRON_FAKE_DIALOG/SEND', options);
}

module.exports = { apply, mock };
