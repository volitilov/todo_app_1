export const checkSpaces = (value) => {
  const pattern = new RegExp("^(?!.* )");
  return pattern.test(value);
}

export const checkLength = (min, max, value) => {
  return value.length >= min && value.length <= max;
}