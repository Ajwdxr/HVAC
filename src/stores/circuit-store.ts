import { useState, useEffect, useCallback, useRef } from "react";
import {
  CircuitComponent,
  Wire,
  SimulatorState,
  ValidationResult,
  Hint,
  ApplicationMode,
} from "../types/circuit";
import { starDeltaCircuitDefinition } from "../circuits/star-delta/definition";
import { validateCircuit } from "../engine/connection-validator";
import {
  initialSimulatorState,
  starDeltaReducer,
  MachineAction,
} from "../engine/star-delta-machine";
import { ScoringEngine } from "../engine/scoring-engine";
import { getWireColor } from "../lib/circuit-utils";

export interface DraftWire {
  fromTerminalId: string;
  currentX: number;
  currentY: number;
}

export function useCircuitStore() {
  const [components, setComponents] = useState<CircuitComponent[]>(
    starDeltaCircuitDefinition.components
  );
  const [wires, setWires] = useState<Wire[]>([]);
  const [draftWire, setDraftWire] = useState<DraftWire | null>(null);
  const [selectedWireId, setSelectedWireId] = useState<string | null>(null);

  const [simulatorState, setSimulatorState] = useState<SimulatorState>(
    initialSimulatorState()
  );

  const [validationResult, setValidationResult] = useState<ValidationResult>({
    valid: false,
    completion: 0,
    satisfiedCount: 0,
    totalRulesCount: starDeltaCircuitDefinition.rules.length,
    missing: starDeltaCircuitDefinition.rules,
    incorrect: [],
    errors: [],
  });

  const scoringRef = useRef(new ScoringEngine());
  const [score, setScore] = useState(0);
  const [activeHint, setActiveHint] = useState<Hint | null>(null);
  const [currentHintLevel, setCurrentHintLevel] = useState<number>(0);

  // Validate circuit whenever wires or components update
  useEffect(() => {
    const result = validateCircuit(
      components,
      wires,
      starDeltaCircuitDefinition.rules
    );
    setValidationResult(result);
  }, [components, wires]);

  // Simulation tick timer effect
  useEffect(() => {
    if (!simulatorState.timer.running && simulatorState.machine !== "TRANSITION") {
      return;
    }

    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      setSimulatorState((prev) => {
        const nextState = starDeltaReducer(prev, {
          type: "TICK",
          deltaTime,
        });

        // Check if transition to Delta is triggered
        if (nextState.machine === "TRANSITION" && prev.machine === "STAR") {
          setTimeout(() => {
            setSimulatorState((p) =>
              starDeltaReducer(p, { type: "TRANSITION_COMPLETE" })
            );
          }, 300); // 300ms interlock dead time delay
        }

        return nextState;
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [simulatorState.timer.running, simulatorState.machine]);

  // Update position of a dragged component
  const updateComponentPosition = useCallback((id: string, x: number, y: number) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, position: { x, y } } : c))
    );
  }, []);

  // Add a new wire
  const addWire = useCallback(
    (fromTerminalId: string, toTerminalId: string) => {
      if (fromTerminalId === toTerminalId) return;

      // Prevent duplicate wire between exact same terminals
      const exists = wires.some(
        (w) =>
          (w.from === fromTerminalId && w.to === toTerminalId) ||
          (w.from === toTerminalId && w.to === fromTerminalId)
      );

      if (exists) return;

      // Find terminal polarities to compute wire color
      let term1, term2;
      for (const comp of components) {
        for (const t of comp.terminals) {
          if (t.id === fromTerminalId) term1 = t;
          if (t.id === toTerminalId) term2 = t;
        }
      }

      const color = getWireColor(term1, term2);

      const newWire: Wire = {
        id: `wire-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        from: fromTerminalId,
        to: toTerminalId,
        active: false,
        valid: true,
        color,
      };

      setWires((prev) => [...prev, newWire]);

      // Check validation & score
      const newWires = [...wires, newWire];
      const val = validateCircuit(
        components,
        newWires,
        starDeltaCircuitDefinition.rules
      );
      scoringRef.current.recordConnection(val.incorrect.length === 0);
      setScore(scoringRef.current.getScore());
    },
    [wires, components]
  );

  // Auto-connect full circuit automatically for instant simulation testing
  const autoConnectCircuit = useCallback(() => {
    const autoWires: Wire[] = starDeltaCircuitDefinition.rules.map((rule, idx) => {
      let term1, term2;
      for (const comp of starDeltaCircuitDefinition.components) {
        for (const t of comp.terminals) {
          if (t.id === rule.from) term1 = t;
          if (t.id === rule.to) term2 = t;
        }
      }
      return {
        id: `auto-wire-${idx}-${Date.now()}`,
        from: rule.from,
        to: rule.to,
        active: false,
        valid: true,
        color: getWireColor(term1, term2),
      };
    });

    setWires(autoWires);
    const val = validateCircuit(
      components,
      autoWires,
      starDeltaCircuitDefinition.rules
    );
    setValidationResult(val);
  }, [components]);

  const removeWire = useCallback((wireId: string) => {
    setWires((prev) => prev.filter((w) => w.id !== wireId));
    setSelectedWireId(null);
  }, []);

  const clearAllWires = useCallback(() => {
    setWires([]);
    setSelectedWireId(null);
    setComponents(starDeltaCircuitDefinition.components);
    setSimulatorState(initialSimulatorState());
  }, []);

  const dispatchAction = useCallback((action: MachineAction) => {
    setSimulatorState((prev) => starDeltaReducer(prev, action));
  }, []);

  const setMode = useCallback(
    (mode: ApplicationMode) => {
      if (mode === "SIMULATION" && !validationResult.valid) {
        const confirmAuto = window.confirm(
          "Litar belum lengkap (Sambungan wayar belum 100%).\n\nAdakah anda ingin menyambung semua wayar secara automatik (Auto-Wire) untuk terus menguji Mod Simulasi?"
        );
        if (confirmAuto) {
          autoConnectCircuit();
          setSimulatorState((prev) => ({
            ...prev,
            mode: "SIMULATION",
            machine: "OFF",
            contactors: { KM1: false, KM2: false, KM3: false },
            motor: { running: false, mode: "STOPPED", speed: 0 },
            lamps: { power: false, star: false, delta: false, fault: false },
          }));
        }
        return;
      }

      setSimulatorState((prev) => ({
        ...prev,
        mode,
        machine: "OFF",
        contactors: { KM1: false, KM2: false, KM3: false },
        motor: { running: false, mode: "STOPPED", speed: 0 },
        lamps: { power: false, star: false, delta: false, fault: false },
      }));
    },
    [validationResult.valid, autoConnectCircuit]
  );

  const requestNextHint = useCallback(() => {
    const hints = starDeltaCircuitDefinition.hints;
    const nextLevel = Math.min(3, currentHintLevel + 1);
    const hint = hints.find((h) => h.level === nextLevel) || hints[0];
    setCurrentHintLevel(nextLevel);
    setActiveHint(hint);
    scoringRef.current.recordHintUsed();
    setScore(scoringRef.current.getScore());
  }, [currentHintLevel]);

  const setSpeedMultiplier = useCallback((speed: number) => {
    setSimulatorState((prev) => ({ ...prev, speedMultiplier: speed }));
  }, []);

  return {
    components,
    wires,
    draftWire,
    selectedWireId,
    simulatorState,
    validationResult,
    score,
    activeHint,
    currentHintLevel,
    setDraftWire,
    setSelectedWireId,
    updateComponentPosition,
    addWire,
    autoConnectCircuit,
    removeWire,
    clearAllWires,
    dispatchAction,
    setMode,
    requestNextHint,
    setActiveHint,
    setSpeedMultiplier,
  };
}
