'use strict';

var fnPatch = require('./functions');
var promisePatch = require('./promise');
var mutationObserverPatch = require('./mutation-observer');
var definePropertyPatch = require('./define-property');
var registerElementPatch = require('./register-element');
var webSocketPatch = require('./websocket');
var eventTargetPatch = require('./event-target');
var propertyDescriptorPatch = require('./property-descriptor');

function apply() {
  fnPatch.patchSetClearFunction(global, [
    'timeout',
    'interval',
    'immediate'
  ]);

  fnPatch.patchSetFunction(global, [
    'requestAnimationFrame',
    'mozRequestAnimationFrame',
    'webkitRequestAnimationFrame'
  ]);

  fnPatch.patchFunction(global, [
    'alert',
    'prompt'
  ]);

  eventTargetPatch.apply();

  propertyDescriptorPatch.apply();

  promisePatch.apply();

  mutationObserverPatch.patchClass('MutationObserver');
  mutationObserverPatch.patchClass('WebKitMutationObserver');

  definePropertyPatch.apply();

  registerElementPatch.apply();
}

module.exports = {
  apply: apply
};
