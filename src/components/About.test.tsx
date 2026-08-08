import { render, screen } from "@testing-library/react";
import { About } from "./About";
import { profile } from "../data/profile";

test("renders about narrative and tool groups", () => {
  render(<About />);
  expect(screen.getByText(new RegExp(profile.about[0].slice(0, 24), "i"))).toBeInTheDocument();
  for (const g of profile.tools) {
    expect(screen.getByText(g.group)).toBeInTheDocument();
  }
});
