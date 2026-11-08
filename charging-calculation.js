(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.ChargingCalculations = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const number = value => Number(value || 0);

  function chargeAmount(before, after, kwhPrice, homeCharging) {
    const autonomy = Math.max(0, number(after) - number(before));
    return Math.round((autonomy / 100 * number(homeCharging.consumptionKwh100)) * (1 + number(homeCharging.lossRate) / 100) * number(kwhPrice) * (1 + number(homeCharging.vatRate) / 100) * 100) / 100;
  }

  return { chargeAmount };
});
