import React from "react";
import { render, screen } from "@testing-library/react";
import Breadcrumbs from "../../components/Breadcrumbs";

describe("Breadcrumbs", () => {
  it("renders all the breadcrumbs", () => {
    const breadcrumbs = [
      { link: '/#b1', text: 'b1' },
      { link: '/#b2', text: 'b2' },
      { link: '/#b3', text: 'b3' },
    ]
    render(<Breadcrumbs breadcrumbs={breadcrumbs} />);

    expect(screen.getByText('b1')).toBeTruthy();
    expect(screen.getByText('b2')).toBeTruthy();
    expect(screen.getByText('b3')).toBeTruthy();
  });

  it("renders all breadcrumbs as links with correct urls", () => {
    const breadcrumbs = [
      { link: '/#b1', text: 'b1' },
      { link: '/#b2', text: 'b2' },
      { link: '/#b3', text: 'b3' },
    ]
    render(<Breadcrumbs breadcrumbs={breadcrumbs} />);

    expect(screen.getByText('b1').getAttribute('href')).toEqual('/#b1');
    expect(screen.getByText('b2').getAttribute('href')).toEqual('/#b2');
    expect(screen.getByText('b3').getAttribute('href')).toEqual('/#b3');
  });
});

export default {};
