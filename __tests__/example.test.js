function soma(a, b) {
  return a + b;
}

// eslint-disable-next-line no-undef
test("Should return 9", () => {
  const result = soma(5, 4);

  // eslint-disable-next-line no-undef
  expect(result).toBe(9);
});
