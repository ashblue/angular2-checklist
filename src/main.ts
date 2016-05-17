/**
 * Primary bootstrapper to load the application
 */

/// <reference path="./shim.ts" />
/// <reference path="./globals.ts" />

import {bootstrap} from '@angular/platform-browser-dynamic';
import {Router} from './app/router';
import versionManager from './app/utilities/version-manager';
import {enableProdMode} from '@angular/core';

if (ENV.environment === 'prod') {
  enableProdMode();
}

versionManager.checkVersion();
bootstrap(Router);
