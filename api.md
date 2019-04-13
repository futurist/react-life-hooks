# react-hooklib
[![view on npm](https://img.shields.io/npm/v/react-hooklib.svg)](https://www.npmjs.org/package/react-hooklib)

## Functions

<dl>
<dt><a href="#onInit">onInit(callback)</a></dt>
<dd><blockquote>
<p>initialize when component first render</p>
</blockquote>
</dd>
<dt><a href="#onDidMount">onDidMount(callback, sync)</a></dt>
<dd><blockquote>
<p>Similar to componentDidMount, first time creation</p>
</blockquote>
</dd>
<dt><a href="#onDidRender">onDidRender(callback, sync)</a></dt>
<dd><blockquote>
<p>Callback after each render(), first time and later</p>
</blockquote>
</dd>
<dt><a href="#onWillUnmount">onWillUnmount(callback, sync)</a></dt>
<dd><blockquote>
<p>Similar to componentWillUnmount, before DOM removed</p>
</blockquote>
</dd>
<dt><a href="#onDidUpdate">onDidUpdate(callback, sync)</a></dt>
<dd><blockquote>
<p>Similar to componentDidUpdate, skip run for first time render</p>
</blockquote>
</dd>
<dt><a href="#useUpdate">useUpdate()</a> ⇒</dt>
<dd><blockquote>
<p>Per useReducer/useState return value</p>
</blockquote>
<p>forceUpdate is similar to this.forceUpdate in Class Component</p>
</dd>
<dt><a href="#useTimeout">useTimeout(callback, delay)</a> ⇒</dt>
<dd><blockquote>
<p>Like setTimeout, but auto destroyed when re-render</p>
</blockquote>
</dd>
<dt><a href="#useInterval">useInterval(callback, delay)</a> ⇒</dt>
<dd><blockquote>
<p>Like setInterval, but auto destroyed when re-render</p>
</blockquote>
</dd>
<dt><a href="#useTick">useTick(tickFn, clearTickFn, callback, delay)</a> ⇒</dt>
<dd><blockquote>
<p>Tick like functions helper method, auto destroyed when re-render</p>
</blockquote>
</dd>
<dt><a href="#exposeRef">exposeRef(component)</a> ⇒</dt>
<dd><blockquote>
<p>Expose function component ref to parent</p>
</blockquote>
<p>Usage: <code>exposeRef(expose =&gt; (props, ref) =&gt; ReactNode)</code></p>
<p>In function component, should call <code>expose(ref, fn, deps)</code></p>
<p>The <code>expose</code> function just a wrapper of <code>useImperativeHandle</code></p>
</dd>
</dl>

<a name="onInit"></a>

## onInit(callback)
> initialize when component first render

**Kind**: global function  

| Param | Description |
| --- | --- |
| callback | Function to run |

<a name="onDidMount"></a>

## onDidMount(callback, sync)
> Similar to componentDidMount, first time creation

**Kind**: global function  

| Param | Description |
| --- | --- |
| callback | Function to run |
| sync | Boolean whether to run after layout or deferred after paint |

<a name="onDidRender"></a>

## onDidRender(callback, sync)
> Callback after each render(), first time and later

**Kind**: global function  

| Param | Description |
| --- | --- |
| callback | Function to run |
| sync | Boolean whether to run after layout or deferred after paint |

<a name="onWillUnmount"></a>

## onWillUnmount(callback, sync)
> Similar to componentWillUnmount, before DOM removed

**Kind**: global function  

| Param | Description |
| --- | --- |
| callback | Function to run |
| sync | Boolean whether to run after layout or deferred after paint |

<a name="onDidUpdate"></a>

## onDidUpdate(callback, sync)
> Similar to componentDidUpdate, skip run for first time render

**Kind**: global function  

| Param | Description |
| --- | --- |
| callback | Function to run |
| sync | Boolean whether to run after layout or deferred after paint |

<a name="useUpdate"></a>

## useUpdate() ⇒
> Per useReducer/useState return value

forceUpdate is similar to this.forceUpdate in Class Component

**Kind**: global function  
**Returns**: Array [updateCount: number, forceUpdate: function]  
<a name="useTimeout"></a>

## useTimeout(callback, delay) ⇒
> Like setTimeout, but auto destroyed when re-render

**Kind**: global function  
**Returns**: React.Ref the ref to setTimeout id  

| Param | Description |
| --- | --- |
| callback | Function to run |
| delay | Number|null|undefined seconds to delay, null to stop |

<a name="useInterval"></a>

## useInterval(callback, delay) ⇒
> Like setInterval, but auto destroyed when re-render

**Kind**: global function  
**Returns**: React.Ref the ref to setInterval id  

| Param | Description |
| --- | --- |
| callback | Function to run |
| delay | Number|null|undefined seconds to delay, null to stop |

<a name="useTick"></a>

## useTick(tickFn, clearTickFn, callback, delay) ⇒
> Tick like functions helper method, auto destroyed when re-render

**Kind**: global function  
**Returns**: React.Ref the ref to setInterval id  

| Param | Description |
| --- | --- |
| tickFn | Function to run like setTimeout |
| clearTickFn | Function to run like clearTimeout |
| callback | Function to run |
| delay | Number|null|undefined seconds to delay, null to stop |

<a name="exposeRef"></a>

## exposeRef(component) ⇒
> Expose function component ref to parent

Usage: `exposeRef(expose => (props, ref) => ReactNode)`

In function component, should call `expose(ref, fn, deps)`

The `expose` function just a wrapper of `useImperativeHandle`

**Kind**: global function  
**Returns**: React.Component  

| Param | Description |
| --- | --- |
| component | exposeFunction -> React.Component the component to return |


* * *

&copy; 2019 James Yang
