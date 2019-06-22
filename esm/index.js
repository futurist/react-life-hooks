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
import { forwardRef, useReducer, useRef, useEffect, useLayoutEffect, useImperativeHandle, useState, useMemo, useCallback, } from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';
var updateReducer = function (x) { return x + 1; };
/**
 * > initialize when component first render
 *
 * @param callback {Function} The callback only run once when component initialize
 * @returns {any} The value returned will be the return value of `useMemo` (keep same during each render)
 */
export function onInit(callback) {
    return useMemo(callback, []);
}
/**
 * > Similar to componentDidMount, first time creation
 *
 * @param callback {Function} to run for component first time creation
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
export function onDidMount(callback, sync) {
    sync ? useLayoutEffect(callback, []) : useEffect(callback, []);
}
/**
 * > Callback after each render(), first time and later
 *
 * @param callback {Function} to run after each render()
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
export function onDidRender(callback, sync) {
    sync ? useLayoutEffect(callback) : useEffect(callback);
}
/**
 * > Similar to componentWillUnmount, before DOM removed
 *
 * @param callback {Function} to run before component will unmount
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
export function onWillUnmount(callback, sync) {
    sync ? useLayoutEffect(function () { return callback; }, []) : useEffect(function () { return callback; }, []);
}
/**
 * > Similar to componentDidUpdate, skip run for first time render
 *
 * @param callback {Function} to run after component rendered
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
export function onDidUpdate(callback, sync) {
    var renderRef = useRef(false);
    function update() {
        if (renderRef.current === true) {
            callback();
        }
        else {
            renderRef.current = true;
        }
    }
    sync ? useLayoutEffect(update) : useEffect(update);
}
/**
 * > Return redraw function like this.forceUpdate in Class Component
 *
 * the redraw function keep same reference between render.
 *
 * @returns {Function} The forceUpdate function to re-render component
 */
export function useRedraw() {
    var dispatch = useReducer(updateReducer, 0)[1];
    var redraw = useCallback(function () { return dispatch(0); }, []);
    return redraw;
}
/**
 * > A component life time version of useState, the state never stale and safe to use
 *
 * @param initialState {object} The initial state object
 * @returns {object} [state, setState] The state/setState never stale
 */
export function useLifeState(initialState) {
    if (initialState === void 0) { initialState = {}; }
    var _a = useState(initialState), state = _a[0], setState = _a[1];
    var stateRef = useMemo(function () { return state; }, []);
    if (typeof stateRef !== 'object') {
        throw 'initialState must be/return an object';
    }
    var setStateRef = useCallback(function (patch) {
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
/**
 * > A component life time version of useReducer, the state never stale and safe to sue
 *
 * @param reducer {Function} The reducer function
 * @param initialState {object} The initial state object
 * @returns {object} [state, dispatch] The state/dispatch never stale
 */
export function useLifeReducer(reducer, initialState) {
    if (initialState === void 0) { initialState = {}; }
    var stateRef = useMemo((typeof initialState === 'function' ? initialState : function () { return initialState; }), []);
    if (typeof stateRef !== 'object') {
        throw 'initialState must be an object';
    }
    var _a = useReducer(function (stateRef, action) {
        var value = reducer(stateRef, action);
        return __assign({}, stateRef, value);
    }, stateRef), state = _a[0], dispatch = _a[1];
    return [
        Object.assign(stateRef, state),
        dispatch
    ];
}
/**
 * > Like setTimeout, but auto destroyed when re-render
 *
 * @param callback {Function} run when onTimeout
 * @param delay {Number|null|undefined} seconds to delay, null to stop
 * @returns {React.RefObject} the useRef object to setTimeout id
 */
export function useTimeout(callback, delay) {
    return useTick(setTimeout, clearTimeout, callback, delay);
}
/**
 * > Like setInterval, but auto destroyed when re-render
 *
 * @param callback {Function} run when onInterval
 * @param delay {Number|null|undefined} seconds to delay, null to stop
 * @returns {React.RefObject} the ref to setInterval id
 */
export function useInterval(callback, delay) {
    return useTick(setInterval, clearInterval, callback, delay);
}
/**
 * > Tick like functions helper method, auto destroyed when re-render
 *
 * @param tickFn {Function} e.g. setTimeout, setInterval, requestIdleCallback, request​Animation​Frame
 * @param clearTickFn {Function} e.g. clearTimeout, clearInterval, cancel​Idle​Callback, cancel​Animation​Frame
 * @param callback {Function} run when onTick
 * @param options {Number|null|undefined} options to pass with callback, null to stop
 * @returns {React.RefObject} the ref to setInterval id
 */
export function useTick(tickFn, clearTickFn, callback, options) {
    var savedId = useRef();
    var savedCallback = useRef(function (arg) { });
    // Remember the latest callback.
    useEffect(function () {
        savedCallback.current = callback;
    }, [callback]);
    // Set up the tick.
    useEffect(function () {
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
export function exposeRef(createComponent) {
    var expose = function (ref) { return function (fn, deps) {
        useImperativeHandle(ref, fn, deps);
    }; };
    function wrapComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return createComponent(expose(args[1])).apply(void 0, args);
    }
    return forwardRef(wrapComponent);
}
/**
 * > Check if value changed using shallowEqual check
 *
 * @param value {any} The value to check, with previous cached version
 * @param callback {Function} prevValue => any, Passed in previous value when current value changed
 */
export function onChange(value, callback) {
    var ref = useRef({});
    var disposer = useRef();
    var current = ref.current;
    ref.current = value;
    var isChanged = !shallowEqual(value, current);
    if (isChanged) {
        if (typeof disposer.current === 'function') {
            disposer.current();
        }
        disposer.current = callback && callback(current);
    }
    return isChanged;
}
