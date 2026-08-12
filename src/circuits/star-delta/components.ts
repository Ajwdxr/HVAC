import { CircuitComponent } from "../../types/circuit";
import {
  powerSourceTerminals,
  mcbTerminals,
  km1Terminals,
  km2Terminals,
  km3Terminals,
  timerTerminals,
  olrTerminals,
  startButtonTerminals,
  stopButtonTerminals,
  lampPowerTerminals,
  lampStarTerminals,
  lampDeltaTerminals,
  lampFaultTerminals,
  motorTerminals,
} from "./terminals";

export const initialComponents: CircuitComponent[] = [
  // 1. Power Source (Top Left)
  {
    id: "power-src",
    type: "POWER_SOURCE",
    name: "Bekalan Kuasa 3-Fasa (415V / 230V)",
    label: "POWER SUPPLY",
    position: { x: 50, y: 30 },
    width: 170,
    height: 60,
    terminals: powerSourceTerminals,
    locked: true,
  },

  // 2. 3-Phase MCB (Below Power Source)
  {
    id: "mcb",
    type: "MCB",
    name: "MCB 3-Fasa",
    label: "MCB 3P",
    position: { x: 50, y: 130 },
    width: 110,
    height: 120,
    terminals: mcbTerminals,
  },

  // 3. Main Contactor KM1
  {
    id: "km1",
    type: "CONTACTOR",
    name: "Kontaktor Utama (KM1)",
    label: "KM1 (MAIN)",
    position: { x: 50, y: 290 },
    width: 130,
    height: 120,
    terminals: km1Terminals,
  },

  // 4. Overload Relay OLR (Below KM1)
  {
    id: "olr",
    type: "OVERLOAD",
    name: "Relay Beban Lampau (OLR)",
    label: "OLR",
    position: { x: 50, y: 450 },
    width: 130,
    height: 120,
    terminals: olrTerminals,
  },

  // 5. Delta Contactor KM3 (Middle Column)
  {
    id: "km3",
    type: "CONTACTOR",
    name: "Kontaktor Delta (KM3)",
    label: "KM3 (DELTA)",
    position: { x: 230, y: 290 },
    width: 130,
    height: 120,
    terminals: km3Terminals,
  },

  // 6. Star Contactor KM2 (Right of KM3)
  {
    id: "km2",
    type: "CONTACTOR",
    name: "Kontaktor Bintang (KM2)",
    label: "KM2 (STAR)",
    position: { x: 400, y: 290 },
    width: 130,
    height: 120,
    terminals: km2Terminals,
  },

  // 7. Star-Delta Electronic Timer (Top Middle/Right)
  {
    id: "timer",
    type: "TIMER",
    name: "Pemasa Bintang-Delta (Timer)",
    label: "TIMER (5s)",
    position: { x: 250, y: 130 },
    width: 110,
    height: 115,
    terminals: timerTerminals,
  },

  // 8. STOP Push Button (Control Section)
  {
    id: "stop-btn",
    type: "PUSH_BUTTON",
    name: "Butang Tekan Henti (NC)",
    label: "STOP (NC)",
    position: { x: 580, y: 130 },
    width: 80,
    height: 90,
    terminals: stopButtonTerminals,
  },

  // 9. START Push Button (Control Section)
  {
    id: "start-btn",
    type: "PUSH_BUTTON",
    name: "Butang Tekan Mula (NO)",
    label: "START (NO)",
    position: { x: 580, y: 250 },
    width: 80,
    height: 90,
    terminals: startButtonTerminals,
  },

  // 10-13. Indicator Lamps (Right Column)
  {
    id: "lamp-power",
    type: "LAMP",
    name: "Lampu Penunjuk Kuasa",
    label: "LP: POWER",
    position: { x: 700, y: 100 },
    width: 60,
    height: 80,
    terminals: lampPowerTerminals,
  },
  {
    id: "lamp-star",
    type: "LAMP",
    name: "Lampu Penunjuk Bintang (Star)",
    label: "LP: STAR",
    position: { x: 700, y: 190 },
    width: 60,
    height: 80,
    terminals: lampStarTerminals,
  },
  {
    id: "lamp-delta",
    type: "LAMP",
    name: "Lampu Penunjuk Delta",
    label: "LP: DELTA",
    position: { x: 700, y: 280 },
    width: 60,
    height: 80,
    terminals: lampDeltaTerminals,
  },
  {
    id: "lamp-fault",
    type: "LAMP",
    name: "Lampu Penunjuk Trip / Beban Lampau",
    label: "LP: FAULT",
    position: { x: 700, y: 370 },
    width: 60,
    height: 80,
    terminals: lampFaultTerminals,
  },

  // 14. 3-Phase Electric Motor (Bottom Right)
  {
    id: "motor",
    type: "MOTOR",
    name: "Motor A.U. 3-Fasa (6-Punang: U1,V1,W1, W2,U2,V2)",
    label: "3-PHASE MOTOR",
    position: { x: 250, y: 440 },
    width: 150,
    height: 160,
    terminals: motorTerminals,
  },
];
