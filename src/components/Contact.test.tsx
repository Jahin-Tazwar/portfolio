import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";

test("contact exposes email, github, linkedin, résumé", () => {
  render(<Contact />);
  expect(screen.getByRole("link", { name: /tazwarjahin@gmail.com/i })).toHaveAttribute("href", "mailto:tazwarjahin@gmail.com");
  expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("href", "https://github.com/Jahin-Tazwar");
  expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute("href", "https://www.linkedin.com/in/jahin-tazwar/");
  expect(screen.getByRole("link", { name: /résumé|resume/i })).toHaveAttribute("href", "/Jahin-Tazwar-Resume.pdf");
});
