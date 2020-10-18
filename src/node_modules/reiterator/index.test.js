const Iterator = require("./index");

describe("Test Iterator", () => {
  test("test Iterator", () => {
    let i = new Iterator(undefined);
    expect(i.value()).toBe(undefined);
    expect(i.length()).toBe(0);
    i = new Iterator(undefined);
    expect(i.keys()).toEqual([]);
    i = new Iterator(undefined);
    expect(i.string()).toBe("");
    i = new Iterator(undefined);
    expect(i.$("key").value()).toBe(undefined);
    expect(i.$("key").length()).toBe(0);
    i = new Iterator(undefined);
    expect(i.$("key", true)).toBe(undefined);
    i = new Iterator(undefined);
    expect(i.$("key").keys()).toEqual([]);
    i = new Iterator(undefined);
    expect(i.$("key").string()).toBe("");

    i = new Iterator(null);
    expect(i.value()).toBe(null);
    expect(i.length()).toBe(0);
    i = new Iterator(null);
    expect(i.keys()).toEqual([]);
    i = new Iterator(null);
    expect(i.string()).toBe("");
    i = new Iterator(null);
    expect(i.$("key").value()).toBe(undefined);
    expect(i.$("key").length()).toBe(0);
    i = new Iterator(null);
    expect(i.$("key", true)).toBe(undefined);
    i = new Iterator(null);
    expect(i.$("key").keys()).toEqual([]);
    i = new Iterator(null);
    expect(i.$("key").string()).toBe("");

    i = new Iterator(123);
    expect(i.value()).toBe(123);
    expect(i.length()).toBe(0);
    i = new Iterator(123);
    expect(i.keys()).toEqual([]);
    i = new Iterator(123);
    expect(i.string()).toBe("");
    i = new Iterator(123);
    expect(i.$("key").value()).toBe(undefined);
    expect(i.$("key").length()).toBe(0);
    i = new Iterator(123);
    expect(i.$("key", true)).toBe(undefined);
    i = new Iterator(123);
    expect(i.$("key").keys()).toEqual([]);
    i = new Iterator(123);
    expect(i.$("key").string()).toBe("");

    i = new Iterator("abc");
    expect(i.value()).toBe("abc");
    expect(i.length()).toBe(0);
    i = new Iterator("abc");
    expect(i.keys()).toEqual([]);
    i = new Iterator("abc");
    expect(i.string()).toBe("abc");
    i = new Iterator("abc");
    expect(i.$("key").value()).toBe(undefined);
    expect(i.$("key").length()).toBe(0);
    i = new Iterator("abc");
    expect(i.$("key", true)).toBe(undefined);
    i = new Iterator("abc");
    expect(i.$("key").keys()).toEqual([]);
    i = new Iterator("abc");
    expect(i.$("key").string()).toBe("");

    i = new Iterator(["abc"]);
    expect(i.value()).toEqual(["abc"]);
    expect(i.length()).toBe(1);
    i = new Iterator(["abc"]);
    expect(i.keys()).toEqual(["abc"]);
    i = new Iterator(["abc"]);
    expect(i.string()).toBe("");
    i = new Iterator(["abc"]);
    expect(i.$("key").value()).toBe(undefined);
    expect(i.$("key").length()).toBe(0);
    i = new Iterator(["abc"]);
    expect(i.$("key", true)).toBe(undefined);
    i = new Iterator(["abc"]);
    expect(i.$("key").keys()).toEqual([]);
    i = new Iterator(["abc"]);
    expect(i.$("key").string()).toBe("");

    i = new Iterator({ key: "abc" });
    expect(i.value()).toEqual({ key: "abc" });
    expect(i.length()).toBe(1);
    i = new Iterator({ key: "abc" });
    expect(i.keys()).toEqual(["key"]);
    i = new Iterator({ key: "abc" });
    expect(i.string()).toBe("");
    i = new Iterator({ key: "abc" });
    expect(i.$("key").value()).toBe("abc");
    expect(i.$("key").length()).toBe(0);
    i = new Iterator({ key: "abc" });
    expect(i.$("key", true)).toBe("abc");
    i = new Iterator({ key: "abc" });
    expect(i.$("key").keys()).toEqual([]);
    i = new Iterator({ key: "abc" });
    expect(i.$("key").string()).toBe("abc");

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
    expect(Iterator.$$(json)._("name")._("firstName").string()).toBe("Jack");

    expect(
      Iterator.$$(json)._("runs")._(0)._("run1")._("distance").string()
    ).toBe("5km");

    expect(Iterator.$$(json)._("runs").keys()).toStrictEqual(["run1", "run2"]);

    // eslint-disable-next-line no-underscore-dangle
    expect(Iterator._keys(json.runs)).toStrictEqual(["run1", "run2"]);
    // eslint-disable-next-line no-underscore-dangle
    expect(Iterator._str(json.name.firstName)).toBe("Jack");
    // eslint-disable-next-line no-underscore-dangle
    expect(Iterator._len(json.runs)).toBe(2);

    expect(Iterator.isBoolean(json.active)).toBe(true);
    expect(Iterator.isBoolean(json.waiting)).toBe(false);
    expect(Iterator.isBoolean(json.countries)).toBe(false);

    expect(Iterator.isNull(json.active)).toBe(false);
    expect(Iterator.isNull(json.waiting)).toBe(true);
    expect(Iterator.isNull(json.countries)).toBe(false);

    expect(Iterator.isUndefined(json.active)).toBe(false);
    expect(Iterator.isUndefined(json.waiting)).toBe(false);
    expect(Iterator.isUndefined(json.countries)).toBe(true);
  });
});

describe("Test Objects", () => {
  test("Check isArray", () => {
    expect(Iterator.isArray(undefined)).toBe(false);
    expect(Iterator.isArray(null)).toBe(false);
    expect(Iterator.isArray(123)).toBe(false);
    expect(Iterator.isArray("asdf")).toBe(false);
    expect(Iterator.isArray([])).toBe(true);
    expect(Iterator.isArray({})).toBe(false);
  });

  test("Check isObject", () => {
    expect(Iterator.isObject(undefined)).toBe(false);
    expect(Iterator.isObject(null)).toBe(false);
    expect(Iterator.isObject(123)).toBe(false);
    expect(Iterator.isObject("asdf")).toBe(false);
    expect(Iterator.isObject([])).toBe(false);
    expect(Iterator.isObject({})).toBe(true);
  });

  test("Check isNumber", () => {
    expect(Iterator.isNumber(undefined)).toBe(false);
    expect(Iterator.isNumber(null)).toBe(false);
    expect(Iterator.isNumber(123)).toBe(true);
    expect(Iterator.isNumber("asdf")).toBe(false);
    expect(Iterator.isNumber([])).toBe(false);
    expect(Iterator.isNumber({})).toBe(false);
  });

  test("Check isString", () => {
    expect(Iterator.isString(undefined)).toBe(false);
    expect(Iterator.isString(null)).toBe(false);
    expect(Iterator.isString(123)).toBe(false);
    expect(Iterator.isString("asdf")).toBe(true);
    expect(Iterator.isString([])).toBe(false);
    expect(Iterator.isString({})).toBe(false);
  });

  test("Check hasKey", () => {
    expect(Iterator.hasKey(undefined, "abc")).toBe(false);
    expect(Iterator.hasKey(null, "abc")).toBe(false);
    expect(Iterator.hasKey(123, "abc")).toBe(false);
    expect(Iterator.hasKey("asdf", "abc")).toBe(false);
    expect(Iterator.hasKey([], "abc")).toBe(false);
    expect(Iterator.hasKey(["abc"], 0)).toBe(true);
    expect(Iterator.hasKey(["abc"], 1)).toBe(false);
    expect(Iterator.hasKey({ abc: "def" }, "abc")).toBe(true);
    expect(Iterator.hasKey({ abc: "def" }, "abc1")).toBe(false);
  });
});
