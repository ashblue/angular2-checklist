module.exports = {
  data: {
    'default-src': "'self' static.olark.com *.typekit.net",
    'script-src': "'self' localhost:* www.google-analytics.com static.olark.com *.olark.com *.typekit.net",
    'font-src': "'self' data: *.typekit.net",
    'connect-src': "'self' www.google-analytics.com *.olark.com",
    'img-src': "'self' www.google-analytics.com placeholdit.imgix.net *.olark.com placehold.it data: *.typekit.net",
    'style-src': "'self' *.olark.com *.typekit.net",
    'media-src': "'self' *.olark.com"
  },

  getString: function () {
    var csp = '';

    for (var key in this.data) {
      csp += `${key} ${this.data[key]}; `;
    }

    return csp;
  }
};

module.exports = function (env, target) {
  var csp = {
    data: {
      'default-src': "'self' static.olark.com *.typekit.net",
      'script-src': "'self' www.google-analytics.com static.olark.com *.olark.com *.typekit.net 'unsafe-eval'",
      'font-src': "'self' data: *.typekit.net",
      'connect-src': "'self' www.google-analytics.com *.olark.com",
      'img-src': "'self' www.google-analytics.com placeholdit.imgix.net *.olark.com placehold.it data: *.typekit.net",
      'style-src': "'self' *.olark.com *.typekit.net 'unsafe-inline'",
      'media-src': "'self' *.olark.com"
    },

    getString: function () {
      var csp = '';

      for (var key in this.data) {
        csp += `${key} ${this.data[key]}; `;
      }

      return csp;
    }
  };

  if (env === 'dev') {
    // We must enable live reload here
    // These are not production safe, do not include these properties in prod mode
    csp.data['script-src'] += " localhost:* 'unsafe-inline'";
    csp.data['connect-src'] += " ws://localhost:* localhost:*";
  }

  if (target === 'prod') {
    // Activate angular 2 production mode
  }

  return csp;
};
