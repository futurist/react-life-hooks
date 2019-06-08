import {
  forwardRef,
  useReducer,
  useRef,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  useState,
  useMemo,
  useCallback,
  RefForwardingComponent,
  Ref,
  DependencyList,
  ForwardRefExoticComponent,
  RefAttributes,
  EffectCallback,
  Reducer,
  Dispatch,
} from 'react'
import shallowEqual from 'fbjs/lib/shallowEqual'

type AnyObject = {[key:string]: any};

const updateReducer = x => x + 1;

/**
 * > initialize when component first render
 *
 * @param callback {Function} The callback only run once when component initialize
 * @returns {any} The value returned will be the return value of `useMemo` (keep same during each render)
 */
export function onInit (callback: EffectCallback): any {
  return useMemo(callback, [])
}

/**
 * > Similar to componentDidMount, first time creation
 *
 * @param callback {Function} to run for component first time creation
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
export function onDidMount (callback: EffectCallback, sync?: boolean) {
  sync ? useLayoutEffect(callback, []) : useEffect(callback, [])
}

/**
 * > Callback after each render(), first time and later
 *
 * @param callback {Function} to run after each render()
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
export function onDidRender (callback: EffectCallback, sync?: boolean) {
  sync ? useLayoutEffect(callback) : useEffect(callback)
}

/**
 * > Similar to componentWillUnmount, before DOM removed
 *
 * @param callback {Function} to run before component will unmount
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
export function onWillUnmount (callback: () => void | undefined, sync?: boolean) {
  sync ? useLayoutEffect(() => callback, []) : useEffect(() => callback, [])
}

/**
 * > Similar to componentDidUpdate, skip run for first time render
 *
 * @param callback {Function} to run after component rendered
 * @param sync {Boolean} whether to run after layout or deferred after paint
 * @returns {void}
 */
export function onDidUpdate (callback: EffectCallback, sync?: boolean) {
  const renderRef = useRef(false)
  function update () {
    if (renderRef.current === true) {
      callback()
    } else {
      renderRef.current = true
    }
  }
  sync ? useLayoutEffect(update) : useEffect(update)
}

/**
 * > Per useReducer/useState return value
 *
 * forceUpdate is similar to this.forceUpdate in Class Component
 *
 * @returns {Function} The forceUpdate function to re-render component
 */
export function useUpdate (): Dispatch<any> {
  return useReducer(updateReducer, 0)[1]
}

/**
 * > A component life time version of useState, the state never stale and safe to use
 *
 * @param initialState {object} The initial state object
 * @returns {object} [state, setState] The state/setState never stale
 */
export function useLifeState (initialState: any = {}): [any, Function] {
  const [state, setState] = useState(initialState)
  const stateRef = useMemo(()=>state, [])
  if(typeof stateRef !== 'object') {
    throw 'initialState must be/return an object'
  }
  const setStateRef = useCallback((patch = {}) => {
    if(typeof patch==='function') {
      patch = patch(stateRef)
    }
    setState({...stateRef, ...patch})
  }, [])
  return [
    Object.assign(stateRef, state),
    setStateRef,
  ]
}

type FunctionOrObject = (() => AnyObject) | AnyObject;

/**
 * > A component life time version of useReducer, the state never stale and safe to sue
 *
 * @param reducer {Function} The reducer function
 * @param initialState {object} The initial state object
 * @returns {object} [state, dispatch] The state/dispatch never stale
 */
export function useLifeReducer (reducer: Reducer<AnyObject, any>, initialState:FunctionOrObject = ({} as AnyObject)): [any, Dispatch<any>] {
  const stateRef = useMemo(
    (typeof initialState === 'function' ? initialState : ()=>initialState) as ()=>{},
    []
  )
  if(typeof stateRef !== 'object') {
    throw 'initialState must be an object'
  }
  const [state, dispatch] = useReducer((stateRef, action)=>{
    const value = reducer(stateRef, action)
    return {...stateRef, ...value}
  }, stateRef)
  return [
    Object.assign(stateRef, state),
    dispatch
  ]
}

/**
 * > Like setTimeout, but auto destroyed when re-render
 *
 * @param callback {Function} run when onTimeout
 * @param delay {Number|null|undefined} seconds to delay, null to stop
 * @returns {React.RefObject} the useRef object to setTimeout id
 */
export function useTimeout (callback, delay?) {
  return useTick(setTimeout, clearTimeout, callback, delay)
}

/**
 * > Like setInterval, but auto destroyed when re-render
 *
 * @param callback {Function} run when onInterval
 * @param delay {Number|null|undefined} seconds to delay, null to stop
 * @returns {React.RefObject} the ref to setInterval id
 */
export function useInterval (callback, delay?) {
  return useTick(setInterval, clearInterval, callback, delay)
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
export function useTick (tickFn, clearTickFn, callback, options?) {
  const savedId = useRef()
  const savedCallback = useRef((arg:any)=>{})

  // Remember the latest callback.
  useEffect(
    () => {
      savedCallback.current = callback
    },
    [callback]
  )

  // Set up the tick.
  useEffect(
    () => {
      function tick (arg) {
        savedCallback.current(arg)
      }
      if (options !== null) {
        let id = tickFn(tick, options)
        savedId.current = id
        return () => clearTickFn(savedId.current)
      }
      return
    },
    [options]
  )
  return savedId
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
export function exposeRef (
  createComponent: (ref: Ref<any>) => (...args: Parameters<RefForwardingComponent<any>>) => ReturnType<RefForwardingComponent<any>>
): ReturnType<typeof forwardRef> {
  const expose = (
    ref: Ref<any>
  ) => (
    fn: () => {}, deps?: DependencyList
  ) => {
    useImperativeHandle(ref, fn, deps)
  }
  function wrapComponent(
    ...args: Parameters<RefForwardingComponent<any>>
  ): ReturnType<RefForwardingComponent<any>> {
    return createComponent(expose(args[1]))(...args)
  }
  return forwardRef(wrapComponent)
}

/**
 * > Check if value changed using shallowEqual check
 *
 * @param value {any} The value to check, with previous cached version
 * @param callback {Function} prevValue => any, Passed in previous value when current value changed
 */
export function onChange (value: any, callback: Function) {
  const ref = useRef({})
  const {current} = ref
  ref.current = value
  const isChanged = !shallowEqual(value, current)
  if(isChanged) {
    callback && callback(current)
  }
  return isChanged
}
