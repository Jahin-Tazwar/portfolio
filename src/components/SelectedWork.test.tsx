import { render, screen } from "@testing-library/react";
import { SelectedWork } from "./SelectedWork";
import { featured } from "../data/projects";

test("renders all featured projects with links and status", () => {
  render(<SelectedWork />);
  for (const p of featured) {
    const namePart = p.title.split(" — ")[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // anchored + boundary so "NFA" doesn't also match "NFA's Gambit — ..."
    expect(screen.getByRole("heading", { name: new RegExp(`^${namePart}(\\s|$)`, "i") })).toBeInTheDocument();
  }
  // every project has a source ('code') link
  const codeLinks = screen.getAllByRole("link", { name: /code|github|source/i });
  expect(codeLinks.length).toBeGreaterThanOrEqual(featured.length);
});
