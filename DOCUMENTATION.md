# react-hooklib *1.0.0*

> Helpers working around React Hooks API


### lib/index.js


#### onInit(callback) 

> initialize when component first render




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback |  | Function to run | &nbsp; |




##### Returns


- `Void`



#### onDidMount(callback, sync) 

> Similar to componentDidMount, first time creation




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback |  | Function to run | &nbsp; |
| sync |  | Boolean whether to run after layout or deferred after paint | &nbsp; |




##### Returns


- `Void`



#### onDidRender(callback, sync) 

> Callback after each render(), first time and later




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback |  | Function to run | &nbsp; |
| sync |  | Boolean whether to run after layout or deferred after paint | &nbsp; |




##### Returns


- `Void`



#### onWillUnmount(callback, sync) 

> Similar to componentWillUnmount, before DOM removed




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback |  | Function to run | &nbsp; |
| sync |  | Boolean whether to run after layout or deferred after paint | &nbsp; |




##### Returns


- `Void`



#### onDidUpdate(callback, sync) 

> Similar to componentDidUpdate, skip run for first time render




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback |  | Function to run | &nbsp; |
| sync |  | Boolean whether to run after layout or deferred after paint | &nbsp; |




##### Returns


- `Void`



#### useUpdate() 

> Per useReducer/useState return value

forceUpdate is similar to this.forceUpdate in Class Component






##### Returns


-  Array [updateCount: number, forceUpdate: function]



#### useTimeout(callback, delay) 

> Like setTimeout, but auto destroyed when re-render




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback |  | Function to run | &nbsp; |
| delay |  | Number|null|undefined seconds to delay, null to stop | &nbsp; |




##### Returns


-  React.Ref the ref to setTimeout id



#### useInterval(callback, delay) 

> Like setInterval, but auto destroyed when re-render




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback |  | Function to run | &nbsp; |
| delay |  | Number|null|undefined seconds to delay, null to stop | &nbsp; |




##### Returns


-  React.Ref the ref to setInterval id



#### useTick(tickFn, clearTickFn, callback, delay) 

> Tick like functions helper method, auto destroyed when re-render




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| tickFn |  | Function to run like setTimeout | &nbsp; |
| clearTickFn |  | Function to run like clearTimeout | &nbsp; |
| callback |  | Function to run | &nbsp; |
| delay |  | Number|null|undefined seconds to delay, null to stop | &nbsp; |




##### Returns


-  React.Ref the ref to setInterval id



#### exposeRef(component) 

> Expose function component ref to parent

Usage: `exposeRef(expose => (props, ref) => ReactNode)`

In function component, should call `expose(ref, fn, deps)`

The `expose` function just a wrapper of `useImperativeHandle`




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| component |  | exposeFunction -> React.Component the component to return | &nbsp; |




##### Returns


-  React.Component




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
