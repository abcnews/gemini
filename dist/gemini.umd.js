(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Gemini = {})));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var win;

	if (typeof window !== "undefined") {
	    win = window;
	} else if (typeof commonjsGlobal !== "undefined") {
	    win = commonjsGlobal;
	} else if (typeof self !== "undefined"){
	    win = self;
	} else {
	    win = {};
	}

	var window_1 = win;

	var window$1 = /*#__PURE__*/Object.freeze({
		default: window_1,
		__moduleExports: window_1
	});

	var isFunction_1 = isFunction;

	var toString = Object.prototype.toString;

	function isFunction (fn) {
	  var string = toString.call(fn);
	  return string === '[object Function]' ||
	    (typeof fn === 'function' && string !== '[object RegExp]') ||
	    (typeof window !== 'undefined' &&
	     // IE8 and below
	     (fn === window.setTimeout ||
	      fn === window.alert ||
	      fn === window.confirm ||
	      fn === window.prompt))
	}

	var isFunction$1 = /*#__PURE__*/Object.freeze({
		default: isFunction_1,
		__moduleExports: isFunction_1
	});

	var trim_1 = createCommonjsModule(function (module, exports) {
	exports = module.exports = trim;

	function trim(str){
	  return str.replace(/^\s*|\s*$/g, '');
	}

	exports.left = function(str){
	  return str.replace(/^\s*/, '');
	};

	exports.right = function(str){
	  return str.replace(/\s*$/, '');
	};
	});
	var trim_2 = trim_1.left;
	var trim_3 = trim_1.right;

	var trim = /*#__PURE__*/Object.freeze({
		default: trim_1,
		__moduleExports: trim_1,
		left: trim_2,
		right: trim_3
	});

	var fnToStr = Function.prototype.toString;

	var constructorRegex = /^\s*class\b/;
	var isES6ClassFn = function isES6ClassFunction(value) {
		try {
			var fnStr = fnToStr.call(value);
			return constructorRegex.test(fnStr);
		} catch (e) {
			return false; // not a function
		}
	};

	var tryFunctionObject = function tryFunctionToStr(value) {
		try {
			if (isES6ClassFn(value)) { return false; }
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var fnClass = '[object Function]';
	var genClass = '[object GeneratorFunction]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	var isCallable = function isCallable(value) {
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};

	var isCallable$1 = /*#__PURE__*/Object.freeze({
		default: isCallable,
		__moduleExports: isCallable
	});

	var isCallable$2 = ( isCallable$1 && isCallable ) || isCallable$1;

	var toStr$1 = Object.prototype.toString;
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var forEachArray = function forEachArray(array, iterator, receiver) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (hasOwnProperty.call(array, i)) {
	            if (receiver == null) {
	                iterator(array[i], i, array);
	            } else {
	                iterator.call(receiver, array[i], i, array);
	            }
	        }
	    }
	};

	var forEachString = function forEachString(string, iterator, receiver) {
	    for (var i = 0, len = string.length; i < len; i++) {
	        // no such thing as a sparse string.
	        if (receiver == null) {
	            iterator(string.charAt(i), i, string);
	        } else {
	            iterator.call(receiver, string.charAt(i), i, string);
	        }
	    }
	};

	var forEachObject = function forEachObject(object, iterator, receiver) {
	    for (var k in object) {
	        if (hasOwnProperty.call(object, k)) {
	            if (receiver == null) {
	                iterator(object[k], k, object);
	            } else {
	                iterator.call(receiver, object[k], k, object);
	            }
	        }
	    }
	};

	var forEach = function forEach(list, iterator, thisArg) {
	    if (!isCallable$2(iterator)) {
	        throw new TypeError('iterator must be a function');
	    }

	    var receiver;
	    if (arguments.length >= 3) {
	        receiver = thisArg;
	    }

	    if (toStr$1.call(list) === '[object Array]') {
	        forEachArray(list, iterator, receiver);
	    } else if (typeof list === 'string') {
	        forEachString(list, iterator, receiver);
	    } else {
	        forEachObject(list, iterator, receiver);
	    }
	};

	var forEach_1 = forEach;

	var forEach$1 = /*#__PURE__*/Object.freeze({
		default: forEach_1,
		__moduleExports: forEach_1
	});

	var trim$1 = ( trim && trim_1 ) || trim;

	var forEach$2 = ( forEach$1 && forEach_1 ) || forEach$1;

	var isArray = function(arg) {
	      return Object.prototype.toString.call(arg) === '[object Array]';
	    };

	var parseHeaders = function (headers) {
	  if (!headers)
	    return {}

	  var result = {};

	  forEach$2(
	      trim$1(headers).split('\n')
	    , function (row) {
	        var index = row.indexOf(':')
	          , key = trim$1(row.slice(0, index)).toLowerCase()
	          , value = trim$1(row.slice(index + 1));

	        if (typeof(result[key]) === 'undefined') {
	          result[key] = value;
	        } else if (isArray(result[key])) {
	          result[key].push(value);
	        } else {
	          result[key] = [ result[key], value ];
	        }
	      }
	  );

	  return result
	};

	var parseHeaders$1 = /*#__PURE__*/Object.freeze({
		default: parseHeaders,
		__moduleExports: parseHeaders
	});

	var immutable = extend;

	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

	function extend() {
	    var target = {};

	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i];

	        for (var key in source) {
	            if (hasOwnProperty$1.call(source, key)) {
	                target[key] = source[key];
	            }
	        }
	    }

	    return target
	}

	var immutable$1 = /*#__PURE__*/Object.freeze({
		default: immutable,
		__moduleExports: immutable
	});

	var window$2 = ( window$1 && window_1 ) || window$1;

	var isFunction$2 = ( isFunction$1 && isFunction_1 ) || isFunction$1;

	var parseHeaders$2 = ( parseHeaders$1 && parseHeaders ) || parseHeaders$1;

	var xtend = ( immutable$1 && immutable ) || immutable$1;

	var xhr = createXHR;
	// Allow use of default import syntax in TypeScript
	var default_1 = createXHR;
	createXHR.XMLHttpRequest = window$2.XMLHttpRequest || noop;
	createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window$2.XDomainRequest;

	forEachArray$1(["get", "put", "post", "patch", "head", "delete"], function(method) {
	    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
	        options = initParams(uri, options, callback);
	        options.method = method.toUpperCase();
	        return _createXHR(options)
	    };
	});

	function forEachArray$1(array, iterator) {
	    for (var i = 0; i < array.length; i++) {
	        iterator(array[i]);
	    }
	}

	function isEmpty(obj){
	    for(var i in obj){
	        if(obj.hasOwnProperty(i)) return false
	    }
	    return true
	}

	function initParams(uri, options, callback) {
	    var params = uri;

	    if (isFunction$2(options)) {
	        callback = options;
	        if (typeof uri === "string") {
	            params = {uri:uri};
	        }
	    } else {
	        params = xtend(options, {uri: uri});
	    }

	    params.callback = callback;
	    return params
	}

	function createXHR(uri, options, callback) {
	    options = initParams(uri, options, callback);
	    return _createXHR(options)
	}

	function _createXHR(options) {
	    if(typeof options.callback === "undefined"){
	        throw new Error("callback argument missing")
	    }

	    var called = false;
	    var callback = function cbOnce(err, response, body){
	        if(!called){
	            called = true;
	            options.callback(err, response, body);
	        }
	    };

	    function readystatechange() {
	        if (xhr.readyState === 4) {
	            setTimeout(loadFunc, 0);
	        }
	    }

	    function getBody() {
	        // Chrome with requestType=blob throws errors arround when even testing access to responseText
	        var body = undefined;

	        if (xhr.response) {
	            body = xhr.response;
	        } else {
	            body = xhr.responseText || getXml(xhr);
	        }

	        if (isJson) {
	            try {
	                body = JSON.parse(body);
	            } catch (e) {}
	        }

	        return body
	    }

	    function errorFunc(evt) {
	        clearTimeout(timeoutTimer);
	        if(!(evt instanceof Error)){
	            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") );
	        }
	        evt.statusCode = 0;
	        return callback(evt, failureResponse)
	    }

	    // will load the data & process the response in a special response object
	    function loadFunc() {
	        if (aborted) return
	        var status;
	        clearTimeout(timeoutTimer);
	        if(options.useXDR && xhr.status===undefined) {
	            //IE8 CORS GET successful response doesn't have a status field, but body is fine
	            status = 200;
	        } else {
	            status = (xhr.status === 1223 ? 204 : xhr.status);
	        }
	        var response = failureResponse;
	        var err = null;

	        if (status !== 0){
	            response = {
	                body: getBody(),
	                statusCode: status,
	                method: method,
	                headers: {},
	                url: uri,
	                rawRequest: xhr
	            };
	            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
	                response.headers = parseHeaders$2(xhr.getAllResponseHeaders());
	            }
	        } else {
	            err = new Error("Internal XMLHttpRequest Error");
	        }
	        return callback(err, response, response.body)
	    }

	    var xhr = options.xhr || null;

	    if (!xhr) {
	        if (options.cors || options.useXDR) {
	            xhr = new createXHR.XDomainRequest();
	        }else{
	            xhr = new createXHR.XMLHttpRequest();
	        }
	    }

	    var key;
	    var aborted;
	    var uri = xhr.url = options.uri || options.url;
	    var method = xhr.method = options.method || "GET";
	    var body = options.body || options.data;
	    var headers = xhr.headers = options.headers || {};
	    var sync = !!options.sync;
	    var isJson = false;
	    var timeoutTimer;
	    var failureResponse = {
	        body: undefined,
	        headers: {},
	        statusCode: 0,
	        method: method,
	        url: uri,
	        rawRequest: xhr
	    };

	    if ("json" in options && options.json !== false) {
	        isJson = true;
	        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json"); //Don't override existing accept header declared by user
	        if (method !== "GET" && method !== "HEAD") {
	            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json"); //Don't override existing accept header declared by user
	            body = JSON.stringify(options.json === true ? body : options.json);
	        }
	    }

	    xhr.onreadystatechange = readystatechange;
	    xhr.onload = loadFunc;
	    xhr.onerror = errorFunc;
	    // IE9 must have onprogress be set to a unique function.
	    xhr.onprogress = function () {
	        // IE must die
	    };
	    xhr.onabort = function(){
	        aborted = true;
	    };
	    xhr.ontimeout = errorFunc;
	    xhr.open(method, uri, !sync, options.username, options.password);
	    //has to be after open
	    if(!sync) {
	        xhr.withCredentials = !!options.withCredentials;
	    }
	    // Cannot set timeout with sync request
	    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
	    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
	    if (!sync && options.timeout > 0 ) {
	        timeoutTimer = setTimeout(function(){
	            if (aborted) return
	            aborted = true;//IE9 may still call readystatechange
	            xhr.abort("timeout");
	            var e = new Error("XMLHttpRequest timeout");
	            e.code = "ETIMEDOUT";
	            errorFunc(e);
	        }, options.timeout );
	    }

	    if (xhr.setRequestHeader) {
	        for(key in headers){
	            if(headers.hasOwnProperty(key)){
	                xhr.setRequestHeader(key, headers[key]);
	            }
	        }
	    } else if (options.headers && !isEmpty(options.headers)) {
	        throw new Error("Headers cannot be set on an XDomainRequest object")
	    }

	    if ("responseType" in options) {
	        xhr.responseType = options.responseType;
	    }

	    if ("beforeSend" in options &&
	        typeof options.beforeSend === "function"
	    ) {
	        options.beforeSend(xhr);
	    }

	    // Microsoft Edge browser sends "undefined" when send is called with undefined value.
	    // XMLHttpRequest spec says to pass null as body to indicate no body
	    // See https://github.com/naugtur/xhr/issues/100.
	    xhr.send(body || null);

	    return xhr


	}

	function getXml(xhr) {
	    // xhr.responseXML will throw Exception "InvalidStateError" or "DOMException"
	    // See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseXML.
	    try {
	        if (xhr.responseType === "document") {
	            return xhr.responseXML
	        }
	        var firefoxBugTakenEffect = xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror";
	        if (xhr.responseType === "" && !firefoxBugTakenEffect) {
	            return xhr.responseXML
	        }
	    } catch (e) {}

	    return null
	}

	function noop() {}
	xhr.default = default_1;

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

	var gemini = function (callback) {
	  xhr(
	    {
	      url: "/news/" + getSupplementaryCMID()
	    },
	    function (err, response, body) {
	      var doc = new DOMParser().parseFromString(body, "text/html");
	      var startNode = doc.querySelector('a[name="content"]');
	      var endNode = doc.querySelector('a[name="endcontent"]');

	      if (!startNode || !endNode) {
	        console.error(
	          new Error("Content bookends not found in supplementary document.")
	        );
	      }

	      var currentNode = startNode;
	      var injectionRoot = document.querySelector('[name="fullscript"]');
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

	var fullReplace = function (callback) {
	  gemini(callback);
	};

	exports.fullReplace = fullReplace;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
