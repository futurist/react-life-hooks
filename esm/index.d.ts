/**
 * > initialize when component first render
 *
 * @param callback Function to run
 */
export declare function onInit(callback: any): any;
/**
 * > Similar to componentDidMount, first time creation
 *
 * @param callback Function to run
 * @param sync Boolean whether to run after layout or deferred after paint
 */
export declare function onDidMount(callback: any, sync: any): void;
/**
 * > Callback after each render(), first time and later
 *
 * @param callback Function to run
 * @param sync Boolean whether to run after layout or deferred after paint
 */
export declare function onDidRender(callback: any, sync: any): void;
/**
 * > Similar to componentWillUnmount, before DOM removed
 *
 * @param callback Function to run
 * @param sync Boolean whether to run after layout or deferred after paint
 */
export declare function onWillUnmount(callback: any, sync: any): void;
/**
 * > Similar to componentDidUpdate, skip run for first time render
 *
 * @param callback Function to run
 * @param sync Boolean whether to run after layout or deferred after paint
 */
export declare function onDidUpdate(callback: any, sync: any): void;
/**
 * > Per useReducer/useState return value
 *
 * forceUpdate is similar to this.forceUpdate in Class Component
 *
 * @returns Array [updateCount: number, forceUpdate: function]
 */
export declare function useUpdate(): any;
/**
 * > Like setTimeout, but auto destroyed when re-render
 *
 * @param callback Function to run
 * @param delay Number|null|undefined seconds to delay, null to stop
 * @returns React.Ref the ref to setTimeout id
 */
export declare function useTimeout(callback: any, delay: any): any;
/**
 * > Like setInterval, but auto destroyed when re-render
 *
 * @param callback Function to run
 * @param delay Number|null|undefined seconds to delay, null to stop
 * @returns React.Ref the ref to setInterval id
 */
export declare function useInterval(callback: any, delay: any): any;
/**
 * > Tick like functions helper method, auto destroyed when re-render
 *
 * @param tickFn Function to run like setTimeout
 * @param clearTickFn Function to run like clearTimeout
 * @param callback Function to run
 * @param delay Number|null|undefined seconds to delay, null to stop
 * @returns React.Ref the ref to setInterval id
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
 * @param component exposeFunction -> React.Component the component to return
 * @returns React.Component
 */
export declare function exposeRef(component: any): any;
