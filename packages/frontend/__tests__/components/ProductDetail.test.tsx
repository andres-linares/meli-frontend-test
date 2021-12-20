import { ItemDetail } from '@meli/backend/src/types/item';
import { render } from '@testing-library/react';
import ProductDetail from '../../components/ProductDetail';

jest.mock('next/image', () => () => <img />);

const product: ItemDetail = {
  condition: 'Nuevo',
  free_shipping: true,
  id: 'MLA123123',
  picture: 'placeholder.png',
  price: { amount: 13350, currency: 'ARS', decimals: 25 },
  title: 'Test Product',
  description: 'Description Test',
  sold_quantity: 975
}

describe('ProductDetail', () => {
  it('shows the condition and sold quantity', () => {
    const productDetail =render(<ProductDetail product={product} />);
    const container = productDetail.getByTestId('statusDescriptor');

    expect(container.textContent).toEqual('Nuevo - 975 vendidos');
  });

  it('shows the price formatted with decimals', () => {
    const productDetail =render(<ProductDetail product={product} />);
    const container = productDetail.getByTestId('priceContainer');

    expect(container.textContent).toEqual('$ 13.35025');
  });

  it('has a buy button', () => {
    const productDetail =render(<ProductDetail product={product} />);
    const button = productDetail.getByText('Comprar');

    expect(button).toBeTruthy();
  });

  it('has a description', () => {
    const productDetail =render(<ProductDetail product={product} />);
    const description = productDetail.getByText('Description Test');

    expect(description).toBeTruthy();
  });
})


export default {};
