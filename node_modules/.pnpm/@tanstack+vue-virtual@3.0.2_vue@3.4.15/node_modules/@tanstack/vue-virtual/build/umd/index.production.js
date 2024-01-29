/**
 * vue-virtual
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("@tanstack/virtual-core"),require("vue")):"function"==typeof define&&define.amd?define(["exports","@tanstack/virtual-core","vue"],n):n((e="undefined"!=typeof globalThis?globalThis:e||self).VueVirtual={},e.VirtualCore,e.Vue)}(this,(function(e,n,t){"use strict";function r(){return r=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},r.apply(this,arguments)}function o(e){var o=new n.Virtualizer(t.unref(e)),i=t.shallowRef(o),u=o._didMount();return t.watch((function(){return t.unref(e).getScrollElement()}),(function(e){e&&o._willUpdate()}),{immediate:!0}),t.watch((function(){return t.unref(e)}),(function(e){o.setOptions(r({},e,{onChange:function(n,r){t.triggerRef(i),null==e.onChange||e.onChange(n,r)}})),o._willUpdate(),t.triggerRef(i)}),{immediate:!0}),t.onScopeDispose(u),i}e.useVirtualizer=function(e){return o(t.computed((function(){return r({observeElementRect:n.observeElementRect,observeElementOffset:n.observeElementOffset,scrollToFn:n.elementScroll},t.unref(e))})))},e.useWindowVirtualizer=function(e){return o(t.computed((function(){return r({getScrollElement:function(){return"undefined"!=typeof document?window:null},observeElementRect:n.observeWindowRect,observeElementOffset:n.observeWindowOffset,scrollToFn:n.windowScroll,initialOffset:"undefined"!=typeof document?window.scrollY:void 0},t.unref(e))})))},Object.keys(n).forEach((function(t){"default"===t||e.hasOwnProperty(t)||Object.defineProperty(e,t,{enumerable:!0,get:function(){return n[t]}})})),Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=index.production.js.map
