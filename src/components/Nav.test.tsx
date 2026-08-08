import { render, screen } from "@testing-library/react";
import { Nav } from "./Nav";

test("nav links point to the section anchors", () => {
  render(<Nav />);
  for (const id of ["work", "about", "journey", "contact"]) {
    const link = screen.getByRole("link", { name: new RegExp(id, "i") });
    expect(link).toHaveAttribute("href", `#${id}`);
  }
});
