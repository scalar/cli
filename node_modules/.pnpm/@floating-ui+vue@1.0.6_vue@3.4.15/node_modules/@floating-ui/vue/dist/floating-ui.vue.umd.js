(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@floating-ui/dom'), require('vue-demi'), require('@floating-ui/utils/dom')) :
  typeof define === 'function' && define.amd ? define(['exports', '@floating-ui/dom', 'vue-demi', '@floating-ui/utils/dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FloatingUIVue = {}, global.FloatingUIDOM, global.VueDemi, global.FloatingUIUtilsDOM));
})(this, (function (exports, dom, vueDemi, dom$1) { 'use strict';

  function isComponentPublicInstance(target) {
    return target != null && typeof target === 'object' && '$el' in target;
  }
  function unwrapElement(target) {
    if (isComponentPublicInstance(target)) {
      const element = target.$el;
      return dom$1.isNode(element) && dom$1.getNodeName(element) === '#comment' ? null : element;
    }
    return target;
  }

  /**
   * Positions an inner element of the floating element such that it is centered to the reference element.
   * @param options The arrow options.
   * @see https://floating-ui.com/docs/arrow
   */
  function arrow(options) {
    return {
      name: 'arrow',
      options,
      fn(args) {
        const element = unwrapElement(vueDemi.unref(options.element));
        if (element == null) {
          return {};
        }
        return dom.arrow({
          element,
          padding: options.padding
        }).fn(args);
      }
    };
  }

  function getDPR(element) {
    if (typeof window === 'undefined') {
      return 1;
    }
    const win = element.ownerDocument.defaultView || window;
    return win.devicePixelRatio || 1;
  }

  function roundByDPR(element, value) {
    const dpr = getDPR(element);
    return Math.round(value * dpr) / dpr;
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element next to a reference element when it is given a certain CSS positioning strategy.
   * @param reference The reference template ref.
   * @param floating The floating template ref.
   * @param options The floating options.
   * @see https://floating-ui.com/docs/vue
   */
  function useFloating(reference, floating, options) {
    if (options === void 0) {
      options = {};
    }
    const whileElementsMountedOption = options.whileElementsMounted;
    const openOption = vueDemi.computed(() => {
      var _unref;
      return (_unref = vueDemi.unref(options.open)) != null ? _unref : true;
    });
    const middlewareOption = vueDemi.computed(() => vueDemi.unref(options.middleware));
    const placementOption = vueDemi.computed(() => {
      var _unref2;
      return (_unref2 = vueDemi.unref(options.placement)) != null ? _unref2 : 'bottom';
    });
    const strategyOption = vueDemi.computed(() => {
      var _unref3;
      return (_unref3 = vueDemi.unref(options.strategy)) != null ? _unref3 : 'absolute';
    });
    const transformOption = vueDemi.computed(() => {
      var _unref4;
      return (_unref4 = vueDemi.unref(options.transform)) != null ? _unref4 : true;
    });
    const referenceElement = vueDemi.computed(() => unwrapElement(reference.value));
    const floatingElement = vueDemi.computed(() => unwrapElement(floating.value));
    const x = vueDemi.ref(0);
    const y = vueDemi.ref(0);
    const strategy = vueDemi.ref(strategyOption.value);
    const placement = vueDemi.ref(placementOption.value);
    const middlewareData = vueDemi.shallowRef({});
    const isPositioned = vueDemi.ref(false);
    const floatingStyles = vueDemi.computed(() => {
      const initialStyles = {
        position: strategy.value,
        left: '0',
        top: '0'
      };
      if (!floatingElement.value) {
        return initialStyles;
      }
      const xVal = roundByDPR(floatingElement.value, x.value);
      const yVal = roundByDPR(floatingElement.value, y.value);
      if (transformOption.value) {
        return {
          ...initialStyles,
          transform: "translate(" + xVal + "px, " + yVal + "px)",
          ...(getDPR(floatingElement.value) >= 1.5 && {
            willChange: 'transform'
          })
        };
      }
      return {
        position: strategy.value,
        left: xVal + "px",
        top: yVal + "px"
      };
    });
    let whileElementsMountedCleanup;
    function update() {
      if (referenceElement.value == null || floatingElement.value == null) {
        return;
      }
      dom.computePosition(referenceElement.value, floatingElement.value, {
        middleware: middlewareOption.value,
        placement: placementOption.value,
        strategy: strategyOption.value
      }).then(position => {
        x.value = position.x;
        y.value = position.y;
        strategy.value = position.strategy;
        placement.value = position.placement;
        middlewareData.value = position.middlewareData;
        isPositioned.value = true;
      });
    }
    function cleanup() {
      if (typeof whileElementsMountedCleanup === 'function') {
        whileElementsMountedCleanup();
        whileElementsMountedCleanup = undefined;
      }
    }
    function attach() {
      cleanup();
      if (whileElementsMountedOption === undefined) {
        update();
        return;
      }
      if (referenceElement.value != null && floatingElement.value != null) {
        whileElementsMountedCleanup = whileElementsMountedOption(referenceElement.value, floatingElement.value, update);
        return;
      }
    }
    function reset() {
      if (!openOption.value) {
        isPositioned.value = false;
      }
    }
    vueDemi.watch([middlewareOption, placementOption, strategyOption], update, {
      flush: 'sync'
    });
    vueDemi.watch([referenceElement, floatingElement], attach, {
      flush: 'sync'
    });
    vueDemi.watch(openOption, reset, {
      flush: 'sync'
    });
    if (vueDemi.getCurrentScope()) {
      vueDemi.onScopeDispose(cleanup);
    }
    return {
      x: vueDemi.shallowReadonly(x),
      y: vueDemi.shallowReadonly(y),
      strategy: vueDemi.shallowReadonly(strategy),
      placement: vueDemi.shallowReadonly(placement),
      middlewareData: vueDemi.shallowReadonly(middlewareData),
      isPositioned: vueDemi.shallowReadonly(isPositioned),
      floatingStyles,
      update
    };
  }

  Object.defineProperty(exports, "autoPlacement", {
    enumerable: true,
    get: function () { return dom.autoPlacement; }
  });
  Object.defineProperty(exports, "autoUpdate", {
    enumerable: true,
    get: function () { return dom.autoUpdate; }
  });
  Object.defineProperty(exports, "computePosition", {
    enumerable: true,
    get: function () { return dom.computePosition; }
  });
  Object.defineProperty(exports, "detectOverflow", {
    enumerable: true,
    get: function () { return dom.detectOverflow; }
  });
  Object.defineProperty(exports, "flip", {
    enumerable: true,
    get: function () { return dom.flip; }
  });
  Object.defineProperty(exports, "getOverflowAncestors", {
    enumerable: true,
    get: function () { return dom.getOverflowAncestors; }
  });
  Object.defineProperty(exports, "hide", {
    enumerable: true,
    get: function () { return dom.hide; }
  });
  Object.defineProperty(exports, "inline", {
    enumerable: true,
    get: function () { return dom.inline; }
  });
  Object.defineProperty(exports, "limitShift", {
    enumerable: true,
    get: function () { return dom.limitShift; }
  });
  Object.defineProperty(exports, "offset", {
    enumerable: true,
    get: function () { return dom.offset; }
  });
  Object.defineProperty(exports, "platform", {
    enumerable: true,
    get: function () { return dom.platform; }
  });
  Object.defineProperty(exports, "shift", {
    enumerable: true,
    get: function () { return dom.shift; }
  });
  Object.defineProperty(exports, "size", {
    enumerable: true,
    get: function () { return dom.size; }
  });
  exports.arrow = arrow;
  exports.useFloating = useFloating;

}));
