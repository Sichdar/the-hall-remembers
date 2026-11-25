// Offline and Home Screen (docs/08, section 8): after the first visit the game opens without a connection.
// Only in the published build; while developing, the newest code must always load.
export function registerOffline(): void {
  if (!import.meta.env.PROD || !("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => { /* offline play is a bonus, never a reason to fail */ });
  });
}
