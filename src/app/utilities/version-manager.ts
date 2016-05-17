const VERSION_KEY = 'cp-version';
const VERSION_FILE_URL = 'version.txt';

var _private = {
  getVersion() {
    return localStorage.getItem(VERSION_KEY);
  },

  setVersion(version) {
    localStorage.setItem(VERSION_KEY, version);
  }
};

export default {
  checkVersion() {
    if (ENV.environment !== 'prod') {
      return;
    }

    var currentVersion = _private.getVersion();

    $.get(VERSION_FILE_URL, function (result) {
      _private.setVersion(result);

      if (currentVersion && currentVersion !== result) {
        console.info('New version detected. Performing a hard refresh.');
        window.location.reload(true);
      }
    });
  }
};
