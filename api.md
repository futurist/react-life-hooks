# react-hooklib
[![view on npm](https://img.shields.io/npm/v/react-hooklib.svg)](https://www.npmjs.org/package/react-hooklib)

## Functions

<dl>
<dt><a href="#onInit">onInit(callback)</a> ⇒ <code>function</code></dt>
<dd><blockquote>
<p>initialize when component first render</p>
</blockquote>
</dd>
<dt><a href="#onDidMount">onDidMount(callback, sync)</a> ⇒ <code>void</code></dt>
<dd><blockquote>
<p>Similar to componentDidMount, first time creation</p>
</blockquote>
</dd>
<dt><a href="#onDidRender">onDidRender(callback, sync)</a> ⇒ <code>void</code></dt>
<dd><blockquote>
<p>Callback after each render(), first time and later</p>
</blockquote>
</dd>
<dt><a href="#onWillUnmount">onWillUnmount(callback, sync)</a> ⇒ <code>void</code></dt>
<dd><blockquote>
<p>Similar to componentWillUnmount, before DOM removed</p>
</blockquote>
</dd>
<dt><a href="#onDidUpdate">onDidUpdate(callback, sync)</a> ⇒ <code>void</code></dt>
<dd><blockquote>
<p>Similar to componentDidUpdate, skip run for first time render</p>
</blockquote>
</dd>
<dt><a href="#useUpdate">useUpdate()</a> ⇒ <code>function</code></dt>
<dd><blockquote>
<p>Per useReducer/useState return value</p>
</blockquote>
<p>forceUpdate is similar to this.forceUpdate in Class Component</p>
</dd>
<dt><a href="#useLifeState">useLifeState(initialState)</a> ⇒ <code>object</code></dt>
<dd><blockquote>
<p>A component life time version of useState, the state never stale and safe to use</p>
</blockquote>
</dd>
<dt><a href="#useLifeReducer">useLifeReducer(reducer, initialState)</a> ⇒ <code>object</code></dt>
<dd><blockquote>
<p>A component life time version of useReducer, the state never stale and safe to sue</p>
</blockquote>
</dd>
<dt><a href="#useTimeout">useTimeout(callback, delay)</a> ⇒ <code>React.RefObject</code></dt>
<dd><blockquote>
<p>Like setTimeout, but auto destroyed when re-render</p>
</blockquote>
</dd>
<dt><a href="#useInterval">useInterval(callback, delay)</a> ⇒ <code>React.RefObject</code></dt>
<dd><blockquote>
<p>Like setInterval, but auto destroyed when re-render</p>
</blockquote>
</dd>
<dt><a href="#useTick">useTick(tickFn, clearTickFn, callback, delay)</a> ⇒ <code>React.RefObject</code></dt>
<dd><blockquote>
<p>Tick like functions helper method, auto destroyed when re-render</p>
</blockquote>
</dd>
<dt><a href="#exposeRef">exposeRef(componentFactory)</a> ⇒ <code>React.Component</code></dt>
<dd><blockquote>
<p>Expose function component ref to parent</p>
</blockquote>
<p>Usage: <code>exposeRef(expose =&gt; (props, ref) =&gt; ReactNode)</code></p>
<p>In function component, should call <code>expose(ref, fn, deps)</code></p>
<p>The <code>expose</code> function just a wrapper of <code>useImperativeHandle</code></p>
</dd>
</dl>

<a name="onInit"></a>

## onInit(callback) ⇒ <code>function</code>
> initialize when component first render

**Kind**: global function  
**Returns**: <code>function</code> - The forceUpdate function to re-render component  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The callback only run once when component initialize |

<a name="onDidMount"></a>

## onDidMount(callback, sync) ⇒ <code>void</code>
> Similar to componentDidMount, first time creation

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | to run for component first time creation |
| sync | <code>Boolean</code> | whether to run after layout or deferred after paint |

<a name="onDidRender"></a>

## onDidRender(callback, sync) ⇒ <code>void</code>
> Callback after each render(), first time and later

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | to run after each render() |
| sync | <code>Boolean</code> | whether to run after layout or deferred after paint |

<a name="onWillUnmount"></a>

## onWillUnmount(callback, sync) ⇒ <code>void</code>
> Similar to componentWillUnmount, before DOM removed

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | to run before component will unmount |
| sync | <code>Boolean</code> | whether to run after layout or deferred after paint |

<a name="onDidUpdate"></a>

## onDidUpdate(callback, sync) ⇒ <code>void</code>
> Similar to componentDidUpdate, skip run for first time render

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | to run after component rendered |
| sync | <code>Boolean</code> | whether to run after layout or deferred after paint |

<a name="useUpdate"></a>

## useUpdate() ⇒ <code>function</code>
> Per useReducer/useState return value

forceUpdate is similar to this.forceUpdate in Class Component

**Kind**: global function  
**Returns**: <code>function</code> - The forceUpdate function to re-render component  
<a name="useLifeState"></a>

## useLifeState(initialState) ⇒ <code>object</code>
> A component life time version of useState, the state never stale and safe to use

**Kind**: global function  
**Returns**: <code>object</code> - {state getter, setState} The .state getter never stale  

| Param | Type | Description |
| --- | --- | --- |
| initialState | <code>object</code> | The initial state object |

<a name="useLifeReducer"></a>

## useLifeReducer(reducer, initialState) ⇒ <code>object</code>
> A component life time version of useReducer, the state never stale and safe to sue

**Kind**: global function  
**Returns**: <code>object</code> - {state getter, dispatch} The .state getter never stale  

| Param | Type | Description |
| --- | --- | --- |
| reducer | <code>function</code> | The reducer function |
| initialState | <code>object</code> | The initial state object |

<a name="useTimeout"></a>

## useTimeout(callback, delay) ⇒ <code>React.RefObject</code>
> Like setTimeout, but auto destroyed when re-render

**Kind**: global function  
**Returns**: <code>React.RefObject</code> - the useRef object to setTimeout id  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | run when onTimeout |
| delay | <code>Number</code> \| <code>null</code> \| <code>undefined</code> | seconds to delay, null to stop |

<a name="useInterval"></a>

## useInterval(callback, delay) ⇒ <code>React.RefObject</code>
> Like setInterval, but auto destroyed when re-render

**Kind**: global function  
**Returns**: <code>React.RefObject</code> - the ref to setInterval id  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | run when onInterval |
| delay | <code>Number</code> \| <code>null</code> \| <code>undefined</code> | seconds to delay, null to stop |

<a name="useTick"></a>

## useTick(tickFn, clearTickFn, callback, delay) ⇒ <code>React.RefObject</code>
> Tick like functions helper method, auto destroyed when re-render

**Kind**: global function  
**Returns**: <code>React.RefObject</code> - the ref to setInterval id  

| Param | Type | Description |
| --- | --- | --- |
| tickFn | <code>function</code> | to run like setTimeout |
| clearTickFn | <code>function</code> | to run like clearTimeout |
| callback | <code>function</code> | run when onTick |
| delay | <code>Number</code> \| <code>null</code> \| <code>undefined</code> | seconds to delay, null to stop |

<a name="exposeRef"></a>

## exposeRef(componentFactory) ⇒ <code>React.Component</code>
> Expose function component ref to parent

Usage: `exposeRef(expose => (props, ref) => ReactNode)`

In function component, should call `expose(ref, fn, deps)`

The `expose` function just a wrapper of `useImperativeHandle`

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| componentFactory | <code>function</code> | `exposeFunction -> React.Component`, the componentFactory should return component |


* * *

&copy; 2019 James Yang
