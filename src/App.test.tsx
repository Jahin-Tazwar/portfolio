import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the name in a main landmark", () => {
  render(<App />);
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /jahin tazwar/i })).toBeInTheDocument();
});
