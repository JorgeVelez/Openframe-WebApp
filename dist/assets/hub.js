!function(e){function t(o){if(r[o])return r[o].exports;var n=r[o]={exports:{},id:o,loaded:!1};return e[o].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var r={};return t.m=e,t.c=r,t.p="/assets/",t(0)}({0:function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var n=r(841),s=r(48),i=o(s);n.CrossStorageHub.init(i.default.crossStorageRules);(function(){"undefined"==typeof __REACT_HOT_LOADER__})()},48:function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(164),s=o(n),i={appEnv:"dist",apiBase:"https://api.openframe.io/v0/",crossStorageRules:[{origin:/localhost:3030$/,allow:["get"]},{origin:/editor\.thebookofshaders\.com$/,allow:["get"]}]},a=Object.freeze(Object.assign({},s.default,i));t.default=a;(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(i,"config","/Users/jonathanwohl/Openframe/Openframe-WebApp/src/config/dist.js"),__REACT_HOT_LOADER__.register(a,"default","/Users/jonathanwohl/Openframe/Openframe-WebApp/src/config/dist.js"))})()},164:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={perPage:15,spinnerConfig:{lines:11,length:0,width:8,radius:60,scale:.25,corners:1,color:"#000",opacity:.25,rotate:0,direction:1,speed:1,trail:91,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",shadow:!1,hwaccel:!1,position:"absolute"}};t.default=r;(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(r,"default","/Users/jonathanwohl/Openframe/Openframe-WebApp/src/config/base.js")})()},839:function(e,t,r){!function(r){function o(e,t){t=t||{},this._id=o._generateUUID(),this._promise=t.promise||Promise,this._frameId=t.frameId||"CrossStorageClient-"+this._id,this._origin=o._getOrigin(e),this._requests={},this._connected=!1,this._closed=!1,this._count=0,this._timeout=t.timeout||5e3,this._listener=null,this._installListener();var r;t.frameId&&(r=document.getElementById(t.frameId)),r&&this._poll(),r=r||this._createFrame(e),this._hub=r.contentWindow}o.frameStyle={display:"none",position:"absolute",top:"-999px",left:"-999px"},o._getOrigin=function(e){var t,r,o;return t=document.createElement("a"),t.href=e,t.host||(t=window.location),r=t.protocol&&":"!==t.protocol?t.protocol:window.location.protocol,o=r+"//"+t.host,o=o.replace(/:80$|:443$/,"")},o._generateUUID=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,r="x"==e?t:3&t|8;return r.toString(16)})},o.prototype.onConnect=function(){var e=this;return this._connected?this._promise.resolve():this._closed?this._promise.reject(new Error("CrossStorageClient has closed")):(this._requests.connect||(this._requests.connect=[]),new this._promise(function(t,r){var o=setTimeout(function(){r(new Error("CrossStorageClient could not connect"))},e._timeout);e._requests.connect.push(function(e){return clearTimeout(o),e?r(e):void t()})}))},o.prototype.set=function(e,t){return this._request("set",{key:e,value:t})},o.prototype.get=function(e){var t=Array.prototype.slice.call(arguments);return this._request("get",{keys:t})},o.prototype.del=function(){var e=Array.prototype.slice.call(arguments);return this._request("del",{keys:e})},o.prototype.clear=function(){return this._request("clear")},o.prototype.getKeys=function(){return this._request("getKeys")},o.prototype.close=function(){var e=document.getElementById(this._frameId);e&&e.parentNode.removeChild(e),window.removeEventListener?window.removeEventListener("message",this._listener,!1):window.detachEvent("onmessage",this._listener),this._connected=!1,this._closed=!0},o.prototype._installListener=function(){var e=this;this._listener=function(t){var r,o,n,s;if(!e._closed&&t.data&&"string"==typeof t.data&&(o="null"===t.origin?"file://":t.origin,o===e._origin))if("cross-storage:unavailable"!==t.data){if(t.data.indexOf("cross-storage:")!==-1&&!e._connected){if(e._connected=!0,!e._requests.connect)return;for(r=0;r<e._requests.connect.length;r++)e._requests.connect[r](n);delete e._requests.connect}if("cross-storage:ready"!==t.data){try{s=JSON.parse(t.data)}catch(e){return}s.id&&e._requests[s.id]&&e._requests[s.id](s.error,s.result)}}else{if(e._closed||e.close(),!e._requests.connect)return;for(n=new Error("Closing client. Could not access localStorage in hub."),r=0;r<e._requests.connect.length;r++)e._requests.connect[r](n)}},window.addEventListener?window.addEventListener("message",this._listener,!1):window.attachEvent("onmessage",this._listener)},o.prototype._poll=function(){var e,t,r;e=this,r="file://"===e._origin?"*":e._origin,t=setInterval(function(){return e._connected?clearInterval(t):void(e._hub&&e._hub.postMessage("cross-storage:poll",r))},1e3)},o.prototype._createFrame=function(e){var t,r;t=window.document.createElement("iframe"),t.id=this._frameId;for(r in o.frameStyle)o.frameStyle.hasOwnProperty(r)&&(t.style[r]=o.frameStyle[r]);return window.document.body.appendChild(t),t.src=e,t},o.prototype._request=function(e,t){var r,o;return this._closed?this._promise.reject(new Error("CrossStorageClient has closed")):(o=this,o._count++,r={id:this._id+":"+o._count,method:"cross-storage:"+e,params:t},new this._promise(function(e,t){var n,s,i;n=setTimeout(function(){o._requests[r.id]&&(delete o._requests[r.id],t(new Error("Timeout: could not perform "+r.method)))},o._timeout),o._requests[r.id]=function(s,i){return clearTimeout(n),delete o._requests[r.id],s?t(new Error(s)):void e(i)},Array.prototype.toJSON&&(s=Array.prototype.toJSON,Array.prototype.toJSON=null),i="file://"===o._origin?"*":o._origin,o._hub.postMessage(JSON.stringify(r),i),s&&(Array.prototype.toJSON=s)}))},"undefined"!=typeof e&&e.exports?e.exports=o:t.CrossStorageClient=o}(this)},840:function(e,t,r){!function(r){var o={};o.init=function(e){var t=!0;try{window.localStorage||(t=!1)}catch(e){t=!1}if(!t)try{return window.parent.postMessage("cross-storage:unavailable","*")}catch(e){return}o._permissions=e||[],o._installListener(),window.parent.postMessage("cross-storage:ready","*")},o._installListener=function(){var e=o._listener;window.addEventListener?window.addEventListener("message",e,!1):window.attachEvent("onmessage",e)},o._listener=function(e){var t,r,n,s,i,a,c;if(t="null"===e.origin?"file://":e.origin,"cross-storage:poll"===e.data)return window.parent.postMessage("cross-storage:ready",e.origin);if("cross-storage:ready"!==e.data){try{n=JSON.parse(e.data)}catch(e){return}if(n&&"string"==typeof n.method&&(s=n.method.split("cross-storage:")[1])){if(o._permitted(t,s))try{a=o["_"+s](n.params)}catch(e){i=e.message}else i="Invalid permissions for "+s;c=JSON.stringify({id:n.id,error:i,result:a}),r="file://"===t?"*":t,window.parent.postMessage(c,r)}}},o._permitted=function(e,t){var r,n,s,i;if(r=["get","set","del","clear","getKeys"],!o._inArray(t,r))return!1;for(n=0;n<o._permissions.length;n++)if(s=o._permissions[n],s.origin instanceof RegExp&&s.allow instanceof Array&&(i=s.origin.test(e),i&&o._inArray(t,s.allow)))return!0;return!1},o._set=function(e){window.localStorage.setItem(e.key,e.value)},o._get=function(e){var t,r,o,n;for(t=window.localStorage,r=[],o=0;o<e.keys.length;o++){try{n=t.getItem(e.keys[o])}catch(e){n=null}r.push(n)}return r.length>1?r:r[0]},o._del=function(e){for(var t=0;t<e.keys.length;t++)window.localStorage.removeItem(e.keys[t])},o._clear=function(){window.localStorage.clear()},o._getKeys=function(e){var t,r,o;for(o=[],r=window.localStorage.length,t=0;t<r;t++)o.push(window.localStorage.key(t));return o},o._inArray=function(e,t){for(var r=0;r<t.length;r++)if(e===t[r])return!0;return!1},o._now=function(){return"function"==typeof Date.now?Date.now():(new Date).getTime()},"undefined"!=typeof e&&e.exports?e.exports=o:t.CrossStorageHub=o}(this)},841:function(e,t,r){e.exports={CrossStorageClient:r(839),CrossStorageHub:r(840)}}});
//# sourceMappingURL=hub.js.map