// Shared question type and generators for all non-Foundation subjects

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

export interface GenericQuestion {
  id: string;
  type: "mc";
  subject: string;
  prompt: string;
  /** true = render prompt in large mono equation box */
  equation?: boolean;
  choices: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

interface Raw {
  prompt: string;
  equation?: boolean;
  correct: string;
  wrongs: [string, string, string];
  explanation: string;
  hint?: string;
}

function build(subject: string, r: Raw): GenericQuestion {
  const choices = shuffle([r.correct, ...r.wrongs]);
  return {
    id: uid(),
    type: "mc",
    subject,
    prompt: r.prompt,
    equation: r.equation,
    choices,
    correctIndex: choices.indexOf(r.correct),
    explanation: r.explanation,
    hint: r.hint,
  };
}

function makeGenerator(subject: string, bank: Raw[]) {
  return (n = 8): GenericQuestion[] =>
    shuffle(bank.map((r) => build(subject, r))).slice(0, n);
}

// ── RATIOS, PERCENTAGES & PROPORTIONS ────────────────────────────────────────

const RATIOS_BANK: Raw[] = [
  {
    prompt: "Simplify the ratio  15 : 10",
    equation: true,
    correct: "3 : 2",
    wrongs: ["5 : 3", "4 : 3", "3 : 1"],
    explanation: "The HCF of 15 and 10 is 5.  15 ÷ 5 = 3,  10 ÷ 5 = 2.  Answer: 3 : 2.",
  },
  {
    prompt: "What is 40% of 250?",
    equation: true,
    correct: "100",
    wrongs: ["80", "125", "90"],
    explanation: "40% × 250 = 0.40 × 250 = 100.",
  },
  {
    prompt: "A price rises from £60 to £75. What is the percentage increase?",
    correct: "25%",
    wrongs: ["20%", "15%", "30%"],
    explanation: "Increase = £15.  % increase = (15 ÷ 60) × 100 = 25%.",
  },
  {
    prompt: "6 apples cost £2.40.  How much do 9 apples cost?",
    correct: "£3.60",
    wrongs: ["£3.20", "£4.00", "£2.80"],
    explanation: "Unit price = £2.40 ÷ 6 = £0.40.  For 9: 9 × £0.40 = £3.60.",
  },
  {
    prompt: "Orange juice and water are mixed in the ratio 1 : 4. How much juice is in 20 litres?",
    correct: "4 litres",
    wrongs: ["5 litres", "8 litres", "2 litres"],
    explanation: "Total parts = 1 + 4 = 5.  Juice = (1/5) × 20 = 4 litres.",
  },
  {
    prompt: "A £80 coat is 15% off.  What is the sale price?",
    correct: "£68",
    wrongs: ["£72", "£65", "£70"],
    explanation: "15% of £80 = £12.  Sale price = £80 − £12 = £68.",
  },
  {
    prompt: "What is 120% of 50?",
    equation: true,
    correct: "60",
    wrongs: ["70", "55", "65"],
    explanation: "120% × 50 = 1.20 × 50 = 60.",
  },
  {
    prompt: "A population falls from 400 to 300.  What is the percentage decrease?",
    correct: "25%",
    wrongs: ["20%", "30%", "33%"],
    explanation: "Decrease = 100.  % decrease = (100 ÷ 400) × 100 = 25%.",
  },
  {
    prompt: "3 workers build a wall in 12 days.  How long would it take 4 workers?",
    correct: "9 days",
    wrongs: ["16 days", "8 days", "6 days"],
    explanation: "Inverse proportion: 3 × 12 = 4 × d.  d = 36 ÷ 4 = 9 days.",
    hint: "More workers = fewer days (inverse proportion).",
  },
  {
    prompt: "£100 is shared in the ratio 3 : 2.  What is the larger share?",
    correct: "£60",
    wrongs: ["£50", "£40", "£70"],
    explanation: "Total parts = 5.  Each part = £20.  Larger share = 3 × £20 = £60.",
  },
  {
    prompt: "A map uses scale 1 : 25,000.  A road is 3 cm on the map.  How long is it in real life?",
    correct: "750 m",
    wrongs: ["250 m", "500 m", "1 km"],
    explanation: "3 × 25,000 = 75,000 cm = 750 m.",
  },
  {
    prompt: "£200 is invested at 5% simple interest per year.  Interest after 4 years?",
    correct: "£40",
    wrongs: ["£30", "£50", "£60"],
    explanation: "Simple interest = P × r × t = £200 × 0.05 × 4 = £40.",
  },
];

export const generateRatiosQuiz = makeGenerator("Ratios & Proportions", RATIOS_BANK);

// ── PRE-ALGEBRA ───────────────────────────────────────────────────────────────

const PREALGEBRA_BANK: Raw[] = [
  {
    prompt: "3 + 4 × 2  =  ?",
    equation: true,
    correct: "11",
    wrongs: ["14", "10", "13"],
    explanation: "BODMAS: multiplication first.  4 × 2 = 8,  then 3 + 8 = 11.",
    hint: "Remember: Multiplication comes before Addition (BODMAS).",
  },
  {
    prompt: "(6 + 2) × 3  =  ?",
    equation: true,
    correct: "24",
    wrongs: ["12", "20", "18"],
    explanation: "Brackets first: 6 + 2 = 8,  then 8 × 3 = 24.",
  },
  {
    prompt: "(−7) + 3  =  ?",
    equation: true,
    correct: "−4",
    wrongs: ["4", "−10", "10"],
    explanation: "Start at −7 on the number line, move 3 right: −4.",
  },
  {
    prompt: "(−5) × (−4)  =  ?",
    equation: true,
    correct: "20",
    wrongs: ["−20", "−9", "9"],
    explanation: "Negative × Negative = Positive.  5 × 4 = 20.",
  },
  {
    prompt: "2⁴  =  ?",
    equation: true,
    correct: "16",
    wrongs: ["8", "12", "24"],
    explanation: "2⁴ = 2 × 2 × 2 × 2 = 16.",
  },
  {
    prompt: "√81  =  ?",
    equation: true,
    correct: "9",
    wrongs: ["8", "7", "11"],
    explanation: "9 × 9 = 81,  so √81 = 9.",
  },
  {
    prompt: "Simplify:   3a + 5a",
    equation: true,
    correct: "8a",
    wrongs: ["15a", "8", "3a + 5"],
    explanation: "Like terms: 3a + 5a = (3 + 5)a = 8a.",
  },
  {
    prompt: "Solve:   x + 9  =  16",
    equation: true,
    correct: "x = 7",
    wrongs: ["x = 25", "x = 9", "x = 6"],
    explanation: "Subtract 9 from both sides: x = 16 − 9 = 7.",
  },
  {
    prompt: "What is the HCF (highest common factor) of 12 and 18?",
    correct: "6",
    wrongs: ["3", "4", "9"],
    explanation: "Factors of 12: 1,2,3,4,6,12.  Factors of 18: 1,2,3,6,9,18.  HCF = 6.",
  },
  {
    prompt: "What is the LCM (lowest common multiple) of 4 and 6?",
    correct: "12",
    wrongs: ["24", "8", "6"],
    explanation: "Multiples of 4: 4,8,12…  Multiples of 6: 6,12…  LCM = 12.",
  },
  {
    prompt: "(−3)²  =  ?",
    equation: true,
    correct: "9",
    wrongs: ["−9", "6", "−6"],
    explanation: "(−3)² = (−3) × (−3) = +9.",
  },
  {
    prompt: "12 ÷ 4 + 2 × 3  =  ?",
    equation: true,
    correct: "9",
    wrongs: ["12", "6", "11"],
    explanation: "BODMAS: 12÷4 = 3,  2×3 = 6,  then 3 + 6 = 9.",
  },
];

export const generatePreAlgebraQuiz = makeGenerator("Pre-Algebra", PREALGEBRA_BANK);

// ── ALGEBRA 1 ─────────────────────────────────────────────────────────────────

const ALGEBRA1_BANK: Raw[] = [
  {
    prompt: "Solve:   3x  =  21",
    equation: true,
    correct: "x = 7",
    wrongs: ["x = 18", "x = 24", "x = 6"],
    explanation: "Divide both sides by 3: x = 21 ÷ 3 = 7.",
  },
  {
    prompt: "Solve:   2x + 5  =  17",
    equation: true,
    correct: "x = 6",
    wrongs: ["x = 11", "x = 4", "x = 7"],
    explanation: "2x = 17 − 5 = 12,  x = 12 ÷ 2 = 6.",
  },
  {
    prompt: "Solve:   3x − 4  =  14",
    equation: true,
    correct: "x = 6",
    wrongs: ["x = 10", "x = 5", "x = 7"],
    explanation: "3x = 14 + 4 = 18,  x = 18 ÷ 3 = 6.",
  },
  {
    prompt: "Expand:   4(x − 3)",
    equation: true,
    correct: "4x − 12",
    wrongs: ["4x − 3", "x − 12", "4x + 12"],
    explanation: "4 × x = 4x,  4 × (−3) = −12.  Result: 4x − 12.",
  },
  {
    prompt: "Factorise:   x² + 7x + 12",
    equation: true,
    correct: "(x + 3)(x + 4)",
    wrongs: ["(x + 2)(x + 6)", "(x + 1)(x + 12)", "(x + 6)(x + 2)"],
    explanation: "Find two numbers that multiply to 12 and add to 7: 3 and 4.",
    hint: "Think: which two numbers multiply to 12 AND add to 7?",
  },
  {
    prompt: "What is the gradient (slope) of   y = 5x − 3?",
    equation: true,
    correct: "5",
    wrongs: ["−3", "3", "−5"],
    explanation: "In y = mx + c,  the gradient is m.  Here m = 5.",
  },
  {
    prompt: "Solve:   x / 4  =  9",
    equation: true,
    correct: "x = 36",
    wrongs: ["x = 13", "x = 4", "x = 2.25"],
    explanation: "Multiply both sides by 4: x = 9 × 4 = 36.",
  },
  {
    prompt: "Solve:   5x − 2  =  3x + 8",
    equation: true,
    correct: "x = 5",
    wrongs: ["x = 3", "x = 6", "x = 4"],
    explanation: "Collect x terms: 5x − 3x = 8 + 2,  2x = 10,  x = 5.",
  },
  {
    prompt: "Solve the inequality:   2x + 1  >  9",
    equation: true,
    correct: "x > 4",
    wrongs: ["x > 5", "x > 3", "x > 8"],
    explanation: "2x > 9 − 1 = 8,  x > 4.",
  },
  {
    prompt: "Solve:   4(x + 2)  =  24",
    equation: true,
    correct: "x = 4",
    wrongs: ["x = 6", "x = 8", "x = 3"],
    explanation: "4x + 8 = 24,  4x = 16,  x = 4.",
  },
  {
    prompt: "If   y = 2x + 1,   what is y when x = 5?",
    equation: true,
    correct: "11",
    wrongs: ["10", "12", "9"],
    explanation: "y = 2(5) + 1 = 10 + 1 = 11.",
  },
  {
    prompt: "Solve:   x²  =  49",
    equation: true,
    correct: "x = ±7",
    wrongs: ["x = 7 only", "x = −7 only", "x = 24.5"],
    explanation: "Take the square root: x = ±√49 = ±7.  Both +7 and −7 are valid.",
  },
];

export const generateAlgebra1Quiz = makeGenerator("Algebra 1", ALGEBRA1_BANK);

// ── GEOMETRY BASICS ───────────────────────────────────────────────────────────

const GEOMETRY_BANK: Raw[] = [
  {
    prompt: "Area of a rectangle with length 9 and width 5?",
    correct: "45",
    wrongs: ["28", "40", "50"],
    explanation: "Area = length × width = 9 × 5 = 45.",
  },
  {
    prompt: "Area of a triangle with base 10 and height 6?",
    correct: "30",
    wrongs: ["60", "16", "24"],
    explanation: "Area = ½ × base × height = ½ × 10 × 6 = 30.",
  },
  {
    prompt: "What do the interior angles of a triangle sum to?",
    correct: "180°",
    wrongs: ["360°", "90°", "270°"],
    explanation: "All triangles have interior angles summing to exactly 180°.",
  },
  {
    prompt: "A right-angled triangle has legs 5 and 12. What is the hypotenuse?",
    correct: "13",
    wrongs: ["7", "17", "10"],
    explanation: "c² = 5² + 12² = 25 + 144 = 169.  c = √169 = 13.",
    hint: "Use Pythagoras: a² + b² = c²",
  },
  {
    prompt: "Circumference of a circle with radius 7?  (Use π ≈ 3.14)",
    correct: "≈ 43.96",
    wrongs: ["≈ 21.98", "≈ 49", "≈ 31.4"],
    explanation: "C = 2πr = 2 × 3.14 × 7 = 43.96.",
  },
  {
    prompt: "Area of a circle with radius 5?  (Use π ≈ 3.14)",
    correct: "78.5",
    wrongs: ["31.4", "15.7", "25"],
    explanation: "A = πr² = 3.14 × 5² = 3.14 × 25 = 78.5.",
  },
  {
    prompt: "How many degrees in a complete rotation?",
    correct: "360°",
    wrongs: ["180°", "270°", "90°"],
    explanation: "One full turn = 360°.",
  },
  {
    prompt: "Volume of a cuboid measuring 4 × 3 × 5?",
    correct: "60",
    wrongs: ["47", "24", "12"],
    explanation: "V = l × w × h = 4 × 3 × 5 = 60.",
  },
  {
    prompt: "What type of angle is 145°?",
    correct: "Obtuse",
    wrongs: ["Acute", "Right", "Reflex"],
    explanation: "Obtuse angles are between 90° and 180°.  145° is obtuse.",
  },
  {
    prompt: "Each interior angle of a regular hexagon measures?",
    correct: "120°",
    wrongs: ["60°", "90°", "108°"],
    explanation: "Sum = (6 − 2) × 180° = 720°.  Each = 720° ÷ 6 = 120°.",
  },
  {
    prompt: "Area of a trapezium with parallel sides 6 and 10, height 4?",
    correct: "32",
    wrongs: ["24", "40", "16"],
    explanation: "A = ½(a + b) × h = ½(6 + 10) × 4 = ½ × 16 × 4 = 32.",
  },
  {
    prompt: "A right triangle has hypotenuse 10 and one leg 6.  Find the other leg.",
    correct: "8",
    wrongs: ["4", "6", "7"],
    explanation: "b² = 10² − 6² = 100 − 36 = 64.  b = √64 = 8.",
  },
];

export const generateGeometryQuiz = makeGenerator("Geometry", GEOMETRY_BANK);

// ── ALGEBRA 2 ─────────────────────────────────────────────────────────────────

const ALGEBRA2_BANK: Raw[] = [
  {
    prompt: "Solve:   x² − 9  =  0",
    equation: true,
    correct: "x = ±3",
    wrongs: ["x = 3 only", "x = 9", "x = ±9"],
    explanation: "x² = 9,  x = ±√9 = ±3.",
  },
  {
    prompt: "Solve:   x² − 5x + 6  =  0",
    equation: true,
    correct: "x = 2  or  x = 3",
    wrongs: ["x = 1  or  x = 6", "x = −2  or  −3", "x = 2  or  4"],
    explanation: "Factorise: (x − 2)(x − 3) = 0,  so x = 2 or x = 3.",
    hint: "Find two numbers that multiply to 6 and add to −5.",
  },
  {
    prompt: "Expand:   (x + 4)²",
    equation: true,
    correct: "x² + 8x + 16",
    wrongs: ["x² + 4x + 16", "x² + 16", "x² + 8x + 4"],
    explanation: "(x + 4)² = x² + 2(4)x + 4² = x² + 8x + 16.",
  },
  {
    prompt: "log₂(16)  =  ?",
    equation: true,
    correct: "4",
    wrongs: ["2", "8", "3"],
    explanation: "2⁴ = 16,  so log₂(16) = 4.",
  },
  {
    prompt: "Simplify:   x³ × x⁴",
    equation: true,
    correct: "x⁷",
    wrongs: ["x¹²", "x", "x⁸"],
    explanation: "When multiplying the same base, add the exponents: 3 + 4 = 7.",
  },
  {
    prompt: "What is   3⁻²  ?",
    equation: true,
    correct: "1/9",
    wrongs: ["−9", "−6", "1/6"],
    explanation: "3⁻² = 1/3² = 1/9.",
  },
  {
    prompt: "log₁₀(1000)  =  ?",
    equation: true,
    correct: "3",
    wrongs: ["100", "4", "2"],
    explanation: "10³ = 1000,  so log₁₀(1000) = 3.",
  },
  {
    prompt: "The nth term of  5, 9, 13, 17, ...  is:",
    correct: "4n + 1",
    wrongs: ["5n", "4n + 5", "3n + 2"],
    explanation: "Common difference = 4.  First term = 5.  nth term = 5 + (n−1)×4 = 4n + 1.",
  },
  {
    prompt: "Simplify:   x⁶ ÷ x²",
    equation: true,
    correct: "x⁴",
    wrongs: ["x³", "x⁸", "x¹²"],
    explanation: "Divide powers by subtracting exponents: 6 − 2 = 4.  Answer: x⁴.",
  },
  {
    prompt: "Which of these is a factor of   x² − 4?",
    equation: true,
    correct: "(x − 2)",
    wrongs: ["(x − 4)", "(x + 4)", "(x − 1)"],
    explanation: "x² − 4 = (x + 2)(x − 2).  This is the difference of two squares.",
  },
  {
    prompt: "Discriminant of   x² + 3x − 10  =  0?",
    equation: true,
    correct: "49",
    wrongs: ["−31", "31", "9"],
    explanation: "Discriminant = b² − 4ac = 9 − 4(1)(−10) = 9 + 40 = 49.",
  },
  {
    prompt: "Simplify:   (2x²)³",
    equation: true,
    correct: "8x⁶",
    wrongs: ["6x⁶", "8x⁵", "2x⁶"],
    explanation: "(2x²)³ = 2³ × (x²)³ = 8 × x⁶ = 8x⁶.",
  },
];

export const generateAlgebra2Quiz = makeGenerator("Algebra 2", ALGEBRA2_BANK);

// ── TRIGONOMETRY ──────────────────────────────────────────────────────────────

const TRIG_BANK: Raw[] = [
  {
    prompt: "sin(30°)  =  ?",
    equation: true,
    correct: "0.5",
    wrongs: ["0.866", "0.707", "1"],
    explanation: "sin(30°) = 1/2 = 0.5.  A key value to memorise!",
  },
  {
    prompt: "cos(60°)  =  ?",
    equation: true,
    correct: "0.5",
    wrongs: ["0.866", "0.707", "1"],
    explanation: "cos(60°) = 1/2 = 0.5.",
  },
  {
    prompt: "tan(45°)  =  ?",
    equation: true,
    correct: "1",
    wrongs: ["√2", "0.5", "√3"],
    explanation: "tan(45°) = sin(45°)/cos(45°) = (√2/2)/(√2/2) = 1.",
  },
  {
    prompt: "In a right triangle:  opposite = 3,  hypotenuse = 5.  What is sin(θ)?",
    correct: "3/5",
    wrongs: ["5/3", "4/5", "3/4"],
    explanation: "sin(θ) = opposite ÷ hypotenuse = 3/5.",
    hint: "SOH – Sine = Opposite / Hypotenuse",
  },
  {
    prompt: "sin²(x) + cos²(x)  =  ?",
    equation: true,
    correct: "1",
    wrongs: ["0", "sin(x)", "2"],
    explanation: "This is the fundamental Pythagorean identity: sin²(x) + cos²(x) = 1.",
  },
  {
    prompt: "cos(0°)  =  ?",
    equation: true,
    correct: "1",
    wrongs: ["0", "−1", "0.5"],
    explanation: "cos(0°) = 1.  The cosine of zero is always 1.",
  },
  {
    prompt: "sin(90°)  =  ?",
    equation: true,
    correct: "1",
    wrongs: ["0", "−1", "0.5"],
    explanation: "sin(90°) = 1.",
  },
  {
    prompt: "In a right triangle:  adjacent = 4,  hypotenuse = 5.  What is cos(θ)?",
    correct: "4/5",
    wrongs: ["5/4", "3/5", "4/3"],
    explanation: "cos(θ) = adjacent ÷ hypotenuse = 4/5.",
    hint: "CAH – Cosine = Adjacent / Hypotenuse",
  },
  {
    prompt: "What is the period of  y = sin(x)?",
    correct: "360°",
    wrongs: ["180°", "90°", "720°"],
    explanation: "sin(x) completes one full cycle every 360° (or 2π radians).",
  },
  {
    prompt: "In a right triangle:  opposite = 1,  adjacent = 1.  What is tan(θ)?",
    correct: "1",
    wrongs: ["√2", "0.5", "2"],
    explanation: "tan(θ) = opposite ÷ adjacent = 1 ÷ 1 = 1.",
    hint: "TOA – Tangent = Opposite / Adjacent",
  },
  {
    prompt: "Convert 90° to radians.",
    equation: true,
    correct: "π/2",
    wrongs: ["π", "2π", "π/4"],
    explanation: "90° × (π ÷ 180) = π/2.",
  },
  {
    prompt: "If  sin(θ) = 0.5,  what is θ  (between 0° and 90°)?",
    equation: true,
    correct: "30°",
    wrongs: ["45°", "60°", "90°"],
    explanation: "sin(30°) = 0.5,  so θ = 30°.",
  },
];

export const generateTrigQuiz = makeGenerator("Trigonometry", TRIG_BANK);

// ── PRE-CALCULUS ──────────────────────────────────────────────────────────────

const PRECALC_BANK: Raw[] = [
  {
    prompt: "What is the domain of  f(x) = √x?",
    equation: true,
    correct: "x ≥ 0",
    wrongs: ["x > 0", "x ≠ 0", "All real numbers"],
    explanation: "You can't take the square root of a negative (in real numbers), so x ≥ 0.",
  },
  {
    prompt: "If  f(x) = 2x² − 5,  what is  f(3)?",
    equation: true,
    correct: "13",
    wrongs: ["7", "1", "18"],
    explanation: "f(3) = 2(3²) − 5 = 2(9) − 5 = 18 − 5 = 13.",
  },
  {
    prompt: "What is  lim(x→1)  of  (x² − 1) / (x − 1)?",
    equation: true,
    correct: "2",
    wrongs: ["1", "0", "Undefined"],
    explanation: "Factor: (x−1)(x+1)/(x−1) = x+1.  As x → 1:  1 + 1 = 2.",
    hint: "Try factorising the numerator first.",
  },
  {
    prompt: "Which of these is an EVEN function?",
    correct: "f(x) = x²",
    wrongs: ["f(x) = x³", "f(x) = x", "f(x) = x⁵"],
    explanation: "A function is even if f(−x) = f(x).  (−x)² = x² ✓.",
  },
  {
    prompt: "What is the magnitude of vector  (3, 4)?",
    equation: true,
    correct: "5",
    wrongs: ["7", "6", "√7"],
    explanation: "|v| = √(3² + 4²) = √(9 + 16) = √25 = 5.",
  },
  {
    prompt: "What is the inverse of  f(x) = 3x?",
    equation: true,
    correct: "f⁻¹(x) = x/3",
    wrongs: ["f⁻¹(x) = 3x", "f⁻¹(x) = x − 3", "f⁻¹(x) = 3/x"],
    explanation: "Let y = 3x.  Swap x and y: x = 3y.  Solve for y: y = x/3.",
  },
  {
    prompt: "f(x) = x + 2,  g(x) = 3x.   What is  f(g(x))?",
    equation: true,
    correct: "3x + 2",
    wrongs: ["3x", "3x + 6", "x + 6"],
    explanation: "f(g(x)) = f(3x) = 3x + 2.",
  },
  {
    prompt: "What is the range of  f(x) = x²?",
    equation: true,
    correct: "y ≥ 0",
    wrongs: ["All real numbers", "y > 0", "y ≤ 0"],
    explanation: "x² is always non-negative, so the range is y ≥ 0.",
  },
  {
    prompt: "What is the modulus of the complex number  3 + 4i?",
    equation: true,
    correct: "5",
    wrongs: ["7", "3", "4"],
    explanation: "|3 + 4i| = √(3² + 4²) = √25 = 5.",
  },
  {
    prompt: "What is  lim(x→∞)  of  1/x?",
    equation: true,
    correct: "0",
    wrongs: ["1", "∞", "−∞"],
    explanation: "As x grows without bound, 1/x gets closer and closer to 0.",
  },
  {
    prompt: "The sequence  2, 6, 18, 54, ...  has a common ratio of:",
    correct: "3",
    wrongs: ["4", "2", "6"],
    explanation: "Each term is multiplied by 3: 2×3=6, 6×3=18.  Common ratio = 3.",
  },
  {
    prompt: "Arithmetic sequence  4, 7, 10, 13, ...  — What is the 10th term?",
    correct: "31",
    wrongs: ["34", "28", "37"],
    explanation: "nth term = a + (n−1)d = 4 + 9×3 = 4 + 27 = 31.",
  },
];

export const generatePreCalcQuiz = makeGenerator("Pre-Calculus", PRECALC_BANK);
