import { render, screen } from "@testing-library/react";
import { MoreOnGitHub } from "./MoreOnGitHub";
import { moreOnGitHub } from "../data/projects";

test("renders a card per repo", () => {
  render(<MoreOnGitHub />);
  for (const r of moreOnGitHub) {
    expect(screen.getByRole("link", { name: new RegExp(r.name, "i") })).toHaveAttribute("href", r.repo);
  }
});
