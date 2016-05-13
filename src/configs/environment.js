/**
 * Will be converted to regular JavaScript and injected into the page. Mean for application configuration
 * @param env {string} environment we're targeting. Valid values are 'dev' and 'prod'
 * @param target {string} flavor of the environment for sub-targeting
 * @returns {{environment: *, target: *, contentSecurityPolicy: {default-src: string, script-src: string, font-src: string, connect-src: string, img-src: string, style-src: string, media-src: string}}}
 * @TODO Include system.config.js here
 */
module.exports = function (env, target) {
  var ENV = {
    environment: env,
    target: target,

    contentSecurityPolicy: {
      'default-src': "'self' static.olark.com *.typekit.net",
      'script-src': "'self' 'unsafe-inline' www.google-analytics.com static.olark.com *.olark.com *.typekit.net",
      'font-src': "'self' data: *.typekit.net",
      'connect-src': "'self' www.google-analytics.com *.olark.com",
      'img-src': "'self' www.google-analytics.com placeholdit.imgix.net *.olark.com placehold.it data: *.typekit.net",
      'style-src': "'self' 'unsafe-inline' *.olark.com *.typekit.net",
      'media-src': "'self' *.olark.com"
    }
  };

  if (env === 'dev') {
    // dev configs go here
  }

  if (target === 'prod') {
    // Activate angular 2 production mode
  }

  return ENV;
};
