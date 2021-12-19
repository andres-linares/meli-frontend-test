import { render, screen } from "@testing-library/react";
import Layout from "../../components/Layout";

describe('Layout', () => {
  it('contains a Header', () => {

  });

  it('renders the passed component', () => {
    render(<Layout><h1>Soy una prueba</h1></Layout>);

    expect(screen.getByText('Soy una prueba')).toBeTruthy();
  });
});

export default {};