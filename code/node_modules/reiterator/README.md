![](assets/logo.png)

ReIterator is a node.js module which helps you avoid errors while accessing json from the big bad internet (and your own apis)

![](https://img.shields.io/travis/sudhanshuraheja/reiterator.svg)
![](https://img.shields.io/codecov/c/github/sudhanshuraheja/reiterator/master.svg)
![](https://img.shields.io/github/license/sudhanshuraheja/reiterator.svg)

## About

I created this package to simplify iterating across arrays and objects without hitting into errors. The Iterator is chainable, making it possible to access items as `$$(obj)._('first')._(0)._('second).value()`

## Quick Start

```bash
yarn add reiterator
```

```js
const i = require("reiterator");

// This is our object
const json = {
  name: { firstName: "Jack", lastName: "Reaper" },
  city: "Jakarta",
  runs: [
    { run1: { date: "26 March 2020", distance: "5km" } },
    { run2: { date: "20 March 2020", distance: "5km" } },
  ],
  active: true,
  waiting: null,
  countries: undefined,
};

// And this is how you can parse through it

i.$$(json)._("name")._("firstName").string(); // "Jack"
i.$$(json)._("runs")._(0)._("run1")._("distance").string(); // "5km"
i.$$(json)._("runs").keys(); // ["run1", "run2"]
i.$$(json)._("name").value(); // { firstName: "Jack", lastName: "Reaper" }

i.$$(json)._("name"); // { obj: { firstName: "Jack", lastName: "Reaper" } }

i._keys(json.runs); // ["run1", "run2"]
i._len(json.runs); // 2

i.isUndefined(json.countries); // true
```

## The Complete API

`$` and `_` are aliases
`$$(json)` and `new Iterator(json)` are aliases

`.keys()` always returns an `array` or `[]`
`.string()` always returns an `string` or `""`

```js
const json = { one: "two" };

const Iterator = require("reiterator");

const i = new Iterator(json);
const ii = Iterator.$$(json); // alias

i.$("one"); // { obj: "two" }
i.$("one", true); // "two"

i._("one"); // { obj: "two" } alias
i._("one", true); // "two" alias

i.keys(); // ["one"]
Iterator.keys(json); // ["one"]

i.$("one").string(); // "two"
Iterator._str(json.one); // "two" alias

i.value(); // { "one": "two" }

i.length(); // 1
Iterator._len(json); // 1

Iterator.hasKey(json, "one"); // true
Iterator.hasKey(json, "two"); // false

// Other static functions
Iterator.isArray(json); // false
Iterator.isObject(json); // true
Iterator.isNumber(json); // false
Iterator.isString(json); // false
Iterator.isBoolean(json); // false
Iterator.isNull(json); // false
Iterator.isUndefined(json); // false
```
