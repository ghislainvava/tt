export function addition(a: number, b: number) {
  return a + b;
}


describe('addition()', () => {
  it('doit additionner deux nombres', () => {
    expect(addition(1, 2)).toBe(3);
  });
});