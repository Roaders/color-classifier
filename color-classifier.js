/*!
 * color-classifier
 * Classify the color along the reference color.
 *
 * @author tsuyoshiwada
 * @license MIT
 * @version 0.0.1
 */
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.ColorClassifier=n()}(this,function(){"use strict";function e(e,n){}var n={};n.classCallCheck=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")},n.createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();var t=/^#([a-fA-F0-9]{3})$/,r=/^#([a-fA-F0-9]{6})$/,a=function(){function e(t){n.classCallCheck(this,e),this.original=t,this.rgb=e.parseHex(t),this.hsv=e.rgbToHsv(this.rgb)}return n.createClass(e,null,[{key:"parseHex",value:function(e){var n={};if(t.test(e)){var a=e.slice(1,2),s=e.slice(2,3),i=e.slice(3,4);n.r=parseInt(a+a,16),n.g=parseInt(s+s,16),n.b=parseInt(i+i,16)}else{if(!r.test(e))return null;n.r=parseInt(e.slice(1,3),16),n.g=parseInt(e.slice(3,5),16),n.b=parseInt(e.slice(5,7),16)}return n}},{key:"rgbToHsv",value:function(e){var n=e.r,t=e.g,r=e.b,a={},s=Math.min(n,t,r),i=Math.max(n,t,r),f=i-s;return 0===i?a.s=0:a.s=Math.round(f/i*100),i===s?a.h=0:n===i?a.h=(t-r)/f:t===i?a.h=2+(r-n)/f:a.h=4+(n-t)/f,a.h=Math.min(Math.round(60*a.h),360),a.h<0&&(a.h+=360),a.v=Math.round(i/255*100),a}},{key:"hsvDistance",value:function(e,n){var t=0;return t=e.h>n.h?Math.min(e.h-n.h,n.h-e.h+360):Math.min(n.h-e.h,e.h-n.h+360),Math.sqrt(Math.pow(t,2)+Math.pow(e.s-n.s,2)+Math.pow(e.v-n.v,2))}},{key:"rgbDistance",value:function(e,n){}}]),e}(),s=["#000000","#808080","#c0c0c0","#ffffff","#0000ff","#000080","#008080","#008000","#00ff00","#00ffff","#ffff00","#ff0000","#ff00ff","#808000","#800080","#800000"],i=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?s:arguments[0];n.classCallCheck(this,t),this.baseColors=e.map(function(e){return new a(e)})}return n.createClass(t,[{key:"classify",value:function(n){if(Array.isArray(n))return null;var t=this.baseColors,r=new a(n).hsv,s=[];return t.forEach(function(e){s.push({distance:a.hsvDistance(e.hsv,r),color:e.original})}),e(s,"distance").color}}]),t}();return i.base16Colors=s,i});