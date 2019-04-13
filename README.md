# react-hooklib

Helpers working around [React Hooks API](https://reactjs.org/docs/hooks-reference.html).

This lib want keep as `helpers`, but not targeting a fullly [Custom Hooks](https://reactjs.org/docs/hooks-custom.html), it's targeting dev experience when building component based on React Hooks.

[![Build Status](https://travis-ci.org/futurist/react-hooklib.svg?branch=master)](https://travis-ci.org/futurist/react-hooklib)
[![NPM Version](https://img.shields.io/npm/v/react-hooklib.svg)](https://www.npmjs.com/package/react-hooklib)


### Install

You can install from [NPM](https://www.npmjs.com/package/react-hooklib), or use files in `lib`.

```sh
npm install --save react-hooklib
```

### Usage

This lib require [React 16.8.0](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) or later, since it's based on [React Hooks API](https://reactjs.org/docs/hooks-reference.html).

Each helper can be imported individually:

```js
import {onDidMount, onWillUnmount} from 'react-hooklib';
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

[See API Document](https://github.com/futurist/react-hooklib/blob/master/api.md)

