/**
 * > initialize when component first render
 *
 * @param callback {Function} The callback only run once when component initialize
 * @returns {Function} The forceUpdate function to re-render component
 */
export declare function onInit(callback: any): any;
/**
 * > Similar to componentDidMount, first time creation
 *
 * @param callback {Function} to run for component first time creation
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
export declare function onDidMount(callback: any, sync: any): void;
/**
 * > Callback after each render(), first time and later
 *
 * @param callback {Function} to run after each render()
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
export declare function onDidRender(callback: any, sync: any): void;
/**
 * > Similar to componentWillUnmount, before DOM removed
 *
 * @param callback {Function} to run before component will unmount
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
export declare function onWillUnmount(callback: any, sync: any): void;
/**
 * > Similar to componentDidUpdate, skip run for first time render
 *
 * @param callback {Function} to run after component rendered
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
export declare function onDidUpdate(callback: any, sync: any): void;
/**
 * > Per useReducer/useState return value
 *
 * forceUpdate is similar to this.forceUpdate in Class Component
 *
 * @returns {Function} The forceUpdate function to re-render component
 */
export declare function useUpdate(): any;
/**
 * > A component life time version of useState, the state never stale and safe to use
 *
 * @param initialState {object} The initial state object
 * @returns {object} {state getter, setState} The .state getter never stale
 */
export declare function useLifeState(initialState?: {}): {
    readonly state: any;
    setState: (patch: {} | undefined, callback: any) => void;
};
/**
 * > A component life time version of useReducer, the state never stale and safe to sue
 *
 * @param reducer {Function} The reducer function
 * @param initialState {object} The initial state object
 * @returns {object} {state getter, dispatch} The .state getter never stale
 */
export declare function useLifeReducer(reducer: any, initialState?: {}): {
    readonly state: any;
    dispatch: any;
};
/**
 * > Like setTimeout, but auto destroyed when re-render
 *
 * @param callback {Function} run when onTimeout
 * @param delay {Number|null|undefined} seconds to delay, null to stop
 * @returns {React.RefObject} the useRef object to setTimeout id
 */
export declare function useTimeout(callback: any, delay: any): any;
/**
 * > Like setInterval, but auto destroyed when re-render
 *
 * @param callback {Function} run when onInterval
 * @param delay {Number|null|undefined} seconds to delay, null to stop
 * @returns {React.RefObject} the ref to setInterval id
 */
export declare function useInterval(callback: any, delay: any): any;
/**
 * > Tick like functions helper method, auto destroyed when re-render
 *
 * @param tickFn {Function} to run like setTimeout
 * @param clearTickFn {Function} to run like clearTimeout
 * @param callback {Function} run when onTick
 * @param delay {Number|null|undefined} seconds to delay, null to stop
 * @returns {React.RefObject} the ref to setInterval id
 */
export declare function useTick(tickFn: any, clearTickFn: any, callback: any, delay: any): any;
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
export declare function exposeRef(componentFactory: any): any;
