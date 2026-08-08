import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

test("hero shows identity, CTAs, résumé and real code", () => {
  render(<Hero />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /read the work/i })).toHaveAttribute("href", "#work");
  const resume = screen.getByRole("link", { name: /résumé|resume/i });
  expect(resume).toHaveAttribute("href", "/Jahin-Tazwar-Resume.pdf");
  expect(screen.getAllByText(/factorial/i).length).toBeGreaterThan(0);
});
