'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var xhr = _interopDefault(require('xhr'));

// Gets the CMID of document provided in meta.data.name
var getSupplementaryCMID = function () {
  var SUPPLEMENTARY_CMID_META_SELECTOR = 'meta[name="supplementary"]';
  var metaEl = document.querySelector(SUPPLEMENTARY_CMID_META_SELECTOR);

  if (!metaEl) {
    throw new Error((SUPPLEMENTARY_CMID_META_SELECTOR + " does not exist"));
  }

  var cmid = metaEl.getAttribute("content");

  if (cmid.indexOf("CMArticle") > -1) {
    cmid = cmid.match(/id=(\d+)/)[1];
  }

  if (cmid != +cmid) {
    throw new Error(("\"" + cmid + "\" does not look like a CMID"));
  }

  return cmid;
};

var gemini = function (alternateMountpoint, callback) {
  xhr(
    {
      url: "/news/" + getSupplementaryCMID()
    },
    function (err, response, body) {
      var doc = new DOMParser().parseFromString(body, "text/html");
      var startNode = doc.querySelector('a[name="content"]');
      var endNode = doc.querySelector('a[name="endcontent"]');

      if (!startNode || !endNode) {
        console.error(new Error("Content bookends not found in supplementary document."));
      }

      var currentNode = startNode;
      var injectionRoot = document.querySelector(("[name=\"" + alternateMountpoint + "\"]") || "[name=\"fullscript\"]");
      var fetchedNodes = [];

      while (
        ((currentNode = currentNode.nextSibling),
        currentNode && currentNode !== endNode)
      ) {
        fetchedNodes.push(currentNode);
      }

      fetchedNodes.forEach(function (node) {
        // Append fetched content
        injectionRoot.appendChild(node);
      });

      // Unwraps injected content from parent
      var parent = injectionRoot.parentNode;
      while (injectionRoot.firstChild)
        { parent.insertBefore(injectionRoot.firstChild, injectionRoot); }
      parent.removeChild(injectionRoot);

      callback();
    }
  );
};

var fullReplace = function (alternateMountPoint, callback) {
  gemini(alternateMountPoint, callback);
};

exports.fullReplace = fullReplace;
