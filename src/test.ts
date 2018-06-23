// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// Based on: https://github.com/angular/angular-cli/issues/3603#issuecomment-311293256
declare const __karma__: any;
const tags = __karma__.config.args[0];

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const filterRegExp = (tags) ? new RegExp(tags, 'g') : /\.spec\.ts$/,
    context = require.context('./', true, /\.spec\.ts$/),
    specFiles = context.keys().filter(path => filterRegExp.test(path));
// And load the modules.
specFiles.map(context);
