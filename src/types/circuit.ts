export type ComponentType =
  | "MCB"
  | "CONTACTOR"
  | "TIMER"
  | "OVERLOAD"
  | "PUSH_BUTTON"
  | "LAMP"
  | "LED"
  | "MOTOR"
  | "TERMINAL_BLOCK"
  | "POWER_SOURCE";

export type TerminalType =
  | "POWER"
  | "CONTROL"
  | "COIL"
  | "CONTACT"
  | "MOTOR"
  | "GROUND"
  | "NEUTRAL";

export interface Terminal {
  id: string;
  componentId: string;
  name: string;
  type: TerminalType;
  x: number; // offset relative to component position
  y: number; // offset relative to component position
  electricalRole?: string;
  maxConnections?: number;
  polarity?: "L" | "N" | "NONE" | "L1" | "L2" | "L3";
}

export interface CircuitComponent {
  id: string;
  type: ComponentType;
  name: string;
  label?: string;
  position: {
    x: number;
    y: number;
  };
  width?: number;
  height?: number;
  rotation?: number;
  terminals: Terminal[];
  state?: Record<string, unknown>;
  locked?: boolean;
}

export interface Wire {
  id: string;
  from: string; // Terminal ID
  to: string;   // Terminal ID
  active: boolean;
  valid?: boolean;
  error?: string;
  color?: string;
}

export interface DraftWire {
  fromTerminalId: string;
  currentX: number;
  currentY: number;
}

export type ApplicationMode = "DESIGN" | "SIMULATION";

export type MachineState =
  | "OFF"
  | "STARTING"
  | "STAR"
  | "TRANSITION"
  | "DELTA"
  | "FAULT";

export interface SimulatorState {
  mode: ApplicationMode;
  machine: MachineState;
  mcb: boolean;
  startButton: boolean;
  stopButton: boolean;
  overload: boolean;
  timer: {
    enabled: boolean;
    elapsed: number;
    duration: number; // in milliseconds (default 5000)
    running: boolean;
  };
  contactors: {
    KM1: boolean;
    KM2: boolean;
    KM3: boolean;
  };
  motor: {
    running: boolean;
    mode: "STOPPED" | "STAR" | "DELTA" | "FAULT";
    speed: number; // 0 to 100
  };
  lamps: {
    power: boolean;
    star: boolean;
    delta: boolean;
    fault: boolean;
  };
  speedMultiplier: number;
  viewMode: "REAL" | "VECTOR";
  faultMessage?: string;
}

export type RuleType = "REQUIRED" | "FORBIDDEN" | "ONE_OF" | "SAME_NET" | "INTERLOCK";

export interface ConnectionRule {
  id: string;
  type?: RuleType;
  from: string; // Terminal ID or network descriptor
  to: string;   // Terminal ID or network descriptor
  required: boolean;
  description: string;
  category?: "POWER" | "CONTROL";
}

export type ErrorSeverity = "INFO" | "WARNING" | "ERROR";

export interface CircuitError {
  id: string;
  type:
    | "MISSING_CONNECTION"
    | "INVALID_CONNECTION"
    | "SHORT_CIRCUIT"
    | "INTERLOCK"
    | "NO_POWER"
    | "OVERLOAD"
    | "INVALID_SEQUENCE";
  severity: ErrorSeverity;
  message: string;
  terminals?: string[];
}

export interface ValidationResult {
  valid: boolean;
  completion: number; // 0 to 100
  satisfiedCount: number;
  totalRulesCount: number;
  missing: ConnectionRule[];
  incorrect: Wire[];
  errors: CircuitError[];
}

export interface ScoringConfig {
  maxScore: number;
  connectionPoints: number;
  incorrectConnectionPenalty: number;
  hintPenalty: number;
  completionBonus: number;
  simulationBonus: number;
}

export interface Hint {
  id: string;
  level: 1 | 2 | 3;
  title: string;
  message: string;
  highlightTerminals?: string[];
  highlightComponents?: string[];
}
