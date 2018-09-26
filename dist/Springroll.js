var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),get=function e(t,n,i){null===t&&(t=Function.prototype);var a=Object.getOwnPropertyDescriptor(t,n);if(void 0===a){var r=Object.getPrototypeOf(t);return null===r?void 0:e(r,n,i)}if("value"in a)return a.value;var s=a.get;return void 0!==s?s.call(i):void 0},inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},Debugger=function(){function e(){classCallCheck(this,e)}return createClass(e,null,[{key:"minLevel",value:function(t){e.initParams(),"number"!=typeof t?(t=t.toUpperCase(),e.isValidLevelName(t)?window[e.paramKey].minLevel=e.LEVEL[t]:window[e.paramKey].minLevel=e.LEVEL.GENERAL):window[e.paramKey].minLevel=t}},{key:"initParams",value:function(){window[e.paramKey]||(window[e.paramKey]={emitEnabled:!1,enabled:!0,minLevel:1})}},{key:"emit",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Debugger";e.initParams(),e.params.emitEnabled&&window.dispatchEvent(new Event(t))}},{key:"meetsLevelRequirement",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"GENERAL";return e.initParams(),!!(e.isValidLevelName(t)&&e.LEVEL[t]>=e.params.minLevel)}},{key:"log",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"log";if(e.initParams(),e.isEnabled()){for(var n=arguments.length,i=Array(n>1?n-1:0),a=1;a<n;a++)i[a-1]=arguments[a];switch(t.toLowerCase()){case"info":var r;return!!e.meetsLevelRequirement("INFO")&&((r=console).info.apply(r,i),e.emit(),!0);case"debug":var s;return!!e.meetsLevelRequirement("DEBUG")&&((s=console).debug.apply(s,i),e.emit(),!0);case"error":var o;return!!e.meetsLevelRequirement("ERROR")&&((o=console).error.apply(o,i),e.emit(),!0);case"warn":var l;return!!e.meetsLevelRequirement("WARN")&&((l=console).warn.apply(l,i),e.emit(),!0);case"log":case"general":default:var u;return!!e.meetsLevelRequirement("GENERAL")&&((u=console).log.apply(u,i),e.emit(),!0)}}}},{key:"isValidLevelName",value:function(t){return e.initParams(),"GENERAL"==t||"DEBUG"==t||"INFO"==t||"WARN"==t||"ERROR"==t}},{key:"assert",value:function(t){if(e.initParams(),!t)throw"Assert Error: "+t}},{key:"isEnabled",value:function(){return window[e.paramKey].enabled}},{key:"enable",value:function(t){e.initParams(),window[e.paramKey].enabled=t}},{key:"params",get:function(){return e.initParams(),window[e.paramKey]}},{key:"LEVEL",get:function(){return{GENERAL:1,DEBUG:2,INFO:3,WARN:4,ERROR:5}}},{key:"paramKey",get:function(){return"__spring_roll_debugger_params__"}}]),e}(),Property=function(){function e(t){classCallCheck(this,e),this._value=t,this.listeners=[]}return createClass(e,[{key:"notifyChange",value:function(){var e=this;this.listeners.forEach(function(t){t(e._value)})}},{key:"subscribe",value:function(e){this.listeners.push(e)}},{key:"unsubscribe",value:function(e){this.listeners=this.listeners.filter(function(t){return t!==e})}},{key:"value",get:function(){return this._value},set:function(e){this._value=e,this.notifyChange()}},{key:"hasListeners",get:function(){return this.listeners.length>0}}]),e}(),StateManager=function(){function e(){classCallCheck(this,e)}return createClass(e,[{key:"addField",value:function(e,t){if(void 0!==this[e])throw new Error('"'+e+'" is already a registered property');return this[e]=new Property(t),this[e]}}]),e}(),ScaleManager=function(){function e(t){classCallCheck(this,e),this.width=1,this.height=1,this.callback=t,t instanceof Function&&this.enable(t),this.onResize=this.onResize.bind(this)}return createClass(e,[{key:"onResize",value:function(e){var t=e.target.innerWidth,n=e.target.innerHeight;this.callback({width:t,height:n,ratio:t/n}),this.width=t,this.height=n}},{key:"enable",value:function(e){e instanceof Function?(this.callback=e,window.addEventListener("resize",this.onResize)):console.warn("Scale Manager was not passed a function")}},{key:"disable",value:function(){window.removeEventListener("resize",this.onResize)}}]),e}(),SpeechSynth=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.voice,i=void 0===n?0:n,a=t.rate,r=void 0===a?1:a,s=t.pitch,o=void 0===s?0:s,l=t.volume,u=void 0===l?1:l;classCallCheck(this,e),this.voiceOptions=[],this.voicesLoaded=!1,this.queue=[],this.options={voice:{},rate:r,pitch:o,volume:u};var c=function(){this.voiceOptions=window.speechSynthesis.getVoices(),this.voice=this.setVoice(i),this.voicesLoaded=!0}.bind(this),h=window.speechSynthesis.getVoices();Array.isArray(h)&&0<h.length?c():window.speechSynthesis.addEventListener("voiceschanged",c,{once:!0})}return createClass(e,[{key:"pause",value:function(){this.speaking=!1,window.speechSynthesis.pause()}},{key:"resume",value:function(){this.speaking=!0,window.speechSynthesis.resume()}},{key:"cancel",value:function(){this.speaking=!1,this.pause(),this.queue.length=0,window.speechSynthesis.cancel()}},{key:"say",value:function(e){var t=this;if(!this.speaking&&this.voicesLoaded){this.speaking=!0;var n=new SpeechSynthesisUtterance(e);Object.assign(n,this.options),n.onend=function(){t.speaking=!1,0<t.queue.length&&t.say(t.queue.shift())},window.speechSynthesis.speak(n)}else this.queue.push(e)}},{key:"rangeLimit",value:function(e,t,n){return isNaN(n)?(console.warn("'"+n+"' is not a valid number!"),e):n>=t?t:e>=n?e:n}},{key:"setVoice",value:function(e){this.options.voice=this.voiceOptions[e]}},{key:"getVoice",value:function(){return this.options.voice}},{key:"rate",set:function(e){this.options.rate=this.rangeLimit(.1,10,e)},get:function(){return this.options.rate}},{key:"pitch",set:function(e){this.options.pitch=this.rangeLimit(0,2,e)},get:function(){return this.options.pitch}},{key:"volume",set:function(e){this.options.volume=this.rangeLimit(0,1,e)},get:function(){return this.options.volume}}]),e}(),ColorFilter=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;if(classCallCheck(this,e),this.element=null,null===document.getElementById("color__filter__svg")){var i=document.createElement("div");i.style.width="0",i.style.height="0",i.style.position="absolute",i.style.opacity="0",i.innerHTML+='<svg id="color__filter__svg" style="width: 0; height: 0; position: absolute;" xmlns="http://www.w3.org/2000/svg"\n      version="1.1">\n      <defs>\n        <filter id="color__filter__protanopia">\n          <feColorMatrix\n            in="SourceGraphic"\n            type="matrix"\n            values="0.567, 0.433, 0,     0, 0\n                    0.558, 0.442, 0,     0, 0\n                    0,     0.242, 0.758, 0, 0\n                    0,     0,     0,     1, 0"/>\n        </filter>\n        <filter id="color__filter__protanomaly">\n          <feColorMatrix\n            in="SourceGraphic"\n            type="matrix"\n            values="0.817, 0.183, 0,     0, 0\n                    0.333, 0.667, 0,     0, 0\n                    0,     0.125, 0.875, 0, 0\n                    0,     0,     0,     1, 0"/>\n        </filter>\n        <filter id="color__filter__deuteranopia">\n          <feColorMatrix\n            in="SourceGraphic"\n            type="matrix"\n            values="0.625, 0.375, 0,   0, 0\n                    0.7,   0.3,   0,   0, 0\n                    0,     0.3,   0.7, 0, 0\n                    0,     0,     0,   1, 0"/>\n        </filter>\n        <filter id="color__filter__deuteranomaly">\n          <feColorMatrix\n            in="SourceGraphic"\n            type="matrix"\n            values="0.8,   0.2,   0,     0, 0\n                    0.258, 0.742, 0,     0, 0\n                    0,     0.142, 0.858, 0, 0\n                    0,     0,     0,     1, 0"/>\n        </filter>\n        <filter id="color__filter__tritanopia">\n          <feColorMatrix\n            in="SourceGraphic"\n            type="matrix"\n            values="0.95, 0.05,  0,     0, 0\n                    0,    0.433, 0.567, 0, 0\n                    0,    0.475, 0.525, 0, 0\n                    0,    0,     0,     1, 0"/>\n        </filter>\n        <filter id="color__filter__tritanomaly">\n          <feColorMatrix\n            in="SourceGraphic"\n            type="matrix"\n            values="0.967, 0.033, 0,     0, 0\n                    0,     0.733, 0.267, 0, 0\n                    0,     0.183, 0.817, 0, 0\n                    0,     0,     0,     1, 0"/>\n        </filter>\n        <filter id="color__filter__achromatopsia">\n          <feColorMatrix\n            in="SourceGraphic"\n            type="matrix"\n            values="0.299, 0.587, 0.114, 0, 0\n                    0.299, 0.587, 0.114, 0, 0\n                    0.299, 0.587, 0.114, 0, 0\n                    0,     0,     0,     1, 0"/>\n        </filter>\n        <filter id="color__filter__achromatomaly">\n          <feColorMatrix\n            in="SourceGraphic"\n            type="matrix"\n            values="0.618, 0.320, 0.062, 0, 0\n                    0.163, 0.775, 0.062, 0, 0\n                    0.163, 0.320, 0.516, 0, 0\n                    0,     0,     0,     1, 0"/>\n        </filter>\n      </defs>\n      </svg>\n      ',document.body.appendChild(i)}t instanceof HTMLElement&&"string"==typeof n&&this.applyFilter(t,n)}return createClass(e,[{key:"applyFilter",value:function(e,t){this.element=e,this.changeFilter(t)}},{key:"changeFilter",value:function(e){null!==this.element&&(this.element.style.filter="url(#color__filter__"+e+")")}},{key:"removeFilter",value:function(){this.element.style.filter=null}},{key:"types",get:function(){return[{name:"Protanopia",value:"protanopia"},{name:"Protanomaly",value:"protanomaly"},{name:"Deuteranopia",value:"deuteranopia"},{name:"Deuteranomaly",value:"deuteranomaly"},{name:"Tritanopia",value:"tritanopia"},{name:"Tritanomaly",value:"tritanomaly"},{name:"Achromatopsia",value:"achromatopsia"},{name:"Achromatomaly",value:"achromatomaly"}]}}]),e}(),Key=function(){function e(t,n,i){classCallCheck(this,e),this.key=t,this._state=0,this.actions={up:i,down:n}}return createClass(e,[{key:"updateState",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;e<3&&e>-1&&(this._state=e)}},{key:"action",value:function(){1===this.state?this.actions.down():2===this.state&&(this.actions.up(),this.updateState(0))}},{key:"state",get:function(){return this._state}}]),e}(),Controller=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];classCallCheck(this,e),this.assignButtons(t),window.addEventListener("keydown",this.onKeyDown.bind(this)),window.addEventListener("keyup",this.onKeyUp.bind(this))}return createClass(e,[{key:"update",value:function(){for(var e=0,t=this.keys.length;e<t;e++)this.buttons[this.keys[e]].action()}},{key:"onKeyDown",value:function(e){this.onKey(e,1)}},{key:"onKeyUp",value:function(e){this.onKey(e,2)}},{key:"assignButtons",value:function(e){this.buttons={},this.keys=[];for(var t=0,n=e.length;t<n;t++)this.keys.push(e[t].key),this.buttons[e[t].key]=new Key(e[t].key,e[t].down,e[t].up)}},{key:"onKey",value:function(e,t){var n=e.key.toLowerCase();this.buttons[n]&&this.buttons[n].updateState(t)}}]),e}(),BellhopEventDispatcher=function(){function e(){classCallCheck(this,e),this._listeners={}}return createClass(e,[{key:"on",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this._listeners[e]||(this._listeners[e]=[]),t._priority=parseInt(n)||0,-1===this._listeners[e].indexOf(t)&&(this._listeners[e].push(t),this._listeners[e].length>1&&this._listeners[e].sort(this.listenerSorter))}},{key:"listenerSorter",value:function(e,t){return e._priority-t._priority}},{key:"off",value:function(e,t){if(void 0!==this._listeners[e])if(void 0!==t){var n=this._listeners[e].indexOf(t);-1<n&&this._listeners[e].splice(n,1)}else delete this._listeners[e]}},{key:"trigger",value:function(e){if("string"==typeof e&&(e={type:e}),void 0!==this._listeners[e.type])for(var t=this._listeners[e.type].length-1;t>=0;t--)this._listeners[e.type][t](e)}},{key:"destroy",value:function(){this._listeners={}}}]),e}(),Bellhop=function(e){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100*Math.random()|0;classCallCheck(this,t);var n=possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.id="BELLHOP:"+e,n.connected=!1,n.isChild=!0,n.connecting=!1,n.origin="*",n._sendLater=[],n.iframe=null,n}return inherits(t,BellhopEventDispatcher),createClass(t,[{key:"receive",value:function(e){this.target===e.source&&("connected"===e.data?this.onConnectionReceived(e.data):this.connected&&"object"===_typeof(e.data)&&e.data.type&&this.trigger(e.data))}},{key:"onConnectionReceived",value:function(e){this.connecting=!1,this.connected=!0,this.trigger("connected"),this.isChild||this.target.postMessage(e,this.origin);for(var t=0,n=this._sendLater.length;t<n;t++){var i=this._sendLater[t],a=i.type,r=i.data;this.send(a,r)}this._sendLater.length=0}},{key:"connect",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"*";this.connecting||(this.disconnect(),this.connecting=!0,e instanceof HTMLIFrameElement&&(this.iframe=e),this.isChild=void 0===e,this.origin=t,window.addEventListener("message",this.receive.bind(this)),this.isChild&&(window===this.target?this.trigger("failed"):this.target.postMessage("connected",this.origin)))}},{key:"disconnect",value:function(){this.connected=!1,this.connecting=!1,this.origin=null,this.iframe=null,this.isChild=!0,this._sendLater.length=0,window.removeEventListener("message",this.receive)}},{key:"send",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("string"!=typeof e)throw"The event type must be a string";var n={type:e,data:t};this.connecting?this._sendLater.push(n):this.target.postMessage(n,this.origin)}},{key:"fetch",value:function(e,t){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];if(!this.connecting&&!this.connected)throw"No connection, please call connect() first";this.on(e,function e(i){a&&n.off(i.type,e),t(i)}),this.send(e,i)}},{key:"respond",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.on(e,function a(r){i&&t.off(r.type,a),t.send(e,n)})}},{key:"destroy",value:function(){get(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"destroy",this).call(this),this.disconnect(),this._sendLater.length=0}},{key:"target",get:function(){return this.isChild?window.parent:this.iframe.contentWindow}}]),t}(),ready="ready",pause="pause",captionsMuted="captionsMuted",playOptions="playOptions",soundVolume="soundVolume",musicVolume="musicVolume",voVolume="voVolume",sfxVolume="sfxVolume",Application=function(){function e(t){var n=this;classCallCheck(this,e),this.state=new StateManager,this.state.addField(ready,!1),this.state.addField(pause,!1),this.state.addField(captionsMuted,!0),this.state.addField(playOptions,{}),this.state.addField(soundVolume,1),this.state.addField(musicVolume,1),this.state.addField(voVolume,1),this.state.addField(sfxVolume,1),this.features=Object.assign({captions:!1,sound:!1,vo:!1,music:!1,sfx:!1},t||{}),(this.features.vo||this.features.music||this.features.sfx)&&(this.features.sound=!0),this.container=new Bellhop,this.container.connect(),this.container.send("features",this.features),this.container.send("keepFocus",!1),[soundVolume,musicVolume,voVolume,sfxVolume,captionsMuted,pause].forEach(function(e){var t=n.state[e];n.container.on(e,function(e){return t.value=e.data})}),[{mute:"soundMuted",volume:soundVolume},{mute:"musicMuted",volume:musicVolume},{mute:"voMuted",volume:voVolume},{mute:"sfxMuted",volume:sfxVolume}].forEach(function(e){var t=n.state[e.volume];n.container.on(e.mute,function(e){var n=t._previousValue||1;t._previousValue=t.value,t.value=e.data?0:n})}),window.addEventListener("focus",function(){return n.container.send("focus",!0)}),window.addEventListener("blur",function(){return n.container.send("focus",!1)});var i=/playOptions=[^&$]*/.exec(window.location.search);if(null!==i){var a=i[0],r=decodeURIComponent(a.split("=")[1]);try{this.playOptions=JSON.parse(r)}catch(e){Debugger.log("warn","Failed to parse playOptions from query string:"+e.message)}}this.container.fetch("playOptions",function(e){return n.playOptions.value=e.data});var s=e.validatePlugins();if(s.length>0){var o=s.join(". ")+".";throw new Error(o)}e.sortPlugins(),e._plugins.forEach(function(e){return e.setup(n)});var l=Promise.resolve(),u=function(e){l=l.then(function(){return e.preload(n)})},c=!0,h=!1,d=void 0;try{for(var f,p=e._plugins[Symbol.iterator]();!(c=(f=p.next()).done);c=!0){u(f.value)}}catch(e){h=!0,d=e}finally{try{!c&&p.return&&p.return()}finally{if(h)throw d}}l.catch(function(e){Debugger.log("warn",e)}).then(function(){n.validateListeners()}).catch(function(e){Debugger.log("warn",e)}).then(function(){n.container.send("loaded"),n.state.ready.value=!0})}return createClass(e,[{key:"validateListeners",value:function(){var e=this,t=[],n={captions:captionsMuted,sound:soundVolume,music:musicVolume,vo:voVolume,sfx:sfxVolume};if(Object.keys(n).forEach(function(i){var a=n[i];e.features[i]&&!e.state[a].hasListeners&&t.push(a)}),this.state.pause.hasListeners||t.push("pause"),t.length)throw new Error("Application state is missing required listeners: "+t.join(", ")+".")}}],[{key:"validatePlugins",value:function(){var t=[],n=e._plugins.map(function(e){return e.name});return e._plugins.forEach(function(e){var i=e.name,a=e.required.filter(function(e){return n.indexOf(e)<0}).map(function(e){return'"'+e+'"'});if(0!==a.length){var r='Application plugin "'+i+'" missing required plugins '+a.join(", ");t.push(r)}}),t}},{key:"sortPlugins",value:function(){if(0!==e._plugins.length){var t=e._plugins.map(function(e){return e.name}),n={};e._plugins.forEach(function(e){var i=e.optional.filter(function(n){return-1!==t.indexOf(n)||(Debugger.log("warn",e.name+" missing optional plugin "+n),!1)});n[e.name]={plugin:e,name:e.name,dependencies:[].concat(e.required).concat(i)}});var i=[],a=new Set;if(Object.keys(n).map(function(e){return n[e]}).filter(function(e){return 0===e.dependencies.length}).forEach(function(e){return a.add(e.name)}),0===a.size)throw new Error("Every registered plugin has a dependency!");for(var r=function(){var e=a.values().next().value;a.delete(e),i.push(e),Object.keys(n).forEach(function(t){var r=n[t].dependencies.indexOf(e);r>-1&&n[t].dependencies.splice(r,1),0===n[t].dependencies.length&&-1===i.indexOf(t)&&a.add(t)})};a.size>0;)r();if(Object.keys(n).filter(function(e){return n[e].dependencies.length>0}).length>0)throw new Error("Dependency graph has a cycle");e._plugins=[],i.forEach(function(t){e._plugins.push(n[t].plugin)})}}}]),e}();Application._plugins=[],Application.uses=function(e){Application._plugins.push(e)};var Caption=function(){function e(t){classCallCheck(this,e),this.lines=t,this.lines.sort(function(e,t){return e.endTime<t.endTime?-1:e.endTime>t.endTime?1:0}),this.reset()}return createClass(e,[{key:"reset",value:function(){this.time=0,this.lineIndex=0,this.renderer=null}},{key:"update",value:function(e){var t=this.time+1e3*e;t!==this.time&&(this.updateState(t,this.time),this.time=t)}},{key:"updateState",value:function(e,t){if(!this.isFinished()){for(e>this.lines[this.lineIndex].endTime&&this.renderer.lineEnd();e>this.lines[this.lineIndex].endTime;)if(this.lineIndex++,this.isFinished())return;var n=this.lines[this.lineIndex];e>=n.startTime&&t<n.startTime&&this.renderer.lineBegin(n)}}},{key:"isFinished",value:function(){return this.lineIndex>=this.lines.length}},{key:"start",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{lineBegin:function(){},lineEnd:function(){}};this.reset(),this.renderer=t,this.updateTimeIndex(e),this.updateState(this.time,this.lines[this.lineIndex].startTime-1)}},{key:"updateTimeIndex",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(this.time=e,!this.isFinished())for(var t=this.lines.length-1;t>-1;t--)if(this.lines[t].startTime<=e){this.lineIndex=t;break}}}]),e}(),TimedLine=function(){function e(t,n,i){classCallCheck(this,e),this.startTime=t||0,this.endTime=n||0,this.content="",this.setContent(i)}return createClass(e,[{key:"setContent",value:function(e){this.content=e}}]),e}(),CaptionFactory=function(){function e(){classCallCheck(this,e)}return createClass(e,null,[{key:"createCaptionMap",value:function(e){var t={};for(var n in e){var i=this.createCaption(e[n]);i?t[n]=i:Debugger.log("error","[CaptionFactory.createCaptionMap] failed to create caption:",n)}return t}},{key:"createCaption",value:function(e){for(var t=[],n=0,i=e.length;n<i;n++){var a=this.createLine(e[n]);a&&t.push(a)}if(!(t.length<=0))return new Caption(t);Debugger.log("error","[CaptionFactory.createCaption] captions should not have 0 lines.")}},{key:"createLine",value:function(e){if("number"==typeof e.start)if("number"==typeof e.end)if("string"==typeof e.content){if(""!==e.content)return new TimedLine(e.start,e.end,e.content);Debugger.log("warn","[CaptionFactory.createLine] lineData.content should not be empty","Its recommended to add time to the start of the next line to add delays.")}else Debugger.log("error","[CaptionFactory.createLine] lineData.content must be defined as a string");else Debugger.log("error","[CaptionFactory.createLine] lineData.end must be defined as a number");else Debugger.log("error","[CaptionFactory.createLine] lineData.start must be defined as a number")}}]),e}(),CaptionPlayer=function(){function e(t,n){classCallCheck(this,e),this.captions=CaptionFactory.createCaptionMap(t),this.renderer=n,this.activeCaption=null}return createClass(e,[{key:"update",value:function(e){this.activeCaption&&(this.activeCaption.update(e),this.activeCaption.isFinished()&&this.stop())}},{key:"start",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(this.stop(),this.activeCaption=this.captions[e],this.activeCaption)return this.renderer.start(n),void this.activeCaption.start(t,this.renderer);Debugger.log("warn","[CaptionPlayer.Start()] caption "+e+" not found")}},{key:"stop",value:function(){this.activeCaption&&this.renderer.stop&&this.renderer.stop(),this.activeCaption=null}}]),e}(),IRender=function e(){classCallCheck(this,e),"function"==typeof this.start&&"function"==typeof this.stop&&"function"==typeof this.lineBegin&&"function"==typeof this.lineEnd||console.error('Springroll Caption Renderer not implemented corrected. Please ensure you have a "start", "end", "lineBegin", and "lineEnd" function in your class.')},DOMRenderer=function(e){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};classCallCheck(this,t);var i=possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e instanceof HTMLElement||console.error("Invalid html element provided to renderer"),i.renderTarget=e,i.templateVariables=n,i}return inherits(t,IRender),createClass(t,[{key:"start",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.renderTarget.style.visibility="visible",this.templateVariables=e}},{key:"stop",value:function(){this.renderTarget.style.visibility="hidden",this.templateVariables={}}}]),t}();function TemplateRenderer(e,t){return e.replace(/{{([a-zA-Z][A-Za-z0-9]*)}}/g,function(e,n){return t[n]||e})}var HtmlRenderer=function(e){function t(){return classCallCheck(this,t),possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return inherits(t,DOMRenderer),createClass(t,[{key:"lineBegin",value:function(e){this.renderTarget.innerHTML=TemplateRenderer(e.content,this.templateVariables)}},{key:"lineEnd",value:function(){this.renderTarget.innerHTML=""}}]),t}(),TextRenderer=function(e){function t(){return classCallCheck(this,t),possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return inherits(t,DOMRenderer),createClass(t,[{key:"lineBegin",value:function(e){this.renderTarget.innerText=this.sanitize(TemplateRenderer(e.content,this.templateVariables))}},{key:"lineEnd",value:function(){this.renderTarget.textContent=""}},{key:"sanitize",value:function(e){var t=document.createElement("div");return t.innerHTML=e,t.textContent||t.innerText||""}}]),t}(),Localizer=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};classCallCheck(this,e),this.locales=t.locales,this.setPrimaryLocale(n.language||this.getBrowsersLocaleKey()||t.default),this.setFallbackLocale(n.fallback||t.default)}return createClass(e,[{key:"resolve",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.language?this.getLocaleKey(t.language):this.primaryLanguage,i=this.getLocaleKey(t.fallback)||this.fallbackLanguage,a=this.locales[n],r=this.locales[i];return a?{path:a.path+e,language:n}:r?{path:r.path+e,language:i}:void 0}},{key:"setPrimaryLocale",value:function(e){var t=this.getLocaleKey(e);return!!t&&(this.primaryLanguage=t,!0)}},{key:"setFallbackLocale",value:function(e){var t=this.getLocaleKey(e);return!!t&&(this.fallbackLanguage=t,!0)}},{key:"getLocaleKey",value:function(e){if(e){var t=e.toLowerCase();if(this.locales[t])return t;if(t.indexOf("-")>0)return t=t.split("-")[0],this.getLocaleKey(t)}}},{key:"getBrowsersLocaleKey",value:function(){for(var e=this.getBrowserLanguages(),t=0,n=e.length;t<n;t++){var i=this.getLocaleKey(e[t]);if(i)return i}}},{key:"getBrowserLanguages",value:function(){return navigator.languages?navigator.languages:navigator.language?[navigator.language||navigator.userLanguage]:[]}}]),e}(),ApplicationPlugin=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(classCallCheck(this,e),void 0===t.name)throw new Error("Application plugin not provided a name field");this.name=t.name,this.required=t.required||[],this.optional=t.optional||[]}return createClass(e,[{key:"setup",value:function(){}},{key:"preload",value:function(){return Promise.resolve()}}]),e}();export{Debugger,StateManager,Property,ScaleManager,SpeechSynth,ColorFilter,Controller,Application,Caption,CaptionFactory,CaptionPlayer,TimedLine,IRender,DOMRenderer,HtmlRenderer,TemplateRenderer,TextRenderer,Localizer,ApplicationPlugin};
//# sourceMappingURL=Springroll.js.map
