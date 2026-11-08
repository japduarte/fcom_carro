const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
const assert = require('node:assert/strict');

function appChargeAmount(before, after, kwhPrice) {
  const source = fs.readFileSync('app.js', 'utf8').replace(/boot\(\);\s*$/, 'data = { config: { homeCharging: { consumptionKwh100: 15, lossRate: 15, vatRate: 23 } } }; globalThis.testChargeAmount = chargeAmount;');
  const context = {
    Intl,
    Date,
    Math,
    Number,
    String,
    Object,
    Array,
    Set,
    console,
    globalThis: {},
    document: { querySelector: () => null, querySelectorAll: () => [] },
    crypto: { randomUUID: () => 'test-id' },
  };
  context.globalThis = context;
  vm.runInNewContext(source, context);
  return context.testChargeAmount(before, after, kwhPrice);
}

test('calculates company charging without requiring a separate browser script', () => {
  const amount = appChargeAmount(0, 100, 0.10);

  assert.equal(amount, 2.12);
});

test('limits a charging amount to zero when autonomy does not increase', () => {
  const amount = appChargeAmount(100, 50, 0.10);

  assert.equal(amount, 0);
});
