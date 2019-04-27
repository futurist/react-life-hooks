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
import {onDidMount, onWillUnmount} from 'react-life-hooks';
function Hello(){
  onDidMount(()=>{
    console.log('component did mount!');
  });
  onWillUnmount(()=>{
    console.log('component will unmount!');
  });
  return <div>Hello</div>
}
```

### API

[See API Document](https://github.com/futurist/react-life-hooks/blob/master/api.md)

