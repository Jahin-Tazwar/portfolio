import { render, screen } from "@testing-library/react";
import { Journey } from "./Journey";
import { timeline } from "../data/timeline";

test("renders every milestone in order", () => {
  render(<Journey />);
  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(timeline.length);
  expect(items[0]).toHaveTextContent(timeline[0].title);
  expect(items[items.length - 1]).toHaveTextContent(timeline[timeline.length - 1].title);
});
