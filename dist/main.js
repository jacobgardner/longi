/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.APPLICATION_ID = 'CD0EE29F';
exports.MESSAGE_NAMESPACE = 'urn:x-cast:com.jacob.v.gardner.longi';
exports.NON_CAST_DESIGNATION = 'diahrea';


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __webpack_require__(0);
;
var MessageType;
(function (MessageType) {
    // RESET,
    MessageType[MessageType["SET_WORD"] = 0] = "SET_WORD";
    MessageType[MessageType["ATTEMPT"] = 1] = "ATTEMPT";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
class MessageSender {
}
exports.MessageSender = MessageSender;
class WindowMessageSender extends MessageSender {
    constructor(window) {
        super();
        this.window = window;
    }
    send(data) {
        data.namespace = config_1.MESSAGE_NAMESPACE;
        this.window.postMessage(data, '*');
    }
}
exports.WindowMessageSender = WindowMessageSender;
class CastMessageSender extends MessageSender {
    constructor(session) {
        super();
        this.session = session;
    }
    send(data) {
        data.namespace = config_1.MESSAGE_NAMESPACE;
        this.session.sendMessage(config_1.MESSAGE_NAMESPACE, data);
    }
}
exports.CastMessageSender = CastMessageSender;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mainMenu_1 = __webpack_require__(4);
const presenter_1 = __webpack_require__(5);
const container = document.querySelector('.js-container');
const menu = new mainMenu_1.default(present);
menu.attach(container);
// menu.hide();
// const presenter = new PresenterMenu();
// presenter.attach(container);
function present(sender) {
    console.log('Presenting...');
    menu.hide();
    const presenter = new presenter_1.PresenterMenu(sender);
    presenter.attach(container);
    // sender.send({
    //     messageType: MessageType.SET_WORD,
    //     payload: {
    //         word: 'shade',
    //         reveals: [true, false, false, false, false],
    //     },
    // });
    // sender.send({
    //     messageType: MessageType.ATTEMPT,
    //     payload: {
    //         word: 'shape',
    //         reveals: [true, true, true, false, true],
    //     },
    // });
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __webpack_require__(0);
const protocol_1 = __webpack_require__(1);
class MainMenu {
    constructor(callback) {
        this.callback = callback;
        const fragment = document.createElement('div');
        fragment.innerHTML = this.generate();
        this.element = fragment.children[0];
        const secondScreen = this.element.querySelector('.js-secondScreen');
        secondScreen.addEventListener('click', () => {
            console.log('Opening...');
            const ref = window.open(`audience.html#${config_1.NON_CAST_DESIGNATION}`);
            const sender = new protocol_1.WindowMessageSender(ref);
            ref.addEventListener('load', () => {
                callback(sender);
            });
        });
        window.castInitialized = function () {
            console.log('Cast Framework Version:', cast.framework.VERSION);
            cast.framework.setLoggerLevel(cast.framework.LoggerLevel.DEBUG);
            const context = cast.framework.CastContext.getInstance();
            context.setOptions({
                receiverApplicationId: config_1.APPLICATION_ID,
                autoJoinPolicy: chrome.cast.AutoJoinPolicy.PAGE_SCOPED,
            });
            context.addEventListener(cast.framework.CastContextEventType.CAST_STATE_CHANGED, (evt) => {
                console.log('Event:', evt, cast.framework.CastState.CONNECTED);
                if (evt.castState === cast.framework.CastState.CONNECTED) {
                    const session = context.getCurrentSession();
                    console.log(session);
                    const sender = new protocol_1.CastMessageSender(session);
                    callback(sender);
                }
            });
            // const remote = new cast.framework.RemotePlayer();
            // console.log(remote);
        };
    }
    generate() {
        return `
            <div class="menu">
                <button class="btn btn-menu js-singlePlayer" title="Not yet implemented" disabled>Single Player</button>
                <button class="btn btn-menu js-secondScreen">Present on Second Screen</button>
                <button class="btn btn-menu js-cast" is="google-cast-button">Present Via Chromecast</button>
            </div>
        `;
    }
    show() {
        delete this.element.style.display;
    }
    hide() {
        this.element.style.display = 'none';
    }
    attach(container) {
        container.appendChild(this.element);
        this.show();
    }
}
exports.default = MainMenu;
// const menu = new MainMenu();
// menu.attach(container);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protocol_1 = __webpack_require__(1);
const utils_1 = __webpack_require__(8);
const game_1 = __webpack_require__(16);
class PresenterMenu {
    constructor(sender) {
        this.sender = sender;
        this.state = game_1.generateInitialState();
        const fragment = document.createElement('div');
        fragment.innerHTML = this.generate();
        this.element = fragment.children[0];
        const wordList = this.element.querySelector('.words-list');
        const playerWord = this.element.querySelector('.js-playerWord');
        playerWord.addEventListener('keydown', (evt) => __awaiter(this, void 0, void 0, function* () {
            if (evt.keyCode === 13) {
                // ENTER
                const word = playerWord.value;
                this.state = yield game_1.attemptWord(this.state, word);
                const lastAttempt = this.state.attempts[this.state.attempts.length - 1];
                if (lastAttempt.attemptResponse === game_1.AttemptResponse.INVALID) {
                }
                sender.send({
                    messageType: protocol_1.MessageType.ATTEMPT,
                    payload: {
                        word,
                        reveals: this.state.reveals,
                        attemptResponse: lastAttempt.attemptResponse
                    },
                });
                playerWord.value = '';
            }
            else if (evt.keyCode === 32) {
                // SPACE
                evt.preventDefault();
            }
        }));
        const nextWord = this.element.querySelector('.js-next');
        nextWord.addEventListener('click', () => {
            let word;
            if (this.wordSource === 'custom') {
                const words = wordList.value
                    .split('\n')
                    .map(word => word.trim());
                word = words.splice(utils_1.randInt(words.length), 1)[0];
                wordList.value = words.join('\n');
                if (!word) {
                    console.error(`Out of words, you've used them all`);
                }
            }
            else {
                console.error('Not yet implemented');
                return;
            }
            this.state.word = word;
            this.state.reveals = word.split('').map((letter, idx) => idx === 0 ? true : false);
            sender.send({
                messageType: protocol_1.MessageType.SET_WORD,
                payload: {
                    word,
                    reveals: word
                        .split('')
                        .map((letter, idx) => (idx === 0 ? true : false)),
                },
            });
        });
    }
    get wordSource() {
        return this.element.querySelector('[name="wordsSource"]:checked').value;
    }
    generate() {
        return `<div class="presenter">
            <div class="teams">
                <div class="team">
                    <input class="team-turn" type="radio" name="team-turn" value="teamA">
                    <input class="team-name" type="text" name="teamA" placeholder="teamA">
                    <input class="team-score" type="number" name="teamA-score" value="0">
                </div>
                <div class="header">
                LONG I
                </div>
                <div class="team">
                    <input class="team-turn" type="radio" name="team-turn" value="teamB">
                    <input class="team-name" type="text" name="teamB" placeholder="teamB">
                    <input class="team-score" type="number" name="teamB-score" value="0">
                </div>
            </div>
            <div class="controller">

                <div class="input">
                    <button class="btn btn-primary js-next" >Next Word</button>
                    <input class="playerWord js-playerWord" name="playerWord" placeholder="Word">
                </div>
                <div class="words">

                    <div class="label">Words</div>

                    <div class="words-list-container">
                        <textarea class="words-list"></textarea>
                    </div>
                    <div class="words-source">
                        Custom <input type="radio" value="custom" name="wordsSource" checked>
                        Full Dictionary <input type="radio" value="dictionary" name="wordsSource" disabled>
                    </div>
                </div>
            </div>
        </div>`;
    }
    attach(container) {
        container.appendChild(this.element);
    }
}
exports.PresenterMenu = PresenterMenu;


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const timers_1 = __webpack_require__(9);
function randInt(min, max) {
    if (max === undefined) {
        max = min;
        min = 0;
    }
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.randInt = randInt;
var Reason;
(function (Reason) {
    Reason[Reason["NOT_A_WORD"] = 0] = "NOT_A_WORD";
    Reason[Reason["INVALID_SIZE"] = 1] = "INVALID_SIZE";
})(Reason = exports.Reason || (exports.Reason = {}));
class InvalidWord {
    constructor(reason) {
        this.reason = reason;
    }
}
exports.InvalidWord = InvalidWord;
function wordInDictionary(word) {
    return __awaiter(this, void 0, void 0, function* () {
        console.error('Dictionary Lookup Not Yet Implemented');
        return true;
    });
}
function isValidWord(word) {
    return __awaiter(this, void 0, void 0, function* () {
        if (word.length !== 5) {
            return new InvalidWord(Reason.INVALID_SIZE);
        }
        if (!(yield wordInDictionary(word))) {
            return new InvalidWord(Reason.NOT_A_WORD);
        }
        return true;
    });
}
exports.isValidWord = isValidWord;
function wait(duration) {
    return new Promise((resolve) => {
        timers_1.setTimeout(resolve, duration);
    });
}
exports.wait = wait;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(10);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(11)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(18);

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * for-in <https://github.com/jonschlinkert/for-in>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function forIn(obj, fn, thisArg) {
  for (var key in obj) {
    if (fn.call(thisArg, obj[key], key, obj) === false) {
      break;
    }
  }
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var toString = Object.prototype.toString;

module.exports = function kindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';

  var type = typeof val;
  if (type === 'boolean') return 'boolean';
  if (type === 'string') return 'string';
  if (type === 'number') return 'number';
  if (type === 'symbol') return 'symbol';
  if (type === 'function') {
    return isGeneratorFn(val) ? 'generatorfunction' : 'function';
  }

  if (isArray(val)) return 'array';
  if (isBuffer(val)) return 'buffer';
  if (isArguments(val)) return 'arguments';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  if (isRegexp(val)) return 'regexp';

  switch (ctorName(val)) {
    case 'Symbol': return 'symbol';
    case 'Promise': return 'promise';

    // Set, Map, WeakSet, WeakMap
    case 'WeakMap': return 'weakmap';
    case 'WeakSet': return 'weakset';
    case 'Map': return 'map';
    case 'Set': return 'set';

    // 8-bit typed arrays
    case 'Int8Array': return 'int8array';
    case 'Uint8Array': return 'uint8array';
    case 'Uint8ClampedArray': return 'uint8clampedarray';

    // 16-bit typed arrays
    case 'Int16Array': return 'int16array';
    case 'Uint16Array': return 'uint16array';

    // 32-bit typed arrays
    case 'Int32Array': return 'int32array';
    case 'Uint32Array': return 'uint32array';
    case 'Float32Array': return 'float32array';
    case 'Float64Array': return 'float64array';
  }

  if (isGeneratorObj(val)) {
    return 'generator';
  }

  // Non-plain objects
  type = toString.call(val);
  switch (type) {
    case '[object Object]': return 'object';
    // iterators
    case '[object Map Iterator]': return 'mapiterator';
    case '[object Set Iterator]': return 'setiterator';
    case '[object String Iterator]': return 'stringiterator';
    case '[object Array Iterator]': return 'arrayiterator';
  }

  // other
  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
};

function ctorName(val) {
  return val.constructor ? val.constructor.name : null;
}

function isArray(val) {
  if (Array.isArray) return Array.isArray(val);
  return val instanceof Array;
}

function isError(val) {
  return val instanceof Error || (typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number');
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function'
    && typeof val.getDate === 'function'
    && typeof val.setDate === 'function';
}

function isRegexp(val) {
  if (val instanceof RegExp) return true;
  return typeof val.flags === 'string'
    && typeof val.ignoreCase === 'boolean'
    && typeof val.multiline === 'boolean'
    && typeof val.global === 'boolean';
}

function isGeneratorFn(name, val) {
  return ctorName(name) === 'GeneratorFunction';
}

function isGeneratorObj(val) {
  return typeof val.throw === 'function'
    && typeof val.return === 'function'
    && typeof val.next === 'function';
}

function isArguments(val) {
  try {
    if (typeof val.length === 'number' && typeof val.callee === 'function') {
      return true;
    }
  } catch (err) {
    if (err.message.indexOf('callee') !== -1) {
      return true;
    }
  }
  return false;
}

/**
 * If you need to support Safari 5-7 (8-10 yr-old browser),
 * take a look at https://github.com/feross/is-buffer
 */

function isBuffer(val) {
  if (val.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val);
  }
  return false;
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(8);
const cloneDeep = __webpack_require__(17);
class LongiBoard {
    constructor() { }
}
class Team {
    constructor(players, score = 0) {
        this.players = players;
        this.score = score;
        this.longiBoard = new LongiBoard();
    }
}
var AttemptResponse;
(function (AttemptResponse) {
    AttemptResponse[AttemptResponse["VALID"] = 0] = "VALID";
    AttemptResponse[AttemptResponse["MATCH"] = 1] = "MATCH";
    AttemptResponse[AttemptResponse["INVALID"] = 2] = "INVALID";
})(AttemptResponse = exports.AttemptResponse || (exports.AttemptResponse = {}));
var GameMode;
(function (GameMode) {
    GameMode[GameMode["REGULAR"] = 0] = "REGULAR";
    GameMode[GameMode["BINGO"] = 1] = "BINGO";
    GameMode[GameMode["BONUS"] = 2] = "BONUS";
})(GameMode = exports.GameMode || (exports.GameMode = {}));
// interface GameState {
//     history: Snapshot[];
// }
function generateInitialState() {
    // if (teams.length !== 2) {
    //     throw new Error('Not yet implemented.');
    // }
    // const reveals: boolean[] = Array.prototype.map.call(initialWord, () => false);
    // reveals[0] = true;
    return {
        teams: [],
        mode: GameMode.REGULAR,
        word: '',
        reveals: [],
        activeTeam: 0,
        attempts: [],
    };
}
exports.generateInitialState = generateInitialState;
function attemptWord(prevState, wordAttempt) {
    return __awaiter(this, void 0, void 0, function* () {
        const state = cloneDeep(prevState);
        if (!(yield utils_1.isValidWord(wordAttempt))) {
            state.attempts.push({
                word: wordAttempt,
                attemptResponse: AttemptResponse.INVALID,
            });
        }
        else {
            if (wordAttempt === state.word) {
                state.attempts.push({
                    word: wordAttempt,
                    attemptResponse: AttemptResponse.MATCH,
                });
            }
            else {
                const word = state.word.toUpperCase();
                const attempt = wordAttempt.toUpperCase();
                for (let i = 0; i < word.length; i += 1) {
                    if (word[i] === attempt[i]) {
                        state.reveals[i] = true;
                    }
                }
                state.attempts.push({
                    word: wordAttempt,
                    attemptResponse: AttemptResponse.VALID,
                });
            }
        }
        return state;
    });
}
exports.attemptWord = attemptWord;
function draw(state) {
    console.log('-----------------');
    const word = state.word.toUpperCase();
    const originalFrequency = {};
    for (let i = 0; i < word.length; i += 1) {
        const letter = word[i];
        if (!originalFrequency[letter]) {
            originalFrequency[letter] = 1;
        }
        else {
            originalFrequency[letter] += 1;
        }
    }
    for (const attempt of state.attempts) {
        const frequency = cloneDeep(originalFrequency);
        const wordAttempt = attempt.word.toUpperCase();
        if (attempt.attemptResponse === AttemptResponse.INVALID) {
            console.log(`%c${wordAttempt}`, 'color: blue');
        }
        else {
            let output = '';
            const colors = [];
            for (let i = 0; i < wordAttempt.length; i += 1) {
                const letter = wordAttempt[i];
                output += `%c${wordAttempt[i]}`;
                if (letter === word[i]) {
                    colors.push('green');
                    frequency[letter] -= 1;
                }
                else {
                    if (frequency[letter]) {
                        colors.push('orange');
                        frequency[letter] -= 1;
                    }
                    else {
                        colors.push('blue');
                    }
                }
                // console.log(originalFrequency);
            }
            console.log(output, ...colors.map(color => `color: ${color};`));
        }
    }
    let output = '%c';
    for (let i = 0; i < word.length; i += 1) {
        if (state.reveals[i]) {
            output += `${word[i]}`;
        }
        else {
            output += '-';
        }
    }
    console.log(output, 'color: blue;');
    console.log('-----------------');
}
// const container = document.querySelector('.js-container') as HTMLElement;
// async function test() {
//     const board = new Board();
//     board.attach(container);
//     let state = generateInitialState([['jake']], 'shade');
//     board.word = 'shade';
//     // draw(state);
//     await board.reveal(state.reveals);
//     state = await attemptWord(state, 'shoot');
//     await board.attempt('shoot');
//     await board.reveal(state.reveals);
//     // draw(state);
//     state = await attemptWord(state, 'sheds');
//     await board.attempt('sheds');
//     await board.reveal(state.reveals);
//     // draw(state);
//     state = await attemptWord(state, 'shape');
//     await board.attempt('shape');
//     await board.reveal(state.reveals);
//     state = await attemptWord(state, 'shade');
//     await board.attempt('shade');
//     await board.reveal(state.reveals);
//     state = await attemptWord(state, 'shite');
//     await board.attempt('shite');
//     await board.reveal(state.reveals);
//     state = await attemptWord(state, 'shits');
//     await board.attempt('shits');
//     await board.reveal(state.reveals);
//     // draw(state);
// }
// // console.log(container, board);
// test();


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependenices
 */

var isObject = __webpack_require__(13);
var clone = __webpack_require__(19);
var typeOf = __webpack_require__(15);
var forOwn = __webpack_require__(23);

/**
 * Recursively clone native types.
 */

function cloneDeep(val, instanceClone) {
  switch (typeOf(val)) {
    case 'object':
      return cloneObjectDeep(val, instanceClone);
    case 'array':
      return cloneArrayDeep(val, instanceClone);
    default: {
      return clone(val);
    }
  }
}

function cloneObjectDeep(obj, instanceClone) {
  if (isObject(obj) || (instanceClone === true && typeOf(obj) === 'object')) {
    var res = {};
    forOwn(obj, function(val, key) {
      this[key] = cloneDeep(val, instanceClone);
    }, res);
    return res;
  }
  if (typeof instanceClone === 'function') {
    return instanceClone(obj);
  }
  return obj;
}

function cloneArrayDeep(arr, instanceClone) {
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    res[i] = cloneDeep(arr[i], instanceClone);
  }
  return res;
}

/**
 * Expose `cloneDeep`
 */

module.exports = cloneDeep;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * shallow-clone <https://github.com/jonschlinkert/shallow-clone>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(20);
var mixin = __webpack_require__(21);
var typeOf = __webpack_require__(15);

/**
 * Shallow copy an object, array or primitive.
 *
 * @param  {any} `val`
 * @return {any}
 */

function clone(val) {
  var type = typeOf(val);
  if (clone.hasOwnProperty(type)) {
    return clone[type](val);
  }
  return val;
}

clone.array = function cloneArray(arr) {
  return arr.slice();
};

clone.date = function cloneDate(date) {
  return new Date(+date);
};

clone.object = function cloneObject(obj) {
  if (isObject(obj)) {
    return mixin({}, obj);
  } else {
    return obj;
  }
};

clone.map = function cloneMap(val) {
  return new Map(val);
};

clone.regexp = function cloneRegExp(re) {
  var flags = '';
  flags += re.multiline ? 'm' : '';
  flags += re.global ? 'g' : '';
  flags += re.ignorecase ? 'i' : '';
  return new RegExp(re.source, flags);
};

clone.set = function cloneSet(val) {
  return new Set(val);
};

/**
 * Expose `clone`
 */

module.exports = clone;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isPlainObject = __webpack_require__(13);

module.exports = function isExtendable(val) {
  return isPlainObject(val) || typeof val === 'function' || Array.isArray(val);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(22);
var forIn = __webpack_require__(14);

module.exports = function mixin(target, objects) {
  if (!isObject(target)) {
    throw new TypeError('expected the first argument to be an object');
  }

  var len = arguments.length;
  var idx = 0;

  while (++idx < len) {
    copy(target, arguments[idx]);
  }
  return target;
};

/**
 * copy properties from the source object to the
 * target object. We don't use `Object.keys` here, since
 * "mixin" also adds non-enumerable keys.
 *
 * @param  {*} `value`
 * @param  {String} `key`
 */

function copy(target, obj) {
  if (isObject(obj)) {
    forIn(obj, function(value, key) {
      target[key] = value;
    });
  }
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isPlainObject = __webpack_require__(13);

module.exports = function isExtendable(val) {
  return isPlainObject(val) || typeof val === 'function' || Array.isArray(val);
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * for-own <https://github.com/jonschlinkert/for-own>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var forIn = __webpack_require__(14);
var hasOwn = Object.prototype.hasOwnProperty;

module.exports = function forOwn(obj, fn, thisArg) {
  forIn(obj, function(val, key) {
    if (hasOwn.call(obj, key)) {
      return fn.call(thisArg, obj[key], key, obj);
    }
  });
};


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map