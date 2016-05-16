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
    target: target
  };

  if (env === 'dev') {
    // dev configs go here
  }

  if (target === 'prod') {
    // Activate angular 2 production mode
  }

  return ENV;
};
