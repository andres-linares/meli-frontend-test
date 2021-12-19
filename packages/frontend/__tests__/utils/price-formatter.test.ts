import formatPrice from "../../utils/price-formatter";

describe('formatPrice', () => {
  it('formats correctly', () => {
    let price = { amount: 12, currency: 'ARS' , decimals: 0 };
    let formatted = formatPrice(price);
    expect(formatted).toEqual('$ 12');

    price = { amount: 12, currency: 'ARS' , decimals: 10 };
    formatted = formatPrice(price);
    expect(formatted).toEqual('$ 12');

    price = { amount: 1200, currency: 'ARS' , decimals: 10 };
    formatted = formatPrice(price);
    expect(formatted).toEqual('$ 1200');

    price = { amount: 12760, currency: 'ARS' , decimals: 99 };
    formatted = formatPrice(price);
    expect(formatted).toEqual('$ 12.760');
  });
});

export default {};