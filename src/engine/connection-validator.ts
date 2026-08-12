import {
  CircuitComponent,
  Wire,
  ConnectionRule,
  ValidationResult,
  CircuitError,
} from "../types/circuit";
import { CircuitGraph } from "./circuit-graph";

export function validateCircuit(
  _components: CircuitComponent[],
  wires: Wire[],
  rules: ConnectionRule[]
): ValidationResult {
  const graph = new CircuitGraph();
  graph.buildGraph(wires);

  const missing: ConnectionRule[] = [];
  const errors: CircuitError[] = [];
  let satisfiedCount = 0;

  for (const rule of rules) {
    if (graph.areConnected(rule.from, rule.to)) {
      satisfiedCount++;
    } else {
      if (rule.required) {
        missing.push(rule);
      }
    }
  }

  const totalRulesCount = rules.length;
  const completionPercentage = Math.round(
    (satisfiedCount / Math.max(1, totalRulesCount)) * 100
  );

  // Identify incorrect wires (wires connecting terminals that are not allowed or not matching any rule)
  const incorrectWires: Wire[] = [];

  for (const wire of wires) {
    // Check if this wire helps satisfy any rule
    const matchesAnyRule = rules.some((rule) => {
      return (
        (rule.from === wire.from && rule.to === wire.to) ||
        (rule.from === wire.to && rule.to === wire.from) ||
        graph.areConnected(rule.from, rule.to)
      );
    });

    // Check for short circuits (e.g. connecting Phase L1 directly to Neutral N or another phase directly)
    const isShortCircuit =
      (wire.from.startsWith("L1") && wire.to.startsWith("N")) ||
      (wire.from.startsWith("N") && wire.to.startsWith("L1")) ||
      (wire.from.startsWith("L1") && wire.to.startsWith("L2")) ||
      (wire.from.startsWith("L2") && wire.to.startsWith("L3"));

    if (isShortCircuit) {
      incorrectWires.push(wire);
      errors.push({
        id: `err-short-${wire.id}`,
        type: "SHORT_CIRCUIT",
        severity: "ERROR",
        message: `Sambungan wayar ${wire.from} ke ${wire.to} menyebabkan Litar Pintas!`,
        terminals: [wire.from, wire.to],
      });
    } else if (!matchesAnyRule && wires.length > 5) {
      // Flag suspicious wires if user has connected many random wires
      wire.valid = false;
    }
  }

  if (missing.length > 0 && wires.length > 0) {
    errors.push({
      id: "err-incomplete",
      type: "MISSING_CONNECTION",
      severity: "WARNING",
      message: `Litar belum lengkap (${satisfiedCount}/${totalRulesCount} sambungan betul).`,
    });
  }

  const isFullyValid = completionPercentage >= 100 && incorrectWires.length === 0;

  return {
    valid: isFullyValid,
    completion: completionPercentage,
    satisfiedCount,
    totalRulesCount,
    missing,
    incorrect: incorrectWires,
    errors,
  };
}
