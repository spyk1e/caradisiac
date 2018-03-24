# CARADISIAC

> Drive comfortably

**Table of Contents**

- [Introduction](#introduction)
- [Objective - Workshop in 1 sentence](#objective---workshop-in-1-sentence)
- [How to do that?](#how-to-do-that)
  - [Stack](#stack)
- [Just tell me what to do](#just-tell-me-what-to-do)
- [Examples of steps to do](#examples-of-steps-to-do)
  - [Populate](#populate)
  - [List of suv](#list-of-suv)
- [MVP](#mvp)
  - [Client-side (bonus)](#client-side-bonus)
- [Don't forget](#dont-forget)
- [Licence](#licence)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

[caradisiac.com](http://www.caradisiac.com/fiches-techniques) provides a tone of technical records related to car specification.

## Install

On the root folder:
```
npm install
```

## Use

In order to use the api, there is two possibilities:
- On a webpage to check if its works.
- On another project.



### See results on a webpage
- node index.js
And then
- To put cars on the database:
 - http://localhost:9292/populate
- To see the biggest volume and cars infos:
 - http://localhost:9292/cars

### Use the API on another project

#### Instalation
❯ npm install https://github.com/spyk1e/caradisiac.git

❯ yarn add spyk1e/caradisiac

#### Usage
```
const {populate} = require('caradisiac');

async function print () {
  const populated = await populate();

  console.log(populated);
}

print();
```

```
const {cars} = require('caradisiac');

async function print () {
  const carsJson = await cars();

  console.log(carsJson);
}

print();
```

## Licence

[Uncopyrighted](http://zenhabits.net/uncopyright/)