# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

### Changes

### `dpk.js`

```
// Before
let candidate;

// After
// When no input is given the default result is `TRIVIAL_PARTITION_KEY` const value.
let candidate = TRIVIAL_PARTITION_KEY;
```

```
// Before

if (event) {
  if (event.partitionKey) {
    candidate = event.partitionKey;
  } else {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }


// After
// Early return pattern, in previous version of the logic when no input is given,
// "candidate" variable is filled with the "TRIVIAL_PARTITION_KEY" const value

if (!event) {
  return candidate;
```

```
// Before

if (candidate) {
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }


// After
// At this level we don't need to evaluate "candidate" variable because
// it was initialized before, also "event" param has value so we need
// to evaluate it

if (event.partitionKey) {
  const isStringType = typeof event.partitionKey === "string";
  candidate = isStringType
    ? event.partitionKey
    : JSON.stringify(event.partitionKey);
```

```
// Before

candidate = TRIVIAL_PARTITION_KEY;


// After
// When "event" is not an object containing the property "partitionKey"
// we just use its string value to create the crypto value

const data = JSON.stringify(event);
candidate = crypto.createHash("sha3-512").update(data).digest("hex");
```

### `dek.test.js`

Test cases for the new refactored code

```
describe("event.partitionKey", () => {
  it("When it is string", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: "YONATHAN",
    });
    expect(trivialKey).toBe("YONATHAN");
  });
  it("When it is not string", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 12345 });
    expect(trivialKey).toBe("12345");
  });
  it("When 'event.partitionKey.length' > MAX_PARTITION_KEY_LENGTH", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey:
        "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
    });
    expect(trivialKey.length).toBe(128);
  });
});
```
