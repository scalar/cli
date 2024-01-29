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
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_virtual/_rollupPluginBabelHelpers.js');
var virtualCore = require('@tanstack/virtual-core');
var vue = require('vue');

function useVirtualizerBase(options) {
  var virtualizer = new virtualCore.Virtualizer(vue.unref(options));
  var state = vue.shallowRef(virtualizer);
  var cleanup = virtualizer._didMount();
  vue.watch(function () {
    return vue.unref(options).getScrollElement();
  }, function (el) {
    if (el) {
      virtualizer._willUpdate();
    }
  }, {
    immediate: true
  });
  vue.watch(function () {
    return vue.unref(options);
  }, function (options) {
    virtualizer.setOptions(_rollupPluginBabelHelpers["extends"]({}, options, {
      onChange: function onChange(instance, sync) {
        vue.triggerRef(state);
        options.onChange == null || options.onChange(instance, sync);
      }
    }));
    virtualizer._willUpdate();
    vue.triggerRef(state);
  }, {
    immediate: true
  });
  vue.onScopeDispose(cleanup);
  return state;
}
function useVirtualizer(options) {
  return useVirtualizerBase(vue.computed(function () {
    return _rollupPluginBabelHelpers["extends"]({
      observeElementRect: virtualCore.observeElementRect,
      observeElementOffset: virtualCore.observeElementOffset,
      scrollToFn: virtualCore.elementScroll
    }, vue.unref(options));
  }));
}
function useWindowVirtualizer(options) {
  return useVirtualizerBase(vue.computed(function () {
    return _rollupPluginBabelHelpers["extends"]({
      getScrollElement: function getScrollElement() {
        return typeof document !== 'undefined' ? window : null;
      },
      observeElementRect: virtualCore.observeWindowRect,
      observeElementOffset: virtualCore.observeWindowOffset,
      scrollToFn: virtualCore.windowScroll,
      initialOffset: typeof document !== 'undefined' ? window.scrollY : undefined
    }, vue.unref(options));
  }));
}

exports.useVirtualizer = useVirtualizer;
exports.useWindowVirtualizer = useWindowVirtualizer;
Object.keys(virtualCore).forEach(function (k) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return virtualCore[k]; }
  });
});
//# sourceMappingURL=index.js.map
