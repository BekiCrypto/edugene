import type { TopicUnit } from "../index";

export const computingTopics: TopicUnit[] = [
  {
    unitTitle: "Digital Literacy & First Programming",
    gradeBand: "3-4",
    lessons: [
      {
        title: "Staying Safe Online (e-Safety)",
        slug: "esafety-online-safety",
        summary:
          "Learn to use the internet safely: protect personal information, recognise risks, and behave kindly online.",
        objectives: [
          "Identify personal information that should not be shared online.",
          "Recognise cyberbullying and know how to respond.",
          "Evaluate the trustworthiness of online information.",
          "Use strong passwords and protect accounts.",
        ],
        content: `The internet is a powerful tool, but it comes with risks. **Personal information** — full name, address, school, phone number, passwords, photos — should be shared carefully. Once something is online, it can be copied, screenshot and shared by anyone, even years later. The rule: if you would not share it with a stranger on the street, do not share it online.

**Cyberbullying** is bullying using technology — mean messages, excluding people from group chats, sharing embarrassing photos. It can happen 24/7 and feel inescapable. If it happens to you: don't reply, save evidence (screenshots), tell a trusted adult, and report through the platform. If you see it happening, support the target and report — silence enables bullies.

**Passwords** are the keys to your digital life. A strong password is long (12+ characters), uses a mix of letters, numbers and symbols, and is not used on multiple sites. Use a password manager to remember them. **Two-factor authentication (2FA)** adds a second step (a code on your phone) so even if someone steals your password, they still cannot get in.

Not everything online is true. **Misinformation** (false info spread by mistake) and **disinformation** (false info spread on purpose) are everywhere. Check the source: who wrote it? When? Why? Cross-check with trusted sources (BBC, Reuters, AP, government websites). Be especially careful with emotionally charged posts — they are designed to bypass your critical thinking.

**Digital footprint**: every click, post, comment and search leaves a trace. Future schools, employers and friends may see what you posted years ago. Build a footprint you would be proud to show — share kindness, creativity and curiosity.`,
        studyGuide: `**Quick revision — e-Safety**

- Personal info (name, address, school, photos, passwords) — share carefully.
- Cyberbullying: don't reply, screenshot, tell an adult, report.
- Strong password: 12+ chars, mixed, unique per site, use a manager.
- 2FA: second step on your phone; protects even if password leaks.
- Misinformation (mistake) vs disinformation (intentional).
- Check source, date, motive; cross-check with trusted outlets.
- Digital footprint is permanent — make it one you are proud of.`,
        keyTerms: [
          { term: "Personal information", definition: "Data that identifies you (name, address, photos, passwords)." },
          { term: "Cyberbullying", definition: "Bullying using digital technology." },
          { term: "Two-factor authentication (2FA)", definition: "A second login step (e.g. phone code) that adds security." },
          { term: "Digital footprint", definition: "The trail of data you leave behind online." },
        ],
        examples: [
          {
            title: "Strong password",
            body: "Instead of 'password123', use 'PurpleTiger!Jumps7Moon' — long, mixed, easy to remember, hard to crack.",
          },
          {
            title: "Spotting misinformation",
            body: "A post claims '5G causes viruses'. Check: who wrote it? (Anonymous.) Is it on trusted health sites? (No. WHO says no link.) It is misinformation.",
          },
        ],
        durationMin: 30,
        difficulty: "introductory",
        quiz: {
          timeLimit: 8,
          questions: [
            {
              prompt: "Which should you NOT share publicly online?",
              options: ["your favourite colour", "your home address", "your hobby", "your pet's name"],
              answerIdx: 1,
              explanation: "Home address is personal information that could put you at risk.",
            },
            {
              prompt: "If you experience cyberbullying, you should…",
              options: ["reply angrily", "keep it secret", "save evidence, tell an adult, report", "delete all your accounts"],
              answerIdx: 2,
              explanation: "Save screenshots, tell a trusted adult, and report through the platform.",
            },
            {
              prompt: "A strong password is…",
              options: ["short and easy", "your pet's name", "12+ chars, mixed, unique per site", "123456"],
              answerIdx: 2,
              explanation: "Long, mixed, and unique per site is the strong-password rule.",
            },
            {
              prompt: "False info spread on purpose is called…",
              options: ["misinformation", "disinformation", "advertisement", "rumour"],
              answerIdx: 1,
              explanation: "Disinformation is intentionally false; misinformation is accidentally false.",
            },
          ],
        },
      },
      {
        title: "First Steps in Block Programming (Scratch)",
        slug: "scratch-block-programming",
        summary:
          "Use Scratch to learn sequence, loops and events by building simple interactive stories and games.",
        objectives: [
          "Use sequence — put blocks in the right order.",
          "Use loops to repeat actions.",
          "Use events (when green flag clicked, when key pressed).",
          "Build a simple interactive story or game.",
        ],
        content: `Programming is giving instructions to a computer. In **Scratch**, instructions are coloured blocks that snap together like Lego. Each block tells a **sprite** (a character on the screen) what to do — move, say something, play a sound, change costume.

**Sequence** is the order of instructions. Computers follow instructions exactly in order. If you put 'turn 90°' before 'move 10 steps', the sprite goes one way; reverse the order and it goes another. Getting the order right is the heart of programming.

**Loops** repeat actions. The 'forever' block runs its inside blocks again and again until you stop the program. The 'repeat 10' block runs them a fixed number of times. Loops let you make animations, dancing sprites and games without writing the same instruction a hundred times.

**Events** trigger actions. The 'when green flag clicked' block starts your program. 'When space key pressed' triggers an action when the user presses space. 'When this sprite clicked' triggers when the user clicks the sprite. Events let your program respond to the user.

To build a simple **chase game**: Cat sprite follows the mouse pointer with 'forever: point towards mouse-pointer, move 10 steps'. Apple sprite has 'when this sprite clicked: say "Yum!" for 1 second, change score by 1'. Add a 'score' variable, and you have a working game!`,
        studyGuide: `**Quick revision — Block Programming**

- Sequence: order matters; computer follows exactly.
- Loops: 'forever', 'repeat N' — repeat without retyping.
- Events: 'when green flag clicked', 'when key pressed', 'when sprite clicked'.
- Sprites = characters; costumes = how they look; backdrops = background.
- Build: plan, code small piece, test, add more, test again.`,
        keyTerms: [
          { term: "Sprite", definition: "A character or object on the Scratch stage." },
          { term: "Sequence", definition: "The order of instructions in a program." },
          { term: "Loop", definition: "A block that repeats the blocks inside it." },
          { term: "Event", definition: "A trigger that starts a set of instructions (key press, click)." },
        ],
        examples: [
          {
            title: "Chase game",
            body: "Cat: forever { point towards mouse-pointer; move 10 steps }. Apple: when clicked { say 'Yum!' for 1 sec; change score by 1 }.",
          },
          {
            title: "Loop saves typing",
            body: "To draw a square: repeat 4 { move 100; turn 90° }. Four blocks instead of eight.",
          },
        ],
        durationMin: 35,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "What is a 'sprite' in Scratch?",
              options: ["a sound", "a character or object on stage", "a backdrop", "a variable"],
              answerIdx: 1,
              explanation: "Sprites are the characters/objects that move and act on the stage.",
            },
            {
              prompt: "Which block repeats forever?",
              options: ["repeat 10", "if", "forever", "wait"],
              answerIdx: 2,
              explanation: "'forever' loops until the program stops.",
            },
            {
              prompt: "Which event starts a Scratch program?",
              options: ["when space pressed", "when green flag clicked", "when sound plays", "when stop clicked"],
              answerIdx: 1,
              explanation: "'when green flag clicked' is the standard program start.",
            },
            {
              prompt: "Computers follow instructions…",
              options: ["randomly", "in the order written", "however they feel", "from last to first"],
              answerIdx: 1,
              explanation: "Sequence matters — computers run instructions exactly in order.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Algorithms & Web Basics",
    gradeBand: "5-6",
    lessons: [
      {
        title: "Algorithms & Flowcharts",
        slug: "algorithms-flowcharts",
        summary:
          "Design algorithms using flowcharts and pseudocode; understand sequence, selection and iteration.",
        objectives: [
          "Define an algorithm and identify its three building blocks (sequence, selection, iteration).",
          "Draw a flowchart using standard symbols.",
          "Write pseudocode for a simple problem.",
          "Trace an algorithm to find errors.",
        ],
        content: `An **algorithm** is a step-by-step set of instructions to solve a problem. Recipes, directions, and assembly manuals are all algorithms. In computing, algorithms are written so precisely that a computer can follow them — but they are designed by humans first.

Every algorithm is built from three **building blocks**:

- **Sequence** — instructions run in order.
- **Selection** — choose between paths based on a condition (if/else).
- **Iteration** — repeat steps (loops).

With just these three, you can solve any problem a computer can solve.

**Flowcharts** picture algorithms. Standard symbols:

- **Oval** — start / end.
- **Rectangle** — process (do something).
- **Diamond** — decision (yes/no question, two outgoing arrows).
- **Parallelogram** — input / output.
- **Arrow** — flow direction.

**Pseudocode** is halfway between English and code. It uses keywords like INPUT, OUTPUT, IF, ELSE, WHILE, FOR, but is not tied to any specific language.

~~~
INPUT age
IF age >= 18 THEN
  OUTPUT "You can vote"
ELSE
  OUTPUT "You cannot vote yet"
ENDIF
~~~

**Tracing** an algorithm means stepping through it line by line with sample inputs to see what happens. Trace the above with age = 16: INPUT 16; is 16 ≥ 18? No; OUTPUT "You cannot vote yet". Tracing finds bugs — places where the algorithm does the wrong thing.`,
        studyGuide: `**Quick revision — Algorithms**

- Algorithm = step-by-step problem-solving instructions.
- Three blocks: sequence, selection (if/else), iteration (loops).
- Flowchart symbols: oval (start/end), rectangle (process), diamond (decision), parallelogram (I/O).
- Pseudocode uses INPUT, OUTPUT, IF, ELSE, WHILE, FOR.
- Tracing: step through with sample inputs to find bugs.`,
        keyTerms: [
          { term: "Algorithm", definition: "A precise step-by-step procedure to solve a problem." },
          { term: "Sequence", definition: "Instructions running in order." },
          { term: "Selection", definition: "Choosing between paths using if/else." },
          { term: "Iteration", definition: "Repeating steps using loops." },
        ],
        examples: [
          {
            title: "Flowchart for voting",
            body: "Oval start → parallelogram INPUT age → diamond age ≥ 18? → yes: OUTPUT 'vote' → end; no: OUTPUT 'cannot vote' → end.",
          },
          {
            title: "Tracing",
            body: "INPUT 16 → 16 ≥ 18? No → OUTPUT 'cannot vote yet'. Algorithm correct for this input.",
          },
        ],
        durationMin: 40,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which is NOT a building block of algorithms?",
              options: ["Sequence", "Selection", "Iteration", "Translation"],
              answerIdx: 3,
              explanation: "The three blocks are sequence, selection, iteration.",
            },
            {
              prompt: "A diamond in a flowchart represents…",
              options: ["start", "decision", "input", "process"],
              answerIdx: 1,
              explanation: "Diamonds are decisions (yes/no).",
            },
            {
              prompt: "IF x > 10 THEN ... ELSE ... is an example of…",
              options: ["sequence", "selection", "iteration", "input"],
              answerIdx: 1,
              explanation: "If/else is selection — choosing between paths.",
            },
            {
              prompt: "Tracing an algorithm means…",
              options: ["deleting it", "stepping through with sample inputs", "compiling it", "rewriting in another language"],
              answerIdx: 1,
              explanation: "Tracing = simulating execution with test inputs to find bugs.",
            },
          ],
        },
      },
      {
        title: "How the Web Works",
        slug: "how-the-web-works",
        summary:
          "Explain how the web works: URLs, HTTP, HTML, browsers and servers.",
        objectives: [
          "Identify the parts of a URL.",
          "Explain the request–response cycle between browser and server.",
          "Describe the role of HTML, CSS and JavaScript.",
          "Distinguish between the internet and the web.",
        ],
        content: `The **internet** is the global network of networks — millions of computers connected by cables and wireless links. The **web** (World Wide Web) is one service that runs on the internet, made of pages linked together by hyperlinks. Email, video calls, gaming and file sharing all run on the internet but are not the web.

A **URL** (Uniform Resource Locator) is a web address. It has parts:

- **Protocol**: https:// (how to talk to the server).
- **Domain**: example.com (the server's name).
- **Path**: /lessons/math (which page on the server).
- **Query**: ?grade=5 (extra info).

Example: \`https://academy.example.com/lessons/math?grade=5\`

When you type a URL, your **browser** (Chrome, Firefox, Safari) sends an **HTTP request** to the server named in the URL. The server receives the request, finds the page, and sends back an **HTTP response** — usually an HTML document. The browser reads the HTML and renders it as a visible page. This **request–response cycle** happens in milliseconds.

**HTML** (HyperText Markup Language) structures web pages — headings, paragraphs, images, links. **CSS** (Cascading Style Sheets) styles them — colours, fonts, layout. **JavaScript** adds interactivity — buttons, animations, fetching new data without reloading.

A **web server** is a computer that stores web pages and sends them when asked. Most pages are stored as files; some are generated on the fly from databases (like this Academy app!). **HTTPS** adds encryption so others cannot read your data in transit — look for the padlock icon.`,
        studyGuide: `**Quick revision — How the Web Works**

- Internet = global network; Web = one service on the internet.
- URL parts: protocol (https://) + domain (example.com) + path (/lessons) + query (?grade=5).
- Request–response: browser sends HTTP request → server sends HTTP response (HTML).
- HTML = structure; CSS = style; JavaScript = interactivity.
- HTTPS = encrypted; look for the padlock.`,
        keyTerms: [
          { term: "URL", definition: "Uniform Resource Locator — a web address." },
          { term: "HTTP", definition: "HyperText Transfer Protocol — the rules for browser–server communication." },
          { term: "HTML", definition: "HyperText Markup Language — structures web pages." },
          { term: "Browser", definition: "A program that fetches and displays web pages (Chrome, Firefox, Safari)." },
        ],
        examples: [
          {
            title: "Reading a URL",
            body: "`https://academy.example.com/lessons/math?grade=5` — Protocol: https; Domain: academy.example.com; Path: /lessons/math; Query: grade=5.",
          },
          {
            title: "Request-response",
            body: "You click a link → browser sends 'GET /page' → server finds the file → server sends '200 OK' with HTML → browser renders the page.",
          },
        ],
        durationMin: 40,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which is the protocol in `https://example.com/page`?",
              options: ["example.com", "https", "page", "www"],
              answerIdx: 1,
              explanation: "https is the protocol (with encryption).",
            },
            {
              prompt: "HTML is used for…",
              options: ["styling", "structure", "interactivity", "encryption"],
              answerIdx: 1,
              explanation: "HTML structures web content.",
            },
            {
              prompt: "A web server's job is to…",
              options: ["display pages", "store and send pages on request", "design pages", "print pages"],
              answerIdx: 1,
              explanation: "Servers respond to requests by sending the page.",
            },
            {
              prompt: "HTTPS differs from HTTP because it…",
              options: ["is faster", "encrypts data in transit", "is older", "uses no servers"],
              answerIdx: 1,
              explanation: "HTTPS adds encryption (TLS) for security.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Programming with Python",
    gradeBand: "7-8",
    lessons: [
      {
        title: "Python Basics: Variables & Data Types",
        slug: "python-basics-variables",
        summary:
          "Write your first Python programs: print, variables, input, and basic data types.",
        objectives: [
          "Use print() to output text and variables.",
          "Create variables and assign values.",
          "Use input() to read from the user.",
          "Identify int, float, str and bool data types.",
        ],
        content: `**Python** is one of the most popular programming languages in the world — clean, readable, and used everywhere from web apps to AI. Let's start with the basics.

**Printing**: the \`print()\` function outputs text to the screen.

~~~python
print("Hello, world!")
~~~

**Variables** store values. Use \`=\` to assign:

~~~python
name = "Aisha"
age = 14
height = 1.62
is_student = True
~~~

Variable names use letters, numbers and underscores, and cannot start with a number. They are case-sensitive (\`age\` and \`Age\` are different).

**Data types**:

- **int** — whole numbers: 14, -3, 1000.
- **float** — decimal numbers: 1.62, 3.14, -0.5.
- **str** — text in quotes: "Hello", 'Aisha'.
- **bool** — True or False (capital letters!).

Python figures out the type automatically, but you can check with \`type()\`:

~~~python
print(type(age))     # <class 'int'>
print(type(name))    # <class 'str'>
~~~

**Input**: the \`input()\` function reads a line from the user, always as a string. Convert with \`int()\` or \`float()\` if you need a number:

~~~python
age_text = input("Enter your age: ")
age = int(age_text)
print("Next year you will be", age + 1)
~~~

**f-strings** let you embed variables in text:

~~~python
print(f"Hello {name}, you are {age} years old.")
~~~

That is enough Python to write your first useful program — try a greeting card, a tip calculator, or a quiz scorer.`,
        studyGuide: `**Quick revision — Python Basics**

- print() outputs to the screen.
- Variables: name = value. Case-sensitive.
- Types: int (whole), float (decimal), str (text), bool (True/False).
- input() reads as str; convert with int() / float() if needed.
- f-strings: print(f"Hi {name}, age {age}").`,
        keyTerms: [
          { term: "Variable", definition: "A named storage location for a value." },
          { term: "int", definition: "Whole-number data type." },
          { term: "float", definition: "Decimal-number data type." },
          { term: "f-string", definition: "A formatted string that embeds variables using {}." },
        ],
        examples: [
          {
            title: "Greeting program",
            body: "name = input('Name? '); print(f'Hello {name}, welcome!')",
          },
          {
            title: "Type conversion",
            body: "age = int(input('Age? ')); next_year = age + 1; print(f'Next year: {next_year}')",
          },
        ],
        durationMin: 45,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which prints 'Hello' in Python?",
              options: ["echo 'Hello'", "print('Hello')", "console.log('Hello')", "printf('Hello')"],
              answerIdx: 1,
              explanation: "Python uses print().",
            },
            {
              prompt: "What is the type of `x = 3.14`?",
              options: ["int", "float", "str", "bool"],
              answerIdx: 1,
              explanation: "3.14 is a decimal → float.",
            },
            {
              prompt: "input() returns a value of type…",
              options: ["int", "float", "str", "bool"],
              answerIdx: 2,
              explanation: "input() always returns a string; convert if needed.",
            },
            {
              prompt: "Which is a valid f-string?",
              options: ["f'Hi {name}'", "'Hi {name}'", "f'Hi name'", "fHi{name}"],
              answerIdx: 0,
              explanation: "f-strings start with f and use {variable}.",
            },
          ],
        },
      },
      {
        title: "Conditional Statements & Loops",
        slug: "python-conditionals-loops",
        summary:
          "Use if/elif/else to make decisions and for/while loops to repeat actions.",
        objectives: [
          "Write if/elif/else statements with comparison operators.",
          "Use for loops with range() and lists.",
          "Use while loops with a stopping condition.",
          "Combine loops and conditionals to solve problems.",
        ],
        content: `Programs make decisions using **if statements**. The basic form:

~~~python
age = int(input("Age? "))
if age >= 18:
    print("You can vote")
elif age >= 16:
    print("You can drive")
else:
    print("Wait a few years")
~~~

Indentation (4 spaces) tells Python which lines belong to the if. **Comparison operators**: \`==\` (equal), \`!=\` (not equal), \`<\`, \`>\`, \`<=\`, \`>=\`. Logical operators: \`and\`, \`or\`, \`not\`.

**For loops** repeat a fixed number of times:

~~~python
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4
~~~

\`range(5)\` makes numbers 0–4. \`range(2, 8)\` makes 2–7. \`range(0, 10, 2)\` makes 0, 2, 4, 6, 8 (step 2).

You can loop over a list too:

~~~python
for fruit in ["apple", "banana", "cherry"]:
    print(fruit)
~~~

**While loops** repeat while a condition is true:

~~~python
password = ""
while password != "secret":
    password = input("Password: ")
print("Welcome!")
~~~

Be careful — a while loop with a condition that never becomes false runs forever!

Combining loops and conditionals lets you solve real problems. To find even numbers 1–10:

~~~python
for n in range(1, 11):
    if n % 2 == 0:
        print(n)
~~~

The \`%\` (modulo) gives the remainder after division. Even numbers have remainder 0 when divided by 2.`,
        studyGuide: `**Quick revision — Conditionals & Loops**

- if/elif/else: choose path; indent (4 spaces) shows what belongs inside.
- Comparisons: ==, !=, <, >, <=, >=. Logical: and, or, not.
- for loop: repeat with range() or list.
- range(5) → 0..4; range(2,8) → 2..7; range(0,10,2) → 0,2,4,6,8.
- while loop: repeat while condition is True; watch for infinite loops.
- % (modulo) gives remainder — useful for even/odd tests.`,
        keyTerms: [
          { term: "if statement", definition: "Runs code only if a condition is True." },
          { term: "for loop", definition: "Repeats code a fixed number of times or over a list." },
          { term: "while loop", definition: "Repeats code while a condition is True." },
          { term: "Modulo (%)", definition: "Returns the remainder after division." },
        ],
        examples: [
          {
            title: "Even numbers 1–10",
            body: "for n in range(1, 11): if n % 2 == 0: print(n) → prints 2, 4, 6, 8, 10.",
          },
          {
            title: "Password retry",
            body: "while password != 'secret': password = input('Password: ') — keeps asking until correct.",
          },
        ],
        durationMin: 50,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which operator tests equality in Python?",
              options: ["=", "==", "!=", "<>"],
              answerIdx: 1,
              explanation: "Python uses == for equality (= assigns).",
            },
            {
              prompt: "What does range(3) produce?",
              options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3, 4, 5"],
              answerIdx: 1,
              explanation: "range(3) makes 0, 1, 2 (stops before 3).",
            },
            {
              prompt: "A while loop runs…",
              options: ["a fixed number of times", "while its condition is True", "only once", "until break"],
              answerIdx: 1,
              explanation: "While loops repeat while the condition is True.",
            },
            {
              prompt: "What does 7 % 3 give?",
              options: ["1", "2", "3", "0"],
              answerIdx: 1,
              explanation: "7 ÷ 3 = 2 remainder 1. Wait, 7 = 3×2 + 1, so 7 % 3 = 1. Correct: 1.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Data, Networks & Security",
    gradeBand: "9-10",
    lessons: [
      {
        title: "Data Representation: Binary & Hex",
        slug: "data-binary-hex",
        summary:
          "Convert between binary, decimal and hexadecimal; understand how computers store text, images and sound.",
        objectives: [
          "Convert between binary and decimal up to 8 bits.",
          "Convert between binary and hexadecimal.",
          "Explain how ASCII and Unicode represent text.",
          "Describe how pixels and sampling represent images and sound.",
        ],
        content: `Computers store everything — text, images, sound, video — as **binary**: sequences of 0s and 1s. A single 0 or 1 is a **bit**; eight bits make a **byte**. Binary uses **base 2**: each position is worth twice the one to its right.

**Binary to decimal**: add the place values where there is a 1. \`1011\` = 8 + 0 + 2 + 1 = 11.

| 8 | 4 | 2 | 1 |
|---|---|---|---|
| 1 | 0 | 1 | 1 |

So \`1011₂\` = 11 in decimal.

**Decimal to binary**: keep dividing by 2 and record remainders (read bottom-up). 13 ÷ 2 = 6 r1; 6 ÷ 2 = 3 r0; 3 ÷ 2 = 1 r1; 1 ÷ 2 = 0 r1. Read remainders bottom-up: \`1101\`. So 13 = \`1101₂\`.

**Hexadecimal** (hex) is **base 16**, used by programmers as a compact way to write binary. Each hex digit stands for 4 bits. Hex uses 0–9 then A–F (where A=10, B=11, ..., F=15). The byte \`11111111\` is \`FF\` in hex — much shorter. Colours on the web use hex: \`#FF0000\` is red (255 red, 0 green, 0 blue).

**Text** is stored using **ASCII** (7-bit, 128 characters: English letters, digits, punctuation) or **Unicode** (up to 32-bit, supporting every language's script, plus emojis). The letter 'A' is 65 in ASCII; 'a' is 97; '0' is 48.

**Images** are stored as a grid of **pixels** (picture elements). Each pixel has a colour; in RGB, three numbers (red, green, blue) from 0–255 describe the colour. A 1920×1080 image has 2,073,600 pixels — over 6 million bytes (6 MB) of data at 24 bits per pixel.

**Sound** is stored by **sampling** the audio wave at regular intervals. **Sample rate** (e.g., 44,100 samples per second for CD audio) and **bit depth** (16 bits per sample) determine quality. Higher rate and depth = better sound but larger files.`,
        studyGuide: `**Quick revision — Data Representation**

- Bit = 0 or 1; byte = 8 bits.
- Binary → decimal: add place values (1, 2, 4, 8, 16, …).
- Decimal → binary: divide by 2, read remainders bottom-up.
- Hex = base 16 (0–9, A–F); each hex digit = 4 bits. Used for colours (#RRGGBB).
- ASCII = 128 chars (English); Unicode = all world scripts + emojis.
- Images: pixels, RGB colour (3 numbers 0–255 each).
- Sound: samples (rate × bit depth).`,
        keyTerms: [
          { term: "Bit", definition: "A binary digit (0 or 1)." },
          { term: "Byte", definition: "8 bits." },
          { term: "Hexadecimal", definition: "Base-16 number system; 0–9, A–F." },
          { term: "Pixel", definition: "A single dot in a digital image." },
        ],
        examples: [
          {
            title: "Binary to decimal",
            body: "1011₂ = 8 + 0 + 2 + 1 = 11. 1101₂ = 8 + 4 + 0 + 1 = 13.",
          },
          {
            title: "Hex colour",
            body: "#FF8800 = 255 red, 136 green, 0 blue → a vivid orange.",
          },
        ],
        durationMin: 50,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "What is 1011₂ in decimal?",
              options: ["9", "11", "13", "15"],
              answerIdx: 1,
              explanation: "8 + 0 + 2 + 1 = 11.",
            },
            {
              prompt: "How many bits in a byte?",
              options: ["4", "8", "16", "32"],
              answerIdx: 1,
              explanation: "1 byte = 8 bits.",
            },
            {
              prompt: "What is the hex digit for decimal 14?",
              options: ["D", "E", "F", "14"],
              answerIdx: 1,
              explanation: "Hex: 10=A, 11=B, 12=C, 13=D, 14=E, 15=F.",
            },
            {
              prompt: "ASCII 'A' has the decimal value…",
              options: ["1", "65", "97", "0"],
              answerIdx: 1,
              explanation: "Capital A = 65 in ASCII.",
            },
          ],
        },
      },
      {
        title: "Networks & Cyber Security",
        slug: "networks-cybersecurity",
        summary:
          "Explain how networks and the internet work, identify common cyber threats, and apply defensive measures.",
        objectives: [
          "Describe the structure of networks (LAN, WAN, packets, routers).",
          "Identify common cyber threats (malware, phishing, MITM, DDoS).",
          "Apply defensive measures (firewall, encryption, 2FA, backups).",
          "Explain the CIA triad: confidentiality, integrity, availability.",
        ],
        content: `A **network** is two or more computers connected to share data. A **LAN** (Local Area Network) covers a small area like a school or home; a **WAN** (Wide Area Network) spans large distances — the internet is the biggest WAN.

Data is broken into **packets** for sending. Each packet has the data, the sender's address, and the receiver's address. **Routers** direct packets across networks, choosing the best path. Packets may take different routes and arrive out of order; the receiving computer reassembles them. This **packet switching** is the basis of the internet.

The internet uses a **layered model** (TCP/IP): physical links at the bottom, IP addresses for routing, TCP for reliable delivery, and application protocols (HTTP for web, SMTP for email) on top.

**Common cyber threats**:

- **Malware** — software that harms: viruses (attach to files), worms (self-spread), trojans (pretend to be useful), ransomware (lock files for ransom).
- **Phishing** — fake emails/sites trick users into giving passwords or money.
- **Man-in-the-middle (MITM)** — attacker intercepts communications.
- **DDoS** (Distributed Denial of Service) — overwhelming a site with traffic from many computers so legitimate users cannot access it.
- **SQL injection** — malicious code inserted into database queries.
- **Social engineering** — tricking humans (the weakest link) into giving access.

**Defensive measures**:

- **Firewall** — filters traffic in/out of a network.
- **Encryption** — scrambles data so only authorised parties can read it (TLS/HTTPS for web, AES for files).
- **Antivirus** — detects and removes malware.
- **Strong passwords + 2FA** — protects accounts even if a password leaks.
- **Backups** — recover from ransomware or hardware failure (follow the 3-2-1 rule: 3 copies, 2 media, 1 offsite).
- **Patching** — keep software updated to close known vulnerabilities.

The **CIA triad** defines security goals:

- **Confidentiality** — only authorised people can read the data.
- **Integrity** — data cannot be changed without detection.
- **Availability** — data and services are there when needed.

A good security strategy balances all three.`,
        studyGuide: `**Quick revision — Networks & Security**

- LAN (local) vs WAN (wide). Internet = the biggest WAN.
- Packets: data + sender + receiver addresses; routers direct them.
- TCP/IP layers: link → internet → transport → application.
- Threats: malware, phishing, MITM, DDoS, SQL injection, social engineering.
- Defences: firewall, encryption, antivirus, 2FA, backups (3-2-1), patching.
- CIA: Confidentiality, Integrity, Availability.`,
        keyTerms: [
          { term: "Packet", definition: "A small unit of data sent across a network." },
          { term: "Router", definition: "A device that directs packets between networks." },
          { term: "Phishing", definition: "Tricking users into revealing sensitive data via fake messages." },
          { term: "CIA triad", definition: "Confidentiality, Integrity, Availability — the three security goals." },
        ],
        examples: [
          {
            title: "Packet switching",
            body: "Sending a photo: it is split into ~1000 packets, each routed independently, reassembled at the destination. If one packet is lost, only that one is resent.",
          },
          {
            title: "CIA applied",
            body: "Patient records: confidentiality (only doctors see them), integrity (no unauthorised edits), availability (available in emergencies).",
          },
        ],
        durationMin: 55,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "A network spanning a school or home is a…",
              options: ["WAN", "LAN", "MAN", "PAN"],
              answerIdx: 1,
              explanation: "LAN = Local Area Network.",
            },
            {
              prompt: "Which is a phishing attack?",
              options: ["Locking files for ransom", "Fake email pretending to be your bank", "Flooding a site with traffic", "Stealing a password by shoulder-surfing"],
              answerIdx: 1,
              explanation: "Phishing uses fake emails/sites to trick users.",
            },
            {
              prompt: "The 'C' in CIA triad stands for…",
              options: ["Control", "Confidentiality", "Connection", "Cipher"],
              answerIdx: 1,
              explanation: "Confidentiality, Integrity, Availability.",
            },
            {
              prompt: "The 3-2-1 backup rule means…",
              options: ["3 copies, 2 media, 1 offsite", "3 passwords, 2 emails, 1 phone", "3 firewalls, 2 servers, 1 admin", "3 updates, 2 scans, 1 reboot"],
              answerIdx: 0,
              explanation: "3 copies, on 2 media, 1 stored offsite.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Software Engineering & AI",
    gradeBand: "11-12",
    lessons: [
      {
        title: "Data Structures & Algorithms (Big-O)",
        slug: "data-structures-algorithms",
        summary:
          "Compare data structures (arrays, lists, stacks, queues, trees, hash tables) and analyse algorithm efficiency with Big-O.",
        objectives: [
          "Describe common data structures and their operations.",
          "Apply Big-O notation to compare algorithms.",
          "Choose appropriate data structures for problems.",
          "Implement and analyse searching and sorting algorithms.",
        ],
        content: `A **data structure** is a way of organising data so it can be used efficiently. Different structures suit different problems.

**Arrays** — fixed-size, indexed sequence. **Access** by index is O(1); **insert** at end is O(1) amortised; **insert** at middle is O(n) (must shift elements).

**Linked lists** — nodes each holding a value and a pointer to the next. **Insert/delete** at known position is O(1); **access** by index is O(n).

**Stacks** — Last-In-First-Out (LIFO). Operations: push, pop, peek — all O(1). Use for undo, expression evaluation, recursion.

**Queues** — First-In-First-Out (FIFO). Operations: enqueue, dequeue — all O(1). Use for scheduling, BFS.

**Trees** — hierarchical. A **binary search tree** (BST) keeps left subtree < node < right subtree. Search, insert, delete are O(log n) if balanced; O(n) if not. **Heaps** are trees used for priority queues.

**Hash tables** — key/value pairs. Compute a hash of the key to find a bucket. Average **search/insert/delete O(1)**; worst case O(n) with bad hashing. Used for caches, dictionaries, databases.

**Big-O notation** describes how an algorithm's runtime grows with input size n. Common complexities (best to worst):

- **O(1)** — constant. Hash table lookup.
- **O(log n)** — logarithmic. Binary search.
- **O(n)** — linear. Scanning an array.
- **O(n log n)** — linearithmic. Merge sort, quick sort (average).
- **O(n²)** — quadratic. Bubble sort, selection sort.
- **O(2ⁿ)** — exponential. Naive recursive Fibonacci.

**Searching**: linear search is O(n); binary search is O(log n) but needs a sorted array.

**Sorting**: bubble/selection/insertion are O(n²); merge/heap sort are O(n log n); quick sort is O(n log n) average, O(n²) worst. In practice, built-in sorts use Timsort (Python, Java) — a hybrid of merge and insertion sort.

Choose your structure by what the problem needs: fast random access → array; fast insertion/deletion at ends → deque; key lookup → hash table; ordered traversal → tree; LIFO → stack; FIFO → queue.`,
        studyGuide: `**Quick revision — Data Structures & Algorithms**

- Arrays: O(1) access, O(n) middle insert.
- Linked lists: O(1) insert/delete (known pos), O(n) access.
- Stack (LIFO): push/pop O(1). Queue (FIFO): enqueue/dequeue O(1).
- BST: search/insert/delete O(log n) balanced, O(n) worst.
- Hash table: average O(1) search/insert/delete.
- Big-O: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ).
- Binary search: O(log n), needs sorted array.
- Built-in sorts usually O(n log n) — Timsort (Python/Java).`,
        keyTerms: [
          { term: "Data structure", definition: "A way of organising data for efficient use." },
          { term: "Big-O notation", definition: "Describes how runtime grows with input size n." },
          { term: "Hash table", definition: "Key/value store with average O(1) lookup." },
          { term: "Binary search", definition: "Halving search on a sorted array; O(log n)." },
        ],
        examples: [
          {
            title: "Big-O comparison",
            body: "n = 1,000,000. O(n) = 1M ops. O(log n) ≈ 20 ops. O(n²) = 1 trillion ops. The right algorithm matters!",
          },
          {
            title: "Choosing a structure",
            body: "Spell-checker needs fast word lookup → hash table. Browser history needs LIFO → stack. Print queue needs FIFO → queue.",
          },
        ],
        durationMin: 60,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "Which is LIFO?",
              options: ["Queue", "Stack", "Array", "Tree"],
              answerIdx: 1,
              explanation: "Stacks are Last-In-First-Out.",
            },
            {
              prompt: "Average time complexity of a hash table lookup?",
              options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
              answerIdx: 0,
              explanation: "Hash tables give average O(1) lookup.",
            },
            {
              prompt: "Binary search has time complexity…",
              options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
              answerIdx: 1,
              explanation: "Halving each step → O(log n). Needs sorted array.",
            },
            {
              prompt: "Which sort is O(n²) in the worst case?",
              options: ["Merge sort", "Bubble sort", "Heap sort", "Quick sort (average)"],
              answerIdx: 1,
              explanation: "Bubble sort is O(n²). Merge and heap are O(n log n).",
            },
          ],
        },
      },
      {
        title: "AI, Machine Learning & Ethics",
        slug: "ai-ml-ethics",
        summary:
          "Outline the foundations of AI and machine learning, evaluate their applications, and debate their ethical implications.",
        objectives: [
          "Distinguish between AI, machine learning, and deep learning.",
          "Describe supervised, unsupervised, and reinforcement learning.",
          "Evaluate applications of AI across industries.",
          "Debate ethical issues: bias, privacy, jobs, autonomy, alignment.",
        ],
        content: `**Artificial intelligence (AI)** is the broad field of making machines do things that require intelligence in humans — recognise images, understand language, play games, diagnose disease.

**Machine learning (ML)** is a sub-field of AI where systems learn patterns from data instead of being explicitly programmed. **Deep learning** is a sub-field of ML using neural networks with many layers — it powers modern image recognition, language models, and game-playing AIs.

**Three main types of ML**:

- **Supervised learning** — the system learns from labelled examples (photos labelled 'cat' or 'dog'). It finds patterns that predict the label from the features.
- **Unsupervised learning** — the system finds patterns in unlabelled data (clustering customers by behaviour).
- **Reinforcement learning** — the system learns by trial and error, receiving rewards or punishments. AlphaGo and self-driving cars use this.

**Applications** span industries: medical imaging (cancer detection), translation (Google Translate), recommendation (Netflix, Spotify), autonomous vehicles, fraud detection, code completion (Copilot), chatbots, and large language models like the one writing this content.

**Ethics** matters more than ever:

- **Bias**: if training data is biased (e.g., historically sexist hiring data), the AI will reproduce that bias. Examples: facial recognition that fails on darker skin; resume screeners that down-rank women.
- **Privacy**: AI can infer sensitive information from seemingly innocent data. Location traces reveal home and workplace; shopping reveals pregnancy.
- **Jobs**: automation displaces some jobs and creates others. The transition is painful for individuals and communities.
- **Autonomy**: who is responsible when an AI harms someone — the developer, the user, the company, the AI itself?
- **Alignment**: how do we ensure advanced AI systems pursue what we actually want, not what we literally ask for?
- **Misinformation**: deepfakes and AI-generated text can flood the information ecosystem, undermining trust.
- **Power concentration**: a few big tech firms own the largest models, raising concerns about democracy and sovereignty.

Good AI governance needs technical standards (model cards, audits), regulation (the EU AI Act), diverse teams building the tech, public engagement, and ongoing monitoring. The goal is not to stop AI but to steer it toward broadly shared benefits.`,
        studyGuide: `**Quick revision — AI, ML & Ethics**

- AI ⊃ ML ⊃ Deep Learning.
- Supervised: labelled data. Unsupervised: find patterns. Reinforcement: rewards.
- Applications: medical, translation, recommendations, autonomy, fraud, code, chatbots.
- Ethics: bias, privacy, jobs, autonomy, alignment, misinformation, power.
- Governance: model cards, audits, regulation, diverse teams, public engagement.`,
        keyTerms: [
          { term: "Machine learning", definition: "AI that learns patterns from data instead of explicit rules." },
          { term: "Supervised learning", definition: "ML that learns from labelled examples." },
          { term: "Reinforcement learning", definition: "ML that learns by trial and error with rewards." },
          { term: "Alignment", definition: "The challenge of ensuring AI systems pursue human-intended goals." },
        ],
        examples: [
          {
            title: "Bias in action",
            body: "An AI trained on past hiring data from a male-dominated field may down-rank female candidates — reproducing the historical bias.",
          },
          {
            title: "Three ML types",
            body: "Supervised: predict house prices from labelled sales. Unsupervised: cluster shoppers by habits. Reinforcement: learn to play chess by winning/losing.",
          },
        ],
        durationMin: 60,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "Deep learning is a sub-field of…",
              options: ["AI", "Machine learning", "Statistics", "Data science"],
              answerIdx: 1,
              explanation: "ML is a sub-field of AI; deep learning is a sub-field of ML.",
            },
            {
              prompt: "Learning from labelled examples is…",
              options: ["Supervised", "Unsupervised", "Reinforcement", "Self-supervised"],
              answerIdx: 0,
              explanation: "Supervised learning uses labelled data.",
            },
            {
              prompt: "An AI that down-ranks female CVs because of biased training data is an example of…",
              options: ["overfitting", "bias", "alignment", "reinforcement"],
              answerIdx: 1,
              explanation: "Bias in training data leads to biased AI outputs.",
            },
            {
              prompt: "The challenge of ensuring AI pursues what we actually want is called…",
              options: ["alignment", "supervision", "audit", "regularisation"],
              answerIdx: 0,
              explanation: "Alignment is the challenge of matching AI goals to human intent.",
            },
          ],
        },
      },
    ],
  },
];
