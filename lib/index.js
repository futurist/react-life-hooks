"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var shallowEqual_1 = require("fbjs/lib/shallowEqual");
var updateReducer = function (x) { return x + 1; };
/**
 * > initialize when component first render
 *
 * @param callback {Function} The callback only run once when component initialize
 * @returns {any} The value returned will be the return value of `useMemo` (keep same during each render)
 */
function onInit(callback) {
    return react_1.useMemo(callback, []);
}
exports.onInit = onInit;
/**
 * > Similar to componentDidMount, first time creation
 *
 * @param callback {Function} to run for component first time creation
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
function onDidMount(callback, sync) {
    sync ? react_1.useLayoutEffect(callback, []) : react_1.useEffect(callback, []);
}
exports.onDidMount = onDidMount;
/**
 * > Callback after each render(), first time and later
 *
 * @param callback {Function} to run after each render()
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
function onDidRender(callback, sync) {
    sync ? react_1.useLayoutEffect(callback) : react_1.useEffect(callback);
}
exports.onDidRender = onDidRender;
/**
 * > Similar to componentWillUnmount, before DOM removed
 *
 * @param callback {Function} to run before component will unmount
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
function onWillUnmount(callback, sync) {
    sync ? react_1.useLayoutEffect(callback, []) : react_1.useEffect(callback, []);
}
exports.onWillUnmount = onWillUnmount;
/**
 * > Similar to componentDidUpdate, skip run for first time render
 *
 * @param callback {Function} to run after component rendered
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
function onDidUpdate(callback, sync) {
    var renderRef = react_1.useRef(false);
    function update() {
        if (renderRef.current === true) {
            callback();
        }
        else {
            renderRef.current = true;
        }
    }
    sync ? react_1.useLayoutEffect(update) : react_1.useEffect(update);
}
exports.onDidUpdate = onDidUpdate;
/**
 * > Per useReducer/useState return value
 *
 * forceUpdate is similar to this.forceUpdate in Class Component
 *
 * @returns {Function} The forceUpdate function to re-render component
 */
function useUpdate() {
    return react_1.useReducer(updateReducer, 0)[1];
}
exports.useUpdate = useUpdate;
/**
 * > A component life time version of useState, the state never stale and safe to use
 *
 * @param initialState {object} The initial state object
 * @returns {object} [state, setState] The state/setState never stale
 */
function useLifeState(initialState) {
    if (initialState === void 0) { initialState = {}; }
    var _a = react_1.useState(initialState), state = _a[0], setState = _a[1];
    var stateRef = react_1.useMemo(function () { return state; }, []);
    if (typeof stateRef !== 'object') {
        throw 'initialState must be/return an object';
    }
    var setStateRef = react_1.useCallback(function (patch) {
        if (patch === void 0) { patch = {}; }
        if (typeof patch === 'function') {
            patch = patch(stateRef);
        }
        setState(__assign({}, stateRef, patch));
    }, []);
    return [
        Object.assign(stateRef, state),
        setStateRef,
    ];
}
exports.useLifeState = useLifeState;
/**
 * > A component life time version of useReducer, the state never stale and safe to sue
 *
 * @param reducer {Function} The reducer function
 * @param initialState {object} The initial state object
 * @returns {object} [state, dispatch] The state/dispatch never stale
 */
function useLifeReducer(reducer, initialState) {
    if (initialState === void 0) { initialState = {}; }
    var stateRef = react_1.useMemo((typeof initialState === 'function' ? initialState : function () { return initialState; }), []);
    if (typeof stateRef !== 'object') {
        throw 'initialState must be an object';
    }
    var _a = react_1.useReducer(function (stateRef, action) {
        var value = reducer(stateRef, action);
        return __assign({}, stateRef, value);
    }, stateRef), state = _a[0], dispatch = _a[1];
    return [
        Object.assign(stateRef, state),
        dispatch
    ];
}
exports.useLifeReducer = useLifeReducer;
/**
 * > Like setTimeout, but auto destroyed when re-render
 *
 * @param callback {Function} run when onTimeout
 * @param delay {Number|null|undefined} seconds to delay, null to stop
 * @returns {React.RefObject} the useRef object to setTimeout id
 */
function useTimeout(callback, delay) {
    return useTick(setTimeout, clearTimeout, callback, delay);
}
exports.useTimeout = useTimeout;
/**
 * > Like setInterval, but auto destroyed when re-render
 *
 * @param callback {Function} run when onInterval
 * @param delay {Number|null|undefined} seconds to delay, null to stop
 * @returns {React.RefObject} the ref to setInterval id
 */
function useInterval(callback, delay) {
    return useTick(setInterval, clearInterval, callback, delay);
}
exports.useInterval = useInterval;
/**
 * > Tick like functions helper method, auto destroyed when re-render
 *
 * @param tickFn {Function} e.g. setTimeout, setInterval, requestIdleCallback, request​Animation​Frame
 * @param clearTickFn {Function} e.g. clearTimeout, clearInterval, cancel​Idle​Callback, cancel​Animation​Frame
 * @param callback {Function} run when onTick
 * @param options {Number|null|undefined} options to pass with callback, null to stop
 * @returns {React.RefObject} the ref to setInterval id
 */
function useTick(tickFn, clearTickFn, callback, options) {
    var savedId = react_1.useRef();
    var savedCallback = react_1.useRef(function (arg) { });
    // Remember the latest callback.
    react_1.useEffect(function () {
        savedCallback.current = callback;
    }, [callback]);
    // Set up the tick.
    react_1.useEffect(function () {
        function tick(arg) {
            savedCallback.current(arg);
        }
        if (options !== null) {
            var id = tickFn(tick, options);
            savedId.current = id;
            return function () { return clearTickFn(savedId.current); };
        }
        return;
    }, [options]);
    return savedId;
}
exports.useTick = useTick;
/**
 * > Expose function component ref to parent
 *
 * Usage: `exposeRef(expose => (props, ref) => ReactNode)`
 *
 * In function component, should call `expose(ref, fn, deps)`
 *
 * The `expose` function just a wrapper of `useImperativeHandle`
 *
 * @param componentFactory {Function} `exposeFunction -> React.Component`, the componentFactory should return component
 * @returns {React.Component}
 */
function exposeRef(createComponent) {
    var expose = function (ref) { return function (fn, deps) {
        react_1.useImperativeHandle(ref, fn, deps);
    }; };
    function wrapComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return createComponent(expose(args[1])).apply(void 0, args);
    }
    return react_1.forwardRef(wrapComponent);
}
exports.exposeRef = exposeRef;
/**
 * > Check if value changed using shallowEqual check
 *
 * @param value {any} The value to check, with previous cached version
 * @param callback {Function} prevValue => any, Passed in previous value when current value changed
 */
function onChange(value, callback) {
    var ref = react_1.useRef({});
    var current = ref.current;
    ref.current = value;
    var isChanged = !shallowEqual_1.default(value, current);
    if (isChanged) {
        callback && callback(current);
    }
    return isChanged;
}
exports.onChange = onChange;
