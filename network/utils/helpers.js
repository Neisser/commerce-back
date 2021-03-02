const normalizeDecimalNumber = (value) => {
  const REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;
  const times =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : 100000000000;
  return REGEXP_DECIMALS.test(value)
    ? Math.round(value * times) / times
    : value;
};

module.exports = {
  normalizeDecimalNumber,
};
