export type PluralForms = {
  one: string;
  two: string;
  five: string;
}

export function getPluralForm(number: number, pluralForms: PluralForms): string  {
  let n: number = Math.abs(number);

  n %= 100;

  if (n >= 5 && n <= 20) {
    return pluralForms.five;
  }

  n %= 10;

  if (n === 1) {
    return pluralForms.one;
  }

  if (n >= 2 && n <= 4) {
    return pluralForms.two;
  }

  return pluralForms.five;
}
