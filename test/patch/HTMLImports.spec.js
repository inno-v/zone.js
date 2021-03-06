'use strict';

function supportsImports() {
  return 'import' in document.createElement('link');
}
supportsImports.message = 'HTML Imports';

describe('HTML Imports', ifEnvSupports(supportsImports, function () {
  var testZone = window.zone.fork();

  it('should work with addEventListener', function (done) {
    var link;

    testZone.run(function() {
      link = document.createElement('link');
      link.rel = 'import';
      link.href = 'someUrl';
      link.addEventListener('error', function () {
        assertInChildOf(testZone);
        document.head.removeChild(link);
        done();
      });
    });

    document.head.appendChild(link);
  });

  function supportsOnEvents() {
    var link = document.createElement('link');
    var linkPropDesc = Object.getOwnPropertyDescriptor(link, 'onerror');
    return !(linkPropDesc && linkPropDesc.value === null);
  }
  supportsOnEvents.message = 'Supports HTMLLinkElement#onxxx patching';


  ifEnvSupports(supportsOnEvents, function() {
    it('should work with onerror', function (done) {
      var link;

      testZone.run(function() {
        link = document.createElement('link');
        link.rel = 'import';
        link.href = 'anotherUrl';
        link.onerror = function () {
          assertInChildOf(testZone);
          document.head.removeChild(link);
          done();
        };
      });

      document.head.appendChild(link);
    });

    it('should work with onload', function (done) {
      var link;

      testZone.run(function() {
        link = document.createElement('link');
        link.rel = 'import';
        link.href = '/base/test/assets/import.html';
        link.onload = function () {
          assertInChildOf(testZone);
          document.head.removeChild(link);
          done();
        };
      });

      document.head.appendChild(link);
    });
  });

}));
