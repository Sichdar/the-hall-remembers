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

test("P-WORK 2: big swings fill a load, the town asks for wood, the errand pays", async ({ page }) => {
  const errors: string[] = [];
  await page.setViewportSize({ width: 844, height: 390 });
  await open(page, errors);
  const cap = page.locator("#actC");
  // the page's own objects (window.THR, the work rules) are typed loosely here on purpose
  const go = (x: number, z: number) => page.evaluate(([x, z]) => { const W = (window as any).THR; W.me.root.position.x = x; W.me.root.position.z = z; }, [x, z]);
  const t = await page.evaluate(() => { const t = (window as any).THR.work.trees[0]; return { x: t.x, z: t.z }; });
  await go(t.x + 1.4, t.z - 1.3);
  await expect(cap).toHaveText("Chop");
  // a real hold of Space: the meter shows, a swing lands when it's let go
  await page.keyboard.down("Space");
  await expect(cap).toHaveText("Hold, let go");
  await expect(page.locator("#swing")).toBeVisible();
  await page.waitForTimeout(500);
  await page.keyboard.up("Space");
  await expect.poll(() => page.evaluate(() => (window as any).THR.work.stats.swings)).toBe(1);
  // the rules' clock for the rest: perfect swings until the sack is full, faster than holding by hand
  const carried = await page.evaluate(() => {
    const w = (window as any).THR.work;
    for (let n = 0; n < 6 && !w.full; n++) { w.step(1); w.hold(); w.holdT = (w.zoneAt + 0.02) * 0.9; w.release(); }
    return { full: w.full, slow: w.speedFactor };
  });
  expect(carried).toEqual({ full: true, slow: 0.9 });
  // the first errand comes after 8 seconds: carry the load there
  const site = await page.evaluate(() => { const x = (window as any).THR.errands; x.step(9); const s = x.active.site; return { x: s.x, z: s.z }; });
  await go(site.x - 0.5, site.z - 0.8);
  await expect(cap).toHaveText("Deliver");
  await page.keyboard.press("Space");
  await expect.poll(() => page.evaluate(() => { const W = (window as any).THR; return { coin: W.work.stats.coin, loads: W.work.stats.fullLoads, errandLoads: W.errands.stats.loads }; }))
    .toEqual({ coin: 3, loads: 1, errandLoads: 1 });
  await expect(page.locator("#track")).toContainText("1/");
  await page.screenshot({ path: "browser-check/results/p-work.png" });
  expect(errors).toEqual([]);
});

test("P-WORK 2: the Test drawer switches back to the beat ring", async ({ page }) => {
  const errors: string[] = [];
  await page.setViewportSize({ width: 844, height: 390 });
  await open(page, errors);
  await page.locator("#testB").click();
  await page.getByRole("button", { name: /^Chop: big swing/ }).click();
  await expect(page.getByRole("button", { name: /^Chop: beat ring/ })).toBeVisible();
  const t = await page.evaluate(() => { const W = (window as any).THR, t = W.work.trees[1]; W.me.root.position.x = t.x + 1.4; W.me.root.position.z = t.z - 1.3; return W.work.style; });
  expect(t).toBe("beat");
  await page.keyboard.press("Escape"); await page.keyboard.press("Escape"); // drawer and pause closed
  await expect(page.locator("#actC")).toHaveText("Chop");
  await page.keyboard.press("Space");
  await expect(page.locator("#actC")).toHaveText("On the beat");
  await expect(page.locator("#ring")).toBeVisible();
  expect(errors).toEqual([]);
});
