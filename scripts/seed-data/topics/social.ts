import type { TopicUnit } from "../index";

export const socialTopics: TopicUnit[] = [
  {
    unitTitle: "My Community & World",
    gradeBand: "1-2",
    lessons: [
      {
        title: "My Family & Community",
        slug: "family-community",
        summary:
          "Describe roles in a family and community, identify needs and wants, and recognise rules that keep us safe.",
        objectives: [
          "Describe the roles of family members.",
          "Distinguish between needs (food, shelter, love) and wants (toys, treats).",
          "Identify rules at home, school and in the community.",
          "Explain why rules help keep us safe.",
        ],
        content: `A **family** is a group of people who care for each other. Families look different — some have two parents, some have one, some have grandparents or other relatives. Each family member has a **role**: parents and carers provide food, shelter and love; children learn and help; siblings play and support each other.

A **community** is the wider group of people around us — neighbours, teachers, shopkeepers, doctors, police officers, firefighters. Each role helps the community work. When we understand what others do, we appreciate how dependent we are on each other.

**Needs** are things we must have to live and grow: food, water, shelter, clothing, sleep, love, safety. **Wants** are things that make life nicer but are not essential: toys, sweets, the latest game. Sorting needs from wants helps us make good choices — and helps us understand that not everyone's needs are met.

**Rules** are everywhere. At home: brush your teeth, hold hands crossing the road. At school: raise your hand, take turns, be kind. In the community: stop at red lights, queue politely, don't litter. Rules are not just limits — they are agreements that help everyone live together safely and fairly.

When we follow rules, we trust others to do the same. Trust makes communities strong. When rules are broken, people can be hurt, frightened, or treated unfairly — so communities have consequences to repair the harm and discourage breaking rules again.`,
        studyGuide: `**Quick revision — Family & Community**

- Family roles: carers provide, children learn and help.
- Community roles: neighbours, teachers, helpers — we depend on each other.
- Needs: food, water, shelter, love, safety. Wants: extras like toys.
- Rules keep us safe and fair; consequences repair harm.
- Trust is built by everyone following rules.`,
        keyTerms: [
          { term: "Family", definition: "A group of people who care for each other." },
          { term: "Community", definition: "The wider group of people living and working together." },
          { term: "Need", definition: "Something you must have to live and grow." },
          { term: "Want", definition: "Something you would like but can live without." },
        ],
        examples: [
          {
            title: "Need vs want",
            body: "Lunch is a need; an ice cream is a want. Warm coat is a need; designer coat is a want.",
          },
          {
            title: "Rules and trust",
            body: "Stopping at a red light keeps everyone safe. If drivers ignored it, no one would trust crossings — accidents would rise.",
          },
        ],
        durationMin: 25,
        difficulty: "introductory",
        quiz: {
          timeLimit: 8,
          questions: [
            {
              prompt: "Which is a need?",
              options: ["ice cream", "warm coat", "video game", "sweet"],
              answerIdx: 1,
              explanation: "A warm coat protects from cold — a need.",
            },
            {
              prompt: "Who is part of the community?",
              options: ["only family", "only teachers", "neighbours, doctors, shopkeepers", "no one"],
              answerIdx: 2,
              explanation: "Communities include everyone who lives and works together.",
            },
            {
              prompt: "Why do we have rules?",
              options: ["to punish", "to keep us safe and fair", "for fun", "to make us sad"],
              answerIdx: 1,
              explanation: "Rules keep people safe and help them live together fairly.",
            },
            {
              prompt: "If everyone follows the rules, communities have more…",
              options: ["danger", "trust", "noise", "litter"],
              answerIdx: 1,
              explanation: "Following rules builds trust between people.",
            },
          ],
        },
      },
      {
        title: "Maps & Our World",
        slug: "maps-our-world",
        summary:
          "Read simple maps, identify continents and oceans, and describe weather and seasons.",
        objectives: [
          "Read a simple map using a key.",
          "Identify the seven continents and five oceans.",
          "Describe the four seasons and their weather.",
          "Compare hot and cold places in the world.",
        ],
        content: `A **map** is a drawing of a place seen from above. Maps use **symbols** — small pictures — to stand for real things: a tree for a forest, a blue line for a river. The **key** (or legend) explains what each symbol means. Maps usually have a **compass rose** showing north, south, east and west.

The Earth has seven **continents**: Africa, Antarctica, Asia, Australia (Oceania), Europe, North America, and South America. The five **oceans** are the Pacific (the largest), Atlantic, Indian, Southern, and Arctic. Together they cover most of the planet's surface — Earth is mostly water.

The Earth is tilted, which gives us **seasons**. As Earth orbits the Sun, different parts lean toward or away from it. When our half leans toward the Sun we have **summer** (warm, long days); when it leans away, **winter** (cold, short days). **Spring** and **autumn** are the in-between seasons. Places near the equator have little seasonal change; places near the poles have extreme changes.

**Hot places** are near the equator (e.g., the Sahara, the Amazon). **Cold places** are near the poles (Antarctica, northern Canada). Hot places get strong direct sunlight year-round; cold places get sunlight at a low angle, spreading the energy thinly. The plants, animals, and people who live in each place adapt to its climate.`,
        studyGuide: `**Quick revision — Maps & World**

- Map = drawing from above; symbols + key; compass shows N/S/E/W.
- Continents: Africa, Antarctica, Asia, Australia, Europe, North America, South America.
- Oceans: Pacific (largest), Atlantic, Indian, Southern, Arctic.
- Seasons come from Earth's tilt: summer (toward Sun), winter (away).
- Hot near equator; cold near poles.`,
        keyTerms: [
          { term: "Map", definition: "A drawing of a place from above." },
          { term: "Continent", definition: "One of the seven main landmasses on Earth." },
          { term: "Compass rose", definition: "A symbol on a map showing north, south, east, west." },
          { term: "Season", definition: "A time of year with characteristic weather (spring, summer, autumn, winter)." },
        ],
        examples: [
          {
            title: "Reading a key",
            body: "A blue line on the map = river; a green patch = forest; a red dot = town. The key tells us what each symbol means.",
          },
          {
            title: "Hot vs cold",
            body: "The Sahara (near equator) is hot all year; Antarctica (South Pole) is mostly below freezing.",
          },
        ],
        durationMin: 30,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "How many continents are there?",
              options: ["5", "6", "7", "8"],
              answerIdx: 2,
              explanation: "There are seven continents.",
            },
            {
              prompt: "Which is the largest ocean?",
              options: ["Atlantic", "Indian", "Arctic", "Pacific"],
              answerIdx: 3,
              explanation: "The Pacific is the largest ocean.",
            },
            {
              prompt: "Seasons happen because Earth is…",
              options: ["flat", "tilted", "very small", "perfectly still"],
              answerIdx: 1,
              explanation: "Earth's tilt gives us seasons.",
            },
            {
              prompt: "Hot places on Earth are usually…",
              options: ["near the poles", "near the equator", "in the ocean", "in mountains"],
              answerIdx: 1,
              explanation: "Sunlight hits the equator most directly, making it hot.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Ancient Civilisations & Landforms",
    gradeBand: "3-4",
    lessons: [
      {
        title: "Ancient Egypt",
        slug: "ancient-egypt",
        summary:
          "Investigate Ancient Egyptian society, the importance of the Nile, pharaohs, pyramids and beliefs about the afterlife.",
        objectives: [
          "Locate Ancient Egypt on a timeline and a map.",
          "Explain why the Nile was vital to Egyptian life.",
          "Describe the role of pharaohs and the building of pyramids.",
          "Outline Egyptian beliefs about the afterlife.",
        ],
        content: `**Ancient Egypt** was one of the world's first great civilisations. It began around 3100 BCE along the **River Nile** in north-east Africa and lasted for over 3000 years. Egyptian history is divided into Old, Middle and New **Kingdoms**, with periods of weakness between them.

The **Nile was life**. Every summer it flooded, leaving behind rich, dark silt that made farming possible in the middle of a desert. Egyptians grew wheat, barley and flax; they caught fish; they used papyrus (a reed) to make paper, boats and baskets. The Nile was also the main highway — boats carried stone, grain and people up and down the river.

The **pharaoh** was the king — believed to be a god on Earth. He (and sometimes she, like Hatshepsut) led the army, owned all the land, and commanded the building of temples and tombs. The most famous pharaohs include Khufu (who built the Great Pyramid), Ramses II (a great warrior), and Tutankhamun (whose tomb was found almost intact in 1922).

The **pyramids** were royal tombs built during the Old Kingdom. The Great Pyramid at Giza, built for Khufu around 2560 BCE, used over 2 million stone blocks and stood 146 m tall — the tallest building in the world for nearly 4000 years. Building them required thousands of workers, engineers, and an enormous state apparatus.

Egyptians believed in an **afterlife**. They preserved bodies as **mummies** so the soul could use them again. They placed food, furniture and treasures in tombs for use in the next world. They worshipped many gods — Ra (the Sun), Osiris (the dead), Isis (magic), Anubis (mummification) — and weighed the heart against a feather to judge the soul after death.`,
        studyGuide: `**Quick revision — Ancient Egypt**

- Began ~3100 BCE; lasted 3000+ years; Old, Middle, New Kingdoms.
- Nile: yearly floods left fertile silt; farming, fishing, papyrus, transport.
- Pharaoh: god-king; led army, owned land, built temples and tombs.
- Pyramids: royal tombs (Old Kingdom); Great Pyramid = Khufu, ~2560 BCE.
- Afterlife: mummification, tomb goods, many gods (Ra, Osiris, Isis, Anubis).`,
        keyTerms: [
          { term: "Pharaoh", definition: "The king of Ancient Egypt, believed to be a god on Earth." },
          { term: "Silt", definition: "Rich soil left behind by the Nile's annual flood." },
          { term: "Mummy", definition: "A preserved body, prepared for the afterlife." },
          { term: "Papyrus", definition: "A reed used by Egyptians to make paper and boats." },
        ],
        examples: [
          {
            title: "Nile's importance",
            body: "Without the Nile, Egypt would be desert. Its floods made farming possible; its waters carried stone for pyramids; its papyrus became the paper of the ancient world.",
          },
          {
            title: "Tutankhamun's tomb",
            body: "Found by Howard Carter in 1922, almost untouched. The gold mask, chariots, and throne inside show the wealth of Egyptian royal burials.",
          },
        ],
        durationMin: 35,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Why was the Nile so important to Egypt?",
              options: ["it was cold", "its floods left fertile silt for farming", "it was full of gold", "it blocked enemies"],
              answerIdx: 1,
              explanation: "Annual floods left silt that made farming possible in a desert.",
            },
            {
              prompt: "The pharaoh was believed to be…",
              options: ["a soldier", "a god on Earth", "a farmer", "a foreigner"],
              answerIdx: 1,
              explanation: "Pharaohs were divine kings in Egyptian belief.",
            },
            {
              prompt: "The Great Pyramid at Giza was built for…",
              options: ["Tutankhamun", "Ramses II", "Khufu", "Cleopatra"],
              answerIdx: 2,
              explanation: "Built for Pharaoh Khufu around 2560 BCE.",
            },
            {
              prompt: "Why did Egyptians mummify bodies?",
              options: ["to scare enemies", "to preserve them for the afterlife", "to save space", "to make them lighter"],
              answerIdx: 1,
              explanation: "Belief in the afterlife required a preserved body for the soul.",
            },
          ],
        },
      },
      {
        title: "Rivers, Mountains & Volcanoes",
        slug: "rivers-mountains-volcanoes",
        summary:
          "Describe the features of rivers, how mountains form, and why and where volcanoes erupt.",
        objectives: [
          "Label the course of a river from source to mouth.",
          "Describe how mountains form by folding and faulting.",
          "Explain why volcanoes erupt and identify types.",
          "Locate the world's major rivers, mountains and volcanoes.",
        ],
        content: `A **river** is a flow of water moving from high ground to the sea. It starts at the **source** (often a spring or mountain snowmelt), flows down through the **upper course** (steep, fast, V-shaped valleys), the **middle course** (wider, meanders begin), and the **lower course** (wide, flat floodplain). It ends at the **mouth**, where it meets the sea — often forming a **delta** or **estuary**. The area drained by a river is its **drainage basin**.

**Mountains** form over millions of years by tectonic forces. When two plates push together, the rock **folds** — like a rug being pushed — creating fold mountains (the Himalayas, the Alps, the Andes). When rock cracks and one block moves up and another down, we get **fault-block mountains** (the Sierra Nevada). Volcanic activity can also build mountains — see below. Mountains affect climate: their windward sides get rain; their leeward sides lie in a **rain shadow**.

A **volcano** is an opening in Earth's crust through which molten rock (**magma**, called **lava** once it reaches the surface), gas and ash escape. Volcanoes form at **plate boundaries** — where plates collide (destructive margins, e.g. the Andes), pull apart (constructive margins, e.g. the Mid-Atlantic Ridge), or slide past each other. Some form over **hot spots** in the middle of plates (Hawaii).

There are three main types: **shield volcanoes** (broad, gentle slopes, runny lava, frequent gentle eruptions — Mauna Loa), **composite volcanoes** (steep, alternating layers of ash and lava, explosive eruptions — Mount St. Helens), and **caldera volcanoes** (huge craters from collapsed summits, super-eruptions — Yellowstone). Volcanic soil is fertile, attracting farmers — but eruptions can destroy towns and change climates.`,
        studyGuide: `**Quick revision — Rivers, Mountains, Volcanoes**

- River: source → upper (steep) → middle (meanders) → lower (floodplain) → mouth (delta/estuary).
- Drainage basin = area a river drains.
- Mountains: fold (Himalayas), fault-block (Sierra Nevada), volcanic.
- Volcano: vent for magma/lava/gas/ash; at plate boundaries or hot spots.
- Types: shield (runny lava, gentle), composite (steep, explosive), caldera (huge craters).`,
        keyTerms: [
          { term: "Source", definition: "Where a river begins." },
          { term: "Meander", definition: "A bend in a river in its middle and lower course." },
          { term: "Magma", definition: "Molten rock below Earth's surface; becomes lava above ground." },
          { term: "Plate boundary", definition: "Edge where two of Earth's tectonic plates meet." },
        ],
        examples: [
          {
            title: "River features",
            body: "The Amazon: source in the Andes → upper course rapids → middle meanders through rainforest → vast delta at the Atlantic.",
          },
          {
            title: "Volcano type",
            body: "Mauna Loa (Hawaii) is a shield volcano — broad, gentle eruptions of runny lava. Mount St. Helens is composite — steep, explosive.",
          },
        ],
        durationMin: 35,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Where a river begins is called the…",
              options: ["mouth", "source", "delta", "meander"],
              answerIdx: 1,
              explanation: "The source is the start of a river.",
            },
            {
              prompt: "Fold mountains form when…",
              options: ["plates pull apart", "plates push together", "rivers carve them", "volcanoes explode"],
              answerIdx: 1,
              explanation: "Plates colliding fold rock upward — Himalayas, Alps.",
            },
            {
              prompt: "Molten rock below the surface is…",
              options: ["lava", "magma", "ash", "pumice"],
              answerIdx: 1,
              explanation: "Below ground it is magma; once erupted it is lava.",
            },
            {
              prompt: "Which volcano has gentle slopes and runny lava?",
              options: ["Composite", "Shield", "Caldera", "Supervolcano"],
              answerIdx: 1,
              explanation: "Shield volcanoes (e.g., Mauna Loa) have gentle slopes and runny lava.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Trade, Empire & Democracy",
    gradeBand: "5-6",
    lessons: [
      {
        title: "The Roman Empire",
        slug: "roman-empire",
        summary:
          "Trace the rise and fall of Rome: republic to empire, daily life, technology, and lasting legacy.",
        objectives: [
          "Outline the founding of Rome and the Republic.",
          "Describe the shift from Republic to Empire under Augustus.",
          "Explain Roman technology and daily life.",
          "Evaluate the lasting legacy of Roman law, language and architecture.",
        ],
        content: `Rome began as a small village on the Tiber River in central Italy, traditionally founded in **753 BCE**. By 509 BCE Romans overthrew their kings and set up a **Republic** — a government without a king, where citizens elected leaders. Two **consuls** led the Republic, advised by the **Senate**. Roman society was divided between **patricians** (wealthy elite) and **plebeians** (common people), who gained rights over centuries of struggle.

The Republic expanded through war and alliance, conquering Italy, then Carthage (in the Punic Wars, including Hannibal's elephants), then Greece, Egypt, and much of Europe. But conquest brought wealth and inequality, and the Republic collapsed into civil wars. Generals like Marius, Sulla, Pompey, and Caesar fought for power. **Julius Caesar** crossed the Rubicon in 49 BCE, became dictator, and was assassinated in 44 BCE. His heir **Octavian** became **Augustus**, the first **emperor**, in 27 BCE — the Republic was dead.

The **Empire** stretched at its height from Britain to Mesopotamia. **Pax Romana** (Roman Peace) lasted about 200 years, allowing trade, travel and culture to flourish. Roman daily life centred on the **forum** (market and meeting place), **baths** (social centres), **amphitheatres** (gladiator games), and **temples**. Slaves did much of the hard labour. Latin was the language of law and government; Greek culture influenced literature and philosophy.

Roman **technology** was remarkable: aqueducts brought fresh water to cities; **concrete** allowed huge buildings; **roads** (over 80,000 km) connected the empire — many still form the basis of European roads today; **arches** and **domes** let them build vast spaces like the Pantheon.

Rome **fell** in the West in 476 CE, weakened by inflation, corruption, and barbarian invasions. The Eastern Empire (Byzantium) lasted another thousand years. Rome's **legacy** is everywhere: Romance languages (French, Spanish, Italian, Portuguese, Romanian), the Latin alphabet, Roman law (the basis of much European law), the Gregorian calendar, Christian theology, and architecture that still inspires government buildings worldwide.`,
        studyGuide: `**Quick revision — Roman Empire**

- Founded 753 BCE; Republic from 509 BCE (consuls + Senate).
- Republic falls to civil wars; Augustus becomes first emperor in 27 BCE.
- Pax Romana: 200 years of peace and trade.
- Tech: aqueducts, concrete, 80,000 km of roads, arches and domes.
- Western fall 476 CE. Legacy: Romance languages, Latin alphabet, Roman law, calendar.`,
        keyTerms: [
          { term: "Republic", definition: "A government without a king, where citizens elect leaders." },
          { term: "Senate", definition: "The Roman council of wealthy elders who advised the consuls." },
          { term: "Pax Romana", definition: "The 'Roman Peace' — roughly 200 years of stability across the empire." },
          { term: "Aqueduct", definition: "An engineered channel that carried water to Roman cities." },
        ],
        examples: [
          {
            title: "Republic to empire",
            body: "Caesar's assassination (44 BCE) did not save the Republic — his heir Octavian became Augustus, Rome's first emperor, in 27 BCE.",
          },
          {
            title: "Legacy in language",
            body: "French 'roi' (king), Spanish 'rey', Italian 're' all come from Latin 'rex'. The Latin alphabet is used for English today.",
          },
        ],
        durationMin: 40,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Rome was traditionally founded in…",
              options: ["753 BCE", "27 BCE", "476 CE", "1066 CE"],
              answerIdx: 0,
              explanation: "753 BCE is the traditional founding date of Rome.",
            },
            {
              prompt: "The first Roman emperor was…",
              options: ["Julius Caesar", "Augustus", "Nero", "Constantine"],
              answerIdx: 1,
              explanation: "Augustus (Octavian) became emperor in 27 BCE.",
            },
            {
              prompt: "Aqueducts were used to…",
              options: ["carry water to cities", "watch gladiators", "cross rivers", "bury the dead"],
              answerIdx: 0,
              explanation: "Aqueducts brought fresh water to Roman cities.",
            },
            {
              prompt: "The Western Roman Empire fell in…",
              options: ["44 BCE", "27 BCE", "476 CE", "1453 CE"],
              answerIdx: 2,
              explanation: "Western Rome fell in 476 CE. The Eastern (Byzantine) Empire lasted until 1453.",
            },
          ],
        },
      },
      {
        title: "Democracy & Government",
        slug: "democracy-government",
        summary:
          "Trace the origins of democracy, compare systems of government, and explain how laws are made.",
        objectives: [
          "Outline the origins of democracy in Ancient Athens.",
          "Compare direct and representative democracy.",
          "Describe the separation of powers (executive, legislative, judicial).",
          "Explain how a bill becomes a law.",
        ],
        content: `**Democracy** means "rule by the people" (from Greek *demos* = people, *kratos* = power). It began in **Ancient Athens** around 508 BCE, when male citizens gathered in an **assembly** to vote directly on laws and policies. This was **direct democracy** — every citizen had a say. But it excluded women, slaves and foreigners, so it was far from universal.

**Representative democracy** is what most democracies use today. Citizens elect **representatives** (MPs, senators, members of parliament) who make laws and decisions on their behalf. This works in large countries where direct assembly is impossible. The UK Parliament, the US Congress, and the Indian Lok Sabha are examples.

The **separation of powers** divides government into three branches to prevent any one becoming too powerful:

- **Legislative** — makes the laws (parliament, congress).
- **Executive** — carries out the laws (government, president, prime minister, cabinet).
- **Judicial** — interprets the laws (courts, judges).

This idea, developed by Montesquieu, allows each branch to **check and balance** the others. The executive can veto laws; the legislature can impeach the executive; the courts can strike down laws that violate the constitution.

How does a **bill become a law**? A proposal is drafted, debated, and voted on in the legislature (often in two houses). If passed, it goes to the executive (president, monarch, or governor-general) for approval. Once signed, it is law. Courts then interpret it in real cases. This slow, multi-step process is deliberate — it stops hasty or poorly thought-out laws.

Democracies need **informed citizens** who vote, debate, and hold leaders to account. Free press, free speech, free elections, and the rule of law are the pillars that keep democracy alive.`,
        studyGuide: `**Quick revision — Democracy**

- Democracy = rule by the people. Began in Athens ~508 BCE (direct, male only).
- Representative democracy: citizens elect lawmakers.
- Three branches: legislative (makes), executive (carries out), judicial (interprets).
- Separation of powers → checks and balances.
- Bill → debate → vote (often two houses) → executive sign → law → court interpretation.`,
        keyTerms: [
          { term: "Democracy", definition: "Government by the people, either directly or via elected representatives." },
          { term: "Separation of powers", definition: "Dividing government into legislative, executive and judicial branches." },
          { term: "Bill", definition: "A proposed law being considered by a legislature." },
          { term: "Checks and balances", definition: "Each branch can limit the powers of the others." },
        ],
        examples: [
          {
            title: "Direct vs representative",
            body: "Athens: citizens voted directly on laws (direct). UK: citizens elect MPs who vote on laws (representative).",
          },
          {
            title: "Checks and balances",
            body: "US president can veto Congress's bill; Congress can override the veto with 2/3 majority; Supreme Court can strike down laws as unconstitutional.",
          },
        ],
        durationMin: 45,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Democracy began in…",
              options: ["Rome", "Ancient Athens", "Egypt", "Persia"],
              answerIdx: 1,
              explanation: "Athens, around 508 BCE.",
            },
            {
              prompt: "In representative democracy, citizens…",
              options: ["vote on every law", "elect lawmakers", "do not vote", "obey a king"],
              answerIdx: 1,
              explanation: "Citizens elect representatives who vote on laws.",
            },
            {
              prompt: "Which branch makes laws?",
              options: ["Executive", "Judicial", "Legislative", "Military"],
              answerIdx: 2,
              explanation: "The legislature (parliament/congress) makes laws.",
            },
            {
              prompt: "A 'bill' is…",
              options: ["a law already in force", "a proposed law being considered", "a court ruling", "an executive order"],
              answerIdx: 1,
              explanation: "A bill is a proposed law under debate.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Modern History & Global Issues",
    gradeBand: "7-8",
    lessons: [
      {
        title: "The Industrial Revolution",
        slug: "industrial-revolution",
        summary:
          "Examine the causes, key inventions, social changes, and global impact of the Industrial Revolution.",
        objectives: [
          "Identify the causes of the Industrial Revolution in Britain.",
          "Describe key inventions (steam engine, spinning jenny, power loom).",
          "Analyse the social impact (urbanisation, working conditions, child labour).",
          "Evaluate the global consequences of industrialisation.",
        ],
        content: `The **Industrial Revolution** was the shift from hand production to machine manufacturing, beginning in Britain around **1760** and spreading across the world. It transformed economies, societies and the environment more than any event since farming.

**Why Britain?** Several factors came together: rich coal and iron deposits; a large empire providing raw materials (cotton from India, sugar from the Caribbean) and markets; capital from trade for investment; a stable government and patent laws that protected inventions; and an Agricultural Revolution that pushed people off the land into cities looking for work.

**Key inventions**:

- **Steam engine** (improved by James Watt, 1776) — powered factories, ships and trains.
- **Spinning jenny** (Hargreaves, 1764) and **water frame** (Arkwright, 1769) — mass-produced yarn.
- **Power loom** (Cartwright, 1785) — wove cloth by machine.
- **Bessemer process** (1850s) — cheap mass steel.
- **Railways** (Stephenson's Rocket, 1829) — moved goods and people fast.

The social impact was enormous. **Urbanisation** exploded: Manchester grew from 25,000 in 1772 to 180,000 in 1831. People worked 12–16 hour days in dangerous factories; **child labour** was common (small children could crawl under machines). Housing was cramped, polluted and disease-ridden (cholera outbreaks). Reformers like Lord Shaftesbury pushed through the **Factory Acts** limiting child labour; trade unions formed to fight for workers' rights.

The global consequences were huge. Industrial nations built empires to secure raw materials and markets — fuelling the **Scramble for Africa** and the **Opium Wars** in China. The gap between industrialised and non-industrialised nations widened — a gap that still shapes global inequality today. The environment suffered too: coal smoke blackened cities; the carbon dioxide released then is still in the atmosphere, warming the planet.`,
        studyGuide: `**Quick revision — Industrial Revolution**

- Began ~1760 in Britain; shift from hand to machine production.
- Causes: coal/iron, empire, capital, stable government, agricultural surplus labour.
- Inventions: Watt's steam engine, spinning jenny, power loom, railways, Bessemer steel.
- Social: urbanisation, dangerous factories, child labour, Factory Acts, unions.
- Global: empires for raw materials; wealth gap; pollution and CO₂.`,
        keyTerms: [
          { term: "Industrial Revolution", definition: "The shift from hand production to machine manufacturing, beginning c.1760." },
          { term: "Urbanisation", definition: "The growth of cities as people moved from countryside to factory towns." },
          { term: "Factory Acts", definition: "19th-century British laws limiting child labour and improving factory safety." },
          { term: "Steam engine", definition: "A machine that uses steam pressure to power machinery; improved by James Watt." },
        ],
        examples: [
          {
            title: "Invention chain",
            body: "Spinning jenny → more yarn → power loom → more cloth → steam engine to power looms → railways to move cloth to ports → empire to sell it.",
          },
          {
            title: "Social impact",
            body: "Manchester grew 7x in 60 years. Children as young as 6 worked 14-hour days in textile mills. The 1833 Factory Act banned under-9s from factories.",
          },
        ],
        durationMin: 45,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "The Industrial Revolution began in…",
              options: ["France", "Britain", "USA", "China"],
              answerIdx: 1,
              explanation: "Britain, around 1760.",
            },
            {
              prompt: "Who improved the steam engine in 1776?",
              options: ["Hargreaves", "Arkwright", "James Watt", "Stephenson"],
              answerIdx: 2,
              explanation: "James Watt's improvements made the steam engine practical.",
            },
            {
              prompt: "The Industrial Revolution caused…",
              options: ["rural depopulation", "rapid urbanisation", "no social change", "less trade"],
              answerIdx: 1,
              explanation: "Cities exploded as people moved for factory work.",
            },
            {
              prompt: "The Factory Acts were designed to…",
              options: ["build more factories", "limit child labour and improve safety", "ban steam engines", "stop trade unions"],
              answerIdx: 1,
              explanation: "Factory Acts limited child labour and improved conditions.",
            },
          ],
        },
      },
      {
        title: "World War II: Causes & Consequences",
        slug: "world-war-2",
        summary:
          "Examine the causes of WWII, key turning points, the Holocaust, and the post-war world order.",
        objectives: [
          "Explain the long- and short-term causes of WWII.",
          "Identify key turning points (Stalingrad, D-Day, Hiroshima).",
          "Describe the Holocaust and its lessons.",
          "Evaluate the consequences of WWII (UN, Cold War, decolonisation).",
        ],
        content: `World War II (1939–1945) was the deadliest conflict in human history, killing an estimated 70–85 million people. Its causes lay in the unresolved wounds of **World War I**: the harsh Treaty of Versailles humiliated Germany; the Great Depression destabilised democracies; the League of Nations failed to stop aggression.

The **rise of fascism** under Mussolini in Italy and **Hitler** in Germany, plus Japanese militarism, broke the post-WWI order. Hitler remilitarised the Rhineland (1936), annexed Austria (1938), and seized Czechoslovakia (1938–39). Britain and France's **appeasement** at Munich (1938) failed. When Germany invaded Poland on **1 September 1939**, Britain and France declared war.

The **early years** went badly for the Allies. Germany conquered much of Western Europe (France fell in June 1940); the **Battle of Britain** (summer 1940) saw the RAF defeat the Luftwaffe; the **Blitz** bombed British cities. In 1941 Germany invaded the USSR (**Operation Barbarossa**) and Japan attacked **Pearl Harbor**, bringing the USA and USSR fully into the war — a fatal combination for the Axis.

**Turning points**:

- **Stalingrad** (1942–43): the Soviet Red Army destroyed the German 6th Army; the tide turned on the Eastern Front.
- **El Alamein** (1942): the Allies pushed Germany out of North Africa.
- **D-Day** (6 June 1944): the Allies landed in Normandy, opening the Western Front.
- **Hiroshima and Nagasaki** (August 1945): atomic bombs forced Japan's surrender.

The **Holocaust** — the Nazi murder of six million Jews, plus Roma, disabled people, homosexuals, and political prisoners — was the war's moral nadir. The Nuremberg Trials established that individuals are responsible for crimes against humanity, even under orders.

**Consequences** were vast: the **United Nations** was founded to prevent future wars; Europe was divided between the US-led West and the Soviet-led East — the **Cold War**; colonial empires (British, French, Dutch) crumbled over the next 30 years; the USA and USSR became superpowers; NATO and the Warsaw Pact were formed; and the **Universal Declaration of Human Rights** (1948) set new global standards.`,
        studyGuide: `**Quick revision — WWII**

- Causes: Versailles, Depression, fascism, appeasement failure.
- Started 1 Sept 1939 (Germany invaded Poland); ended Aug 1945 (Japan surrendered).
- Turning points: Stalingrad (1942–43), El Alamein, D-Day (June 1944), Hiroshima/Nagasaki (Aug 1945).
- Holocaust: 6 million Jews murdered; Nuremberg Trials followed.
- Consequences: UN, Cold War, decolonisation, Universal Declaration of Human Rights.`,
        keyTerms: [
          { term: "Appeasement", definition: "Giving in to an aggressor's demands to avoid war — failed at Munich 1938." },
          { term: "Blitz", definition: "The German bombing of British cities in 1940–41." },
          { term: "Holocaust", definition: "The Nazi genocide of six million Jews and millions of others." },
          { term: "D-Day", definition: "6 June 1944, the Allied invasion of Nazi-occupied France." },
        ],
        examples: [
          {
            title: "Tide turning",
            body: "1942–43 saw three turning points in months: Midway (Pacific), El Alamein (N. Africa), Stalingrad (Eastern Front). After these, the Axis was in retreat.",
          },
          {
            title: "Post-war order",
            body: "The UN (founded 1945) was stronger than the failed League of Nations. NATO (1949) and the Warsaw Pact (1955) formalised the Cold War split.",
          },
        ],
        durationMin: 50,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "WWII in Europe started when Germany invaded…",
              options: ["France", "Poland", "USSR", "Czechoslovakia"],
              answerIdx: 1,
              explanation: "1 September 1939, Germany invaded Poland.",
            },
            {
              prompt: "Which was a turning point on the Eastern Front?",
              options: ["Dunkirk", "Stalingrad", "D-Day", "Pearl Harbor"],
              answerIdx: 1,
              explanation: "Stalingrad (1942–43) halted the German advance into the USSR.",
            },
            {
              prompt: "D-Day took place on…",
              options: ["6 June 1944", "1 Sept 1939", "11 Nov 1918", "15 Aug 1945"],
              answerIdx: 0,
              explanation: "6 June 1944, the Normandy landings.",
            },
            {
              prompt: "The United Nations was founded in…",
              options: ["1919", "1939", "1945", "1949"],
              answerIdx: 2,
              explanation: "1945, after WWII, replacing the failed League of Nations.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Global Politics & Economics",
    gradeBand: "9-10",
    lessons: [
      {
        title: "The Cold War",
        slug: "cold-war",
        summary:
          "Trace the Cold War from 1945 to 1991: superpower rivalry, proxy wars, nuclear arms race, and the fall of the USSR.",
        objectives: [
          "Explain the origins of the Cold War after 1945.",
          "Describe key events (Berlin Blockade, Cuban Missile Crisis, détente, fall of Berlin Wall).",
          "Analyse the nuclear arms race and deterrence theory.",
          "Evaluate the consequences of the Cold War's end.",
        ],
        content: `The **Cold War** (1947–1991) was a state of geopolitical tension between the **United States** and its allies (the West, NATO) and the **Soviet Union** and its allies (the East, Warsaw Pact). It was "cold" because the superpowers never fought each other directly — but they came terrifyingly close.

The war began as WWII ended. The **Yalta** and **Potsdam** conferences (1945) divided defeated Germany and Europe into zones. **Churchill's "Iron Curtain"** speech (1946) named the dividing line. The **Truman Doctrine** (1947) committed the USA to "contain" communism; the **Marshall Plan** rebuilt Western Europe with US aid. The USSR responded by tightening control over Eastern Europe.

Key crises:

- **Berlin Blockade** (1948–49): USSR blocked land access to West Berlin; the USA and UK airlifted supplies for almost a year.
- **Korean War** (1950–53): North (communist) invaded South; the UN (mostly USA) defended the South; China entered for the North. Ended in stalemate at the 38th parallel.
- **Berlin Wall** (1961–89): built to stop East Germans fleeing West; the most powerful symbol of the Cold War divide.
- **Cuban Missile Crisis** (1962): the closest the world came to nuclear war. Soviet missiles in Cuba; JFK demanded their removal; 13 days of tension ended with Khrushchev backing down.
- **Vietnam War** (1955–75): the USA supported South Vietnam against communist North; the USA withdrew in 1973; the South fell in 1975.

The **nuclear arms race** saw both sides build tens of thousands of warheads. The theory of **Mutually Assured Destruction (MAD)** held that neither side would attack because both would be annihilated. Treaties (SALT, START, INF) slowly reduced arsenals from the 1970s on.

**Détente** (1970s) eased tensions; Reagan's renewed arms race in the 1980s pressured the Soviet economy. **Gorbachev** introduced **glasnost** (openness) and **perestroika** (restructuring); Eastern European regimes fell in 1989; the **Berlin Wall** came down (9 Nov 1989); the **USSR dissolved** in December 1991. The Cold War was over — but its legacies (nuclear weapons, NATO expansion, regional conflicts) continue.`,
        studyGuide: `**Quick revision — Cold War**

- 1947–1991; USA vs USSR; never direct war but many proxy wars.
- Origins: Yalta/Potsdam, Iron Curtain, Truman Doctrine, Marshall Plan.
- Crises: Berlin Blockade (1948–49), Korean War, Berlin Wall, Cuban Missile Crisis (1962), Vietnam.
- MAD: nuclear deterrence through assured destruction.
- End: Gorbachev's glasnost/perestroika → Eastern Europe 1989 → USSR dissolved 1991.`,
        keyTerms: [
          { term: "Cold War", definition: "1947–1991 geopolitical rivalry between the USA and USSR, without direct war." },
          { term: "Iron Curtain", definition: "Churchill's term for the ideological and physical divide of Europe." },
          { term: "Mutually Assured Destruction (MAD)", definition: "The theory that nuclear deterrence rests on both sides being destroyed if either attacks." },
          { term: "Détente", definition: "1970s easing of Cold War tensions through treaties and dialogue." },
        ],
        examples: [
          {
            title: "Cuban Missile Crisis",
            body: "Oct 1962: US spy planes found Soviet missiles in Cuba. JFK ordered a naval blockade; 13 days of tension ended when Khrushchev withdrew the missiles in exchange for a secret US promise to remove missiles from Turkey.",
          },
          {
            title: "End of the USSR",
            body: "Gorbachev's reforms allowed Eastern European regimes to fall in 1989; the August 1991 coup attempt failed; the USSR formally dissolved on 26 December 1991.",
          },
        ],
        durationMin: 55,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "The Cold War lasted roughly…",
              options: ["1914–1918", "1939–1945", "1947–1991", "1990–2001"],
              answerIdx: 2,
              explanation: "1947 (Truman Doctrine) to 1991 (USSR dissolved).",
            },
            {
              prompt: "The closest the world came to nuclear war was…",
              options: ["Berlin Blockade", "Korean War", "Cuban Missile Crisis", "Vietnam War"],
              answerIdx: 2,
              explanation: "October 1962 — the Cuban Missile Crisis.",
            },
            {
              prompt: "MAD stands for…",
              options: ["Mutual Atomic Defence", "Mutually Assured Destruction", "Multiple Arms Deployment", "Military Atomic Deterrent"],
              answerIdx: 1,
              explanation: "Mutually Assured Destruction — neither attacks because both would be destroyed.",
            },
            {
              prompt: "The Berlin Wall fell in…",
              options: ["1961", "1979", "1989", "1991"],
              answerIdx: 2,
              explanation: "9 November 1989.",
            },
          ],
        },
      },
      {
        title: "Globalisation & Development",
        slug: "globalisation-development",
        summary:
          "Analyse the causes and impacts of globalisation, and compare measures of development.",
        objectives: [
          "Define globalisation and identify its drivers.",
          "Compare development indicators (GDP, HDI, Gini).",
          "Explain the roles of TNCs, WTO, IMF and World Bank.",
          "Evaluate arguments for and against globalisation.",
        ],
        content: `**Globalisation** is the growing interconnectedness of the world's economies, cultures and populations, accelerated by technology, trade and migration. Goods, money, information and people move across borders faster and in greater volumes than ever before.

**Drivers of globalisation**:

- **Technology** — the internet, container shipping, jet travel, satellite communications.
- **Trade liberalisation** — tariffs and quotas reduced through WTO agreements.
- **Multinational corporations (TNCs)** — Apple, Toyota, Unilever — operating across borders.
- **International institutions** — WTO (trade rules), IMF (financial stability), World Bank (development loans).
- **Migration** — workers and refugees moving in search of opportunity or safety.

How do we measure **development**? Three common indicators:

- **GDP per capita** — total economic output divided by population. Simple but ignores inequality and well-being.
- **Human Development Index (HDI)** — combines life expectancy, education and income. Broader but still imperfect.
- **Gini coefficient** — measures income inequality (0 = perfect equality, 1 = one person has everything).

No single number captures development — geographers use several together.

**Arguments for globalisation**: cheaper goods; faster spread of ideas and technology; hundreds of millions lifted out of poverty (especially in China and India); cultural exchange.

**Arguments against**: TNCs can exploit workers and environments in poorer countries; wealth flows to shareholders in rich countries; local industries and cultures are squeezed; the gap between richest and poorest has widened in many countries; supply chains are fragile (as COVID-19 showed).

Sustainable globalisation seeks to keep the gains while reducing the harms: fair trade, environmental standards, stronger labour laws, debt relief for poor countries, and inclusive institutions. The UN's **Sustainable Development Goals** (2015–2030) are one attempt to set shared targets.`,
        studyGuide: `**Quick revision — Globalisation & Development**

- Globalisation = interconnected economies, cultures, populations.
- Drivers: technology, trade liberalisation, TNCs, IMF/WTO/World Bank, migration.
- Indicators: GDP per capita, HDI (life expectancy + education + income), Gini (inequality).
- Pros: cheaper goods, tech spread, poverty reduction.
- Cons: TNC exploitation, inequality, fragile supply chains, cultural erosion.
- UN Sustainable Development Goals (2015–2030): shared targets.`,
        keyTerms: [
          { term: "Globalisation", definition: "Growing integration of economies, cultures and populations worldwide." },
          { term: "TNC (Transnational Corporation)", definition: "A company operating in many countries (Apple, Toyota, Unilever)." },
          { term: "HDI (Human Development Index)", definition: "A composite of life expectancy, education and income." },
          { term: "Gini coefficient", definition: "A measure of income inequality from 0 (equal) to 1 (unequal)." },
        ],
        examples: [
          {
            title: "Supply chain",
            body: "An iPhone's parts come from 40+ countries; it is assembled in China; designed in California; sold worldwide. Globalisation in a single product.",
          },
          {
            title: "Indicators compared",
            body: "Qatar has high GDP per capita but moderate HDI (many migrant workers). Norway scores high on both. South Africa has middle GDP per capita but high Gini (great inequality).",
          },
        ],
        durationMin: 55,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "Which is NOT a driver of globalisation?",
              options: ["Internet", "Container shipping", "Tariffs", "Multinational corporations"],
              answerIdx: 2,
              explanation: "Tariffs (taxes on imports) slow globalisation, not drive it.",
            },
            {
              prompt: "HDI combines life expectancy, education and…",
              options: ["income", "population", "land area", "military size"],
              answerIdx: 0,
              explanation: "HDI = life expectancy + education + income.",
            },
            {
              prompt: "A Gini coefficient of 1 means…",
              options: ["perfect equality", "one person has all the income", "low development", "no trade"],
              answerIdx: 1,
              explanation: "Gini 1 = maximum inequality.",
            },
            {
              prompt: "Which is an argument AGAINST globalisation?",
              options: ["cheaper goods", "faster spread of technology", "TNCs exploiting workers abroad", "poverty reduction in China"],
              answerIdx: 2,
              explanation: "Worker exploitation in poorer countries is a key criticism.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Geopolitics, Economics & Philosophy",
    gradeBand: "11-12",
    lessons: [
      {
        title: "Political Ideologies",
        slug: "political-ideologies",
        summary:
          "Compare major political ideologies (liberalism, conservatism, socialism, fascism, feminism, environmentalism) on key questions.",
        objectives: [
          "Define liberalism, conservatism, socialism, fascism, feminism, environmentalism.",
          "Compare ideologies on liberty, equality, the state, and the economy.",
          "Apply ideology to a contemporary policy debate.",
          "Evaluate the strengths and weaknesses of each ideology.",
        ],
        content: `A **political ideology** is a set of beliefs about how society should be organised. Different ideologies answer four big questions differently: What is the role of the **state**? How much **liberty** should individuals have? How much **equality** matters? How should the **economy** be run?

**Liberalism** values individual liberty, rights and reason. Liberals believe in limited government, free markets (with some regulation), equality before the law, and tolerance. Locke, Mill, and Rawls are key thinkers. Strength: protects individual rights. Weakness: can ignore structural inequality.

**Conservatism** values tradition, order and gradual change. Conservatives believe institutions (family, religion, nation) carry wisdom that should not be discarded lightly. Burke, Oakeshott. Strength: stability. Weakness: can entrench injustice.

**Socialism** values social and economic equality. Socialists believe the community (often through the state) should own or regulate key industries and redistribute wealth. Marx, Engels, Bernstein. Strength: addresses inequality. Weakness: can stifle individual initiative and centralise power.

**Fascism** promotes ultranationalism, authoritarian leadership, and the subordination of the individual to the nation. Mussolini, Hitler. Strength: NONE that are widely accepted — it led to WWII and genocide. Weakness: totalitarian, racist, militarist.

**Feminism** analyses and opposes patriarchy — the systematic domination of women. Waves of feminism: first (suffrage), second (work, body, law), third (intersectionality), fourth (online, #MeToo). Wollstonecraft, de Beauvoir, hooks, Butler. Strength: exposes hidden structures of power. Weakness: can fragment into competing schools.

**Environmentalism** prioritises ecological sustainability. It critiques the assumption that economic growth can continue indefinitely on a finite planet. Carson, Naess, Klein. Strength: addresses the defining challenge of our age. Weakness: needs to integrate with social justice to avoid eco-fascism.

Most people hold a **mix** of ideologies, and most democracies blend liberalism, conservatism and socialism. The skill is to recognise when an ideology illuminates a problem and when it blinds you — and to argue your own view with humility and evidence.`,
        studyGuide: `**Quick revision — Political Ideologies**

- Four questions: state, liberty, equality, economy.
- Liberalism: liberty, rights, limited state, free markets.
- Conservatism: tradition, order, gradual change.
- Socialism: equality, community/state ownership, redistribution.
- Fascism: ultranationalism, authoritarianism — discredited by WWII.
- Feminism: opposes patriarchy; four waves.
- Environmentalism: ecological sustainability as priority.
- Most people and parties mix ideologies.`,
        keyTerms: [
          { term: "Ideology", definition: "A coherent set of beliefs about how society should be organised." },
          { term: "Liberalism", definition: "Ideology valuing individual liberty, rights and limited government." },
          { term: "Socialism", definition: "Ideology valuing economic equality, often through state ownership or strong redistribution." },
          { term: "Patriarchy", definition: "A social system in which men hold primary power; opposed by feminism." },
        ],
        examples: [
          {
            title: "Policy debate",
            body: "On free university tuition: liberals may oppose (individual responsibility), socialists support (equal opportunity), conservatives split (merit vs tradition), feminists support (women's access), environmentalists indifferent.",
          },
          {
            title: "Mixed ideologies",
            body: "Most modern European parties blend liberal rights with socialist welfare and conservative respect for tradition — 'social democracy'.",
          },
        ],
        durationMin: 60,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "Which ideology values tradition and order?",
              options: ["Liberalism", "Conservatism", "Socialism", "Feminism"],
              answerIdx: 1,
              explanation: "Conservatism values tradition, order and gradual change.",
            },
            {
              prompt: "Socialism places priority on…",
              options: ["individual liberty", "economic equality", "tradition", "nationalism"],
              answerIdx: 1,
              explanation: "Socialism prioritises economic and social equality.",
            },
            {
              prompt: "Feminism analyses and opposes…",
              options: ["capitalism", "patriarchy", "democracy", "trade"],
              answerIdx: 1,
              explanation: "Feminism opposes patriarchy — male domination of social power.",
            },
            {
              prompt: "Environmentalism critiques the assumption that…",
              options: ["the climate is changing", "growth can continue indefinitely on a finite planet", "humans cause pollution", "ecosystems matter"],
              answerIdx: 1,
              explanation: "Environmentalism rejects endless economic growth on a finite planet.",
            },
          ],
        },
      },
      {
        title: "Macroeconomics & Trade",
        slug: "macroeconomics-trade",
        summary:
          "Explain GDP, inflation, unemployment, fiscal and monetary policy, and the gains from trade.",
        objectives: [
          "Define GDP, inflation and unemployment and how each is measured.",
          "Explain fiscal and monetary policy and their tools.",
          "Use comparative advantage to explain the gains from trade.",
          "Evaluate the costs and benefits of trade barriers.",
        ],
        content: `**Macroeconomics** studies the economy as a whole. Three key indicators describe its health:

- **GDP (Gross Domestic Product)** — the total value of goods and services produced in a country in a year. Real GDP adjusts for inflation.
- **Inflation** — the rate at which prices rise. Measured by CPI (Consumer Price Index). Mild inflation (2%) is normal; high inflation destroys savings; deflation discourages spending.
- **Unemployment** — the percentage of the labour force looking for work but unable to find it. Some unemployment (people between jobs) is normal; mass unemployment wastes human potential and harms well-being.

Governments manage the economy through two policy levers:

**Fiscal policy** (government) — taxes and spending. To boost a sluggish economy, cut taxes and raise spending (**expansionary**). To cool an overheating economy, raise taxes and cut spending (**contractionary**). Budget deficits add to national debt.

**Monetary policy** (central bank) — interest rates and money supply. Lower interest rates make borrowing cheaper, encouraging spending and investment. Higher rates cool inflation by making borrowing dearer. The Bank of England, the Federal Reserve, and the European Central Bank set rates.

**Trade** between nations is driven by **comparative advantage** — even if one country can produce everything more efficiently than another, both benefit if each specialises in what it produces *relatively* efficiently and trades for the rest. A simple example: a lawyer who types faster than their assistant should still hire the assistant and specialise in law. Trade extends gains like this to nations.

**Trade barriers** (tariffs, quotas) protect domestic industries but raise prices for consumers and invite retaliation. The 1930 Smoot-Hawley tariffs worsened the Great Depression. Yet some barriers protect infant industries or strategic sectors — the debate is real. The WTO tries to keep trade open and rule-based.

Macroeconomics is messy because people's expectations matter — if everyone expects inflation, they demand higher wages, which causes inflation. Policy works on psychology as much as on numbers.`,
        studyGuide: `**Quick revision — Macroeconomics**

- GDP = total output; Real GDP adjusts for inflation.
- Inflation = rising prices (CPI). Target ~2% in most economies.
- Unemployment = % of labour force looking for work.
- Fiscal policy: taxes + spending (government).
- Monetary policy: interest rates + money supply (central bank).
- Comparative advantage: each country specialises in its relatively efficient goods.
- Trade barriers protect industry but raise consumer prices and invite retaliation.`,
        keyTerms: [
          { term: "GDP", definition: "Gross Domestic Product — total value of goods and services produced in a year." },
          { term: "Inflation", definition: "The rate at which general prices rise; measured by CPI." },
          { term: "Fiscal policy", definition: "Government use of taxes and spending to manage the economy." },
          { term: "Comparative advantage", definition: "Specialising in goods you produce relatively efficiently, then trading." },
        ],
        examples: [
          {
            title: "Policy mix",
            body: "In a recession: government cuts taxes (fiscal expansion) and central bank cuts rates (monetary expansion) — both try to boost spending and jobs.",
          },
          {
            title: "Comparative advantage",
            body: "Bangladesh makes cheap textiles; Germany makes precision machinery. Both gain by specialising and trading — even if Germany could, in theory, also make textiles.",
          },
        ],
        durationMin: 60,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "GDP measures…",
              options: ["total unemployment", "total output of goods and services", "interest rates", "inflation"],
              answerIdx: 1,
              explanation: "GDP = total value of goods and services produced.",
            },
            {
              prompt: "To cool inflation, a central bank usually…",
              options: ["lowers interest rates", "raises interest rates", "prints money", "cuts taxes"],
              answerIdx: 1,
              explanation: "Higher rates reduce borrowing and spending, cooling inflation.",
            },
            {
              prompt: "Comparative advantage says countries gain by…",
              options: ["producing everything themselves", "specialising in relatively efficient goods and trading", "imposing high tariffs", "not trading"],
              answerIdx: 1,
              explanation: "Each country specialises where it is relatively most efficient.",
            },
            {
              prompt: "High tariffs on imports usually…",
              options: ["lower consumer prices", "raise consumer prices and invite retaliation", "boost free trade", "have no effect"],
              answerIdx: 1,
              explanation: "Tariffs raise import prices; trading partners often retaliate.",
            },
          ],
        },
      },
    ],
  },
];
