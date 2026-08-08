import "@testing-library/jest-dom/vitest";

// IntersectionObserver isn't implemented in jsdom; provide a no-op that
// immediately reports elements as intersecting so Reveal renders content.
class IO {
  constructor(private cb: IntersectionObserverCallback) {}
  observe(el: Element) {
    this.cb([{ isIntersecting: true, target: el } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
  root = null; rootMargin = ""; thresholds = [];
}
// @ts-expect-error assign mock
globalThis.IntersectionObserver = IO;

// matchMedia mock (defaults to no reduced-motion)
globalThis.matchMedia ??= ((q: string) => ({
  matches: false, media: q, onchange: null,
  addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent() { return false; },
})) as unknown as typeof globalThis.matchMedia;
