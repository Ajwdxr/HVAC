import { CircuitComponent, Terminal } from "../types/circuit";

export interface Point {
  x: number;
  y: number;
}

/**
 * Calculates absolute SVG coordinates for a given terminal.
 */
export function getTerminalAbsolutePosition(
  component: CircuitComponent,
  terminal: Terminal
): Point {
  return {
    x: component.position.x + terminal.x,
    y: component.position.y + terminal.y,
  };
}

/**
 * Generates an SVG cubic Bezier curve path string between two points.
 */
export function generateWirePath(p1: Point, p2: Point): string {
  const dx = Math.abs(p2.x - p1.x);
  const dy = Math.abs(p2.y - p1.y);
  
  // Calculate control points based on orientation and distance
  let cp1x = p1.x;
  let cp1y = p1.y;
  let cp2x = p2.x;
  let cp2y = p2.y;

  const controlOffset = Math.max(40, Math.min(150, (dx + dy) * 0.4));

  if (dy > dx) {
    // Primarily vertical separation
    cp1y = p1.y < p2.y ? p1.y + controlOffset : p1.y - controlOffset;
    cp2y = p2.y < p1.y ? p2.y + controlOffset : p2.y - controlOffset;
  } else {
    // Primarily horizontal separation
    cp1x = p1.x < p2.x ? p1.x + controlOffset : p1.x - controlOffset;
    cp2x = p2.x < p1.x ? p2.x + controlOffset : p2.x - controlOffset;
  }

  return `M ${p1.x} ${p1.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
}

/**
 * Returns a standard color code for wire based on terminal polarity/role.
 */
export function getWireColor(term1?: Terminal, term2?: Terminal): string {
  if (term1?.polarity === "L1" || term2?.polarity === "L1") return "#ef4444"; // Red (Phase L1)
  if (term1?.polarity === "L2" || term2?.polarity === "L2") return "#eab308"; // Yellow (Phase L2)
  if (term1?.polarity === "L3" || term2?.polarity === "L3") return "#3b82f6"; // Blue (Phase L3)
  if (term1?.polarity === "N" || term2?.polarity === "N") return "#06b6d4";   // Cyan/Blue (Neutral)
  if (term1?.type === "CONTROL" || term2?.type === "CONTROL") return "#d97706"; // Amber (Control)
  return "#e2e8f0"; // Default light silver
}

/**
 * Format milliseconds to a timer string (e.g. 4.2s)
 */
export function formatTime(ms: number): string {
  return (ms / 1000).toFixed(1) + "s";
}
