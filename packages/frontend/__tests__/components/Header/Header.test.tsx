import { render } from "@testing-library/react";
import Header from "../../../components/Header";

jest.mock("../../../components/Header/SearchForm", () => () => <form>Test Form</form>);
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({ query: {} })),
}));
jest.mock('next/image', () => () => <img />);

describe("Header", () => {
  it("renders the SearchForm", async () => {
    const header = render(<Header />);
    const form = await header.findAllByText("Test Form");

    expect(form).toBeTruthy();
  });

  it('renders a logo inside an a tag', async () => {
    const header = render(<Header />);
    const logoLink = await header.findByTitle('Ir al inicio');

    expect(logoLink.getAttribute('href')).toEqual('/');
    expect(logoLink.getElementsByTagName('img').length).toEqual(1);
  });
});

export default {};
