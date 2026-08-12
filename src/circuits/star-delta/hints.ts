import { Hint } from "../../types/circuit";

export const starDeltaHints: Hint[] = [
  // Level 1 Hints
  {
    id: "hint-l1-1",
    level: 1,
    title: "Litar Kuasa Utama",
    message: "Mulakan dengan menyambung punca bekalan 3-fasa (L1, L2, L3) ke MCB 3-Fasa terlebih dahulu.",
    highlightComponents: ["power-src", "mcb"],
  },
  {
    id: "hint-l1-2",
    level: 1,
    title: "Sambungan Gelung Neutral",
    message: "Pastikan semua terminal A2 pada KM1, KM2, KM3 dan Timer disambung ke bas Neutral N.",
    highlightComponents: ["power-src", "km1", "km2", "km3", "timer"],
  },
  {
    id: "hint-l1-3",
    level: 1,
    title: "Litar Pintas Bintang (Star Bridge)",
    message: "Kontaktor KM2 memerlukan pintar terminal T1-T2-T3 untuk membentuk titik neutral motor Bintang.",
    highlightComponents: ["km2"],
  },

  // Level 2 Hints
  {
    id: "hint-l2-1",
    level: 2,
    title: "Sambungan Relay Beban Lampau (OLR)",
    message: "Sambungkan keluaran KM1 (T1, T2, T3) ke sebelah atas OLR (1/L1, 3/L2, 5/L3), dan keluaran OLR ke U1, V1, W1 motor.",
    highlightComponents: ["km1", "olr", "motor"],
  },
  {
    id: "hint-l2-2",
    level: 2,
    title: "Litar Kawalan Butang Tekan",
    message: "Sambungkan fasa kawalan dari OLR 96 NC -> STOP IN/OUT -> START IN -> START OUT -> KM1 A1 & Timer A1.",
    highlightComponents: ["olr", "stop-btn", "start-btn", "km1", "timer"],
  },
  {
    id: "hint-l2-3",
    level: 2,
    title: "Sambungan Pemasa ke Kontaktor",
    message: "Timer NC (16) menyambungkan gelung KM2 (Star), manakala Timer NO (18) menyambungkan gelung KM3 (Delta).",
    highlightComponents: ["timer", "km2", "km3"],
  },

  // Level 3 Hints
  {
    id: "hint-l3-1",
    level: 3,
    title: "Langkah Tepat Pendawaian Motor Star-Delta",
    message: "Sambungkan KM3 T1 ke W2, KM3 T2 ke U2, KM3 T3 ke V2. Kemudian sambungkan KM3 T1/T2/T3 ke KM2 L1/L2/L3.",
    highlightTerminals: ["KM3-T1", "KM3-T2", "KM3-T3", "MOTOR-W2", "MOTOR-U2", "MOTOR-V2", "KM2-L1", "KM2-L2", "KM2-L3"],
  },
  {
    id: "hint-l3-2",
    level: 3,
    title: "Langkah Tepat Terminal Pintas KM2",
    message: "Sambung wayar secara terus dari KM2-T1 ke KM2-T2 dan dari KM2-T2 ke KM2-T3.",
    highlightTerminals: ["KM2-T1", "KM2-T2", "KM2-T3"],
  },
];
