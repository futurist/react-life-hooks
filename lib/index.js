"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * > initialize when component first render
 *
 * @param callback Function to run
 */
function onInit(callback) {
    return react_1.useState(callback);
}
exports.onInit = onInit;
/**
 * > Similar to componentDidMount, first time creation
 *
 * @param callback Function to run
 * @param sync Boolean whether to run after layout or deferred after paint
 */
function onDidMount(callback, sync) {
    sync ? react_1.useLayoutEffect(callback, []) : react_1.useEffect(callback, []);
}
exports.onDidMount = onDidMount;
/**
 * > Callback after each render(), first time and later
 *
 * @param callback Function to run
 * @param sync Boolean whether to run after layout or deferred after paint
 */
function onDidRender(callback, sync) {
    sync ? react_1.useLayoutEffect(callback) : react_1.useEffect(callback);
}
exports.onDidRender = onDidRender;
/**
 * > Similar to componentWillUnmount, before DOM removed
 *
 * @param callback Function to run
 * @param sync Boolean whether to run after layout or deferred after paint
 */
function onWillUnmount(callback, sync) {
    sync ? react_1.useLayoutEffect(function () { return callback; }, []) : react_1.useEffect(function () { return callback; }, []);
}
exports.onWillUnmount = onWillUnmount;
/**
 * > Similar to componentDidUpdate, skip run for first time render
 *
 * @param callback Function to run
 * @param sync Boolean whether to run after layout or deferred after paint
 */
function onDidUpdate(callback, sync) {
    var renderRef = react_1.useRef();
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
 * @returns Array [updateCount: number, forceUpdate: function]
 */
function useUpdate() {
    return react_1.useReducer(function (x) { return x + 1; }, 0);
}
exports.useUpdate = useUpdate;
/**
 * > Like setTimeout, but auto destroyed when re-render
 *
 * @param callback Function to run
 * @param delay Number|null|undefined seconds to delay, null to stop
 * @returns React.Ref the ref to setTimeout id
 */
function useTimeout(callback, delay) {
    return useTick(setTimeout, clearTimeout, callback, delay);
}
exports.useTimeout = useTimeout;
/**
 * > Like setInterval, but auto destroyed when re-render
 *
 * @param callback Function to run
 * @param delay Number|null|undefined seconds to delay, null to stop
 * @returns React.Ref the ref to setInterval id
 */
function useInterval(callback, delay) {
    return useTick(setInterval, clearInterval, callback, delay);
}
exports.useInterval = useInterval;
/**
 * > Tick like functions helper method, auto destroyed when re-render
 *
 * @param tickFn Function to run like setTimeout
 * @param clearTickFn Function to run like clearTimeout
 * @param callback Function to run
 * @param delay Number|null|undefined seconds to delay, null to stop
 * @returns React.Ref the ref to setInterval id
 */
function useTick(tickFn, clearTickFn, callback, delay) {
    var savedId = react_1.useRef();
    var savedCallback = react_1.useRef();
    // Remember the latest callback.
    react_1.useEffect(function () {
        savedCallback.current = callback;
    }, [callback]);
    // Set up the tick.
    react_1.useEffect(function () {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            var id = tickFn(tick, delay);
            savedId.current = id;
            return function () { return clearTickFn(savedId.current); };
        }
        return;
    }, [delay]);
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
 * @param component exposeFunction -> React.Component the component to return
 * @returns React.Component
 */
function exposeRef(component) {
    var expose = function (ref, fn, deps) {
        react_1.useImperativeHandle(ref, fn, deps);
    };
    return react_1.forwardRef(component(expose));
}
exports.exposeRef = exposeRef;
