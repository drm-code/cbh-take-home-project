const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

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
});
