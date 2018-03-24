# CARADISIAC

> Drive comfortably

**Table of Contents**

- [Introduction](#Introduction)
- [Install](#Install)
- [Use](#Use)
  - [See results on a webpage](#See-results-on-a-webpage)
  - [Use the API on another project](#Use the API on another project)
    - [Install](#Install-API)
    - [Usage](#Usage)
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

#### Install API
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