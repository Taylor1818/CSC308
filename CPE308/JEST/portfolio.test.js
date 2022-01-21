const stocks = require("./portfolio.js");

let p;

beforeEach( () => {
    p = new stocks.portfolio();
});

test('isEmpty', () => {
    const test = p.isEmpty();
    expect(test).toBeTruthy();
  });

  test('buy', () => {
    p.buy('ABC', 1);
    expect(p.stocks.get('ABC')).toBe(1);
  });

  test('sell', () => {
    p.stocks.set('ABC', 10);
    p.sell('ABC', 1);
    expect(p.stocks.get('ABC')).toBe(9);
  });

  test('sellOver', () => {
    p.stocks.set('ABC', 1);
    expect(() => {p.sell('ABC', 50)}).toThrowError(/Not possible to sell this number of shares/);
});

test('sellNoTicker', () => {
    p.stocks.set('ABC', 1);
    expect( () => { p.sell('XYZ', 1) } ).toThrowError(/You do not own this Ticker/);
});

test('UniqueTicker', () => {
  p.stocks.set('ABC', 1);
  p.stocks.set('XYZ', 1);
  p.stocks.set('STU', 1);
  expect(p.owned()).toBe(3);
});

test('UniqueTickerNone', () => {
  expect(p.owned()).toBe(0);
});

test('deleteTickers', () => {
  p.stocks.set('ABC', 1);
  p.stocks.set('XYZ', 1);
  p.stocks.set('STU', 1);
  p.sell('ABC', 1)
  expect(p.owned()).toBe(2);
});

test('AmountOfShares', () => {
  p.stocks.set('ABC', 1);
  p.stocks.set('XYZ', 1);
  p.stocks.set('STU', 1);
  expect(p.tickerShares("ABC")).toBe(1);
});

test('AmountOfSharesNone', () => {
  p.stocks.set('ABC', 1);
  expect(p.tickerShares("XYZ")).toBe(0);
});