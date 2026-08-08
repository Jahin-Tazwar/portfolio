import { readFileSync } from "node:fs";

test("index.html has accurate title and meta", () => {
  const html = readFileSync("index.html", "utf8");
  expect(html).toMatch(/<title>Jahin Tazwar[^<]*<\/title>/);
  expect(html).toMatch(/name="description"[^>]*content="[^"]*(compiler|language|chess|engineer)/i);
  expect(html).toMatch(/property="og:title"/);
  expect(html).toMatch(/favicon\.svg/);
  // stale template claim must be gone
  expect(html).not.toMatch(/Front End Web Developer/i);
});
