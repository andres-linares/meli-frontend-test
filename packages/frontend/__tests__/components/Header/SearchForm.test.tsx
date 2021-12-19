import { render, fireEvent } from '@testing-library/react';
import SearchForm from '../../../components/Header/SearchForm';

jest.mock('next/image', () => () => <img />);

describe('SearchForm', () => {
  it('will call onSubmit with thei input value when form is submitted', async () => {
    const onSubmit = jest.fn();
    const form = render(<SearchForm onSubmit={onSubmit} placeholder='Buscar' />);
    const input = await form.findByPlaceholderText('Buscar');

    fireEvent.change(input, { target: { value: 'ropa' }});
    fireEvent.submit(input);

    expect(onSubmit).toHaveBeenCalledWith('ropa');
  });

  it('will not call onSubmit when input is empty', async () => {
    const onSubmit = jest.fn();
    const form = render(<SearchForm onSubmit={onSubmit} placeholder='Buscar' />);
    const button = await form.findByText('Buscar');
    fireEvent.click(button);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('will use the placeholder passed as a prop in the input field', async () => {
    const form = render(<SearchForm onSubmit={jest.fn()} placeholder='Test PL' />);
    const input = await form.findByPlaceholderText('Test PL');

    expect(input).toBeTruthy();
  });

  it('will use the initialValue passed as a prop in the input field', async () => {
    const form = render(<SearchForm onSubmit={jest.fn()} placeholder='Test' initialValue='carro'  />);
    const input = await form.findByPlaceholderText('Test');

    expect(input.getAttribute('value')).toEqual('carro');
  });
});

export default {};