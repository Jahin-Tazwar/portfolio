import { render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";
import { Tag } from "./Tag";
import { StatusChip } from "./StatusChip";
import { CodePanel } from "./CodePanel";

test("Reveal renders its children", () => {
  render(<Reveal><p>hello world</p></Reveal>);
  expect(screen.getByText("hello world")).toBeInTheDocument();
});

test("Tag renders text", () => {
  render(<Tag>C++</Tag>);
  expect(screen.getByText("C++")).toBeInTheDocument();
});

test("StatusChip shows label and data-kind", () => {
  render(<StatusChip label="shipped" kind="shipped" />);
  const chip = screen.getByText("shipped");
  expect(chip).toHaveAttribute("data-kind", "shipped");
});

test("CodePanel shows filename and code", () => {
  render(<CodePanel filename="factorial.nfa" code={"print(factorial(5))"} />);
  expect(screen.getByText("factorial.nfa")).toBeInTheDocument();
  expect(screen.getByText(/print\(factorial\(5\)\)/)).toBeInTheDocument();
});
