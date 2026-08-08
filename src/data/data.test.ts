import { profile } from "./profile";
import { featured, moreOnGitHub } from "./projects";
import { timeline } from "./timeline";

const httpsOk = (u: string) => /^https:\/\/.+/.test(u);

test("profile has real contact + tools + about", () => {
  expect(profile.email).toBe("tazwarjahin@gmail.com");
  expect(httpsOk(profile.github)).toBe(true);
  expect(httpsOk(profile.linkedin)).toBe(true);
  expect(profile.resume).toMatch(/\.pdf$/);
  expect(profile.about.length).toBeGreaterThanOrEqual(3);
  expect(profile.tools.length).toBeGreaterThanOrEqual(3);
  expect(profile.heroCode).toMatch(/factorial/);
});

test("exactly 5 featured projects, each valid", () => {
  expect(featured).toHaveLength(5);
  for (const p of featured) {
    expect(p.title.length).toBeGreaterThan(0);
    expect(p.blurb.length).toBeGreaterThan(20);
    expect(p.tags.length).toBeGreaterThan(0);
    expect(["shipped", "progress"]).toContain(p.status.kind);
    expect(httpsOk(p.repo)).toBe(true);
    if (p.live) expect(httpsOk(p.live)).toBe(true);
  }
});

test("more-on-github excludes client sites", () => {
  const banned = /restaurant|barber|patio|plumbing|benavidez|goldies|loyola|cloverleaf|foothills|town-and-country|simmons/i;
  for (const r of moreOnGitHub) expect(banned.test(r.repo)).toBe(false);
});

test("timeline is non-empty and ordered oldest-first", () => {
  expect(timeline.length).toBeGreaterThanOrEqual(5);
  expect(timeline[0].when).toMatch(/2020|2021/);
});
