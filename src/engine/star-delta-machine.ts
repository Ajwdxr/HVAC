import { SimulatorState, MachineState } from "../types/circuit";

export type MachineAction =
  | { type: "START" }
  | { type: "STOP" }
  | { type: "TOGGLE_MCB" }
  | { type: "TRIP_OVERLOAD" }
  | { type: "RESET_OVERLOAD" }
  | { type: "TIMER_EXPIRED" }
  | { type: "TRANSITION_COMPLETE" }
  | { type: "TICK"; deltaTime: number };

export function initialSimulatorState(): SimulatorState {
  return {
    mode: "DESIGN",
    machine: "OFF",
    mcb: true,
    startButton: false,
    stopButton: false,
    overload: false,
    timer: {
      enabled: true,
      elapsed: 0,
      duration: 5000, // 5 seconds default
      running: false,
    },
    contactors: {
      KM1: false,
      KM2: false,
      KM3: false,
    },
    motor: {
      running: false,
      mode: "STOPPED",
      speed: 0,
    },
    lamps: {
      power: false,
      star: false,
      delta: false,
      fault: false,
    },
    speedMultiplier: 1,
  };
}

export function starDeltaReducer(
  state: SimulatorState,
  action: MachineAction
): SimulatorState {
  // Strict Safety Interlock Check
  if (state.contactors.KM2 && state.contactors.KM3) {
    return {
      ...state,
      machine: "FAULT",
      contactors: { KM1: false, KM2: false, KM3: false },
      motor: { running: false, mode: "FAULT", speed: 0 },
      timer: { ...state.timer, running: false },
      lamps: { power: false, star: false, delta: false, fault: true },
      faultMessage: "⚠ INTERLOCK ERROR: Kontaktor Bintang (KM2) dan Delta (KM3) tidak boleh beroperasi serentak!",
    };
  }

  switch (action.type) {
    case "TOGGLE_MCB": {
      const nextMcb = !state.mcb;
      if (!nextMcb) {
        // Turning MCB off shuts down everything
        return {
          ...state,
          mcb: false,
          machine: "OFF",
          contactors: { KM1: false, KM2: false, KM3: false },
          motor: { running: false, mode: "STOPPED", speed: 0 },
          timer: { ...state.timer, running: false, elapsed: 0 },
          lamps: { power: false, star: false, delta: false, fault: state.overload },
        };
      }
      return { ...state, mcb: true };
    }

    case "START": {
      if (!state.mcb || state.overload || state.mode !== "SIMULATION") {
        return state;
      }
      // Energize Main (KM1) and Star (KM2) contactors
      return {
        ...state,
        machine: "STAR",
        startButton: true,
        stopButton: false,
        contactors: {
          KM1: true,
          KM2: true,
          KM3: false,
        },
        motor: {
          running: true,
          mode: "STAR",
          speed: 40, // 40% speed in STAR mode
        },
        timer: {
          ...state.timer,
          running: true,
          elapsed: 0,
        },
        lamps: {
          power: true,
          star: true,
          delta: false,
          fault: false,
        },
      };
    }

    case "STOP": {
      return {
        ...state,
        machine: "OFF",
        startButton: false,
        stopButton: true,
        contactors: {
          KM1: false,
          KM2: false,
          KM3: false,
        },
        motor: {
          running: false,
          mode: "STOPPED",
          speed: 0,
        },
        timer: {
          ...state.timer,
          running: false,
          elapsed: 0,
        },
        lamps: {
          power: false,
          star: false,
          delta: false,
          fault: state.overload,
        },
      };
    }

    case "TRIP_OVERLOAD": {
      return {
        ...state,
        overload: true,
        machine: "FAULT",
        contactors: { KM1: false, KM2: false, KM3: false },
        motor: { running: false, mode: "FAULT", speed: 0 },
        timer: { ...state.timer, running: false, elapsed: 0 },
        lamps: { power: false, star: false, delta: false, fault: true },
        faultMessage: "⚠ OVERLOAD TRIPPED: Motor terhenti. Sila reset beban lampau untuk meneruskan.",
      };
    }

    case "RESET_OVERLOAD": {
      return {
        ...state,
        overload: false,
        machine: "OFF",
        lamps: { ...state.lamps, fault: false },
        faultMessage: undefined,
      };
    }

    case "TICK": {
      if (!state.timer.running || state.machine === "OFF" || state.machine === "FAULT") {
        return state;
      }

      const scaledDelta = action.deltaTime * state.speedMultiplier;
      const newElapsed = state.timer.elapsed + scaledDelta;

      if (newElapsed >= state.timer.duration && state.machine === "STAR") {
        // Transition state: release KM2 first (interlock safety delay)
        return {
          ...state,
          machine: "TRANSITION",
          contactors: {
            KM1: true,
            KM2: false, // Release KM2
            KM3: false, // KM3 not yet ON
          },
          motor: { ...state.motor, speed: 50 },
          timer: { ...state.timer, elapsed: state.timer.duration, running: false },
          lamps: { power: true, star: false, delta: false, fault: false },
        };
      }

      return {
        ...state,
        timer: { ...state.timer, elapsed: newElapsed },
      };
    }

    case "TRANSITION_COMPLETE": {
      if (state.machine !== "TRANSITION") return state;
      // Switch into DELTA mode: KM1 ON, KM3 ON
      return {
        ...state,
        machine: "DELTA",
        contactors: {
          KM1: true,
          KM2: false,
          KM3: true,
        },
        motor: {
          running: true,
          mode: "DELTA",
          speed: 100, // 100% full speed in DELTA mode
        },
        lamps: {
          power: true,
          star: false,
          delta: true,
          fault: false,
        },
      };
    }

    default:
      return state;
  }
}
