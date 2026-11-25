// The game's starting point (M0). Order matters: the no-zoom guard first, then the world, then the interface,
// which reads the world through window.THR (docs/08, section 3).
import "./style.css";
import "./no-zoom";
import "./mockup/street.js";
import "./mockup/hud.css";
import "./mockup/hud.js";
import { registerOffline } from "./offline";

registerOffline();
