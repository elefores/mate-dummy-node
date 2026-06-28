const { newId } = require("../src/index");

const UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

test("newId returns a v4 uuid", () => {
  expect(newId()).toMatch(UUID_V4);
});

test("newId returns a fresh value each call", () => {
  expect(newId()).not.toBe(newId());
});
