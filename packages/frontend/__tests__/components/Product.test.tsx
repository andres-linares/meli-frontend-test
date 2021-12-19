import { Item } from '@meli/backend/src/types/item';
import { render } from '@testing-library/react';
import Product from '../../components/Product';

jest.mock('next/image', () => (props: any) => <img alt={props.alt} />)

describe('Product', () => {
  it('renders a link to a given product', async () => {
    const product: Item = {
      title: 'testTitle',
      condition: 'Nuevo',
      free_shipping: true,
      id: 'MLA123123123',
      picture: '/placeholder.png',
      price: { amount: 99, currency: 'ARS', decimals: 0 },
    };

    const productElement = render(<Product product={product} />);
    const link = productElement.getByText('testTitle').closest('a');

    expect(link).toHaveAttribute('href', '/items/MLA123123123');
  });

  it('shows the free shipping icon when it is free shipped', () => {
    let product: Item = {
      title: 'testTitle',
      condition: 'Nuevo',
      free_shipping: false,
      id: 'MLA123123123',
      picture: '/placeholder.png',
      price: { amount: 99, currency: 'ARS', decimals: 0 },
    };

    let productElement = render(<Product product={product} />);
    let freeShippingIcon = productElement.queryAllByAltText('Envio gratis');

    expect(freeShippingIcon.length).toEqual(0);

    product.free_shipping = true;
    productElement = render(<Product product={product} />);
    freeShippingIcon = productElement.queryAllByAltText('Envio gratis');

    expect(freeShippingIcon.length).toEqual(1);
  });

  it('shows the price formatted', () => {
    let product: Item = {
      title: 'testTitle',
      condition: 'Nuevo',
      free_shipping: false,
      id: 'MLA123123123',
      picture: '/placeholder.png',
      price: { amount: 99, currency: 'ARS', decimals: 0 },
    };

    const productElement = render(<Product product={product} />);
    const price = productElement.getByText('$ 99');
    
    expect(price).toBeTruthy();
  });
});

export default {};