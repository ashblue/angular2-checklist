/**
 * Primary bootstrapper to load the application
 */

/// <reference path="./shim.ts" />
/// <reference path="./globals.ts" />

import {bootstrap} from '@angular/platform-browser-dynamic';
import {Router} from './app/router';
import versionManager from './app/utilities/version-manager';

versionManager.checkVersion();
bootstrap(Router);
