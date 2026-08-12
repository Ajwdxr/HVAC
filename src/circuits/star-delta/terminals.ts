import { Terminal } from "../../types/circuit";

// MCB Terminals
export const mcbTerminals: Terminal[] = [
  { id: "MCB-L1-IN", componentId: "mcb", name: "L1 IN", type: "POWER", x: 20, y: 15, polarity: "L1" },
  { id: "MCB-L2-IN", componentId: "mcb", name: "L2 IN", type: "POWER", x: 50, y: 15, polarity: "L2" },
  { id: "MCB-L3-IN", componentId: "mcb", name: "L3 IN", type: "POWER", x: 80, y: 15, polarity: "L3" },
  { id: "MCB-L1-OUT", componentId: "mcb", name: "L1 OUT", type: "POWER", x: 20, y: 105, polarity: "L1" },
  { id: "MCB-L2-OUT", componentId: "mcb", name: "L2 OUT", type: "POWER", x: 50, y: 105, polarity: "L2" },
  { id: "MCB-L3-OUT", componentId: "mcb", name: "L3 OUT", type: "POWER", x: 80, y: 105, polarity: "L3" },
];

// KM1 Main Contactor Terminals
export const km1Terminals: Terminal[] = [
  { id: "KM1-L1", componentId: "km1", name: "1/L1", type: "POWER", x: 20, y: 15, polarity: "L1" },
  { id: "KM1-L2", componentId: "km1", name: "3/L2", type: "POWER", x: 50, y: 15, polarity: "L2" },
  { id: "KM1-L3", componentId: "km1", name: "5/L3", type: "POWER", x: 80, y: 15, polarity: "L3" },
  { id: "KM1-T1", componentId: "km1", name: "2/T1", type: "POWER", x: 20, y: 105, polarity: "L1" },
  { id: "KM1-T2", componentId: "km1", name: "4/T2", type: "POWER", x: 50, y: 105, polarity: "L2" },
  { id: "KM1-T3", componentId: "km1", name: "6/T3", type: "POWER", x: 80, y: 105, polarity: "L3" },
  { id: "KM1-A1", componentId: "km1", name: "A1", type: "COIL", x: 105, y: 35, polarity: "L" },
  { id: "KM1-A2", componentId: "km1", name: "A2", type: "COIL", x: 105, y: 85, polarity: "N" },
];

// KM2 Star Contactor Terminals
export const km2Terminals: Terminal[] = [
  { id: "KM2-L1", componentId: "km2", name: "1/L1", type: "POWER", x: 20, y: 15, polarity: "L1" },
  { id: "KM2-L2", componentId: "km2", name: "3/L2", type: "POWER", x: 50, y: 15, polarity: "L2" },
  { id: "KM2-L3", componentId: "km2", name: "5/L3", type: "POWER", x: 80, y: 15, polarity: "L3" },
  { id: "KM2-T1", componentId: "km2", name: "2/T1", type: "POWER", x: 20, y: 105, polarity: "L1" },
  { id: "KM2-T2", componentId: "km2", name: "4/T2", type: "POWER", x: 50, y: 105, polarity: "L2" },
  { id: "KM2-T3", componentId: "km2", name: "6/T3", type: "POWER", x: 80, y: 105, polarity: "L3" },
  { id: "KM2-A1", componentId: "km2", name: "A1", type: "COIL", x: 105, y: 35, polarity: "L" },
  { id: "KM2-A2", componentId: "km2", name: "A2", type: "COIL", x: 105, y: 85, polarity: "N" },
];

// KM3 Delta Contactor Terminals
export const km3Terminals: Terminal[] = [
  { id: "KM3-L1", componentId: "km3", name: "1/L1", type: "POWER", x: 20, y: 15, polarity: "L1" },
  { id: "KM3-L2", componentId: "km3", name: "3/L2", type: "POWER", x: 50, y: 15, polarity: "L2" },
  { id: "KM3-L3", componentId: "km3", name: "5/L3", type: "POWER", x: 80, y: 15, polarity: "L3" },
  { id: "KM3-T1", componentId: "km3", name: "2/T1", type: "POWER", x: 20, y: 105, polarity: "L1" },
  { id: "KM3-T2", componentId: "km3", name: "4/T2", type: "POWER", x: 50, y: 105, polarity: "L2" },
  { id: "KM3-T3", componentId: "km3", name: "6/T3", type: "POWER", x: 80, y: 105, polarity: "L3" },
  { id: "KM3-A1", componentId: "km3", name: "A1", type: "COIL", x: 105, y: 35, polarity: "L" },
  { id: "KM3-A2", componentId: "km3", name: "A2", type: "COIL", x: 105, y: 85, polarity: "N" },
];

// Star-Delta Timer Terminals
export const timerTerminals: Terminal[] = [
  { id: "TIMER-A1", componentId: "timer", name: "A1", type: "COIL", x: 20, y: 15, polarity: "L" },
  { id: "TIMER-A2", componentId: "timer", name: "A2", type: "COIL", x: 80, y: 15, polarity: "N" },
  { id: "TIMER-COM", componentId: "timer", name: "15/COM", type: "CONTROL", x: 20, y: 95, polarity: "L" },
  { id: "TIMER-NC", componentId: "timer", name: "16/NC", type: "CONTROL", x: 50, y: 95, polarity: "L" },
  { id: "TIMER-NO", componentId: "timer", name: "18/NO", type: "CONTROL", x: 80, y: 95, polarity: "L" },
];

// Overload Relay Terminals
export const olrTerminals: Terminal[] = [
  { id: "OLR-L1-IN", componentId: "olr", name: "1/L1", type: "POWER", x: 20, y: 15, polarity: "L1" },
  { id: "OLR-L2-IN", componentId: "olr", name: "3/L2", type: "POWER", x: 50, y: 15, polarity: "L2" },
  { id: "OLR-L3-IN", componentId: "olr", name: "5/L3", type: "POWER", x: 80, y: 15, polarity: "L3" },
  { id: "OLR-T1-OUT", componentId: "olr", name: "2/T1", type: "POWER", x: 20, y: 105, polarity: "L1" },
  { id: "OLR-T2-OUT", componentId: "olr", name: "4/T2", type: "POWER", x: 50, y: 105, polarity: "L2" },
  { id: "OLR-T3-OUT", componentId: "olr", name: "6/T3", type: "POWER", x: 80, y: 105, polarity: "L3" },
  { id: "OLR-95", componentId: "olr", name: "95 NC", type: "CONTROL", x: 105, y: 35, polarity: "L" },
  { id: "OLR-96", componentId: "olr", name: "96 NC", type: "CONTROL", x: 105, y: 85, polarity: "L" },
];

// START Button Terminals
export const startButtonTerminals: Terminal[] = [
  { id: "START-IN", componentId: "start-btn", name: "13 NO", type: "CONTROL", x: 30, y: 15, polarity: "L" },
  { id: "START-OUT", componentId: "start-btn", name: "14 NO", type: "CONTROL", x: 30, y: 65, polarity: "L" },
];

// STOP Button Terminals
export const stopButtonTerminals: Terminal[] = [
  { id: "STOP-IN", componentId: "stop-btn", name: "11 NC", type: "CONTROL", x: 30, y: 15, polarity: "L" },
  { id: "STOP-OUT", componentId: "stop-btn", name: "12 NC", type: "CONTROL", x: 30, y: 65, polarity: "L" },
];

// Indicator Lamp Terminals
export const lampPowerTerminals: Terminal[] = [
  { id: "LAMP-POWER-IN", componentId: "lamp-power", name: "X1", type: "CONTROL", x: 20, y: 15, polarity: "L" },
  { id: "LAMP-POWER-OUT", componentId: "lamp-power", name: "X2", type: "NEUTRAL", x: 20, y: 65, polarity: "N" },
];

export const lampStarTerminals: Terminal[] = [
  { id: "LAMP-STAR-IN", componentId: "lamp-star", name: "X1", type: "CONTROL", x: 20, y: 15, polarity: "L" },
  { id: "LAMP-STAR-OUT", componentId: "lamp-star", name: "X2", type: "NEUTRAL", x: 20, y: 65, polarity: "N" },
];

export const lampDeltaTerminals: Terminal[] = [
  { id: "LAMP-DELTA-IN", componentId: "lamp-delta", name: "X1", type: "CONTROL", x: 20, y: 15, polarity: "L" },
  { id: "LAMP-DELTA-OUT", componentId: "lamp-delta", name: "X2", type: "NEUTRAL", x: 20, y: 65, polarity: "N" },
];

export const lampFaultTerminals: Terminal[] = [
  { id: "LAMP-FAULT-IN", componentId: "lamp-fault", name: "X1", type: "CONTROL", x: 20, y: 15, polarity: "L" },
  { id: "LAMP-FAULT-OUT", componentId: "lamp-fault", name: "X2", type: "NEUTRAL", x: 20, y: 65, polarity: "N" },
];

// 3-Phase Motor Terminals
export const motorTerminals: Terminal[] = [
  { id: "MOTOR-U1", componentId: "motor", name: "U1", type: "MOTOR", x: 25, y: 20, polarity: "L1" },
  { id: "MOTOR-V1", componentId: "motor", name: "V1", type: "MOTOR", x: 65, y: 20, polarity: "L2" },
  { id: "MOTOR-W1", componentId: "motor", name: "W1", type: "MOTOR", x: 105, y: 20, polarity: "L3" },
  { id: "MOTOR-W2", componentId: "motor", name: "W2", type: "MOTOR", x: 25, y: 140, polarity: "L1" },
  { id: "MOTOR-U2", componentId: "motor", name: "U2", type: "MOTOR", x: 65, y: 140, polarity: "L2" },
  { id: "MOTOR-V2", componentId: "motor", name: "V2", type: "MOTOR", x: 105, y: 140, polarity: "L3" },
];

// Main Power Source Terminals
export const powerSourceTerminals: Terminal[] = [
  { id: "L1", componentId: "power-src", name: "L1 (R)", type: "POWER", x: 20, y: 25, polarity: "L1" },
  { id: "L2", componentId: "power-src", name: "L2 (S)", type: "POWER", x: 60, y: 25, polarity: "L2" },
  { id: "L3", componentId: "power-src", name: "L3 (T)", type: "POWER", x: 100, y: 25, polarity: "L3" },
  { id: "N", componentId: "power-src", name: "N", type: "NEUTRAL", x: 140, y: 25, polarity: "N" },
];
