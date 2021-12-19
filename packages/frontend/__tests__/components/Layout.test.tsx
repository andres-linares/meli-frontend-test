import { render, screen } from "@testing-library/react";
import Layout from "../../components/Layout";

jest.mock('../../components/Header', () => () => <header>Test Header</header>)

describe('Layout', () => {
  it('contains a Header', () => {
    render(<Layout></Layout>);

    expect(screen.getByText('Test Header')).toBeTruthy();
  });

  it('renders the passed component', () => {
    render(<Layout><h1>Soy una prueba</h1></Layout>);

    expect(screen.getByText('Soy una prueba')).toBeTruthy();
  });
});

export default {};