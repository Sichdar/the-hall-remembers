// No browser zoom (docs/07). iPhone Safari ignores user-scalable=no, so its pinch gestures are blocked here,
// and a quick second tap on a part of the HUD that isn't a button (bars, panels, text) is stopped before it can zoom.
const stop = (e: Event) => e.preventDefault();
for (const t of ["gesturestart", "gesturechange", "gestureend"]) document.addEventListener(t, stop, { passive: false });

let lastEnd = 0;
document.addEventListener("touchend", e => {
  const now = e.timeStamp, quick = now - lastEnd < 350;
  lastEnd = now;
  if (!quick || e.touches.length || e.changedTouches.length !== 1) return;
  const t = e.target;
  if (!(t instanceof Element) || t.closest("button, a, input, select, textarea, label, [role=button], canvas, #touch, #ring")) return;
  e.preventDefault();
}, { passive: false });

export {};
