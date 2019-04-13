import {
  forwardRef,
  useReducer,
  useRef,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  useState,
} from 'react'

/**
 * > initialize when component first render
 *
 * @param callback Function to run
 */
export function onInit (callback) {
  return useState(callback)
}

/**
 * > Similar to componentDidMount, first time creation
 *
 * @param callback Function to run
 * @param sync Boolean whether to run after layout or deferred after paint
 */
export function onDidMount (callback, sync) {
  sync ? useLayoutEffect(callback, []) : useEffect(callback, [])
}

/**
 * > Callback after each render(), first time and later
 *
 * @param callback Function to run
 * @param sync Boolean whether to run after layout or deferred after paint
 */
export function onDidRender (callback, sync) {
  sync ? useLayoutEffect(callback) : useEffect(callback)
}

/**
 * > Similar to componentWillUnmount, before DOM removed
 *
 * @param callback Function to run
 * @param sync Boolean whether to run after layout or deferred after paint
 */
export function onWillUnmount (callback, sync) {
  sync ? useLayoutEffect(() => callback, []) : useEffect(() => callback, [])
}

/**
 * > Similar to componentDidUpdate, skip run for first time render
 *
 * @param callback Function to run
 * @param sync Boolean whether to run after layout or deferred after paint
 */
export function onDidUpdate (callback, sync) {
  const renderRef = useRef()
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
 * @returns Array [updateCount: number, forceUpdate: function]
 */
export function useUpdate () {
  return useReducer(x => x + 1, 0)
}

/**
 * > Like setTimeout, but auto destroyed when re-render
 *
 * @param callback Function to run
 * @param delay Number|null|undefined seconds to delay, null to stop
 * @returns React.Ref the ref to setTimeout id
 */
export function useTimeout (callback, delay) {
  return useTick(setTimeout, clearTimeout, callback, delay)
}

/**
 * > Like setInterval, but auto destroyed when re-render
 *
 * @param callback Function to run
 * @param delay Number|null|undefined seconds to delay, null to stop
 * @returns React.Ref the ref to setInterval id
 */
export function useInterval (callback, delay) {
  return useTick(setInterval, clearInterval, callback, delay)
}

/**
 * > Tick like functions helper method, auto destroyed when re-render
 *
 * @param tickFn Function to run like setTimeout
 * @param clearTickFn Function to run like clearTimeout
 * @param callback Function to run
 * @param delay Number|null|undefined seconds to delay, null to stop
 * @returns React.Ref the ref to setInterval id
 */
export function useTick (tickFn, clearTickFn, callback, delay) {
  const savedId = useRef()
  const savedCallback = useRef()

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
      function tick () {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = tickFn(tick, delay)
        savedId.current = id
        return () => clearTickFn(savedId.current)
      }
      return
    },
    [delay]
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
 * @param component exposeFunction -> React.Component the component to return
 * @returns React.Component
 */
export function exposeRef (component) {
  const expose = (ref, fn, deps) => {
    useImperativeHandle(ref, fn, deps)
  }
  return forwardRef(component(expose))
}
