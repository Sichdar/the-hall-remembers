/// <reference lib="dom" />
import { expect, test, type Page } from "@playwright/test";

// docs/08, section 9: before every publish the built game opens at three phone sizes with no errors, with a picture of each.
const SIZES = [
  { name: "small-landscape", width: 667, height: 375 },
  { name: "wide-landscape", width: 844, height: 390 },
  { name: "portrait", width: 390, height: 844 },
];

/** Opens the game in the plain look (no model downloads) and waits until the street and the interface are up. */
async function open(page: Page, errors: string[]) {
  page.on("pageerror", e => errors.push("page error: " + e.message));
  page.on("console", m => { if (m.type() === "error") errors.push("console: " + m.text()); });
  await page.addInitScript(() => { try { localStorage.setItem("thr-look", "plain"); } catch { /* private mode */ } });
  await page.goto("./");
  await expect(page.locator("#loading")).toHaveCount(0, { timeout: 60_000 });
  await expect(page.locator("#actB")).toBeVisible();
}

for (const s of SIZES) {
  test(`opens with no errors at ${s.width} x ${s.height}`, async ({ page }) => {
    const errors: string[] = [];
    await page.setViewportSize({ width: s.width, height: s.height });
    await open(page, errors);
    await page.waitForTimeout(1500); // a few frames, so the HUD has drawn
    await page.screenshot({ path: `browser-check/results/${s.name}.png` });
    expect(errors).toEqual([]);
  });
}

test("P-WORK: chop a full load, carry it to the yard, get paid", async ({ page }) => {
  const errors: string[] = [];
  await page.setViewportSize({ width: 844, height: 390 });
  await open(page, errors);
  const cap = page.locator("#actC");
  // the page's own objects (window.THR, the work rules) are typed loosely here on purpose
  const go = (x: number, z: number) => page.evaluate(([x, z]) => { const W = (window as any).THR; W.me.root.position.x = x; W.me.root.position.z = z; }, [x, z]);
  const t = await page.evaluate(() => { const t = (window as any).THR.work.trees[0]; return { x: t.x, z: t.z }; });
  await go(t.x + 1.4, t.z - 1.3);
  await expect(cap).toHaveText("Chop");
  await page.keyboard.press("Space");
  await expect(cap).toHaveText("On the beat");
  // the rules' clock: 25 seconds of chopping at once, faster than waiting
  const carried = await page.evaluate(() => { const w = (window as any).THR.work; w.step(25); return { full: w.full, slow: w.speedFactor }; });
  expect(carried).toEqual({ full: true, slow: 0.8 });
  await go(-23.5, 0.3);
  await expect(cap).toHaveText("Deliver");
  await page.keyboard.press("Space");
  await expect.poll(() => page.evaluate(() => { const s = (window as any).THR.work.stats; return { coin: s.coin, loads: s.fullLoads }; })).toEqual({ coin: 2, loads: 1 });
  await page.screenshot({ path: "browser-check/results/p-work.png" });
  expect(errors).toEqual([]);
});
