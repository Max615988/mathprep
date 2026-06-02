export interface Example {
  problem: string;
  solution: string;
}

export interface Section {
  heading: string;
  body: string;
  examples?: Example[];
}

export interface Lesson {
  slug: string;
  title: string;
  topic: string;
  parentSlug?: string;
  description: string;
  sections: Section[];
}

export const lessons: Lesson[] = [
  {
    slug: "arithmetic",
    title: "Arithmetic",
    topic: "Arithmetic",
    description: "Fractions, percentages, ratios, and the order of operations — the building blocks of all math.",
    sections: [
      {
        heading: "Order of Operations",
        body: "Always evaluate in this order: Parentheses → Exponents → Multiplication/Division (left to right) → Addition/Subtraction (left to right). A common mnemonic is **PEMDAS**.\n\n$3 + 4 \\times 2 = 3 + 8 = 11$ (not $14$)",
        examples: [
          {
            problem: "What is $2 + 3 \\times (8 - 5)^2$?",
            solution: "First the parentheses: $8-5=3$. Then the exponent: $3^2=9$. Then multiply: $3\\times 9=27$. Finally add: $2+27=\\boxed{29}$.",
          },
        ],
      },
      {
        heading: "Fractions",
        body: "To add or subtract fractions, find a common denominator. To multiply, multiply straight across. To divide, multiply by the reciprocal.\n\n$$\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$$",
        examples: [
          {
            problem: "Simplify $\\dfrac{3}{4} + \\dfrac{5}{6}$.",
            solution: "LCD is 12. $\\dfrac{9}{12} + \\dfrac{10}{12} = \\dfrac{19}{12}$.",
          },
        ],
      },
      {
        heading: "Percentages & Ratios",
        body: "A percentage is a fraction out of 100. To find $p\\%$ of $n$, compute $\\dfrac{p}{100} \\times n$.\n\nA ratio $a : b$ means for every $a$ parts of one quantity there are $b$ parts of another. To scale, multiply both parts by the same constant.",
        examples: [
          {
            problem: "A shirt costs $40 and is discounted 25%. What is the sale price?",
            solution: "Discount $= 0.25 \\times 40 = 10$. Sale price $= 40 - 10 = \\$30$.",
          },
        ],
      },
    ],
  },
  {
    slug: "algebra",
    title: "Algebra",
    topic: "Algebra",
    description: "Equations, inequalities, quadratics, and systems — the language of mathematical relationships.",
    sections: [
      {
        heading: "Solving Linear Equations",
        body: "Isolate the variable by performing the same operation on both sides. Whatever you do to one side, do to the other.\n\nTo solve $3x - 7 = 11$: add 7 to both sides to get $3x = 18$, then divide by 3 to get $x = 6$.",
        examples: [
          {
            problem: "Solve $5x + 3 = 2x - 9$.",
            solution: "Subtract $2x$: $3x + 3 = -9$. Subtract 3: $3x = -12$. Divide: $x = \\boxed{-4}$.",
          },
        ],
      },
      {
        heading: "Quadratic Equations",
        body: "A quadratic has the form $ax^2 + bx + c = 0$. Three main methods:\n\n1. **Factoring** — find two numbers that multiply to $ac$ and add to $b$.\n2. **Completing the square** — rewrite as $(x+h)^2 = k$.\n3. **Quadratic formula** — $x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$\n\nThe **discriminant** $\\Delta = b^2 - 4ac$ tells you how many real solutions exist: $\\Delta > 0$ gives two, $\\Delta = 0$ gives one, $\\Delta < 0$ gives none.",
        examples: [
          {
            problem: "Solve $x^2 - 5x + 6 = 0$.",
            solution: "Factor: $(x-2)(x-3)=0$, so $x = 2$ or $x = \\boxed{3}$.",
          },
        ],
      },
      {
        heading: "Systems of Equations",
        body: "Two common methods:\n\n- **Substitution** — solve one equation for a variable and plug into the other.\n- **Elimination** — add or subtract equations to cancel one variable.",
        examples: [
          {
            problem: "Solve the system: $x + y = 7$ and $x - y = 3$.",
            solution: "Add both equations: $2x = 10$, so $x = 5$. Then $y = 7 - 5 = \\boxed{2}$.",
          },
        ],
      },
    ],
  },
  {
    slug: "vietas-formulas",
    title: "Vieta's Formulas",
    topic: "Algebra",
    parentSlug: "algebra",
    description: "A powerful shortcut relating a polynomial's coefficients directly to its roots — no solving required.",
    sections: [
      {
        heading: "Quadratic Case",
        body: "For $ax^2 + bx + c = 0$ with roots $r$ and $s$:\n\n$$r + s = -\\frac{b}{a} \\qquad rs = \\frac{c}{a}$$\n\nThese hold even if you never find the individual roots.",
        examples: [
          {
            problem: "The roots of $x^2 - 7x + 10 = 0$ are $p$ and $q$. Find $p^2 + q^2$.",
            solution: "$p+q = 7$ and $pq = 10$. Use the identity $p^2+q^2 = (p+q)^2 - 2pq = 49 - 20 = \\boxed{29}$.",
          },
        ],
      },
      {
        heading: "Cubic Case",
        body: "For $ax^3 + bx^2 + cx + d = 0$ with roots $r, s, t$:\n\n$$r+s+t = -\\frac{b}{a}$$\n$$rs+rt+st = \\frac{c}{a}$$\n$$rst = -\\frac{d}{a}$$",
        examples: [
          {
            problem: "The roots of $x^3 - 6x^2 + 11x - 6 = 0$ are $r, s, t$. Find $rst$.",
            solution: "By Vieta's: $rst = -\\dfrac{-6}{1} = \\boxed{6}$.",
          },
        ],
      },
      {
        heading: "When to Use Vieta's",
        body: "Reach for Vieta's when a problem asks about **symmetric expressions** involving roots (sums, products, sum of squares, etc.) without needing the actual root values. It saves enormous time on competition problems.",
      },
    ],
  },
  {
    slug: "sequences-series",
    title: "Sequences & Series",
    topic: "Algebra",
    parentSlug: "algebra",
    description: "Arithmetic and geometric sequences, summation formulas, and patterns.",
    sections: [
      {
        heading: "Arithmetic Sequences",
        body: "An arithmetic sequence has a constant difference $d$ between consecutive terms.\n\n- $n$-th term: $a_n = a_1 + (n-1)d$\n- Sum of first $n$ terms: $S_n = \\dfrac{n}{2}(a_1 + a_n)$",
        examples: [
          {
            problem: "Find the sum of the first 20 positive odd numbers.",
            solution: "The sequence is $1, 3, 5, \\ldots$ with $a_1=1$, $d=2$, $a_{20}=39$. Sum $= \\dfrac{20}{2}(1+39) = 10 \\times 40 = \\boxed{400}$.",
          },
        ],
      },
      {
        heading: "Geometric Sequences",
        body: "A geometric sequence has a constant ratio $r$ between consecutive terms.\n\n- $n$-th term: $a_n = a_1 \\cdot r^{n-1}$\n- Sum of first $n$ terms: $S_n = a_1 \\cdot \\dfrac{1 - r^n}{1 - r}$ (for $r \\neq 1$)\n- Infinite sum (when $|r| < 1$): $S = \\dfrac{a_1}{1-r}$",
        examples: [
          {
            problem: "Find the sum of the infinite geometric series $4 + 2 + 1 + \\frac{1}{2} + \\cdots$",
            solution: "$a_1 = 4$, $r = \\frac{1}{2}$. Sum $= \\dfrac{4}{1 - \\frac{1}{2}} = \\dfrac{4}{\\frac{1}{2}} = \\boxed{8}$.",
          },
        ],
      },
    ],
  },
  {
    slug: "geometry",
    title: "Geometry",
    topic: "Geometry",
    description: "Area, perimeter, triangles, circles, and fundamental theorems of shape and space.",
    sections: [
      {
        heading: "Essential Formulas",
        body: "| Shape | Area | Perimeter |\n|---|---|---|\n| Rectangle | $lw$ | $2(l+w)$ |\n| Triangle | $\\frac{1}{2}bh$ | $a+b+c$ |\n| Circle | $\\pi r^2$ | $2\\pi r$ |\n| Trapezoid | $\\frac{1}{2}(b_1+b_2)h$ | sum of sides |",
        examples: [
          {
            problem: "A circle has area $49\\pi$. What is its circumference?",
            solution: "$\\pi r^2 = 49\\pi \\Rightarrow r = 7$. Circumference $= 2\\pi(7) = \\boxed{14\\pi}$.",
          },
        ],
      },
      {
        heading: "The Pythagorean Theorem",
        body: "For a right triangle with legs $a$, $b$ and hypotenuse $c$:\n$$a^2 + b^2 = c^2$$\n\nCommon Pythagorean triples: $(3,4,5)$, $(5,12,13)$, $(8,15,17)$, $(7,24,25)$ — and all multiples of these.",
        examples: [
          {
            problem: "A right triangle has legs 9 and 12. What is the hypotenuse?",
            solution: "$9^2 + 12^2 = 81 + 144 = 225 = 15^2$. Hypotenuse $= \\boxed{15}$.",
          },
        ],
      },
      {
        heading: "Triangle Properties",
        body: "- Angles in any triangle sum to $180°$.\n- **Isosceles triangle**: two equal sides, two equal base angles.\n- **Equilateral triangle**: all sides equal, all angles $60°$.\n- Area using Heron's formula: $A = \\sqrt{s(s-a)(s-b)(s-c)}$ where $s = \\frac{a+b+c}{2}$.",
      },
    ],
  },
  {
    slug: "angle-chasing",
    title: "Angle Chasing",
    topic: "Geometry",
    parentSlug: "geometry",
    description: "A systematic method for finding unknown angles using angle relationships — a staple of competition geometry.",
    sections: [
      {
        heading: "Core Angle Facts",
        body: "- **Vertical angles** are equal.\n- **Supplementary angles** sum to $180°$ (a straight line).\n- **Complementary angles** sum to $90°$.\n- Angles in a triangle sum to $180°$.\n- Angles in any convex polygon with $n$ sides sum to $(n-2) \\times 180°$.\n- **Exterior angle theorem**: an exterior angle of a triangle equals the sum of the two non-adjacent interior angles.",
        examples: [
          {
            problem: "In a triangle, two angles are $47°$ and $63°$. Find the third angle.",
            solution: "$180° - 47° - 63° = \\boxed{70°}$.",
          },
        ],
      },
      {
        heading: "Parallel Lines",
        body: "When a transversal crosses two parallel lines:\n- **Corresponding angles** are equal.\n- **Alternate interior angles** are equal.\n- **Co-interior (same-side interior) angles** are supplementary.",
        examples: [
          {
            problem: "Two parallel lines are cut by a transversal. One angle is $110°$. Find the alternate interior angle.",
            solution: "Alternate interior angles are equal: $\\boxed{110°}$.",
          },
        ],
      },
      {
        heading: "Inscribed Angles",
        body: "An **inscribed angle** in a circle is half the central angle that subtends the same arc.\n\n$$\\angle \\text{inscribed} = \\frac{1}{2} \\times \\angle \\text{central}$$\n\nAny inscribed angle that subtends a **semicircle** (diameter) is $90°$.",
        examples: [
          {
            problem: "A central angle in a circle measures $84°$. What is the inscribed angle subtending the same arc?",
            solution: "$\\dfrac{84°}{2} = \\boxed{42°}$.",
          },
        ],
      },
    ],
  },
  {
    slug: "similar-triangles",
    title: "Similar Triangles",
    topic: "Geometry",
    parentSlug: "geometry",
    description: "When triangles have the same shape, their sides are proportional — a key tool for finding unknown lengths.",
    sections: [
      {
        heading: "Similarity Criteria",
        body: "Two triangles are similar (written $\\triangle ABC \\sim \\triangle DEF$) if any of the following hold:\n- **AA** — two pairs of equal angles.\n- **SAS** — two pairs of proportional sides and the included angles are equal.\n- **SSS** — all three pairs of sides are proportional.",
      },
      {
        heading: "Using Proportions",
        body: "If $\\triangle ABC \\sim \\triangle DEF$, then:\n$$\\frac{AB}{DE} = \\frac{BC}{EF} = \\frac{AC}{DF}$$\n\nThe **ratio of areas** of similar figures equals the **square** of the ratio of corresponding sides.",
        examples: [
          {
            problem: "Two similar triangles have corresponding sides in ratio $3:5$. If the smaller has area 18, what is the larger's area?",
            solution: "Area ratio $= (3/5)^2 = 9/25$. Larger area $= 18 \\times \\dfrac{25}{9} = \\boxed{50}$.",
          },
        ],
      },
    ],
  },
  {
    slug: "number-theory",
    title: "Number Theory",
    topic: "Number Theory",
    description: "Divisibility, prime factorization, GCD, LCM, and the arithmetic of integers.",
    sections: [
      {
        heading: "Prime Factorization",
        body: "Every integer $> 1$ can be written uniquely as a product of primes. To factor a number, divide out primes starting from 2.\n\n$360 = 2^3 \\times 3^2 \\times 5$\n\nThe **number of divisors** of $p_1^{a_1} p_2^{a_2} \\cdots$ is $(a_1+1)(a_2+1)\\cdots$.",
        examples: [
          {
            problem: "How many positive divisors does 72 have?",
            solution: "$72 = 2^3 \\times 3^2$. Number of divisors $= (3+1)(2+1) = 12$.",
          },
        ],
      },
      {
        heading: "GCD and LCM",
        body: "The **greatest common divisor** $\\gcd(a,b)$ is the largest integer dividing both. The **least common multiple** $\\text{lcm}(a,b)$ is the smallest positive integer divisible by both.\n\n$$\\gcd(a,b) \\times \\text{lcm}(a,b) = a \\times b$$\n\nUse the **Euclidean algorithm** to find GCD: $\\gcd(a,b) = \\gcd(b, a \\bmod b)$.",
        examples: [
          {
            problem: "Find $\\text{lcm}(12, 18)$.",
            solution: "$\\gcd(12,18) = 6$. $\\text{lcm} = \\dfrac{12 \\times 18}{6} = \\boxed{36}$.",
          },
        ],
      },
      {
        heading: "Divisibility Rules",
        body: "| Divisor | Rule |\n|---|---|\n| 2 | Last digit is even |\n| 3 | Sum of digits divisible by 3 |\n| 4 | Last two digits divisible by 4 |\n| 5 | Last digit is 0 or 5 |\n| 9 | Sum of digits divisible by 9 |\n| 11 | Alternating digit sum divisible by 11 |",
      },
    ],
  },
  {
    slug: "modular-arithmetic",
    title: "Modular Arithmetic",
    topic: "Number Theory",
    parentSlug: "number-theory",
    description: "Clock-style arithmetic that's essential for remainders, last-digit problems, and divisibility proofs.",
    sections: [
      {
        heading: "What is a Congruence?",
        body: "$a \\equiv b \\pmod{m}$ means $m$ divides $a - b$, i.e., $a$ and $b$ leave the same remainder when divided by $m$.\n\nExample: $17 \\equiv 2 \\pmod{5}$ because $17 - 2 = 15$ is divisible by 5.",
        examples: [
          {
            problem: "What is the remainder when $7^{10}$ is divided by 5?",
            solution: "$7 \\equiv 2 \\pmod 5$. Powers of 2 mod 5 cycle: $2,4,3,1,2,4,3,1,\\ldots$ (period 4). $10 \\equiv 2 \\pmod 4$, so $7^{10} \\equiv 2^2 = 4 \\pmod 5$. Remainder $= \\boxed{4}$.",
          },
        ],
      },
      {
        heading: "Arithmetic Rules",
        body: "You can add, subtract, and multiply congruences:\n\n$$a \\equiv b,\\; c \\equiv d \\pmod m \\implies a+c \\equiv b+d,\\; ac \\equiv bd \\pmod m$$\n\nThis means you can reduce numbers mod $m$ before multiplying — very useful for large exponents.",
        examples: [
          {
            problem: "Find the units digit of $3^{100}$.",
            solution: "Units digit means mod 10. Powers of 3: $3,9,7,1,3,9,7,1,\\ldots$ (period 4). $100 \\equiv 0 \\pmod 4$, so $3^{100} \\equiv 3^4 \\equiv 1 \\pmod{10}$. Units digit $= \\boxed{1}$.",
          },
        ],
      },
    ],
  },
  {
    slug: "combinatorics",
    title: "Combinatorics",
    topic: "Combinatorics",
    description: "Counting without listing: permutations, combinations, and the fundamental counting principles.",
    sections: [
      {
        heading: "Fundamental Counting Principle",
        body: "If there are $m$ ways to do task A and $n$ ways to do task B (independently), there are $m \\times n$ ways to do both.\n\nIf you choose one or the other (mutually exclusive), there are $m + n$ ways.",
        examples: [
          {
            problem: "How many 2-letter initials can be formed using the 26 letters (repetition allowed)?",
            solution: "$26 \\times 26 = \\boxed{676}$.",
          },
        ],
      },
      {
        heading: "Permutations",
        body: "A **permutation** is an ordered arrangement. The number of ways to arrange $r$ items chosen from $n$ distinct items:\n\n$$P(n, r) = \\frac{n!}{(n-r)!}$$\n\nAll $n$ items in a row: $n!$ ways.",
        examples: [
          {
            problem: "In how many ways can 4 runners finish in 1st, 2nd, and 3rd place out of 8?",
            solution: "$P(8,3) = 8 \\times 7 \\times 6 = \\boxed{336}$.",
          },
        ],
      },
      {
        heading: "Combinations",
        body: "A **combination** is an unordered selection. The number of ways to choose $r$ items from $n$ (order doesn't matter):\n\n$$\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$$\n\nKey identity: $\\binom{n}{r} = \\binom{n}{n-r}$",
        examples: [
          {
            problem: "How many ways can you choose a committee of 3 from 10 people?",
            solution: "$\\binom{10}{3} = \\dfrac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = \\boxed{120}$.",
          },
        ],
      },
    ],
  },
  {
    slug: "probability",
    title: "Probability",
    topic: "Combinatorics",
    parentSlug: "combinatorics",
    description: "Measuring how likely events are — from simple coin flips to conditional and expected-value problems.",
    sections: [
      {
        heading: "Basic Probability",
        body: "$$P(\\text{event}) = \\frac{\\text{favorable outcomes}}{\\text{total outcomes}}$$\n\n$P(A) + P(\\text{not } A) = 1$, so $P(\\text{not } A) = 1 - P(A)$.",
        examples: [
          {
            problem: "A bag has 4 red and 6 blue marbles. What is the probability of drawing a red marble?",
            solution: "$P = \\dfrac{4}{10} = \\boxed{\\dfrac{2}{5}}$.",
          },
        ],
      },
      {
        heading: "Independent and Dependent Events",
        body: "Events are **independent** if one doesn't affect the other. Then $P(A \\text{ and } B) = P(A) \\times P(B)$.\n\nFor **dependent events** (sampling without replacement), adjust the denominator for the second draw.",
        examples: [
          {
            problem: "Two fair dice are rolled. What is the probability both show a 6?",
            solution: "$P = \\dfrac{1}{6} \\times \\dfrac{1}{6} = \\boxed{\\dfrac{1}{36}}$.",
          },
        ],
      },
      {
        heading: "Expected Value",
        body: "The expected value is the long-run average outcome:\n$$E[X] = \\sum_i x_i \\cdot P(x_i)$$",
        examples: [
          {
            problem: "You roll a fair die and win that many dollars. What is your expected winnings?",
            solution: "$E = \\dfrac{1+2+3+4+5+6}{6} = \\dfrac{21}{6} = \\$\\boxed{3.50}$.",
          },
        ],
      },
    ],
  },
  // ── Advanced Lessons ──────────────────────────────────────────────────────
  {
    slug: "am-gm",
    title: "AM-GM Inequality",
    topic: "Algebra",
    parentSlug: "algebra",
    description: "The AM-GM inequality is the go-to tool for optimization problems — finding a minimum or maximum without calculus.",
    sections: [
      {
        heading: "The Inequality",
        body: "For non-negative reals $a_1, a_2, \\ldots, a_n$:\n\n$$\\frac{a_1 + a_2 + \\cdots + a_n}{n} \\geq \\sqrt[n]{a_1 a_2 \\cdots a_n}$$\n\nIn words: the **arithmetic mean** is always $\\geq$ the **geometric mean**. Equality holds **if and only if** all values are equal.",
        examples: [
          {
            problem: "Show that for positive $x$, $x + \\dfrac{1}{x} \\geq 2$.",
            solution: "By AM-GM: $\\dfrac{x + \\frac{1}{x}}{2} \\geq \\sqrt{x \\cdot \\frac{1}{x}} = 1$. So $x + \\frac{1}{x} \\geq 2$, with equality when $x = 1$.",
          },
        ],
      },
      {
        heading: "Finding Minimums",
        body: "AM-GM is most useful when a problem asks you to minimize an expression subject to a constraint (or the constraint is hidden). The strategy:\n1. Write the expression as a sum of terms.\n2. Apply AM-GM to get $\\geq$ some constant.\n3. Check when equality holds.",
        examples: [
          {
            problem: "Find the minimum value of $\\dfrac{x^2 + 4}{x}$ for $x > 0$.",
            solution: "Rewrite as $x + \\dfrac{4}{x}$. By AM-GM: $x + \\dfrac{4}{x} \\geq 2\\sqrt{x \\cdot \\frac{4}{x}} = 2\\sqrt{4} = 4$. Minimum is $\\boxed{4}$, achieved at $x = 2$.",
          },
        ],
      },
      {
        heading: "Weighted AM-GM",
        body: "A generalization: for weights $w_i > 0$ summing to 1,\n$$w_1 a_1 + w_2 a_2 \\geq a_1^{w_1} a_2^{w_2}$$\nThis comes up in harder AIME and olympiad problems when the standard AM-GM doesn't give a tight bound.",
      },
    ],
  },
  {
    slug: "inclusion-exclusion",
    title: "Inclusion-Exclusion",
    topic: "Combinatorics",
    parentSlug: "combinatorics",
    description: "A systematic method to count elements in unions of sets by adding and subtracting overlaps.",
    sections: [
      {
        heading: "Two Sets",
        body: "$$|A \\cup B| = |A| + |B| - |A \\cap B|$$\n\nWe add both sets, then subtract the overlap we counted twice.",
        examples: [
          {
            problem: "In a class of 30, 18 play soccer and 15 play basketball, and 8 play both. How many play at least one sport?",
            solution: "$|S \\cup B| = 18 + 15 - 8 = \\boxed{25}$.",
          },
        ],
      },
      {
        heading: "Three Sets",
        body: "$$|A \\cup B \\cup C| = |A| + |B| + |C| - |A \\cap B| - |A \\cap C| - |B \\cap C| + |A \\cap B \\cap C|$$",
        examples: [
          {
            problem: "How many integers from 1 to 100 are divisible by 2, 3, or 5?",
            solution: "$|A_2| = 50$, $|A_3| = 33$, $|A_5| = 20$. Pairwise: $|A_6|=16$, $|A_{10}|=10$, $|A_{15}|=6$. Triple: $|A_{30}|=3$. Total: $50+33+20-16-10-6+3 = \\boxed{74}$.",
          },
        ],
      },
      {
        heading: "Complementary Counting",
        body: "Often it's easier to count what you **don't** want:\n$$|\\text{want}| = |\\text{total}| - |\\text{don't want}|$$\nUse this when the condition is complex but its negation is simple.",
        examples: [
          {
            problem: "How many 3-digit numbers have at least one digit equal to 7?",
            solution: "Total 3-digit numbers: 900. None equal 7: $8 \\times 9 \\times 9 = 648$. Answer: $900 - 648 = \\boxed{252}$.",
          },
        ],
      },
    ],
  },
  {
    slug: "stars-and-bars",
    title: "Stars and Bars",
    topic: "Combinatorics",
    parentSlug: "combinatorics",
    description: "The canonical technique for counting the number of ways to distribute identical objects into distinct bins.",
    sections: [
      {
        heading: "The Formula",
        body: "The number of ways to distribute $n$ identical objects into $k$ distinct bins (where bins can be empty) is:\n\n$$\\binom{n + k - 1}{k - 1}$$\n\n**Why it works:** imagine $n$ stars and $k-1$ divider bars arranged in a row. Each arrangement corresponds to one distribution.",
        examples: [
          {
            problem: "In how many ways can you distribute 7 identical cookies among 4 children (each child can get zero)?",
            solution: "$\\binom{7 + 4 - 1}{4 - 1} = \\binom{10}{3} = \\boxed{120}$.",
          },
        ],
      },
      {
        heading: "Each Bin Gets At Least One",
        body: "If every bin must have $\\geq 1$ object, first give one object to each bin, then distribute the remaining $n - k$ freely:\n\n$$\\binom{(n-k) + k - 1}{k-1} = \\binom{n-1}{k-1}$$",
        examples: [
          {
            problem: "How many solutions in positive integers does $x_1 + x_2 + x_3 = 10$ have?",
            solution: "Positive means each $x_i \\geq 1$. Use $\\binom{10-1}{3-1} = \\binom{9}{2} = \\boxed{36}$.",
          },
        ],
      },
      {
        heading: "Recognizing Stars and Bars",
        body: "A problem calls for stars and bars whenever it asks: \"in how many ways can you write $n$ as an ordered sum of $k$ non-negative (or positive) integers?\" The integers are the bin sizes.",
      },
    ],
  },
  {
    slug: "pigeonhole",
    title: "Pigeonhole Principle",
    topic: "Combinatorics",
    parentSlug: "combinatorics",
    description: "If you put more pigeons than holes, some hole must contain more than one. Simple idea, surprisingly powerful.",
    sections: [
      {
        heading: "Basic Form",
        body: "If $n + 1$ or more objects are placed into $n$ boxes, then at least one box contains **at least 2** objects.\n\nMore generally: if $m$ objects go into $n$ boxes, at least one box holds $\\geq \\lceil m/n \\rceil$ objects.",
        examples: [
          {
            problem: "In any group of 13 people, show that at least two were born in the same month.",
            solution: "There are 12 months (boxes) and 13 people (pigeons). By pigeonhole, at least two share a birth month.",
          },
        ],
      },
      {
        heading: "Competition Strategy",
        body: "Pigeonhole problems usually ask you to **prove existence** rather than find a specific example. The key step is identifying the right \"boxes\":\n1. What are you distributing? (pigeons)\n2. What are the categories? (holes)\n3. Compute $\\lceil \\text{pigeons}/\\text{holes} \\rceil$ for the guaranteed minimum.",
        examples: [
          {
            problem: "Given 5 points inside a unit square, show two are within distance $\\dfrac{\\sqrt{2}}{2}$ of each other.",
            solution: "Divide the square into 4 sub-squares of side $\\frac{1}{2}$. With 5 points in 4 sub-squares, two points share a sub-square. The diagonal of a $\\frac{1}{2} \\times \\frac{1}{2}$ square is $\\frac{\\sqrt{2}}{2}$, so those two points are within $\\frac{\\sqrt{2}}{2}$ of each other.",
          },
        ],
      },
    ],
  },
  {
    slug: "law-of-sines-cosines",
    title: "Law of Sines & Cosines",
    topic: "Geometry",
    parentSlug: "geometry",
    description: "Two formulas that extend the Pythagorean theorem to any triangle — essential for non-right triangles.",
    sections: [
      {
        heading: "Law of Cosines",
        body: "For a triangle with sides $a, b, c$ and angle $C$ opposite side $c$:\n\n$$c^2 = a^2 + b^2 - 2ab\\cos C$$\n\nThis generalizes the Pythagorean theorem (when $C = 90°$, $\\cos C = 0$). Use it when you know **two sides and the included angle** (SAS) or **all three sides** (SSS).",
        examples: [
          {
            problem: "A triangle has sides $a = 5$, $b = 7$, and included angle $C = 60°$. Find $c$.",
            solution: "$c^2 = 25 + 49 - 2(5)(7)\\cos 60° = 74 - 70 \\cdot \\frac{1}{2} = 74 - 35 = 39$. So $c = \\boxed{\\sqrt{39}}$.",
          },
        ],
      },
      {
        heading: "Law of Sines",
        body: "$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$$\n\nwhere $R$ is the circumradius of the triangle. Use it when you know **a side and its opposite angle**, plus one more piece.",
        examples: [
          {
            problem: "In a triangle, $a = 10$, $A = 30°$, $B = 45°$. Find $b$.",
            solution: "$\\dfrac{b}{\\sin 45°} = \\dfrac{10}{\\sin 30°} = 20$. So $b = 20 \\sin 45° = 20 \\cdot \\dfrac{\\sqrt{2}}{2} = \\boxed{10\\sqrt{2}}$.",
          },
        ],
      },
      {
        heading: "Choosing the Right Law",
        body: "- **Law of Cosines**: use for SAS (two sides + included angle) or SSS (all three sides known).\n- **Law of Sines**: use for AAS/ASA (two angles + a side) or ambiguous SSA cases.\n- For right triangles, basic trig (sin/cos/tan) is usually faster than either law.",
      },
    ],
  },
  {
    slug: "power-of-a-point",
    title: "Power of a Point",
    topic: "Geometry",
    parentSlug: "geometry",
    description: "A single number describes how a point relates to a circle — and it gives equations linking chord and secant lengths.",
    sections: [
      {
        heading: "The Power of a Point",
        body: "For a point $P$ and a circle with center $O$ and radius $r$, the **power** of $P$ is:\n\n$$\\text{pow}(P) = |PO|^2 - r^2$$\n\nIf $P$ is inside the circle, the power is negative; outside, positive; on the circle, zero.",
      },
      {
        heading: "Chord-Chord Case (P inside)",
        body: "If two chords $AB$ and $CD$ intersect at $P$ inside a circle:\n\n$$PA \\cdot PB = PC \\cdot PD$$",
        examples: [
          {
            problem: "Chords $AB$ and $CD$ intersect at $P$ inside a circle. $PA = 3$, $PB = 8$, $PC = 4$. Find $PD$.",
            solution: "$PA \\cdot PB = PC \\cdot PD \\Rightarrow 3 \\cdot 8 = 4 \\cdot PD \\Rightarrow PD = \\boxed{6}$.",
          },
        ],
      },
      {
        heading: "Secant-Secant and Tangent Cases (P outside)",
        body: "If two secants from external point $P$ pass through the circle hitting at $A, B$ and $C, D$:\n$$PA \\cdot PB = PC \\cdot PD$$\n\nIf $PT$ is tangent and $PAB$ is a secant:\n$$PT^2 = PA \\cdot PB$$\n\nAll three cases follow from the same power equality.",
        examples: [
          {
            problem: "A tangent from $P$ touches a circle at $T$ with $PT = 6$. A secant from $P$ passes through the circle at $A$ and $B$ with $PA = 4$. Find $PB$.",
            solution: "$PT^2 = PA \\cdot PB \\Rightarrow 36 = 4 \\cdot PB \\Rightarrow PB = \\boxed{9}$.",
          },
        ],
      },
    ],
  },
  {
    slug: "shoelace",
    title: "Shoelace Formula",
    topic: "Geometry",
    parentSlug: "geometry",
    description: "Given the coordinates of a polygon's vertices, the Shoelace Formula instantly gives the area — no base or height needed.",
    sections: [
      {
        heading: "The Formula",
        body: "For a polygon with vertices $(x_1, y_1), (x_2, y_2), \\ldots, (x_n, y_n)$ listed in order (clockwise or counter-clockwise):\n\n$$\\text{Area} = \\frac{1}{2} |\\,(x_1 y_2 - x_2 y_1) + (x_2 y_3 - x_3 y_2) + \\cdots + (x_n y_1 - x_1 y_n)\\,|$$\n\nOr in summation form: $\\dfrac{1}{2}\\left|\\sum_{i=1}^{n}(x_i y_{i+1} - x_{i+1} y_i)\\right|$ where indices wrap around.",
        examples: [
          {
            problem: "Find the area of the triangle with vertices $(1,1)$, $(4,2)$, $(3,5)$.",
            solution: "Area $= \\dfrac{1}{2}|(1\\cdot2 - 4\\cdot1) + (4\\cdot5 - 3\\cdot2) + (3\\cdot1 - 1\\cdot5)|$\n$= \\dfrac{1}{2}|(2-4) + (20-6) + (3-5)|$\n$= \\dfrac{1}{2}|{-2} + 14 + ({-2})| = \\dfrac{1}{2} \\cdot 10 = \\boxed{5}$.",
          },
        ],
      },
      {
        heading: "Mnemonic: Diagonal Products",
        body: "Write the vertices in a column, repeat the first at the bottom. Multiply diagonally down-right and subtract diagonally down-left, then halve the absolute value.\n\nThis is why it's called \"shoelace\" — the products crisscross like laces.",
      },
    ],
  },
  {
    slug: "picks-theorem",
    title: "Pick's Theorem",
    topic: "Geometry",
    parentSlug: "geometry",
    description: "A beautiful formula for the area of any polygon whose vertices are lattice points (integer coordinates).",
    sections: [
      {
        heading: "The Theorem",
        body: "For a polygon with all vertices on integer coordinates:\n\n$$A = I + \\frac{B}{2} - 1$$\n\nwhere $I$ = number of **interior** lattice points and $B$ = number of **boundary** lattice points (including vertices).",
        examples: [
          {
            problem: "A polygon on a grid has 6 interior lattice points and 8 boundary lattice points. Find its area.",
            solution: "$A = 6 + \\dfrac{8}{2} - 1 = 6 + 4 - 1 = \\boxed{9}$.",
          },
        ],
      },
      {
        heading: "Counting Boundary Points",
        body: "For each edge from $(x_1, y_1)$ to $(x_2, y_2)$, the number of lattice points **on** that edge (including one endpoint) is $\\gcd(|x_2 - x_1|, |y_2 - y_1|)$.\n\nSum this over all edges to get $B$.",
        examples: [
          {
            problem: "How many lattice points lie on the segment from $(0,0)$ to $(6,4)$ (including both endpoints)?",
            solution: "$\\gcd(6, 4) = 2$ points strictly between, plus 2 endpoints $= \\gcd(6,4) + 1 = \\boxed{3}$ points total.",
          },
        ],
      },
      {
        heading: "When to Use Pick's vs Shoelace",
        body: "- Use **Pick's** when you can easily count interior and boundary grid points.\n- Use **Shoelace** when you have exact coordinates but the lattice count is messy.\n- Both give exact answers for lattice polygons; pick whichever is faster for the specific figure.",
      },
    ],
  },
  {
    slug: "fermats-little-theorem",
    title: "Fermat's Little Theorem",
    topic: "Number Theory",
    parentSlug: "number-theory",
    description: "A key theorem for reducing large exponents modulo a prime — makes otherwise impossible computations easy.",
    sections: [
      {
        heading: "The Theorem",
        body: "If $p$ is prime and $\\gcd(a, p) = 1$ (i.e., $p$ does not divide $a$), then:\n\n$$a^{p-1} \\equiv 1 \\pmod{p}$$\n\nEquivalently: $a^p \\equiv a \\pmod{p}$ for any integer $a$.",
        examples: [
          {
            problem: "Find $2^{100} \\pmod{101}$.",
            solution: "101 is prime and $\\gcd(2, 101) = 1$. By Fermat: $2^{100} \\equiv 1 \\pmod{101}$. Answer: $\\boxed{1}$.",
          },
        ],
      },
      {
        heading: "Reducing Large Exponents",
        body: "To compute $a^n \\pmod{p}$, reduce the exponent mod $p-1$:\n$$a^n \\equiv a^{n \\bmod (p-1)} \\pmod{p}$$\n\n**Steps:**\n1. Find $r = n \\bmod (p-1)$.\n2. Compute $a^r \\pmod{p}$ directly.",
        examples: [
          {
            problem: "Find $3^{302} \\pmod{7}$.",
            solution: "$p = 7$, so $p - 1 = 6$. $302 = 50 \\times 6 + 2$, so $302 \\equiv 2 \\pmod{6}$. Thus $3^{302} \\equiv 3^2 = 9 \\equiv \\boxed{2} \\pmod{7}$.",
          },
        ],
      },
      {
        heading: "Wilson's Theorem (Bonus)",
        body: "A related result: $(p-1)! \\equiv -1 \\pmod{p}$ for any prime $p$.\n\nExample: $(6)! = 720 \\equiv -1 \\equiv 6 \\pmod{7}$. Useful for competition problems involving factorials mod primes.",
      },
    ],
  },
  {
    slug: "floor-function",
    title: "Floor Function & Legendre's Formula",
    topic: "Number Theory",
    parentSlug: "number-theory",
    description: "The floor function rounds down to the nearest integer — and Legendre's formula uses it to count prime factors in factorials.",
    sections: [
      {
        heading: "Floor and Ceiling",
        body: "$\\lfloor x \\rfloor$ is the greatest integer $\\leq x$. $\\lceil x \\rceil$ is the least integer $\\geq x$.\n\nKey identities:\n- $\\lfloor n/k \\rfloor$ = number of multiples of $k$ among $1, 2, \\ldots, n$\n- $\\lfloor x \\rfloor + \\lfloor x + \\frac{1}{2} \\rfloor = \\lfloor 2x \\rfloor$ (Hermite's identity)",
        examples: [
          {
            problem: "How many multiples of 7 are there from 1 to 100?",
            solution: "$\\lfloor 100/7 \\rfloor = \\lfloor 14.28\\ldots \\rfloor = \\boxed{14}$.",
          },
        ],
      },
      {
        heading: "Legendre's Formula",
        body: "The exponent of prime $p$ in $n!$ (the largest power of $p$ dividing $n!$) is:\n\n$$v_p(n!) = \\left\\lfloor \\frac{n}{p} \\right\\rfloor + \\left\\lfloor \\frac{n}{p^2} \\right\\rfloor + \\left\\lfloor \\frac{n}{p^3} \\right\\rfloor + \\cdots$$\n\nThis sum is finite since the terms become 0 once $p^k > n$.",
        examples: [
          {
            problem: "What is the largest power of 2 that divides $20!$?",
            solution: "$\\lfloor 20/2 \\rfloor + \\lfloor 20/4 \\rfloor + \\lfloor 20/8 \\rfloor + \\lfloor 20/16 \\rfloor = 10 + 5 + 2 + 1 = \\boxed{18}$.",
          },
        ],
      },
      {
        heading: "Trailing Zeros in n!",
        body: "Trailing zeros come from factors of 10 = 2 × 5. Since factors of 2 are always more plentiful than 5s, just count factors of 5:\n\n$$\\text{trailing zeros} = v_5(n!) = \\left\\lfloor \\frac{n}{5} \\right\\rfloor + \\left\\lfloor \\frac{n}{25} \\right\\rfloor + \\left\\lfloor \\frac{n}{125} \\right\\rfloor + \\cdots$$",
        examples: [
          {
            problem: "How many trailing zeros does $100!$ have?",
            solution: "$\\lfloor 100/5 \\rfloor + \\lfloor 100/25 \\rfloor + \\lfloor 100/125 \\rfloor = 20 + 4 + 0 = \\boxed{24}$.",
          },
        ],
      },
    ],
  },
  {
    slug: "statistics",
    title: "Statistics",
    topic: "Statistics",
    description: "Mean, median, mode, range, and how to interpret data — essential for AMC and SAT math.",
    sections: [
      {
        heading: "Mean, Median, Mode",
        body: "- **Mean** (average): sum of all values divided by the count.\n- **Median**: the middle value when sorted. For an even count, average the two middle values.\n- **Mode**: the value that appears most often.\n- **Range**: maximum minus minimum.",
        examples: [
          {
            problem: "Find the mean and median of $\\{3, 7, 7, 2, 9\\}$.",
            solution: "Sorted: $2, 3, 7, 7, 9$. Mean $= \\dfrac{28}{5} = 5.6$. Median $= \\boxed{7}$ (middle value).",
          },
        ],
      },
      {
        heading: "Weighted Averages",
        body: "When groups have different sizes, weight each mean by the size of its group:\n\n$$\\bar{x} = \\frac{n_1 \\bar{x}_1 + n_2 \\bar{x}_2}{n_1 + n_2}$$",
        examples: [
          {
            problem: "Class A has 20 students with a mean score of 80. Class B has 30 students with a mean of 70. What is the combined mean?",
            solution: "$\\dfrac{20 \\times 80 + 30 \\times 70}{50} = \\dfrac{1600 + 2100}{50} = \\dfrac{3700}{50} = \\boxed{74}$.",
          },
        ],
      },
      {
        heading: "Reading Data",
        body: "On AMC/SAT, data problems often use bar charts, line graphs, or tables. Key habits:\n- Read axis labels and scales carefully.\n- Watch for the difference between totals and rates/percents.\n- For \"how many more\" questions, subtract counts, not percentages.",
      },
    ],
  },
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getLessonsByTopic(topic: string): Lesson[] {
  return lessons.filter((l) => l.topic === topic);
}

export function getTopicLesson(topic: string): Lesson | undefined {
  return lessons.find((l) => l.topic === topic && !l.parentSlug);
}

export const topicToSlug: Record<string, string> = {
  Arithmetic: "arithmetic",
  Algebra: "algebra",
  Geometry: "geometry",
  "Number Theory": "number-theory",
  Combinatorics: "combinatorics",
  Statistics: "statistics",
};
