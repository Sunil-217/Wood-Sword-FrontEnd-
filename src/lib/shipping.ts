/**
 * Shipping terms, in one place. These are quoted to the shopper on the
 * product page, in the announcement bar, in the bag and at checkout — having
 * had two copies of the threshold was one edit away from the store promising
 * one figure and charging another.
 *
 * No delivery date lives here on purpose: nothing is connected to a courier,
 * so a day range would be a promise the store has no way to keep.
 */
export const FREE_SHIPPING_OVER = 2000;
export const STANDARD_FEE = 99;
export const EXPRESS_FEE = 149;

/** Delivery charge for a given order subtotal. */
export function shippingFor(subtotal: number, express = false): number {
  if (express) return EXPRESS_FEE;
  return subtotal >= FREE_SHIPPING_OVER ? 0 : STANDARD_FEE;
}
