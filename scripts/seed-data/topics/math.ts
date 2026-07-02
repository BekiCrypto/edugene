import type { TopicUnit } from "../index";

export const mathTopics: TopicUnit[] = [
  // ===== Grade 1–2 =====
  {
    unitTitle: "Numbers to 100 & Basic Operations",
    gradeBand: "1-2",
    lessons: [
      {
        title: "Counting & Place Value to 100",
        slug: "counting-place-value-100",
        summary:
          "Recognise, read, write and order numbers up to 100. Understand tens and ones, and use a 100-square to identify patterns.",
        objectives: [
          "Count forwards and backwards to 100 in ones and tens.",
          "Read and write numerals and number words to 100.",
          "Partition two-digit numbers into tens and ones.",
          "Identify one more and one less than a given number.",
        ],
        content: `Numbers are everywhere — on doors, buses, and coins. In this lesson we learn to **read, write and compare** numbers up to 100 with confidence.

A two-digit number is made of **tens** and **ones**. The number 47 has 4 tens (40) and 7 ones (7). We can show this with bundles of ten straws, base-ten blocks, or a place-value chart. Knowing the place of each digit helps us compare numbers quickly: 47 is bigger than 39 because the tens digit (4) is bigger than 3.

A **100-square** is a grid of numbers 1–100. It is one of the most useful tools in early maths. Patterns you can find on the 100-square include: all numbers in a column end in the same digit, all numbers in a row have the same tens digit (except when crossing a ten), and counting by tens moves you straight down a column.

Once you can read and partition numbers, comparing them becomes easy. Use the symbols **<** (less than), **>** (greater than) and **=** (equal to) to record comparisons. The open mouth of the crocodile always eats the bigger number!`,
        studyGuide: `**Quick revision — Counting & Place Value to 100**

- Two-digit numbers = tens + ones (47 = 40 + 7).
- 100-square: columns end in the same digit; rows share a tens digit.
- Read the tens digit first to compare numbers.
- Symbols: < less than, > greater than, = equal to.
- "One more" = add 1; "one less" = subtract 1.
- Practise by counting objects around the home (steps, coins, pencils).`,
        keyTerms: [
          { term: "Digit", definition: "A single symbol used to make numbers (0,1,2,3,4,5,6,7,8,9)." },
          { term: "Tens", definition: "The place value of the second digit from the right in a two-digit number." },
          { term: "Ones", definition: "The place value of the rightmost digit; also called units." },
          { term: "100-square", definition: "A 10×10 grid showing numbers 1–100 in order." },
        ],
        examples: [
          {
            title: "Partitioning 56",
            body: "56 = 5 tens + 6 ones = 50 + 6. If we add 1 ten we get 66; if we add 1 one we get 57.",
          },
          {
            title: "Comparing 73 and 48",
            body: "Look at the tens digit first: 7 > 4, so 73 > 48. The ones digits (3 and 8) do not need to be checked.",
          },
        ],
        durationMin: 25,
        difficulty: "introductory",
        quiz: {
          timeLimit: 8,
          questions: [
            {
              prompt: "What is 34 made of?",
              options: ["3 tens and 4 ones", "4 tens and 3 ones", "30 tens and 4 ones", "3 ones and 4 tens"],
              answerIdx: 0,
              explanation: "The first digit (3) shows tens, the second digit (4) shows ones. So 34 = 30 + 4.",
            },
            {
              prompt: "Which symbol makes 56 ___ 65 true?",
              options: [">", "<", "=", "≈"],
              answerIdx: 1,
              explanation: "65 has a larger tens digit (6) than 56 (5), so 56 is less than 65. Use <.",
            },
            {
              prompt: "What is one more than 79?",
              options: ["78", "80", "70", "89"],
              answerIdx: 1,
              explanation: "Adding 1 to 79 crosses the next ten, giving 80.",
            },
            {
              prompt: "On a 100-square, the number below 23 is…",
              options: ["13", "24", "33", "32"],
              answerIdx: 2,
              explanation: "Moving down one row on a 100-square adds 10. 23 + 10 = 33.",
            },
          ],
        },
      },
      {
        title: "Addition & Subtraction within 20",
        slug: "addition-subtraction-20",
        summary:
          "Use concrete objects, number lines and known facts to add and subtract within 20, including crossing the ten.",
        objectives: [
          "Recall addition and subtraction facts within 10 fluently.",
          "Add a single digit to a teen number, crossing the ten if needed.",
          "Subtract a single digit from a teen number, crossing the ten if needed.",
          "Use a number line to model addition and subtraction jumps.",
        ],
        content: `Addition and subtraction are the foundation of all later arithmetic. In this lesson we work with numbers up to 20, including the tricky step of **crossing the ten** (for example 8 + 5 = 13).

The most powerful mental strategy is **make-ten**. To add 8 + 5, split the 5 into 2 and 3: first add 2 to 8 to make 10, then add the remaining 3 to land on 13. This works because 10 is a friendly number — once you reach it, the rest is easy. The same idea works for subtraction: 13 − 5 becomes 13 − 3 (back to 10) then − 2 (down to 8).

A **number line** lets you visualise the jumps. Start at 8, jump 2 to 10, then jump 3 to 13. Practising this with a number line builds a strong number sense that pays off for ever.

**Fact families** help you see the link between addition and subtraction. From 8 + 5 = 13 you automatically know 5 + 8 = 13, 13 − 8 = 5, and 13 − 5 = 8. Knowing one fact really gives you four facts for free.`,
        studyGuide: `**Quick revision — Addition & Subtraction within 20**

- Make-ten strategy: split the smaller number to bridge through 10.
- Number line: show jumps for each step.
- Fact family: 8 + 5 = 13 → 5 + 8 = 13, 13 − 8 = 5, 13 − 5 = 8.
- Doubles (6 + 6 = 12) and near-doubles (6 + 7 = 13) build speed.
- Crossing the ten is the key hurdle — practise it most.`,
        keyTerms: [
          { term: "Addend", definition: "A number that is added to another." },
          { term: "Sum", definition: "The result of an addition." },
          { term: "Difference", definition: "The result of a subtraction." },
          { term: "Fact family", definition: "A set of related addition and subtraction facts using the same three numbers." },
        ],
        examples: [
          {
            title: "Make-ten: 7 + 6",
            body: "Split 6 into 3 and 3. Add 3 to 7 to make 10, then add the remaining 3 to get 13. So 7 + 6 = 13.",
          },
          {
            title: "Subtraction crossing 10: 14 − 6",
            body: "Subtract 4 first (14 − 4 = 10), then subtract 2 more (10 − 2 = 8). So 14 − 6 = 8.",
          },
        ],
        durationMin: 30,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Use make-ten: 8 + 5 = ?",
              options: ["12", "13", "14", "15"],
              answerIdx: 1,
              explanation: "Split 5 as 2 + 3. 8 + 2 = 10, then 10 + 3 = 13.",
            },
            {
              prompt: "14 − 6 = ?",
              options: ["6", "7", "8", "9"],
              answerIdx: 2,
              explanation: "14 − 4 = 10; 10 − 2 = 8.",
            },
            {
              prompt: "Which is a fact family for 7 + 4 = 11?",
              options: ["11 − 7 = 3", "11 − 4 = 7", "4 + 11 = 7", "11 + 7 = 4"],
              answerIdx: 1,
              explanation: "Subtracting the 4 from the sum gives 7. The correct fact is 11 − 4 = 7.",
            },
            {
              prompt: "9 + 9 = ?",
              options: ["16", "17", "18", "19"],
              answerIdx: 2,
              explanation: "Doubles fact: 9 + 9 = 18.",
            },
          ],
        },
      },
      {
        title: "Shape, Space & Measure",
        slug: "shape-space-measure",
        summary:
          "Name 2-D and 3-D shapes, describe turns and positions, and measure length using non-standard and standard units.",
        objectives: [
          "Recognise and name common 2-D and 3-D shapes.",
          "Describe position using left, right, above, below, beside.",
          "Measure length using cm on a ruler.",
          "Compare and order lengths.",
        ],
        content: `Shapes are how we describe the world. A **2-D shape** lies flat on a page — triangles, squares, rectangles and circles. A **3-D shape** takes up space — cubes, cuboids, spheres, cylinders, cones and pyramids. The flat faces of a 3-D shape are 2-D shapes: a cube has six square faces, for example.

We describe position using words such as **left, right, above, below, beside, between, in front of and behind**. Drawing a simple map of your classroom and labelling where objects are is a great way to practise. Turns are described as **quarter turn, half turn and full turn** — and as **clockwise** or **anti-clockwise**.

To measure length we use a ruler. The standard unit is the **centimetre (cm)**. Place the zero mark of the ruler at one end of the object and read the number at the other end. Always estimate first — "I think the pencil is about 15 cm" — so your measurement has a sanity check.

Comparing lengths is just like comparing numbers: the bigger the measurement, the longer the object. You can order three pencils by laying them side by side, then check by reading their lengths in cm.`,
        studyGuide: `**Quick revision — Shape, Space & Measure**

- 2-D: triangle, square, rectangle, circle. 3-D: cube, cuboid, sphere, cylinder, cone, pyramid.
- A cube has 6 square faces; a cuboid has 6 rectangular faces.
- Position words: left, right, above, below, beside, between.
- Turns: quarter, half, full. Direction: clockwise or anti-clockwise.
- Measure with a ruler in cm; always start at 0.
- Estimate before you measure so you catch mistakes.`,
        keyTerms: [
          { term: "Face", definition: "A flat surface of a 3-D shape." },
          { term: "Edge", definition: "Where two faces of a 3-D shape meet." },
          { term: "Vertex", definition: "A corner of a shape (plural: vertices)." },
          { term: "Centimetre (cm)", definition: "A standard unit of length; about the width of a small fingernail." },
        ],
        examples: [
          {
            title: "Describing a cube",
            body: "A cube has 6 square faces, 12 edges and 8 vertices. A dice is an example of a cube.",
          },
          {
            title: "Measuring a pencil",
            body: "Place the 0 of the ruler at one tip of the pencil; read 14 cm at the other tip. The pencil is 14 cm long.",
          },
        ],
        durationMin: 30,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "How many faces does a cube have?",
              options: ["4", "5", "6", "8"],
              answerIdx: 2,
              explanation: "A cube has 6 square faces — one top, one bottom, four around the sides.",
            },
            {
              prompt: "A quarter turn is the same as…",
              options: ["a full turn", "half a turn", "a 90° turn", "no turn at all"],
              answerIdx: 2,
              explanation: "A quarter turn rotates a shape by 90 degrees.",
            },
            {
              prompt: "Which unit is best for measuring the length of a pencil?",
              options: ["kg", "cm", "L", "min"],
              answerIdx: 1,
              explanation: "Length is measured in cm; kg is mass, L is volume, min is time.",
            },
            {
              prompt: "Which shape has only 3 sides?",
              options: ["Square", "Rectangle", "Triangle", "Circle"],
              answerIdx: 2,
              explanation: "A triangle has 3 straight sides.",
            },
          ],
        },
      },
    ],
  },

  // ===== Grade 3–4 =====
  {
    unitTitle: "Multiplication, Division & Fractions",
    gradeBand: "3-4",
    lessons: [
      {
        title: "Times Tables & Division Facts",
        slug: "times-tables-division",
        summary:
          "Master the 2, 3, 4, 5, 8 and 10 times tables and use them to derive division facts.",
        objectives: [
          "Recall multiplication facts for the 2, 3, 4, 5, 8 and 10 times tables.",
          "Use multiplication facts to derive division facts.",
          "Solve word problems involving multiplication and division.",
          "Recognise commutativity: 3 × 4 = 4 × 3.",
        ],
        content: `Multiplication is repeated addition. 4 × 3 means four groups of three, which equals 12. The same fact also means three groups of four — multiplication is **commutative**, so 4 × 3 = 3 × 4. This halves the number of facts you need to memorise.

The 2×, 5× and 10× tables are the easiest because they have clear patterns: 2× always ends in an even digit; 5× ends in 0 or 5; 10× always ends in 0. Build on these by using the **distributive property**: 6 × 7 = (5 × 7) + (1 × 7) = 35 + 7 = 42.

Division is the inverse of multiplication. If 6 × 4 = 24, then 24 ÷ 6 = 4 and 24 ÷ 4 = 6. Always pair division with multiplication in your head — they belong together.

Word problems become easier once you draw a quick picture. "Three boxes with 8 pencils each" is 3 × 8 = 24. "24 pencils shared between 3 boxes" is 24 ÷ 3 = 8. The numbers are the same; the question tells you which operation to use.`,
        studyGuide: `**Quick revision — Times Tables & Division Facts**

- Multiplication is commutative: a × b = b × a.
- Anchor tables: 2, 5, 10. Build others using distributive law.
- Division is the inverse: 6 × 4 = 24 ⇒ 24 ÷ 6 = 4 and 24 ÷ 4 = 6.
- Word-problem test: "groups of" → multiply; "shared between" → divide.
- Practise 5 minutes a day; fluency unlocks everything else.`,
        keyTerms: [
          { term: "Product", definition: "The result of a multiplication." },
          { term: "Factor", definition: "A number that divides another exactly." },
          { term: "Commutative", definition: "Order does not change the result (e.g., a × b = b × a)." },
          { term: "Inverse operation", definition: "The opposite operation that undoes another (e.g., division undoes multiplication)." },
        ],
        examples: [
          {
            title: "Distributive strategy: 7 × 8",
            body: "Split 7 as 5 + 2. Then 5 × 8 = 40 and 2 × 8 = 16. Total = 56.",
          },
          {
            title: "Word problem",
            body: "Five boxes, each with 6 eggs. 5 × 6 = 30 eggs. If shared between 5 friends: 30 ÷ 5 = 6 eggs each.",
          },
        ],
        durationMin: 35,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "7 × 8 = ?",
              options: ["54", "56", "64", "48"],
              answerIdx: 1,
              explanation: "7 × 8 = 56 (use 5 × 8 + 2 × 8 = 40 + 16).",
            },
            {
              prompt: "If 9 × 6 = 54, then 54 ÷ 6 = ?",
              options: ["6", "7", "8", "9"],
              answerIdx: 3,
              explanation: "Inverse: 54 ÷ 6 gives the original factor 9.",
            },
            {
              prompt: "Which property does 4 × 9 = 9 × 4 show?",
              options: ["Distributive", "Commutative", "Associative", "Identity"],
              answerIdx: 1,
              explanation: "Swapping the order of factors gives the same product — that is commutativity.",
            },
            {
              prompt: "Six boxes each hold 8 crayons. How many crayons in total?",
              options: ["14", "48", "64", "86"],
              answerIdx: 1,
              explanation: "6 × 8 = 48 crayons.",
            },
          ],
        },
      },
      {
        title: "Fractions of Shapes & Quantities",
        slug: "fractions-shapes-quantities",
        summary:
          "Recognise, name and find equivalent fractions; calculate fractions of sets of objects.",
        objectives: [
          "Recognise halves, quarters, thirds and eighths of shapes.",
          "Find equivalent fractions using diagrams and multiplication.",
          "Calculate a unit fraction of a quantity (e.g., 1/3 of 18).",
          "Calculate a non-unit fraction of a quantity (e.g., 2/5 of 20).",
        ],
        content: `A **fraction** describes equal parts of a whole. The bottom number, the **denominator**, tells you how many equal parts the whole is split into. The top number, the **numerator**, tells you how many of those parts you have. So 3/4 means three out of four equal parts.

Two fractions are **equivalent** if they describe the same amount. 1/2 is equivalent to 2/4 and to 4/8 because they all describe half. You can find equivalent fractions by multiplying (or dividing) both numerator and denominator by the same number.

To find a **unit fraction** of a quantity, divide by the denominator. So 1/3 of 18 = 18 ÷ 3 = 6. To find a **non-unit fraction**, first find the unit fraction and then multiply by the numerator. 2/5 of 20: 20 ÷ 5 = 4 (that is 1/5), then 4 × 2 = 8 (that is 2/5).

Fractions appear in money (half a dollar), in time (quarter of an hour) and in measures (three-quarters of a cup). Recognising fractions in everyday life helps them feel real rather than abstract.`,
        studyGuide: `**Quick revision — Fractions**

- Numerator / denominator: top / bottom of a fraction.
- Equivalent fractions: multiply or divide both parts by the same number.
- Unit fraction of quantity: divide by the denominator.
- Non-unit fraction of quantity: find 1 part first, then multiply by numerator.
- Visualise with bar models or pie charts.`,
        keyTerms: [
          { term: "Numerator", definition: "The top number in a fraction; how many parts you have." },
          { term: "Denominator", definition: "The bottom number; how many equal parts the whole is split into." },
          { term: "Equivalent fractions", definition: "Fractions that name the same amount." },
          { term: "Unit fraction", definition: "A fraction with numerator 1." },
        ],
        examples: [
          {
            title: "Equivalent fraction",
            body: "1/2 = 2/4 = 4/8. Multiply top and bottom by 2 (or by 4) to keep the value the same.",
          },
          {
            title: "2/3 of 15",
            body: "1/3 of 15 = 5. Multiply by 2 → 2/3 of 15 = 10.",
          },
        ],
        durationMin: 35,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which fraction is equivalent to 1/2?",
              options: ["2/3", "3/6", "3/4", "4/6"],
              answerIdx: 1,
              explanation: "Multiply top and bottom of 1/2 by 3 → 3/6.",
            },
            {
              prompt: "What is 1/4 of 20?",
              options: ["4", "5", "6", "10"],
              answerIdx: 1,
              explanation: "20 ÷ 4 = 5.",
            },
            {
              prompt: "What is 3/5 of 20?",
              options: ["4", "8", "12", "15"],
              answerIdx: 2,
              explanation: "1/5 of 20 = 4. Multiply by 3 → 12.",
            },
            {
              prompt: "Which numerator makes 5/? = 15/30?",
              options: ["3", "5", "6", "10"],
              answerIdx: 1,
              explanation: "15/30 simplifies to 1/2, so ? = 5 makes 5/10 = 1/2.",
            },
          ],
        },
      },
    ],
  },

  // ===== Grade 5–6 =====
  {
    unitTitle: "Decimals, Percentages & Ratio",
    gradeBand: "5-6",
    lessons: [
      {
        title: "Place Value & Operations with Decimals",
        slug: "decimals-place-value-ops",
        summary:
          "Read, write, order and calculate with decimals up to three decimal places.",
        objectives: [
          "Read and write decimals with up to three decimal places.",
          "Compare and order decimals by place value.",
          "Add and subtract decimals, aligning the decimal point.",
          "Multiply and divide decimals by whole numbers and powers of 10.",
        ],
        content: `Decimals extend our place-value system to the right of the units digit. After the decimal point we have **tenths (1/10)**, **hundredths (1/100)** and **thousandths (1/1000)**. The number 3.475 means 3 units, 4 tenths, 7 hundredths and 5 thousandths.

When comparing decimals, work from left to right — just like whole numbers. 0.6 is bigger than 0.58 because the tenths digit 6 is bigger than 5. Watch out: 0.5 and 0.50 look different but are equal, because 5 tenths = 50 hundredths.

To add or subtract decimals, always **line up the decimal points**. Then the digits in each place value column line up too. Filling empty places with zero (so 3.4 + 0.75 becomes 3.40 + 0.75) helps avoid mistakes.

Multiplying by 10 shifts every digit one place to the left; dividing by 10 shifts them one place to the right. So 4.25 × 10 = 42.5 and 4.25 ÷ 10 = 0.425. Multiplying by 100 shifts two places; by 1000 shifts three.`,
        studyGuide: `**Quick revision — Decimals**

- After the point: tenths, hundredths, thousandths.
- Compare left to right by place value.
- Add/subtract: line up the decimal points; pad with zeros if needed.
- ×10 shifts digits left one place; ÷10 shifts right one place.
- 0.5 = 0.50 = 0.500 — trailing zeros do not change the value.`,
        keyTerms: [
          { term: "Decimal point", definition: "The dot separating whole numbers from fractional parts." },
          { term: "Tenth", definition: "One part out of ten; one decimal place to the right of the point." },
          { term: "Hundredth", definition: "One part out of a hundred; two decimal places right." },
          { term: "Equivalent decimals", definition: "Decimals that have the same value (e.g., 0.4 = 0.40)." },
        ],
        examples: [
          {
            title: "Adding decimals",
            body: "3.4 + 0.75: line up the points → 3.40 + 0.75 = 4.15.",
          },
          {
            title: "Multiply by 1000",
            body: "0.06 × 1000 = 60. Each digit shifts three places left.",
          },
        ],
        durationMin: 35,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which is larger: 0.6 or 0.58?",
              options: ["0.58", "0.6", "They are equal", "Cannot tell"],
              answerIdx: 1,
              explanation: "0.6 has 6 tenths; 0.58 has only 5 tenths. So 0.6 is larger.",
            },
            {
              prompt: "3.4 + 0.75 = ?",
              options: ["3.79", "4.15", "4.05", "3.75"],
              answerIdx: 1,
              explanation: "Align the points: 3.40 + 0.75 = 4.15.",
            },
            {
              prompt: "0.06 × 1000 = ?",
              options: ["0.6", "6", "60", "600"],
              answerIdx: 2,
              explanation: "Shifting digits three places left gives 60.",
            },
            {
              prompt: "Which decimal equals 0.5?",
              options: ["0.05", "0.50", "0.005", "5.0"],
              answerIdx: 1,
              explanation: "Trailing zero does not change value: 0.5 = 0.50.",
            },
          ],
        },
      },
      {
        title: "Percentages & Real-Life Problems",
        slug: "percentages-real-life",
        summary:
          "Convert between fractions, decimals and percentages; calculate percentages of amounts and apply them to real-life contexts.",
        objectives: [
          "Convert between fractions, decimals and percentages.",
          "Find a percentage of an amount (e.g., 15% of 80).",
          "Increase or decrease an amount by a percentage.",
          "Apply percentages to money, discounts and statistics.",
        ],
        content: `**Percent** means "out of 100". So 25% means 25 out of 100, which is the same as 0.25 or 1/4. The three forms — fraction, decimal, percentage — are just different clothes for the same number.

To convert: divide to get a decimal, multiply by 100 to get a percentage. 3/4 = 0.75 = 75%. The reverse is similar: 40% = 0.40 = 2/5.

To find a **percentage of an amount**, find 1% first by dividing by 100, then multiply by the percent you need. For 15% of 80: 1% of 80 = 0.8; 15 × 0.8 = 12. Alternatively, find 10% (divide by 10) and 5% (halve the 10%) and add them: 10% of 80 = 8; 5% = 4; total 12.

A **percentage increase** adds a fraction on top. A 20% increase on £50: 20% of 50 = 10; new value = 50 + 10 = £60. A **percentage decrease** subtracts: a 25% discount on £40 = 25% of 40 = 10; sale price = £30.

Percentages appear in shop discounts, exam scores, bank interest, sports statistics and news headlines. Learning to read them fluently gives you power over numbers in real life.`,
        studyGuide: `**Quick revision — Percentages**

- Percent = out of 100. Convert fraction → decimal → ×100.
- Find 1% by dividing by 100; find 10% by dividing by 10.
- Percentage of amount: find 10%, 5%, 1% building blocks and combine.
- Increase: add the percentage; decrease: subtract it.
- Always check: 100% of an amount = the amount itself.`,
        keyTerms: [
          { term: "Percent", definition: "A number out of 100; written with the % sign." },
          { term: "Percentage increase", definition: "Adding a percentage of the original to itself." },
          { term: "Percentage decrease", definition: "Subtracting a percentage of the original from itself." },
          { term: "Discount", definition: "A percentage reduction in price." },
        ],
        examples: [
          {
            title: "15% of 80",
            body: "10% of 80 = 8; 5% of 80 = 4; total = 12.",
          },
          {
            title: "20% discount on £40",
            body: "20% of 40 = 8; sale price = 40 − 8 = £32.",
          },
        ],
        durationMin: 40,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Convert 3/4 to a percentage.",
              options: ["25%", "50%", "75%", "100%"],
              answerIdx: 2,
              explanation: "3/4 = 0.75 = 75%.",
            },
            {
              prompt: "15% of 80 = ?",
              options: ["8", "12", "15", "20"],
              answerIdx: 1,
              explanation: "10% = 8, 5% = 4, so 15% = 12.",
            },
            {
              prompt: "A 25% discount on £40 gives a sale price of…",
              options: ["£10", "£15", "£30", "£35"],
              answerIdx: 2,
              explanation: "25% of 40 = 10; 40 − 10 = £30.",
            },
            {
              prompt: "Which is the largest?",
              options: ["0.4", "45%", "3/8", "0.35"],
              answerIdx: 1,
              explanation: "Convert to decimals: 0.4, 0.45, 0.375, 0.35 → 0.45 is largest.",
            },
          ],
        },
      },
      {
        title: "Ratio & Proportion",
        slug: "ratio-proportion",
        summary:
          "Use ratio notation, simplify ratios, share amounts in a given ratio, and solve proportion problems.",
        objectives: [
          "Write and simplify ratios.",
          "Share an amount in a given ratio.",
          "Solve direct proportion problems using the unitary method.",
          "Use ratio to interpret scale drawings and maps.",
        ],
        content: `A **ratio** compares two or more quantities in the same unit. The ratio 3 : 2 says "for every 3 of A there are 2 of B". Ratios are simplified like fractions — divide both sides by the same number. 6 : 4 simplifies to 3 : 2 (divide both by 2).

To **share an amount in a ratio**, first find the total number of parts, then find the value of one part, then multiply. Share £40 in the ratio 3 : 2. Total parts = 3 + 2 = 5. One part = £40 ÷ 5 = £8. So one share = 3 × £8 = £24, the other = 2 × £8 = £16. Check: 24 + 16 = 40. ✓

**Direct proportion** means two quantities increase at the same rate. If 4 pens cost £6, then 8 pens (twice as many) cost £12 (twice the price). The **unitary method** finds the value of one item first: 4 pens cost £6, so 1 pen costs £1.50; 10 pens cost £15.

**Scale drawings** use ratios. A map scale of 1 : 50 000 means 1 cm on the map = 50 000 cm = 500 m in real life. A 4 cm distance on the map equals 2 km on the ground.`,
        studyGuide: `**Quick revision — Ratio & Proportion**

- Ratio a : b compares quantities in the same unit.
- Simplify by dividing both sides by a common factor.
- Share amount in ratio: total parts → value of one part → multiply.
- Direct proportion: double one quantity, double the other.
- Unitary method: always find the value of 1 first.
- Scale 1 : n means 1 unit on drawing = n units in reality.`,
        keyTerms: [
          { term: "Ratio", definition: "A comparison of two or more quantities in the same unit." },
          { term: "Proportion", definition: "Two quantities are in proportion if they increase at the same rate." },
          { term: "Unitary method", definition: "Finding the value of one item before scaling up." },
          { term: "Scale", definition: "The ratio between a drawing and the real object." },
        ],
        examples: [
          {
            title: "Share £40 in ratio 3 : 2",
            body: "Total parts = 5. One part = £8. Shares = £24 and £16. Sum check: 24 + 16 = 40.",
          },
          {
            title: "Map scale 1 : 50 000",
            body: "4 cm on map = 4 × 50 000 cm = 200 000 cm = 2 km in real life.",
          },
        ],
        durationMin: 40,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Simplify 6 : 4",
              options: ["2 : 1", "3 : 2", "4 : 3", "6 : 2"],
              answerIdx: 1,
              explanation: "Divide both sides by 2 → 3 : 2.",
            },
            {
              prompt: "Share £50 in ratio 3 : 2. The larger share is…",
              options: ["£15", "£20", "£25", "£30"],
              answerIdx: 3,
              explanation: "Total parts = 5; one part = £10; larger share = 3 × £10 = £30.",
            },
            {
              prompt: "If 4 pens cost £6, how much do 8 pens cost?",
              options: ["£8", "£10", "£12", "£16"],
              answerIdx: 2,
              explanation: "Direct proportion: twice the pens, twice the price = £12.",
            },
            {
              prompt: "On a 1 : 1000 map, 5 cm represents…",
              options: ["5 m", "50 m", "500 m", "5 km"],
              answerIdx: 1,
              explanation: "5 × 1000 cm = 5000 cm = 50 m.",
            },
          ],
        },
      },
    ],
  },

  // ===== Grade 7–8 =====
  {
    unitTitle: "Algebra, Equations & Coordinates",
    gradeBand: "7-8",
    lessons: [
      {
        title: "Algebraic Expressions & Substitution",
        slug: "algebraic-expressions-substitution",
        summary:
          "Use letters to represent variables, simplify expressions by collecting like terms, and substitute values into formulae.",
        objectives: [
          "Use letters to represent unknown numbers.",
          "Simplify expressions by collecting like terms.",
          "Substitute numerical values into expressions and formulae.",
          "Expand single brackets and factorise simple expressions.",
        ],
        content: `**Algebra** uses letters to stand for numbers we don't yet know or that can change. If a pen costs £p, then 4 pens cost 4p. Algebra is just a shorthand for arithmetic — and once you know the rules, it is a very powerful one.

**Like terms** have the same variable part. 3x and 5x are like terms; 3x and 5y are not. To simplify, combine like terms by adding or subtracting their coefficients: 3x + 5x = 8x; 7a − 2a = 5a. You cannot combine 4x and 3y — they are different things.

**Substitution** means replacing a letter with a number. If a = 3 and b = 4, then 2a + b = 2(3) + 4 = 10. Take care with order of operations: multiplication before addition, brackets first.

**Expanding** a bracket means multiplying each term inside by the term outside. 3(2x + 5) = 6x + 15. **Factorising** is the reverse: 6x + 15 = 3(2x + 5) — pull out the highest common factor (here 3) and put what is left inside brackets.`,
        studyGuide: `**Quick revision — Algebraic Expressions**

- Letters stand for unknown or variable quantities.
- Combine like terms only (same variable part).
- Substitution: replace letters with numbers, respect order of operations.
- Expand: multiply each term inside the bracket by the term outside.
- Factorise: take out the highest common factor.`,
        keyTerms: [
          { term: "Variable", definition: "A letter that represents an unknown or changing number." },
          { term: "Coefficient", definition: "The number multiplied by a variable (e.g., 5 in 5x)." },
          { term: "Like terms", definition: "Terms with the same variable part; they can be combined." },
          { term: "Factorise", definition: "To write an expression as a product using brackets." },
        ],
        examples: [
          {
            title: "Simplify 3x + 5x − 2y + y",
            body: "Combine x terms: 8x. Combine y terms: −y. Answer: 8x − y.",
          },
          {
            title: "Expand 4(2x + 3)",
            body: "4 × 2x = 8x; 4 × 3 = 12. Answer: 8x + 12.",
          },
        ],
        durationMin: 40,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Simplify 3x + 5x − 2y + y",
              options: ["8x − y", "8x − 3y", "8xy", "8x + 3y"],
              answerIdx: 0,
              explanation: "Combine like terms: x-terms = 8x; y-terms = (−2 + 1)y = −y.",
            },
            {
              prompt: "Expand 4(2x + 3)",
              options: ["8x + 3", "8x + 12", "6x + 7", "8x + 7"],
              answerIdx: 1,
              explanation: "4 × 2x = 8x; 4 × 3 = 12.",
            },
            {
              prompt: "If a = 3 and b = 4, what is 2a + b?",
              options: ["9", "10", "11", "14"],
              answerIdx: 1,
              explanation: "2(3) + 4 = 6 + 4 = 10.",
            },
            {
              prompt: "Factorise 6x + 15",
              options: ["2(3x + 5)", "3(2x + 5)", "3(2x + 15)", "6(x + 15)"],
              answerIdx: 1,
              explanation: "HCF = 3; 6x ÷ 3 = 2x; 15 ÷ 3 = 5.",
            },
          ],
        },
      },
      {
        title: "Linear Equations & Inequalities",
        slug: "linear-equations-inequalities",
        summary:
          "Solve one- and two-step linear equations, balance both sides, and solve simple linear inequalities.",
        objectives: [
          "Solve one-step linear equations using inverse operations.",
          "Solve two-step linear equations involving brackets and unknowns on both sides.",
          "Represent solutions to inequalities on a number line.",
          "Solve real-world problems with equations.",
        ],
        content: `An **equation** says that two expressions are equal. To solve an equation we use the **balance method**: whatever you do to one side, do to the other. The aim is to isolate the variable.

For a one-step equation like x + 7 = 12, subtract 7 from both sides: x = 5. For 3x = 21, divide both sides by 3: x = 7.

For two-step equations, undo the operations in reverse order. To solve 2x + 5 = 13: first subtract 5 (gives 2x = 8), then divide by 2 (gives x = 4). The order matters — undo additions/subtractions first, then multiplications/divisions.

When the **unknown appears on both sides**, collect like terms first. Solve 5x − 3 = 2x + 9. Subtract 2x from both sides: 3x − 3 = 9. Add 3: 3x = 12. Divide by 3: x = 4.

An **inequality** uses <, >, ≤, ≥ instead of =. The balance method works the same way with one important rule: **multiplying or dividing by a negative number flips the inequality sign**. The solution to an inequality is often a range of values; you can show it on a number line with an open circle for < and >, a closed circle for ≤ and ≥.`,
        studyGuide: `**Quick revision — Linear Equations & Inequalities**

- Balance method: do the same to both sides.
- Order of undoing: brackets → add/subtract → multiply/divide.
- Unknown on both sides: collect to one side first.
- Inequality: same rules; flip the sign if multiplying/dividing by a negative.
- Number line: open dot for <, >; closed dot for ≤, ≥.`,
        keyTerms: [
          { term: "Equation", definition: "A statement that two expressions are equal." },
          { term: "Balance method", definition: "Solving by performing the same operation on both sides." },
          { term: "Inverse operation", definition: "The operation that undoes another (e.g., subtraction undoes addition)." },
          { term: "Inequality", definition: "A statement that compares two expressions using <, >, ≤ or ≥." },
        ],
        examples: [
          {
            title: "Two-step equation",
            body: "2x + 5 = 13 → 2x = 8 → x = 4.",
          },
          {
            title: "Unknown on both sides",
            body: "5x − 3 = 2x + 9 → 3x − 3 = 9 → 3x = 12 → x = 4.",
          },
        ],
        durationMin: 45,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Solve 2x + 5 = 13",
              options: ["x = 3", "x = 4", "x = 5", "x = 9"],
              answerIdx: 1,
              explanation: "Subtract 5 → 2x = 8; divide by 2 → x = 4.",
            },
            {
              prompt: "Solve 5x − 3 = 2x + 9",
              options: ["x = 2", "x = 3", "x = 4", "x = 6"],
              answerIdx: 2,
              explanation: "Subtract 2x → 3x − 3 = 9; add 3 → 3x = 12; divide by 3 → x = 4.",
            },
            {
              prompt: "Solve −2x > 6. Which is correct?",
              options: ["x > −3", "x < −3", "x > 3", "x < 3"],
              answerIdx: 1,
              explanation: "Divide by −2 and flip the inequality sign: x < −3.",
            },
            {
              prompt: "Which value of x solves 3(x − 2) = 9?",
              options: ["x = 1", "x = 3", "x = 5", "x = 7"],
              answerIdx: 2,
              explanation: "Expand → 3x − 6 = 9; add 6 → 3x = 15; divide by 3 → x = 5.",
            },
          ],
        },
      },
      {
        title: "Coordinates & Straight-Line Graphs",
        slug: "coordinates-straight-line-graphs",
        summary:
          "Plot coordinates in all four quadrants, draw straight-line graphs from equations, and find the gradient and intercept.",
        objectives: [
          "Plot coordinates in all four quadrants.",
          "Recognise the equation y = mx + c.",
          "Find the gradient of a line from two points.",
          "Draw the graph of a linear equation.",
        ],
        content: `The **Cartesian coordinate system** lets us locate any point on a plane using two numbers: the **x-coordinate** (horizontal) and the **y-coordinate** (vertical). The point (3, 4) is 3 steps right and 4 steps up from the origin. The axes divide the plane into four **quadrants**; (3, 4) is in quadrant I, (−3, 4) in II, (−3, −4) in III and (3, −4) in IV.

A **straight-line graph** is described by an equation of the form **y = mx + c**. Here **m** is the gradient — how steep the line is — and **c** is the y-intercept, where the line crosses the y-axis. The line y = 2x + 3 has a gradient of 2 and crosses the y-axis at (0, 3).

To **draw the graph** of y = 2x + 3, build a small table of values: pick x = −1, 0, 1, 2, 3; work out y for each (1, 3, 5, 7, 9). Plot the points and join them with a straight line.

The **gradient** between two points (x₁, y₁) and (x₂, y₂) is **(y₂ − y₁) / (x₂ − x₁)** — that is, "rise over run". A gradient of 0 is a horizontal line; a vertical line has an undefined gradient. Lines with positive m slope up to the right; negative m slope down.`,
        studyGuide: `**Quick revision — Coordinates & Straight Lines**

- Coordinates (x, y) tell you how far right and up from the origin.
- Four quadrants: I (+,+), II (−,+), III (−,−), IV (+,−).
- y = mx + c: m = gradient, c = y-intercept.
- Gradient between two points = (y₂ − y₁) / (x₂ − x₁).
- To draw a line: build a table of values, plot, join with a ruler.`,
        keyTerms: [
          { term: "Origin", definition: "The point (0, 0) where the axes cross." },
          { term: "Gradient", definition: "The steepness of a line; rise over run." },
          { term: "y-intercept", definition: "The y-coordinate where a line crosses the y-axis (when x = 0)." },
          { term: "Quadrant", definition: "One of the four regions of the coordinate plane." },
        ],
        examples: [
          {
            title: "Gradient between (1, 2) and (4, 11)",
            body: "m = (11 − 2) / (4 − 1) = 9 / 3 = 3.",
          },
          {
            title: "Draw y = 2x − 1",
            body: "Table: x=−1→−3; x=0→−1; x=1→1; x=2→3. Plot and join. Gradient = 2, intercept = −1.",
          },
        ],
        durationMin: 45,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which quadrant contains the point (−3, 5)?",
              options: ["I", "II", "III", "IV"],
              answerIdx: 1,
              explanation: "x negative, y positive → quadrant II.",
            },
            {
              prompt: "What is the gradient of y = −3x + 4?",
              options: ["−4", "−3", "3", "4"],
              answerIdx: 1,
              explanation: "The coefficient of x is the gradient: m = −3.",
            },
            {
              prompt: "Gradient between (1, 2) and (4, 11)?",
              options: ["2", "3", "5", "9"],
              answerIdx: 1,
              explanation: "(11 − 2) / (4 − 1) = 9 / 3 = 3.",
            },
            {
              prompt: "The y-intercept of y = 2x − 1 is…",
              options: ["−1", "1", "2", "0"],
              answerIdx: 0,
              explanation: "c = −1, so the line crosses the y-axis at (0, −1).",
            },
          ],
        },
      },
    ],
  },

  // ===== Grade 9–10 =====
  {
    unitTitle: "Quadratics, Surds & Trigonometry",
    gradeBand: "9-10",
    lessons: [
      {
        title: "Quadratic Equations & the Parabola",
        slug: "quadratic-equations-parabola",
        summary:
          "Factorise and solve quadratic equations, complete the square, and sketch the parabola y = ax² + bx + c.",
        objectives: [
          "Solve quadratic equations by factorisation.",
          "Solve quadratic equations using the quadratic formula.",
          "Complete the square to find the turning point.",
          "Sketch y = ax² + bx + c, identifying key features.",
        ],
        content: `A **quadratic equation** has the form **ax² + bx + c = 0** (with a ≠ 0). Its graph is a **parabola** — a smooth U-shape (or upside-down U if a < 0). Quadratics appear in projectile motion, area problems, and many models of natural phenomena.

**Factorising** is the fastest method when it works. To solve x² + 5x + 6 = 0, find two numbers that multiply to 6 and add to 5: those are 2 and 3. So x² + 5x + 6 = (x + 2)(x + 3) = 0. The solutions are x = −2 and x = −3 (set each bracket to zero).

The **quadratic formula** works for any quadratic: **x = (−b ± √(b² − 4ac)) / (2a)**. The expression under the square root, **b² − 4ac**, is called the **discriminant**. If it is positive there are two real roots, if zero there is one repeated root, and if negative there are no real roots.

**Completing the square** rewrites ax² + bx + c as a(x + p)² + q. The vertex of the parabola is then at (−p, q). For x² + 6x + 4: take half of 6 (= 3), square it (= 9), so x² + 6x + 9 = (x + 3)². We added 5 too many, so subtract 5: (x + 3)² − 5. The vertex is (−3, −5).

When **sketching the parabola** y = ax² + bx + c, mark: the y-intercept (set x = 0), the roots (set y = 0), and the turning point from completing the square. A smooth U through these points is your sketch.`,
        studyGuide: `**Quick revision — Quadratics**

- Form: ax² + bx + c = 0 (a ≠ 0). Graph: parabola.
- Factorise: find two numbers that multiply to ac and add to b.
- Quadratic formula: x = (−b ± √(b² − 4ac)) / (2a).
- Discriminant Δ = b² − 4ac: >0 two roots, =0 one root, <0 no real root.
- Vertex form: a(x + p)² + q; vertex at (−p, q).
- Sketch: y-intercept, roots, vertex, then smooth U.`,
        keyTerms: [
          { term: "Quadratic", definition: "A polynomial of degree 2; its graph is a parabola." },
          { term: "Discriminant", definition: "The expression b² − 4ac under the square root in the quadratic formula." },
          { term: "Vertex", definition: "The turning point of a parabola; the minimum (or maximum) point." },
          { term: "Root", definition: "A value of x for which the quadratic equals zero." },
        ],
        examples: [
          {
            title: "Factorise and solve",
            body: "x² + 5x + 6 = (x + 2)(x + 3) = 0 ⇒ x = −2 or x = −3.",
          },
          {
            title: "Complete the square",
            body: "x² + 6x + 4 = (x + 3)² − 5; vertex at (−3, −5).",
          },
        ],
        durationMin: 50,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "Factorise x² + 5x + 6",
              options: ["(x + 1)(x + 6)", "(x + 2)(x + 3)", "(x − 2)(x − 3)", "(x + 5)(x + 1)"],
              answerIdx: 1,
              explanation: "2 × 3 = 6 and 2 + 3 = 5, so (x + 2)(x + 3).",
            },
            {
              prompt: "Solutions of x² + 5x + 6 = 0 are…",
              options: ["x = 2, 3", "x = −2, −3", "x = 1, 6", "x = −1, −6"],
              answerIdx: 1,
              explanation: "Set each bracket to zero: x = −2 or x = −3.",
            },
            {
              prompt: "The discriminant of x² − 4x + 5 is…",
              options: ["−4", "0", "4", "16"],
              answerIdx: 0,
              explanation: "Δ = (−4)² − 4(1)(5) = 16 − 20 = −4. So no real roots.",
            },
            {
              prompt: "Vertex of y = (x + 3)² − 5 is at…",
              options: ["(3, −5)", "(−3, −5)", "(−3, 5)", "(3, 5)"],
              answerIdx: 1,
              explanation: "Vertex form gives vertex at (−p, q) = (−3, −5).",
            },
          ],
        },
      },
      {
        title: "Right-Angled Trigonometry",
        slug: "right-angled-trigonometry",
        summary:
          "Use sine, cosine and tangent ratios in right-angled triangles to find unknown sides and angles.",
        objectives: [
          "Label the sides of a right-angled triangle (hypotenuse, opposite, adjacent).",
          "Use SOH CAH TOA to find unknown sides.",
          "Use inverse trig functions to find unknown angles.",
          "Apply trigonometry to problems in 2-D and 3-D.",
        ],
        content: `In a **right-angled triangle**, the longest side (opposite the right angle) is the **hypotenuse**. From a given angle θ, the side opposite θ is the **opposite**, and the side next to θ (not the hypotenuse) is the **adjacent**.

The three trigonometric ratios are remembered by **SOH CAH TOA**:

- **sin θ** = opposite / hypotenuse
- **cos θ** = adjacent / hypotenuse
- **tan θ** = opposite / adjacent

To find an **unknown side**, choose the ratio that uses the side you know and the side you want. For example, if you know the opposite and want the hypotenuse, use sin.

To find an **unknown angle**, use the inverse functions: sin⁻¹, cos⁻¹, tan⁻¹. If sin θ = 0.5, then θ = sin⁻¹(0.5) = 30°.

Always check your answer is sensible: the hypotenuse is always the longest side, so sin and cos values must lie between −1 and 1; tan can take any real value. Trigonometry is essential in surveying, navigation, architecture, and physics — anywhere angles and distances appear together.`,
        studyGuide: `**Quick revision — Right-angled Trigonometry**

- Label sides: hypotenuse (longest), opposite (to angle), adjacent (next to angle).
- SOH: sin θ = opp / hyp.
- CAH: cos θ = adj / hyp.
- TOA: tan θ = opp / adj.
- Finding sides: choose ratio with known + wanted side.
- Finding angles: use inverse functions sin⁻¹, cos⁻¹, tan⁻¹.
- Sanity check: hypotenuse is always longest.`,
        keyTerms: [
          { term: "Hypotenuse", definition: "The longest side of a right-angled triangle; opposite the right angle." },
          { term: "Opposite", definition: "The side opposite the angle of interest." },
          { term: "Adjacent", definition: "The side next to the angle of interest (not the hypotenuse)." },
          { term: "Trigonometric ratio", definition: "A ratio of two sides of a right-angled triangle: sin, cos or tan." },
        ],
        examples: [
          {
            title: "Finding a side",
            body: "In a right-angled triangle, θ = 30°, hypotenuse = 10 cm. Opposite = sin 30° × 10 = 0.5 × 10 = 5 cm.",
          },
          {
            title: "Finding an angle",
            body: "If opposite = 3 and adjacent = 4, then tan θ = 3/4 = 0.75, so θ = tan⁻¹(0.75) ≈ 36.9°.",
          },
        ],
        durationMin: 50,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "Which ratio equals sin θ?",
              options: ["adj / hyp", "opp / hyp", "opp / adj", "hyp / opp"],
              answerIdx: 1,
              explanation: "SOH: sin = opposite / hypotenuse.",
            },
            {
              prompt: "Hypotenuse = 10, θ = 30°. Find the opposite side.",
              options: ["3", "5", "8.66", "10"],
              answerIdx: 1,
              explanation: "opp = sin 30° × 10 = 0.5 × 10 = 5.",
            },
            {
              prompt: "Opposite = 3, adjacent = 4. Find θ to 1 d.p.",
              options: ["36.9°", "41.4°", "53.1°", "48.6°"],
              answerIdx: 0,
              explanation: "tan θ = 3/4 = 0.75; θ = tan⁻¹(0.75) ≈ 36.9°.",
            },
            {
              prompt: "In a right-angled triangle, the hypotenuse is always…",
              options: ["the shortest side", "opposite the smallest angle", "the longest side", "equal to the opposite"],
              answerIdx: 2,
              explanation: "By definition, the hypotenuse is opposite the right angle and is the longest side.",
            },
          ],
        },
      },
      {
        title: "Surds & Indices",
        slug: "surds-indices",
        summary:
          "Simplify surds, perform operations with surds, and apply the laws of indices including negative and fractional powers.",
        objectives: [
          "Apply the laws of indices to simplify expressions.",
          "Work with negative and fractional indices.",
          "Simplify surds by extracting square factors.",
          "Rationalise denominators containing surds.",
        ],
        content: `**Indices** (or exponents) are a compact way to write repeated multiplication. The **laws of indices** let us manipulate them:

- aᵐ × aⁿ = aᵐ⁺ⁿ
- aᵐ ÷ aⁿ = aᵐ⁻ⁿ
- (aᵐ)ⁿ = aᵐⁿ
- a⁰ = 1
- a⁻ⁿ = 1 / aⁿ
- a^(1/n) = ⁿ√a

A **surd** is an irrational root such as √2 or √5. Surds are exact values — keep them as surds rather than decimals in working. To simplify a surd, pull out the largest square factor: √50 = √(25 × 2) = 5√2.

To **rationalise a denominator**, multiply top and bottom by a surd that removes the root from the denominator. To rationalise 1/√3, multiply by √3/√3 → √3/3. For denominators like (3 − √2), multiply by (3 + √2) and use the difference of two squares.

Indices and surds appear in science (square-cube law in biology), engineering (root-mean-square voltages), and finance (compound interest uses indices).`,
        studyGuide: `**Quick revision — Surds & Indices**

- Laws: aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐⁿ.
- a⁰ = 1; a⁻ⁿ = 1/aⁿ; a^(1/n) = ⁿ√a.
- Simplify √50 by extracting the largest square factor: 5√2.
- Rationalise 1/√a by multiplying by √a/√a.
- For a/(b − √c), multiply by (b + √c) and use difference of squares.`,
        keyTerms: [
          { term: "Index (exponent)", definition: "The power to which a number is raised." },
          { term: "Surd", definition: "An irrational root left in exact form, e.g. √2." },
          { term: "Rationalise", definition: "To remove surds from the denominator of a fraction." },
          { term: "Square factor", definition: "A factor of a number that is a perfect square, e.g. 25 in 50." },
        ],
        examples: [
          {
            title: "Simplify √50",
            body: "√50 = √(25 × 2) = √25 × √2 = 5√2.",
          },
          {
            title: "Rationalise 1/√3",
            body: "Multiply by √3/√3 → √3 / 3.",
          },
        ],
        durationMin: 45,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "Simplify a³ × a⁵",
              options: ["a⁸", "a¹⁵", "a²", "a⁻²"],
              answerIdx: 0,
              explanation: "Add the indices when multiplying: 3 + 5 = 8.",
            },
            {
              prompt: "Simplify √50",
              options: ["2√5", "5√2", "25√2", "10"],
              answerIdx: 1,
              explanation: "√50 = √(25 × 2) = 5√2.",
            },
            {
              prompt: "What is 16^(1/2)?",
              options: ["4", "8", "2", "16"],
              answerIdx: 0,
              explanation: "A power of 1/2 means square root: √16 = 4.",
            },
            {
              prompt: "Rationalise 1/√3",
              options: ["√3 / 3", "3 / √3", "1 / 3", "√3"],
              answerIdx: 0,
              explanation: "Multiply numerator and denominator by √3: 1×√3 / (√3 × √3) = √3 / 3.",
            },
          ],
        },
      },
    ],
  },

  // ===== Grade 11–12 =====
  {
    unitTitle: "Calculus, Logs & Vectors",
    gradeBand: "11-12",
    lessons: [
      {
        title: "Differentiation & Applications",
        slug: "differentiation-applications",
        summary:
          "Differentiate polynomials and trig functions, find equations of tangents and normals, and locate stationary points.",
        objectives: [
          "Differentiate xⁿ using the power rule.",
          "Differentiate sums, differences and constant multiples.",
          "Find the gradient at a point and the equation of a tangent.",
          "Locate and classify stationary points.",
        ],
        content: `**Differentiation** is the mathematics of change. The **derivative** dy/dx of a function tells you its gradient at any point. Geometrically, it is the slope of the tangent line to the curve.

The **power rule** is the workhorse: if y = xⁿ then dy/dx = n·xⁿ⁻¹. So if y = x³, then dy/dx = 3x². Constants differentiate to zero, and the rule applies to negative and fractional powers too: d/dx(1/x) = d/dx(x⁻¹) = −x⁻² = −1/x².

Differentiation is **linear**: the derivative of a sum is the sum of the derivatives, and you can pull out constant factors. So d/dx(5x³ − 2x + 7) = 15x² − 2.

To find the **equation of a tangent** at x = a: evaluate the derivative at a to get the gradient m, then use y − y₁ = m(x − x₁). The **normal** is perpendicular to the tangent; its gradient is −1/m (provided m ≠ 0).

A **stationary point** occurs where dy/dx = 0. To classify it, look at the second derivative: if d²y/dx² > 0 the point is a minimum; if < 0 it is a maximum; if = 0 the test is inconclusive (often a point of inflection).`,
        studyGuide: `**Quick revision — Differentiation**

- Power rule: d/dx(xⁿ) = n·xⁿ⁻¹.
- Constants differentiate to 0; sums differentiate term by term.
- Tangent gradient at x = a is f′(a); equation y − y₁ = m(x − x₁).
- Normal gradient = −1/m (perpendicular to tangent).
- Stationary points: solve f′(x) = 0.
- Classify with f″(x): >0 min, <0 max, =0 inconclusive.`,
        keyTerms: [
          { term: "Derivative", definition: "The rate of change of a function; the gradient of its graph." },
          { term: "Tangent", definition: "A straight line that touches a curve at one point with the same gradient." },
          { term: "Stationary point", definition: "A point on a curve where the gradient is zero." },
          { term: "Second derivative", definition: "The derivative of the derivative, written f″(x) or d²y/dx²." },
        ],
        examples: [
          {
            title: "Power rule",
            body: "d/dx(x⁴) = 4x³. d/dx(3x² − 5x + 2) = 6x − 5.",
          },
          {
            title: "Stationary point",
            body: "y = x³ − 3x + 1 → dy/dx = 3x² − 3 = 0 ⇒ x = ±1. d²y/dx² = 6x. At x = 1: 6 > 0 (min); at x = −1: −6 < 0 (max).",
          },
        ],
        durationMin: 55,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "Differentiate y = x⁵",
              options: ["5x⁴", "x⁴/5", "5x⁶", "x⁶"],
              answerIdx: 0,
              explanation: "Power rule: multiply by 5 and reduce the power by 1 → 5x⁴.",
            },
            {
              prompt: "d/dx(3x² − 5x + 2) = ?",
              options: ["6x − 5", "3x − 5", "6x + 2", "6x² − 5"],
              answerIdx: 0,
              explanation: "Differentiate term by term: 6x − 5 + 0.",
            },
            {
              prompt: "Stationary points of y = x³ − 3x + 1 are at x = ?",
              options: ["x = 1 only", "x = −1 only", "x = ±1", "x = 0, ±1"],
              answerIdx: 2,
              explanation: "dy/dx = 3x² − 3 = 0 ⇒ x² = 1 ⇒ x = ±1.",
            },
            {
              prompt: "At a maximum, the second derivative is…",
              options: ["positive", "negative", "zero", "undefined"],
              answerIdx: 1,
              explanation: "f″(x) < 0 confirms a maximum (the curve bends downwards).",
            },
          ],
        },
      },
      {
        title: "Integration & Area",
        slug: "integration-area",
        summary:
          "Integrate polynomials, find the constant of integration from initial conditions, and calculate the area under a curve.",
        objectives: [
          "Integrate xⁿ using the power rule (n ≠ −1).",
          "Find the constant of integration from a given point.",
          "Calculate the definite integral as the area under a curve.",
          "Find the area between two curves.",
        ],
        content: `**Integration** is the reverse of differentiation. The **indefinite integral** of xⁿ is xⁿ⁺¹/(n+1) + C, where C is the **constant of integration** — because the derivative of any constant is zero, we cannot recover it from differentiation alone.

To find C, use a known point. If dy/dx = 2x and y = 5 when x = 1, integrate to get y = x² + C; substitute: 5 = 1 + C ⇒ C = 4; so y = x² + 4.

The **definite integral** ∫ from a to b of f(x) dx gives the (signed) **area under the curve** between x = a and x = b. Compute it as F(b) − F(a), where F is any antiderivative. Areas above the x-axis count positive; areas below count negative.

To find the **area between two curves** y = f(x) and y = g(x) (where f ≥ g), integrate f − g over the interval. Always sketch the curves first to see which is on top and where they cross.

Integration is fundamental in physics (displacement from velocity, work from force), economics (total cost from marginal cost), and statistics (probabilities as areas under a density curve).`,
        studyGuide: `**Quick revision — Integration**

- Indefinite: ∫ xⁿ dx = xⁿ⁺¹ / (n+1) + C (for n ≠ −1).
- Find C using a known point (x, y).
- Definite: ∫ₐᵇ f(x) dx = F(b) − F(a) — area under curve.
- Area below axis counts as negative; take |.| if you need true area.
- Area between curves = ∫ (top − bottom) dx.`,
        keyTerms: [
          { term: "Indefinite integral", definition: "An antiderivative that includes + C because differentiation loses constants." },
          { term: "Constant of integration", definition: "The + C in an indefinite integral, found using a known point." },
          { term: "Definite integral", definition: "The signed area under a curve between two limits." },
          { term: "Antiderivative", definition: "A function whose derivative is the given function." },
        ],
        examples: [
          {
            title: "Indefinite integral",
            body: "∫ (6x² − 4x + 1) dx = 2x³ − 2x² + x + C.",
          },
          {
            title: "Definite integral area",
            body: "∫₀² (3x²) dx = [x³] from 0 to 2 = 8 − 0 = 8 square units.",
          },
        ],
        durationMin: 55,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "∫ x⁴ dx = ?",
              options: ["x⁵/5 + C", "4x³ + C", "x⁵/4 + C", "5x⁵ + C"],
              answerIdx: 0,
              explanation: "Increase power by 1 and divide by new power: x⁵/5 + C.",
            },
            {
              prompt: "If dy/dx = 2x and y = 5 when x = 1, find y.",
              options: ["x² + 4", "x² + 5", "x² + 3", "2x² + 3"],
              answerIdx: 0,
              explanation: "Integrate: y = x² + C. Use (1, 5): 5 = 1 + C ⇒ C = 4.",
            },
            {
              prompt: "Evaluate ∫₀² 3x² dx",
              options: ["4", "6", "8", "12"],
              answerIdx: 2,
              explanation: "[x³] from 0 to 2 = 8 − 0 = 8.",
            },
            {
              prompt: "The area between two curves y = f(x) and y = g(x) (f ≥ g) from a to b is…",
              options: ["∫ (f + g) dx", "∫ (f − g) dx", "∫ (g − f) dx", "∫ f × g dx"],
              answerIdx: 1,
              explanation: "Subtract the lower curve from the upper one and integrate.",
            },
          ],
        },
      },
      {
        title: "Logarithms & Exponentials",
        slug: "logarithms-exponentials",
        summary:
          "Apply the laws of logarithms, solve exponential and logarithmic equations, and model growth and decay.",
        objectives: [
          "Convert between exponential and logarithmic forms.",
          "Apply the laws of logarithms.",
          "Solve exponential equations using logarithms.",
          "Model exponential growth and decay in real contexts.",
        ],
        content: `A **logarithm** answers the question "to what power must the base be raised to give this number?" log₁₀(1000) = 3 because 10³ = 1000. The logarithm is the **inverse** of the exponential: if y = aˣ then x = logₐ(y).

The **laws of logarithms** mirror the laws of indices:

- logₐ(xy) = logₐ(x) + logₐ(y)
- logₐ(x/y) = logₐ(x) − logₐ(y)
- logₐ(xⁿ) = n · logₐ(x)
- logₐ(1) = 0
- logₐ(a) = 1

To **solve an exponential equation**, take logarithms of both sides. For 2ˣ = 32, recognise that 32 = 2⁵, so x = 5. For 3ˣ = 20, take log (any base) of both sides: x · log 3 = log 20, so x = log 20 / log 3 ≈ 2.73.

**Exponential growth** is modelled by y = A·aᵗ (population, compound interest, radioactive decay). The natural exponential eˣ and its inverse ln(x) (logarithm to base e ≈ 2.718) are special because they are their own derivatives — making them the natural language of continuous growth.`,
        studyGuide: `**Quick revision — Logarithms & Exponentials**

- logₐ(x) = n ⇔ aⁿ = x (log is the inverse of exponent).
- Laws: log(xy) = log x + log y; log(x/y) = log x − log y; log(xⁿ) = n log x.
- logₐ(1) = 0; logₐ(a) = 1.
- Solve aˣ = b: x = log(b) / log(a).
- e ≈ 2.718; ln is log to base e. d/dx(eˣ) = eˣ; d/dx(ln x) = 1/x.
- Growth/decay model: y = A·e^(kt); k > 0 growth, k < 0 decay.`,
        keyTerms: [
          { term: "Logarithm", definition: "The inverse of exponentiation; the power to which a base must be raised." },
          { term: "Base", definition: "The number that is raised to a power." },
          { term: "Natural logarithm (ln)", definition: "Logarithm to base e ≈ 2.718." },
          { term: "Exponential growth/decay", definition: "A quantity that changes at a rate proportional to its current value." },
        ],
        examples: [
          {
            title: "Solve 2ˣ = 32",
            body: "Recognise 32 = 2⁵, so x = 5. Or: x = log 32 / log 2 = 5.",
          },
          {
            title: "Decay model",
            body: "A 100 g sample decays as A = 100·e^(−0.1t). After t = 10: A = 100·e⁻¹ ≈ 36.8 g.",
          },
        ],
        durationMin: 55,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "log₁₀(1000) = ?",
              options: ["2", "3", "10", "100"],
              answerIdx: 1,
              explanation: "10³ = 1000, so log₁₀(1000) = 3.",
            },
            {
              prompt: "logₐ(xy) = ?",
              options: ["logₐ(x) × logₐ(y)", "logₐ(x) + logₐ(y)", "logₐ(x) − logₐ(y)", "x + y"],
              answerIdx: 1,
              explanation: "Log of a product equals sum of logs.",
            },
            {
              prompt: "Solve 2ˣ = 32",
              options: ["x = 4", "x = 5", "x = 6", "x = log 2"],
              answerIdx: 1,
              explanation: "32 = 2⁵, so x = 5.",
            },
            {
              prompt: "ln(e³) = ?",
              options: ["1", "3", "e", "0"],
              answerIdx: 1,
              explanation: "ln is the inverse of eˣ, so ln(e³) = 3.",
            },
          ],
        },
      },
    ],
  },
];
