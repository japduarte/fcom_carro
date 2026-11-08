const test = require('node:test');
const assert = require('node:assert/strict');
const { chargeAmount } = require('../charging-calculation.js');

test('calculates company charging with its own kWh price', () => {
  const amount = chargeAmount(0, 100, 0.10, {
    consumptionKwh100: 15,
    lossRate: 15,
    vatRate: 23,
  });

  assert.equal(amount, 2.12);
});

test('limits a charging amount to zero when autonomy does not increase', () => {
  const amount = chargeAmount(100, 50, 0.10, {
    consumptionKwh100: 15,
    lossRate: 15,
    vatRate: 23,
  });

  assert.equal(amount, 0);
});
