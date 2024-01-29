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
import { extends as _extends } from './_virtual/_rollupPluginBabelHelpers.mjs';
import { observeElementRect, observeElementOffset, elementScroll, observeWindowRect, observeWindowOffset, windowScroll, Virtualizer } from '@tanstack/virtual-core';
export * from '@tanstack/virtual-core';
import { computed, unref, shallowRef, watch, triggerRef, onScopeDispose } from 'vue';

function useVirtualizerBase(options) {
  var virtualizer = new Virtualizer(unref(options));
  var state = shallowRef(virtualizer);
  var cleanup = virtualizer._didMount();
  watch(function () {
    return unref(options).getScrollElement();
  }, function (el) {
    if (el) {
      virtualizer._willUpdate();
    }
  }, {
    immediate: true
  });
  watch(function () {
    return unref(options);
  }, function (options) {
    virtualizer.setOptions(_extends({}, options, {
      onChange: function onChange(instance, sync) {
        triggerRef(state);
        options.onChange == null || options.onChange(instance, sync);
      }
    }));
    virtualizer._willUpdate();
    triggerRef(state);
  }, {
    immediate: true
  });
  onScopeDispose(cleanup);
  return state;
}
function useVirtualizer(options) {
  return useVirtualizerBase(computed(function () {
    return _extends({
      observeElementRect: observeElementRect,
      observeElementOffset: observeElementOffset,
      scrollToFn: elementScroll
    }, unref(options));
  }));
}
function useWindowVirtualizer(options) {
  return useVirtualizerBase(computed(function () {
    return _extends({
      getScrollElement: function getScrollElement() {
        return typeof document !== 'undefined' ? window : null;
      },
      observeElementRect: observeWindowRect,
      observeElementOffset: observeWindowOffset,
      scrollToFn: windowScroll,
      initialOffset: typeof document !== 'undefined' ? window.scrollY : undefined
    }, unref(options));
  }));
}

export { useVirtualizer, useWindowVirtualizer };
//# sourceMappingURL=index.mjs.map
