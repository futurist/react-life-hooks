# react-life-hooks

React hooks for better managing lifecycles for function component.

This lib want keep as `helpers`, but not targeting a fully [Custom Hooks](https://reactjs.org/docs/hooks-custom.html).

[![Build Status](https://travis-ci.org/futurist/react-life-hooks.svg?branch=master)](https://travis-ci.org/futurist/react-life-hooks)
[![NPM Version](https://img.shields.io/npm/v/react-life-hooks.svg)](https://www.npmjs.com/package/react-life-hooks)


### Install

You can install from [NPM](https://www.npmjs.com/package/react-life-hooks), or use files in `lib`.

```sh
npm install --save react-life-hooks
```

### Usage

This lib require [React 16.8.0](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) or later, since it's based on [React Hooks API](https://reactjs.org/docs/hooks-reference.html).

Each helper can be imported individually:

```js
import {
  onInit,
  onDidMount,
  onDidUpdate,
  onWillUnmount,
  onChange,
  useLifeState,
} from 'react-life-hooks'

function Hello(props){
  onInit(()=>{
    console.log('this is like constructor');
  })
  onDidMount(()=>{
    console.log('this is like componentDidMount');
  });
  onDidUpdate(()=>{
    console.log('this is like componentDidUpdate');
  });
  onWillUnmount(()=>{
    console.log('this is like componentWillUnmount');
  });
  onChange(props, prevProps=>{
    console.log('this is like componentWillReceiveProps')
  })

  // state, setState is life time, same reference in each render
  const [state, setState] = useLifeState({x:1})
  // below have no bugs any more
  const onClick = () => {
    setState({x: state.x+1})
  }

  return <div>
    <span>{state.x}</span>
    <button onClick={onClick}></button>
  </div>
};
```

### API

[See API Document](https://github.com/futurist/react-life-hooks/blob/master/api.md)

