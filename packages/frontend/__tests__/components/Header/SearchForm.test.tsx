import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../../../components/Header/SearchForm';

jest.mock('next/image', () => () => <img />);

describe('SearchForm', () => {
  it('will call onSubmit with thei input value when form is submitted', async () => {
    const onSubmit = jest.fn();
    const form = render(<SearchForm onSubmit={onSubmit} placeholder='Buscar' />);
    const input = await form.findByLabelText('¿Qué estás buscando?');

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
});

export default {};