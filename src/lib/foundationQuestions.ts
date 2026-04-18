// Question types and random generators for Foundation level

export type QType =
  | "identify_fraction"
  | "shade_fraction"
  | "compare_fractions"
  | "arithmetic"
  | "equivalent_fraction";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface IdentifyFractionQ {
  id: string;
  type: "identify_fraction";
  prompt: string;
  numerator: number;
  denominator: number;
  cols: number;
  rows: number;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface ShadeFractionQ {
  id: string;
  type: "shade_fraction";
  prompt: string;
  numerator: number;
  denominator: number;
  cols: number;
  rows: number;
  explanation: string;
}

export interface CompareFractionsQ {
  id: string;
  type: "compare_fractions";
  prompt: string;
  fractionA: [number, number];
  fractionB: [number, number];
  correctAnswer: "<" | "=" | ">";
  explanation: string;
}

export interface ArithmeticQ {
  id: string;
  type: "arithmetic";
  prompt: string;
  a: number;
  b: number;
  operation: "+" | "−" | "×";
  result: number;
  choices: number[];
  correctIndex: number;
  explanation: string;
}

export interface EquivalentFractionQ {
  id: string;
  type: "equivalent_fraction";
  prompt: string;
  knownNum: number;
  knownDen: number;
  knownCols: number;
  knownRows: number;
  targetDen: number;
  targetCols: number;
  targetRows: number;
  correctNum: number;
  choices: number[];
  explanation: string;
}

export type Question =
  | IdentifyFractionQ
  | ShadeFractionQ
  | CompareFractionsQ
  | ArithmeticQ
  | EquivalentFractionQ;

// ── Utilities ─────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 8);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Returns a tidy [cols, rows] grid layout for a given denominator. */
export function gridDims(den: number): [number, number] {
  const map: Record<number, [number, number]> = {
    2: [2, 1],
    3: [3, 1],
    4: [4, 1],
    5: [5, 1],
    6: [3, 2],
    7: [7, 1],
    8: [4, 2],
    9: [3, 3],
    10: [5, 2],
  };
  return map[den] ?? [den, 1];
}

const fracStr = (n: number, d: number) => `${n}/${d}`;

// All fractions used in questions (denominators ≤ 10)
const FRACTIONS: [number, number][] = [
  [1, 2],
  [1, 3],
  [2, 3],
  [1, 4],
  [3, 4],
  [1, 5],
  [2, 5],
  [3, 5],
  [4, 5],
  [1, 6],
  [5, 6],
  [1, 8],
  [3, 8],
  [5, 8],
  [1, 10],
  [3, 10],
  [7, 10],
];

// ── Generators ────────────────────────────────────────────────────────────────

function genIdentifyFraction(): IdentifyFractionQ {
  const [num, den] = pick(FRACTIONS);
  const [cols, rows] = gridDims(den);
  const correct = fracStr(num, den);
  const wrongs = shuffle(
    FRACTIONS.filter(([n, d]) => !(n === num && d === den)).map(([n, d]) =>
      fracStr(n, d)
    )
  ).slice(0, 3);
  const choices = shuffle([correct, ...wrongs]);
  return {
    id: uid(),
    type: "identify_fraction",
    prompt: "What fraction of the rectangle is shaded?",
    numerator: num,
    denominator: den,
    cols,
    rows,
    choices,
    correctIndex: choices.indexOf(correct),
    explanation: `${num} out of ${den} equal parts are shaded, so the answer is ${correct}.`,
  };
}

function genShadeFraction(): ShadeFractionQ {
  const [num, den] = pick(FRACTIONS.filter(([, d]) => d <= 8));
  const [cols, rows] = gridDims(den);
  return {
    id: uid(),
    type: "shade_fraction",
    prompt: `Tap to shade exactly ${num}/${den} of the rectangle.`,
    numerator: num,
    denominator: den,
    cols,
    rows,
    explanation: `Any ${num} of the ${den} squares is correct — it doesn't matter which ones you pick!`,
  };
}

function genCompare(): CompareFractionsQ {
  const a = pick(FRACTIONS);
  const b = pick(FRACTIONS.filter(([n, d]) => !(n === a[0] && d === a[1])));
  const va = a[0] / a[1];
  const vb = b[0] / b[1];
  const correct: "<" | "=" | ">" = va < vb ? "<" : va > vb ? ">" : "=";
  return {
    id: uid(),
    type: "compare_fractions",
    prompt: "Which symbol correctly compares these two fractions?",
    fractionA: a,
    fractionB: b,
    correctAnswer: correct,
    explanation: `${fracStr(...a)} ≈ ${va.toFixed(3)} and ${fracStr(...b)} ≈ ${vb.toFixed(3)}, so ${fracStr(...a)} ${correct} ${fracStr(...b)}.`,
  };
}

function genArithmetic(): ArithmeticQ {
  const op = pick(["+" , "−", "×"] as const);
  let a: number, b: number, result: number;
  if (op === "+") {
    a = Math.floor(Math.random() * 20) + 2;
    b = Math.floor(Math.random() * 20) + 2;
    result = a + b;
  } else if (op === "−") {
    result = Math.floor(Math.random() * 20) + 1;
    b = Math.floor(Math.random() * result) + 1;
    a = result + b;
  } else {
    a = Math.floor(Math.random() * 9) + 2;
    b = Math.floor(Math.random() * 9) + 2;
    result = a * b;
  }
  const wrongs = new Set<number>();
  const deltas = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  for (const d of deltas) {
    if (wrongs.size >= 3) break;
    if (result + d > 0) wrongs.add(result + d);
    if (wrongs.size < 3 && result - d > 0) wrongs.add(result - d);
  }
  const choices = shuffle([result, ...Array.from(wrongs).slice(0, 3)]);
  const opSymbol = op === "−" ? "−" : op;
  return {
    id: uid(),
    type: "arithmetic",
    prompt: `What is ${a} ${opSymbol} ${b}?`,
    a,
    b,
    operation: op,
    result,
    choices,
    correctIndex: choices.indexOf(result),
    explanation: `${a} ${opSymbol} ${b} = ${result}.`,
  };
}

function genEquivalent(): EquivalentFractionQ {
  const cases: [number, number, number][] = [
    [1, 2, 4],
    [1, 2, 6],
    [1, 2, 8],
    [1, 2, 10],
    [1, 3, 6],
    [1, 3, 9],
    [2, 3, 6],
    [2, 3, 9],
    [1, 4, 8],
    [3, 4, 8],
    [1, 5, 10],
    [2, 5, 10],
  ];
  const [kn, kd, td] = pick(cases);
  const multiplier = td / kd;
  const correct = kn * multiplier;
  const [knownCols, knownRows] = gridDims(kd);
  const [targetCols, targetRows] = gridDims(td);
  const wrongs = new Set<number>();
  for (let d = 1; wrongs.size < 3; d++) {
    if (correct + d <= td) wrongs.add(correct + d);
    if (wrongs.size < 3 && correct - d > 0) wrongs.add(correct - d);
    if (d > 20) break; // safety
  }
  const choices = shuffle([correct, ...Array.from(wrongs).slice(0, 3)]);
  return {
    id: uid(),
    type: "equivalent_fraction",
    prompt: `Fill in the missing number:   ${kn}/${kd}  =  ?/${td}`,
    knownNum: kn,
    knownDen: kd,
    knownCols,
    knownRows,
    targetDen: td,
    targetCols,
    targetRows,
    correctNum: correct,
    choices,
    explanation: `Multiply top and bottom by ${multiplier}: ${kn} × ${multiplier} = ${correct}, so ${kn}/${kd} = ${correct}/${td}.`,
  };
}

// ── Public API ────────────────────────────────────────────────────────────────

const GENERATORS = [
  genIdentifyFraction,
  genShadeFraction,
  genCompare,
  genArithmetic,
  genEquivalent,
];

export function generateQuiz(count = 8): Question[] {
  // Guarantee at least one of each type, fill the rest randomly
  const base = GENERATORS.map((g) => g());
  const extras = Array.from({ length: Math.max(0, count - GENERATORS.length) }, () =>
    pick(GENERATORS)()
  );
  return shuffle([...base, ...extras]).slice(0, count);
}
