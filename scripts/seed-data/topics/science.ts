import type { TopicUnit } from "../index";

export const scienceTopics: TopicUnit[] = [
  {
    unitTitle: "Living Things & Materials",
    gradeBand: "1-2",
    lessons: [
      {
        title: "Animals, Including Humans",
        slug: "animals-including-humans",
        summary:
          "Identify animals by their features, sort them into groups, and describe the basic needs of living things.",
        objectives: [
          "Sort animals into mammals, birds, fish, reptiles and amphibians.",
          "Describe the basic needs of animals (food, water, air, shelter).",
          "Identify the main body parts of a human.",
          "Explain how animals use their senses.",
        ],
        content: `Scientists sort living things into groups based on their features. **Mammals** have hair or fur and feed their young with milk — cats, dogs, humans, whales. **Birds** have feathers, two legs and a beak, and most can fly. **Fish** live in water and breathe through gills. **Reptiles** have dry, scaly skin and most lay eggs — lizards, snakes, turtles. **Amphibians** live both in water and on land — frogs, toads, newts.

All living things have **basic needs**: food (for energy), water (to keep cells working), air (oxygen to release energy), and a place to live (shelter from weather and predators). The acronym **MRS GREN** helps remember the seven life processes: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition.

Humans have many **body parts** that work together. The **head** holds the brain, eyes, ears, nose and mouth. The **torso** contains the heart and lungs. **Arms and legs** let us move. Each part has a job — the heart pumps blood, the lungs take in oxygen, the brain controls everything.

Animals use their **senses** to survive: a rabbit's big ears hear predators; an eagle's sharp eyes spot prey from far away; a dog's nose smells food and other animals. Senses help animals find food, avoid danger, and communicate.`,
        studyGuide: `**Quick revision — Animals & Humans**

- Groups: mammals (milk, fur), birds (feathers, beak), fish (gills, water), reptiles (scales, eggs), amphibians (water + land).
- MRS GREN: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition.
- Needs: food, water, air, shelter.
- Human parts: head (brain, senses), torso (heart, lungs), limbs (movement).
- Senses help animals survive.`,
        keyTerms: [
          { term: "Mammal", definition: "An animal with fur/hair that feeds its young with milk." },
          { term: "Amphibian", definition: "An animal that lives both in water and on land." },
          { term: "Life processes", definition: "The things all living things do — MRS GREN." },
          { term: "Gills", definition: "Body parts fish use to breathe oxygen from water." },
        ],
        examples: [
          {
            title: "Sorting",
            body: "A frog is an amphibian (lays eggs in water, lives on land as adult). A snake is a reptile (dry scaly skin). A whale is a mammal (feeds young with milk).",
          },
          {
            title: "Senses for survival",
            body: "A rabbit's large ears rotate to detect predators; a deer's eyes on the sides of its head give a wide field of view.",
          },
        ],
        durationMin: 25,
        difficulty: "introductory",
        quiz: {
          timeLimit: 8,
          questions: [
            {
              prompt: "Which group feeds its young with milk?",
              options: ["Fish", "Birds", "Mammals", "Reptiles"],
              answerIdx: 2,
              explanation: "Mammals produce milk to feed their young.",
            },
            {
              prompt: "Fish breathe using…",
              options: ["lungs", "gills", "skin", "feathers"],
              answerIdx: 1,
              explanation: "Gills extract oxygen from water.",
            },
            {
              prompt: "Which is NOT a basic need of animals?",
              options: ["water", "air", "money", "food"],
              answerIdx: 2,
              explanation: "Animals need food, water, air, shelter — not money.",
            },
            {
              prompt: "Which part of the body controls everything?",
              options: ["heart", "lungs", "brain", "stomach"],
              answerIdx: 2,
              explanation: "The brain is the control centre of the body.",
            },
          ],
        },
      },
      {
        title: "Everyday Materials",
        slug: "everyday-materials",
        summary:
          "Identify common materials (wood, plastic, metal, glass, fabric) and describe their properties.",
        objectives: [
          "Name common materials and give examples.",
          "Describe properties (hard, soft, smooth, rough, flexible, rigid).",
          "Sort materials by properties.",
          "Choose a material for a purpose based on its properties.",
        ],
        content: `A **material** is what an object is made from. Common materials include **wood** (tables, pencils), **plastic** (bottles, toys), **metal** (cars, coins), **glass** (windows, bottles), **fabric** (clothes, curtains), **paper** (books, posters) and **rubber** (tyres, balls).

Materials have **properties** — words that describe what they are like. Some properties: **hard** (resists being scratched), **soft** (gives way easily), **smooth** (no bumps), **rough** (bumpy), **flexible** (bends easily), **rigid** (stays stiff), **transparent** (you can see through it), **opaque** (you cannot see through it), **waterproof** (keeps water out), **absorbent** (soaks up water).

To **choose a material for a purpose**, think about what the object must do. A window must let light through, so transparent glass is good. A raincoat must be waterproof and flexible, so coated fabric works. A chair must be strong and rigid, so wood or metal is suitable.

Many objects are made from more than one material because different parts have different jobs. A pencil has wood (rigid) and graphite (marks paper); a torch has plastic case (light, waterproof) and metal contacts (conducts electricity).`,
        studyGuide: `**Quick revision — Materials**

- Common: wood, plastic, metal, glass, fabric, paper, rubber.
- Properties: hard, soft, smooth, rough, flexible, rigid, transparent, opaque, waterproof, absorbent.
- Choose by purpose: window → transparent; raincoat → waterproof + flexible.
- Many objects mix materials for different parts.`,
        keyTerms: [
          { term: "Material", definition: "What an object is made from." },
          { term: "Property", definition: "A characteristic of a material (e.g., hard, flexible)." },
          { term: "Transparent", definition: "Allows light to pass through so you can see clearly." },
          { term: "Waterproof", definition: "Does not let water pass through." },
        ],
        examples: [
          {
            title: "Choosing a material",
            body: "A raincoat must be waterproof and flexible: coated nylon works. A window must be transparent and rigid: glass works.",
          },
          {
            title: "Mixed materials",
            body: "A torch has a plastic case (light, waterproof), metal spring (conducts electricity), glass lens (transparent).",
          },
        ],
        durationMin: 30,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "A window is made of glass because glass is…",
              options: ["opaque", "transparent", "soft", "absorbent"],
              answerIdx: 1,
              explanation: "Glass lets light through — it is transparent.",
            },
            {
              prompt: "A material that bends easily is…",
              options: ["rigid", "flexible", "transparent", "opaque"],
              answerIdx: 1,
              explanation: "Flexible materials bend without breaking.",
            },
            {
              prompt: "Which material is best for a raincoat?",
              options: ["cotton fabric", "waterproof coated nylon", "paper", "glass"],
              answerIdx: 1,
              explanation: "It must be waterproof and flexible — coated nylon fits both.",
            },
            {
              prompt: "A metal coin is best described as…",
              options: ["soft and flexible", "hard and rigid", "transparent", "absorbent"],
              answerIdx: 1,
              explanation: "Metals are typically hard and rigid.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "States of Matter & Forces",
    gradeBand: "3-4",
    lessons: [
      {
        title: "Solids, Liquids & Gases",
        slug: "solids-liquids-gases",
        summary:
          "Describe the properties of solids, liquids and gases, and explain changes of state using particle theory.",
        objectives: [
          "Compare the properties of solids, liquids and gases.",
          "Describe the particle arrangement in each state.",
          "Explain melting, freezing, evaporation and condensation.",
          "Predict the state of a material at a given temperature.",
        ],
        content: `Everything around us is made of tiny particles. The way these particles are arranged and move gives us the three **states of matter**: solid, liquid, and gas.

In a **solid**, particles are packed tightly in a fixed pattern and only vibrate. Solids keep their own shape — a brick stays a brick. In a **liquid**, particles are close together but can move past each other, so liquids take the shape of their container. In a **gas**, particles are far apart and move freely; gases spread out to fill any container.

**Changing state** happens when particles gain or lose energy (heat):

- **Melting**: solid → liquid (ice to water).
- **Freezing**: liquid → solid (water to ice).
- **Evaporation**: liquid → gas (water to steam).
- **Condensation**: gas → liquid (steam on a cold window).

Some substances skip a state. **Sublimation** goes straight from solid to gas (dry ice, mothballs). The temperature at which a solid melts is its **melting point**; the temperature at which a liquid boils is its **boiling point**. Water melts/freezes at 0°C and boils at 100°C (at sea level).

The **water cycle** is powered by changes of state: the Sun heats oceans, water evaporates, rises and cools, condenses into clouds, then falls as rain — and the cycle continues.`,
        studyGuide: `**Quick revision — States of Matter**

- Solid: fixed shape, fixed volume, particles vibrate in place.
- Liquid: takes shape of container, fixed volume, particles move past each other.
- Gas: fills container, no fixed volume, particles fly freely.
- Changes: melt (s→l), freeze (l→s), evaporate (l→g), condense (g→l), sublimate (s→g).
- Water: melts 0°C, boils 100°C at sea level.`,
        keyTerms: [
          { term: "Particle", definition: "A tiny piece of matter; solids/liquids/gases are made of particles." },
          { term: "Melting", definition: "Changing from solid to liquid by heating." },
          { term: "Evaporation", definition: "Changing from liquid to gas; happens at the surface." },
          { term: "Condensation", definition: "Changing from gas to liquid by cooling." },
        ],
        examples: [
          {
            title: "State change cycle",
            body: "An ice cube (solid) melts to water (liquid) in the sun. The water evaporates into steam (gas). Steam condenses on a cold window to droplets (liquid).",
          },
          {
            title: "Particle model",
            body: "Solids: particles touching, ordered. Liquids: touching, disordered. Gases: far apart, fast-moving.",
          },
        ],
        durationMin: 35,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which state has particles far apart and moving freely?",
              options: ["Solid", "Liquid", "Gas", "Plasma"],
              answerIdx: 2,
              explanation: "Gases have particles that are far apart and move fast.",
            },
            {
              prompt: "Water freezes at…",
              options: ["0°C", "10°C", "100°C", "32°C"],
              answerIdx: 0,
              explanation: "Water freezes (becomes ice) at 0°C.",
            },
            {
              prompt: "Steam on a cold window turning to droplets is…",
              options: ["melting", "evaporation", "condensation", "sublimation"],
              answerIdx: 2,
              explanation: "Gas → liquid is condensation.",
            },
            {
              prompt: "A solid keeps its own shape because…",
              options: ["particles move freely", "particles are in a fixed pattern", "particles are far apart", "particles disappear"],
              answerIdx: 1,
              explanation: "Solid particles are locked in a pattern, giving a fixed shape.",
            },
          ],
        },
      },
      {
        title: "Forces & Magnets",
        slug: "forces-magnets",
        summary:
          "Describe forces as pushes and pulls, explore friction, and investigate magnetic forces.",
        objectives: [
          "Identify forces as pushes or pulls.",
          "Describe friction and its effects.",
          "Investigate magnetic attraction and repulsion.",
          "Sort materials as magnetic or non-magnetic.",
        ],
        content: `A **force** is a push or a pull. Forces can change the **shape** of an object (squash, stretch, twist), change its **speed** (speed up or slow down), or change its **direction**. We measure force in **newtons (N)** using a force meter (newtonmeter).

**Friction** is a force that opposes motion when two surfaces rub together. Friction can be useful (tyres grip the road, brakes slow a bike) or a problem (machines wear out, energy is wasted as heat). You can increase friction by using rougher surfaces; reduce it by lubricating (oil) or by streamlining.

**Magnetism** is a non-contact force. A **magnet** has two **poles** — north (N) and south (S). **Like poles repel**; **unlike poles attract**. The space around a magnet where it can act is its **magnetic field**. Iron, nickel and cobalt are **magnetic materials** — they are attracted to magnets. Most other materials (wood, plastic, copper, glass) are non-magnetic.

**Earth behaves like a giant magnet.** A compass needle is a small magnet that aligns with Earth's magnetic field, pointing roughly north. This lets navigators find their way even when they cannot see landmarks.

Engineers design everything from cars to spacecraft with forces in mind. Streamlining reduces air resistance (a type of friction); seat belts use forces to keep passengers safe; maglev trains use magnetic repulsion to float above the track, removing friction almost entirely.`,
        studyGuide: `**Quick revision — Forces & Magnets**

- Force = push or pull; measured in newtons (N).
- Effects: change shape, speed, or direction.
- Friction opposes motion; can be useful or unwanted.
- Magnets: N–S poles. Like poles repel; unlike attract.
- Magnetic materials: iron, nickel, cobalt.
- Earth is a giant magnet — compasses align with its field.`,
        keyTerms: [
          { term: "Force", definition: "A push or pull that can change motion or shape." },
          { term: "Friction", definition: "A force that opposes motion between two touching surfaces." },
          { term: "Magnetic pole", definition: "One of the two ends of a magnet (north or south)." },
          { term: "Magnetic field", definition: "The space around a magnet where its force acts." },
        ],
        examples: [
          {
            title: "Friction in action",
            body: "A bike brake pad presses the wheel rim; friction slows the bike. Without friction, the bike could not stop.",
          },
          {
            title: "Magnets",
            body: "Two bar magnets N-to-N push apart (repel). N-to-S pull together (attract). A paperclip (iron) sticks to a magnet; a copper coin does not.",
          },
        ],
        durationMin: 35,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Force is measured in…",
              options: ["cm", "newtons", "kg", "seconds"],
              answerIdx: 1,
              explanation: "Force is measured in newtons (N).",
            },
            {
              prompt: "Two north poles brought together will…",
              options: ["attract", "repel", "do nothing", "stick"],
              answerIdx: 1,
              explanation: "Like poles repel each other.",
            },
            {
              prompt: "Which material is magnetic?",
              options: ["wood", "plastic", "iron", "glass"],
              answerIdx: 2,
              explanation: "Iron is one of the three magnetic metals (iron, nickel, cobalt).",
            },
            {
              prompt: "Friction between bike brakes and the wheel…",
              options: ["speeds up the bike", "slows the bike", "does nothing", "lifts the bike"],
              answerIdx: 1,
              explanation: "Friction opposes motion — it slows the bike.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Cells, Systems & Energy",
    gradeBand: "5-6",
    lessons: [
      {
        title: "Cells & Microscopes",
        slug: "cells-microscopes",
        summary:
          "Use a microscope, identify the parts of animal and plant cells, and explain how cells form tissues and organs.",
        objectives: [
          "Label the parts of animal and plant cells and describe their functions.",
          "Use a light microscope correctly to view a slide.",
          "Explain the difference between cells, tissues, organs and systems.",
          "Compare specialised cells (red blood, nerve, root hair, sperm).",
        ],
        content: `All living things are made of **cells**. Cells are the basic units of life — tiny building blocks that work together to keep an organism alive. Most cells are too small to see without a **microscope**.

A typical **animal cell** contains: **nucleus** (controls the cell, contains DNA), **cytoplasm** (jelly where reactions happen), **cell membrane** (controls what enters and leaves), and **mitochondria** (release energy by respiration). **Plant cells** have all of these plus a **cell wall** (made of cellulose, gives strength), a **large vacuole** (stores water), and **chloroplasts** (contain chlorophyll, where photosynthesis happens).

Cells are **specialised** for their job. **Red blood cells** are biconcave and have no nucleus — they pack in more haemoglobin to carry oxygen. **Nerve cells** are long and thin to carry electrical impulses. **Root hair cells** have a large surface area to absorb water. **Sperm cells** have a tail to swim to the egg.

Cells group into **tissues** (muscle tissue, xylem tissue), tissues into **organs** (heart, leaf), organs into **organ systems** (circulatory system), and systems into the whole **organism**. This hierarchy explains how tiny cells build a working body.

To use a microscope: place the slide on the stage, secure with clips, start with the lowest objective lens, focus with the coarse knob, then switch to a higher lens and refine with the fine knob. Always start low and work up to protect the lens and the slide.`,
        studyGuide: `**Quick revision — Cells & Microscopes**

- Animal cell: nucleus, cytoplasm, membrane, mitochondria.
- Plant cell adds: cell wall, vacuole, chloroplasts.
- Specialised cells: red blood (no nucleus), nerve (long), root hair (surface area), sperm (tail).
- Hierarchy: cell → tissue → organ → organ system → organism.
- Microscope: low lens first, focus coarse, then fine.`,
        keyTerms: [
          { term: "Cell", definition: "The smallest unit of life." },
          { term: "Nucleus", definition: "The control centre of a cell; contains DNA." },
          { term: "Mitochondria", definition: "Cell parts that release energy by respiration." },
          { term: "Tissue", definition: "A group of similar cells working together." },
        ],
        examples: [
          {
            title: "Plant vs animal cell",
            body: "Plant cells have cell wall, vacuole and chloroplasts; animal cells do not. Both have nucleus, membrane, cytoplasm, mitochondria.",
          },
          {
            title: "Hierarchy example",
            body: "Muscle cell → muscle tissue → heart (organ) → circulatory system → human (organism).",
          },
        ],
        durationMin: 40,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which part controls the cell?",
              options: ["Cytoplasm", "Nucleus", "Membrane", "Vacuole"],
              answerIdx: 1,
              explanation: "The nucleus contains DNA and controls the cell.",
            },
            {
              prompt: "Which is found in plant but not animal cells?",
              options: ["Nucleus", "Mitochondria", "Chloroplast", "Cell membrane"],
              answerIdx: 2,
              explanation: "Chloroplasts (for photosynthesis) are only in plant cells.",
            },
            {
              prompt: "A red blood cell has no nucleus so it can…",
              options: ["divide faster", "carry more haemoglobin", " photosynthesise", "move quickly"],
              answerIdx: 1,
              explanation: "No nucleus leaves more room for haemoglobin to carry oxygen.",
            },
            {
              prompt: "Order: cell → tissue → ?",
              options: ["organism → organ", "organ → organ system → organism", "system → organ", "nucleus → cell"],
              answerIdx: 1,
              explanation: "Cell → tissue → organ → organ system → organism.",
            },
          ],
        },
      },
      {
        title: "Energy Stores & Transfers",
        slug: "energy-stores-transfers",
        summary:
          "Identify energy stores, describe energy transfers, and apply conservation of energy to systems.",
        objectives: [
          "Identify eight energy stores (kinetic, gravitational, elastic, thermal, chemical, nuclear, magnetic, electrostatic).",
          "Describe energy transfers between stores using pathways (mechanical, electrical, heating, radiation).",
          "Apply the conservation of energy.",
          "Calculate efficiency of a device.",
        ],
        content: `Energy is the capacity to do work. It is **stored** in eight different ways: **kinetic** (movement), **gravitational potential** (height above ground), **elastic** (stretched or squashed), **thermal** (heat), **chemical** (in fuels and food), **nuclear** (in atomic nuclei), **magnetic**, and **electrostatic**.

Energy is **transferred** between stores through four pathways:

- **Mechanically** (a force moves something — pushing a swing).
- **Electrically** (current flows — a kettle heating water).
- **By heating** (hot to cold — a pan on a hob).
- **By radiation** (light, sound, infrared — the Sun warming Earth).

The **law of conservation of energy** says energy cannot be created or destroyed, only transferred between stores. The total energy before equals the total energy after. A bouncing ball loses gravitational potential energy as it falls, gains kinetic energy, then loses kinetic energy as it rises again. Some energy is transferred to the thermal store of the surroundings (the ball and air warm slightly) — that is why the ball never bounces back to its starting height.

**Efficiency** measures how much of the input energy ends up in the useful output store. Efficiency = useful energy out ÷ total energy in. A 100 W bulb that produces 5 W of light and 95 W of heat has efficiency 5/100 = 5%. LED bulbs do much better — over 30% — which is why they save money.`,
        studyGuide: `**Quick revision — Energy**

- 8 stores: kinetic, gravitational, elastic, thermal, chemical, nuclear, magnetic, electrostatic.
- 4 pathways: mechanical, electrical, heating, radiation.
- Conservation: energy cannot be created or destroyed, only transferred.
- Efficiency = useful out ÷ total in (often ×100 for %).`,
        keyTerms: [
          { term: "Energy store", definition: "A way that energy is held (kinetic, thermal, chemical, etc.)." },
          { term: "Energy transfer", definition: "Energy moving from one store to another via a pathway." },
          { term: "Conservation of energy", definition: "Energy cannot be created or destroyed, only transferred." },
          { term: "Efficiency", definition: "The fraction of input energy that ends up in the useful output." },
        ],
        examples: [
          {
            title: "Energy transfer",
            body: "A falling ball: gravitational store → kinetic store. On impact: kinetic → thermal (ball warms) + sound (radiation pathway).",
          },
          {
            title: "Efficiency",
            body: "A motor takes 200 J of electrical energy and outputs 60 J of kinetic. Efficiency = 60/200 = 0.3 = 30%.",
          },
        ],
        durationMin: 45,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which is NOT an energy store?",
              options: ["Kinetic", "Chemical", "Light", "Thermal"],
              answerIdx: 2,
              explanation: "Light is a radiation pathway, not a store.",
            },
            {
              prompt: "Energy cannot be…",
              options: ["transferred", "stored", "created or destroyed", "measured"],
              answerIdx: 2,
              explanation: "Conservation of energy: only transferred between stores.",
            },
            {
              prompt: "A bulb uses 100 J and gives 5 J of light. Efficiency = ?",
              options: ["5%", "20%", "50%", "95%"],
              answerIdx: 0,
              explanation: "5/100 = 0.05 = 5%.",
            },
            {
              prompt: "A ball at the top of a hill has mainly…",
              options: ["kinetic energy", "gravitational potential energy", "thermal energy", "nuclear energy"],
              answerIdx: 1,
              explanation: "Height gives gravitational potential energy.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Atoms, Reactions & the Periodic Table",
    gradeBand: "7-8",
    lessons: [
      {
        title: "Atomic Structure & the Periodic Table",
        slug: "atomic-structure-periodic-table",
        summary:
          "Describe the structure of the atom, explain isotopes and ions, and use the periodic table to predict properties.",
        objectives: [
          "Describe the structure of an atom (protons, neutrons, electrons).",
          "Define atomic number and mass number.",
          "Explain isotopes and ions.",
          "Use the periodic table to predict reactivity of metals and non-metals.",
        ],
        content: `An **atom** is the smallest unit of an element. It has three subatomic particles: **protons** (positive charge, in the nucleus), **neutrons** (no charge, in the nucleus), and **electrons** (negative charge, orbiting the nucleus in shells). Atoms are neutral overall because the number of protons equals the number of electrons.

The **atomic number** is the number of protons — it defines the element. The **mass number** is the total of protons + neutrons. To find the number of neutrons: subtract atomic number from mass number. For carbon-12: 6 protons, 6 neutrons, 6 electrons.

**Isotopes** are atoms of the same element with different numbers of neutrons. Carbon-12 has 6 neutrons; carbon-14 has 8. They have the same chemical behaviour (same electrons) but different masses. Some isotopes are radioactive — their nuclei break down, releasing radiation used in medicine and energy.

**Ions** form when atoms gain or lose electrons. A sodium atom (11p, 11e) loses 1 electron to become Na⁺ (11p, 10e). A chlorine atom (17p, 17e) gains 1 electron to become Cl⁻ (17p, 18e). Opposite charges attract, so Na⁺ and Cl⁻ form ionic bonds in sodium chloride (table salt).

The **periodic table** arranges elements by atomic number. **Groups** (columns) have the same number of outer electrons and similar chemistry. **Periods** (rows) show the number of electron shells. Group 1 metals (alkali metals) are very reactive — they have 1 outer electron they lose easily. Group 0 (noble gases) are unreactive — they have full outer shells. Group 7 (halogens) are reactive non-metals — they gain 1 electron to fill their shell.`,
        studyGuide: `**Quick revision — Atoms & Periodic Table**

- Atom: protons (+), neutrons (0) in nucleus; electrons (−) in shells.
- Atomic number = protons; mass number = protons + neutrons.
- Isotopes: same element, different neutrons.
- Ions: gain/lose electrons; + lost, − gained.
- Groups: same outer electrons. G1 very reactive; G0 unreactive; G7 reactive non-metals.`,
        keyTerms: [
          { term: "Proton", definition: "Positive subatomic particle in the nucleus." },
          { term: "Isotope", definition: "Atoms of the same element with different neutron numbers." },
          { term: "Ion", definition: "An atom that has gained or lost electrons, becoming charged." },
          { term: "Group", definition: "A column of the periodic table; elements share chemistry." },
        ],
        examples: [
          {
            title: "Finding neutrons",
            body: "Oxygen-16: atomic number 8, mass number 16. Neutrons = 16 − 8 = 8.",
          },
          {
            title: "Ion formation",
            body: "Mg (12p, 12e) loses 2 electrons → Mg²⁺ (12p, 10e). O (8p, 8e) gains 2 electrons → O²⁻ (8p, 10e).",
          },
        ],
        durationMin: 45,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which particle has no charge?",
              options: ["Proton", "Neutron", "Electron", "Ion"],
              answerIdx: 1,
              explanation: "Neutrons have zero charge.",
            },
            {
              prompt: "Carbon-14 has 6 protons. How many neutrons?",
              options: ["6", "7", "8", "14"],
              answerIdx: 2,
              explanation: "Mass number 14 − 6 protons = 8 neutrons.",
            },
            {
              prompt: "When an atom gains an electron, it becomes a…",
              options: ["positive ion", "negative ion", "neutral atom", "isotope"],
              answerIdx: 1,
              explanation: "Gaining electrons (−) makes the ion negative.",
            },
            {
              prompt: "Which group is the most unreactive?",
              options: ["Group 1", "Group 7", "Group 0 (noble gases)", "Transition metals"],
              answerIdx: 2,
              explanation: "Noble gases have full outer shells, so they are unreactive.",
            },
          ],
        },
      },
      {
        title: "Chemical Reactions & Equations",
        slug: "chemical-reactions-equations",
        summary:
          "Identify chemical reactions, write balanced symbol equations, and classify reaction types.",
        objectives: [
          "Identify signs of a chemical reaction.",
          "Write word and balanced symbol equations.",
          "Classify reactions as combustion, thermal decomposition, oxidation, displacement, neutralisation.",
          "Use state symbols and conservation of mass.",
        ],
        content: `A **chemical reaction** happens when substances change into new substances. Signs include: a colour change, a gas being given off (bubbles), a temperature change, a precipitate forming, or light/sound being produced. The total mass does not change — this is the **law of conservation of mass**.

Reactions are written as **equations**. A word equation names the chemicals: *methane + oxygen → carbon dioxide + water*. A **balanced symbol equation** uses chemical formulas and ensures the same number of each atom on both sides:

CH₄ + 2O₂ → CO₂ + 2H₂O

Count the atoms: 1 C, 4 H, 4 O on each side. ✓ The big number in front (the **coefficient**) multiplies everything in that formula. Never change the small subscripts — those define the substance.

Common **reaction types**:

- **Combustion**: a substance reacts with oxygen, releasing energy. *Fuel + oxygen → oxides.*
- **Thermal decomposition**: heat breaks a compound into simpler substances. *CaCO₃ → CaO + CO₂.*
- **Oxidation**: gain of oxygen (or loss of electrons).
- **Displacement**: a more reactive element pushes out a less reactive one from a compound. *Zn + CuSO₄ → ZnSO₄ + Cu.*
- **Neutralisation**: acid + base → salt + water. *HCl + NaOH → NaCl + H₂O.*

**State symbols** show the physical state: (s) solid, (l) liquid, (g) gas, (aq) aqueous (dissolved in water). They turn an equation into a precise description: *HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l).*`,
        studyGuide: `**Quick revision — Chemical Reactions**

- Signs: colour change, gas, temperature change, precipitate.
- Conservation of mass: same atoms on both sides.
- Word equation → symbol equation → balance with coefficients.
- Reaction types: combustion, thermal decomposition, oxidation, displacement, neutralisation.
- State symbols: (s), (l), (g), (aq).`,
        keyTerms: [
          { term: "Chemical reaction", definition: "A change in which new substances are formed." },
          { term: "Balanced equation", definition: "An equation with equal numbers of each atom on both sides." },
          { term: "Coefficient", definition: "The big number in front of a formula in an equation." },
          { term: "State symbol", definition: "A symbol showing physical state: (s), (l), (g), (aq)." },
        ],
        examples: [
          {
            title: "Balancing",
            body: "H₂ + O₂ → H₂O. Unbalanced. Add coefficients: 2H₂ + O₂ → 2H₂O. Now 4 H and 2 O on each side.",
          },
          {
            title: "Neutralisation",
            body: "HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l). Acid + base → salt + water.",
          },
        ],
        durationMin: 45,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which is a sign of a chemical reaction?",
              options: ["Shape changes", "Gas given off", "Colour stays the same", "No temperature change"],
              answerIdx: 1,
              explanation: "Gas bubbles (effervescence) indicate a reaction.",
            },
            {
              prompt: "Balance: H₂ + O₂ → H₂O",
              options: ["2H₂ + O₂ → 2H₂O", "H₂ + 2O₂ → 2H₂O", "2H₂ + 2O₂ → 2H₂O", "H₂ + O₂ → 2H₂O"],
              answerIdx: 0,
              explanation: "Need 4 H and 2 O on each side: 2H₂ + O₂ → 2H₂O.",
            },
            {
              prompt: "Acid + base → ?",
              options: ["salt + water", "metal + oxygen", "carbon + dioxide", "no reaction"],
              answerIdx: 0,
              explanation: "Neutralisation: acid + base → salt + water.",
            },
            {
              prompt: "What does (aq) mean in an equation?",
              options: ["solid", "aqueous (dissolved)", "gas", "acid"],
              answerIdx: 1,
              explanation: "(aq) means dissolved in water — aqueous.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Forces, Motion & Electricity",
    gradeBand: "9-10",
    lessons: [
      {
        title: "Newton's Laws & Motion",
        slug: "newtons-laws-motion",
        summary:
          "Apply Newton's three laws of motion to calculate acceleration, momentum, and forces in real situations.",
        objectives: [
          "State and apply Newton's three laws of motion.",
          "Use F = ma to calculate force, mass or acceleration.",
          "Calculate momentum and apply conservation in collisions.",
          "Analyse motion using distance–time and velocity–time graphs.",
        ],
        content: `Newton's three laws describe how forces affect motion. They are the foundation of mechanics and are still used to design cars, rockets, and bridges.

**First law**: An object stays at rest, or moves at constant velocity, unless acted on by a resultant force. This is the law of **inertia** — heavier objects (more mass) are harder to start or stop because they have more inertia.

**Second law**: Force = mass × acceleration (**F = ma**). A 2 kg object accelerated at 3 m/s² needs a force of 6 N. The unit of force, the newton, is defined this way: 1 N = 1 kg·m/s².

**Third law**: For every action there is an equal and opposite reaction. When you push the floor, the floor pushes you back — that's how you walk. A rocket pushes gas down; the gas pushes the rocket up.

**Momentum** is mass in motion: **p = mv**. Momentum is conserved in collisions and explosions: total momentum before = total momentum after. A 2 kg ball moving at 3 m/s has momentum 6 kg·m/s. After hitting a stationary 1 kg ball, the total momentum stays 6 kg·m/s — split between them.

**Graphs** tell the story of motion. On a **distance–time graph**, the gradient is speed. A straight line means constant speed; a curve means accelerating. On a **velocity–time graph**, the gradient is acceleration and the area under the graph is distance travelled.`,
        studyGuide: `**Quick revision — Newton's Laws & Motion**

- 1st: no resultant force → constant velocity (or rest).
- 2nd: F = ma. Force in newtons, mass in kg, acceleration in m/s².
- 3rd: equal and opposite reaction forces.
- Momentum p = mv; conserved in collisions and explosions.
- Distance–time gradient = speed. Velocity–time gradient = acceleration, area = distance.`,
        keyTerms: [
          { term: "Inertia", definition: "An object's resistance to changes in motion; proportional to mass." },
          { term: "Resultant force", definition: "The single force that has the same effect as all forces acting on an object." },
          { term: "Momentum", definition: "Mass × velocity; a vector conserved in collisions." },
          { term: "Acceleration", definition: "Rate of change of velocity; m/s²." },
        ],
        examples: [
          {
            title: "F = ma",
            body: "A 1500 kg car accelerates at 2 m/s². Force = 1500 × 2 = 3000 N.",
          },
          {
            title: "Conservation of momentum",
            body: "A 2 kg ball at 3 m/s hits a stationary 1 kg ball. Total p before = 6. If the 1 kg moves off at 4 m/s (p = 4), the 2 kg now has p = 2, i.e. v = 1 m/s.",
          },
        ],
        durationMin: 50,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "Newton's 2nd law: F = ?",
              options: ["mv", "ma", "mg", "m/a"],
              answerIdx: 1,
              explanation: "Force = mass × acceleration.",
            },
            {
              prompt: "A 1500 kg car accelerates at 2 m/s². Force needed?",
              options: ["750 N", "1500 N", "3000 N", "30000 N"],
              answerIdx: 2,
              explanation: "F = 1500 × 2 = 3000 N.",
            },
            {
              prompt: "Momentum of a 2 kg ball at 3 m/s?",
              options: ["1.5 kg·m/s", "5 kg·m/s", "6 kg·m/s", "9 kg·m/s"],
              answerIdx: 2,
              explanation: "p = mv = 2 × 3 = 6 kg·m/s.",
            },
            {
              prompt: "On a velocity–time graph, the area under the line is…",
              options: ["acceleration", "distance travelled", "speed", "force"],
              answerIdx: 1,
              explanation: "Area under v-t graph = distance.",
            },
          ],
        },
      },
      {
        title: "Electric Circuits & Ohm's Law",
        slug: "electric-circuits-ohms-law",
        summary:
          "Build series and parallel circuits, apply Ohm's law, and calculate power in electrical devices.",
        objectives: [
          "Build and compare series and parallel circuits.",
          "Apply Ohm's law (V = IR).",
          "Calculate electrical power (P = VI = I²R).",
          "Use correct units: ampere, volt, ohm, watt.",
        ],
        content: `An **electric circuit** is a closed loop through which current can flow. **Current (I)** is the flow of charge, measured in **amperes (A)**. **Voltage (V)**, also called potential difference, is the push from the battery, measured in **volts (V)**. **Resistance (R)** opposes the current, measured in **ohms (Ω)**.

**Ohm's law**: V = IR. If a 6 Ω resistor has 2 A flowing through it, the voltage across it is V = 2 × 6 = 12 V. The law works for **ohmic** components (resistors at constant temperature); a filament lamp's resistance changes as it heats up.

**Series circuits** have all components in one loop. The current is the same everywhere; the voltages add up to the supply voltage; the resistances add. Three 2 Ω resistors in series give 6 Ω total. If one bulb breaks, all go out.

**Parallel circuits** have components on separate branches. The voltage across each branch equals the supply voltage; the currents in each branch add up to the total current from the battery; the total resistance is less than the smallest individual resistance. Two 6 Ω resistors in parallel give 3 Ω. If one branch breaks, the others stay on — that's why home wiring is parallel.

**Power** is the rate of energy transfer: **P = VI**. A 12 V lamp drawing 2 A uses P = 12 × 2 = 24 W. Equivalently, P = I²R. A 100 W bulb left on for 10 hours uses 1 kWh of energy — that is what your electricity bill measures.

Electrical safety devices (fuses, circuit breakers, earthing) protect people and devices. Fuses melt if the current is too high; circuit breakers trip and can be reset; earthing gives stray current a safe path to the ground.`,
        studyGuide: `**Quick revision — Electric Circuits**

- Current (A) = flow of charge; Voltage (V) = push; Resistance (Ω) = opposition.
- Ohm's law: V = IR (for ohmic components at constant temperature).
- Series: same current, voltages add, resistances add.
- Parallel: same voltage, currents add, total R less than smallest.
- Power: P = VI = I²R. Unit: watt (W).
- Safety: fuses, circuit breakers, earthing.`,
        keyTerms: [
          { term: "Current", definition: "Flow of electric charge; measured in amperes (A)." },
          { term: "Voltage (potential difference)", definition: "Energy per unit charge; measured in volts (V)." },
          { term: "Resistance", definition: "Opposition to current; measured in ohms (Ω)." },
          { term: "Series circuit", definition: "A circuit with components on a single loop." },
        ],
        examples: [
          {
            title: "Ohm's law",
            body: "A 6 Ω resistor with 2 A current: V = IR = 2 × 6 = 12 V.",
          },
          {
            title: "Parallel vs series",
            body: "Two 6 Ω resistors in series: 12 Ω. In parallel: 1 / (1/6 + 1/6) = 3 Ω.",
          },
        ],
        durationMin: 50,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "Ohm's law is…",
              options: ["V = IR", "P = VI", "V = IgR", "I = VR"],
              answerIdx: 0,
              explanation: "Voltage = current × resistance.",
            },
            {
              prompt: "Two 6 Ω resistors in parallel give total resistance…",
              options: ["12 Ω", "6 Ω", "3 Ω", "0.5 Ω"],
              answerIdx: 2,
              explanation: "1/R = 1/6 + 1/6 = 2/6 → R = 3 Ω.",
            },
            {
              prompt: "Power of a 12 V, 2 A lamp?",
              options: ["6 W", "14 W", "24 W", "48 W"],
              answerIdx: 2,
              explanation: "P = VI = 12 × 2 = 24 W.",
            },
            {
              prompt: "In a series circuit, if one bulb breaks…",
              options: ["others stay on", "all go out", "the battery explodes", "current increases"],
              answerIdx: 1,
              explanation: "Series has one loop; a break stops all current.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Advanced Biology, Chemistry & Physics",
    gradeBand: "11-12",
    lessons: [
      {
        title: "DNA, Genetics & Evolution",
        slug: "dna-genetics-evolution",
        summary:
          "Explain DNA structure, protein synthesis, inheritance, and the mechanisms of evolution by natural selection.",
        objectives: [
          "Describe the structure of DNA and the genetic code.",
          "Outline transcription and translation in protein synthesis.",
          "Apply Mendelian genetics to predict inheritance patterns.",
          "Explain evolution by natural selection with examples.",
        ],
        content: `**DNA** (deoxyribonucleic acid) is the molecule of inheritance. It is a **double helix**: two strands twisted around each other, held together by paired bases. The four bases — **adenine (A), thymine (T), cytosine (C), guanine (G)** — pair specifically: A–T and C–G. The sequence of bases along a strand is the **genetic code**, written in three-letter **codons** that specify amino acids.

**Protein synthesis** has two stages. **Transcription** happens in the nucleus: the DNA gene is copied into a messenger RNA (mRNA) strand. **Translation** happens at the ribosome: transfer RNA (tRNA) molecules read the mRNA codons and bring the matching amino acids, which join into a protein chain. The protein then folds into its working shape and goes off to do its job — as an enzyme, hormone, antibody, or structural component.

**Mendelian genetics** predicts how traits are inherited. Each parent contributes one **allele** (version of a gene) for each trait. Alleles can be **dominant** (always expressed) or **recessive** (only expressed if both alleles are recessive). A Punnett square shows possible offspring. Cross Tt × Tt (both heterozygous tall): offspring TT, Tt, Tt, tt → 3 tall : 1 short.

**Evolution by natural selection** is the unifying theory of biology. Darwin's mechanism:

1. **Variation** exists in a population (random mutations).
2. Some variations are **heritable** (passed to offspring).
3. More offspring are produced than can survive — **overproduction**.
4. Individuals with advantageous traits **survive and reproduce** more.
5. Over generations, advantageous alleles become more common — **adaptation**.

Examples: peppered moths in industrial England (dark morphs became common on soot-covered trees); antibiotic resistance in bacteria (resistant mutants survive and multiply); Darwin's finches (beak shapes adapted to different food sources).`,
        studyGuide: `**Quick revision — DNA, Genetics & Evolution**

- DNA: double helix; bases A–T, C–G; codons = 3 bases.
- Transcription (nucleus, DNA → mRNA); Translation (ribosome, mRNA → protein).
- Alleles: dominant (always expressed), recessive (only if homozygous).
- Punnett square: 4 boxes; ratio of genotypes/phenotypes.
- Evolution: variation + heritability + overproduction + selection → adaptation.`,
        keyTerms: [
          { term: "DNA", definition: "The double-helix molecule that stores genetic information." },
          { term: "Codon", definition: "A sequence of three DNA/RNA bases coding for one amino acid." },
          { term: "Allele", definition: "A version of a gene." },
          { term: "Natural selection", definition: "Darwin's mechanism: heritable advantageous traits become more common over generations." },
        ],
        examples: [
          {
            title: "Punnett square",
            body: "Tt × Tt → TT, Tt, Tt, tt → 3 tall : 1 short (T = dominant tall).",
          },
          {
            title: "Natural selection",
            body: "Bacteria with a mutation for antibiotic resistance survive treatment, reproduce, and pass on the resistance gene — resistance spreads.",
          },
        ],
        durationMin: 55,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "Which bases pair in DNA?",
              options: ["A–G and C–T", "A–T and C–G", "A–C and G–T", "A–A and T–T"],
              answerIdx: 1,
              explanation: "Adenine pairs with thymine; cytosine pairs with guanine.",
            },
            {
              prompt: "Transcription produces…",
              options: ["a protein", "mRNA", "a ribosome", "DNA"],
              answerIdx: 1,
              explanation: "Transcription copies a gene from DNA into mRNA.",
            },
            {
              prompt: "Cross Tt × Tt gives phenotype ratio…",
              options: ["1:1", "3:1", "9:3:3:1", "1:2:1"],
              answerIdx: 1,
              explanation: "3 tall (TT, Tt, Tt) : 1 short (tt).",
            },
            {
              prompt: "Which is NOT part of natural selection?",
              options: ["Variation", "Heritability", "Overproduction", "Random mutation of acquired traits"],
              answerIdx: 3,
              explanation: "Acquired traits (e.g. muscles from exercise) are not inherited.",
            },
          ],
        },
      },
      {
        title: "Quantum & Nuclear Physics",
        slug: "quantum-nuclear-physics",
        summary:
          "Describe the photoelectric effect, wave-particle duality, and nuclear fission and fusion.",
        objectives: [
          "Describe the photoelectric effect and explain its significance.",
          "Explain wave-particle duality for light and matter.",
          "Describe nuclear fission and fusion, including energy release.",
          "Discuss applications and risks of nuclear physics.",
        ],
        content: `At the start of the 20th century, physicists discovered that classical physics breaks down at very small scales. The new science of **quantum mechanics** describes the strange behaviour of atoms and light.

The **photoelectric effect** was a key discovery. Shine light on a metal and electrons may be ejected — but only if the light's frequency is above a threshold, no matter how intense the light. Classical wave theory could not explain this. Einstein explained it by proposing that light comes in packets called **photons**, each with energy **E = hf** (h is Planck's constant, f is frequency). Below the threshold frequency, no single photon has enough energy to liberate an electron. This won Einstein the Nobel Prize.

**Wave-particle duality** says light and matter show both wave-like and particle-like behaviour. Light interferes and diffracts (wave); it is absorbed and emitted in discrete photons (particle). Electrons form interference patterns (wave); they collide elastically (particle). de Broglie proposed that every particle has a wavelength **λ = h/p** where p is momentum.

**Nuclear fission** splits a heavy nucleus (uranium-235, plutonium-239) into two smaller nuclei, releasing energy and neutrons. The neutrons can split other nuclei — a **chain reaction**. In a power station, control rods absorb excess neutrons to keep the reaction steady. In a bomb, the chain reaction is uncontrolled.

**Nuclear fusion** joins light nuclei (hydrogen isotopes deuterium and tritium) into helium, releasing even more energy per gram than fission. Fusion powers the Sun. Achieving controlled fusion on Earth — at temperatures over 100 million °C — is one of the great engineering challenges of our time.

The energy released comes from **mass–energy equivalence**: **E = mc²**. A tiny loss of mass in a nuclear reaction produces a huge amount of energy. This principle powers reactors, stars, and (tragically) nuclear weapons.`,
        studyGuide: `**Quick revision — Quantum & Nuclear**

- Photon energy: E = hf.
- Photoelectric effect: light below threshold frequency ejects no electrons, however intense.
- Wave-particle duality: light and matter behave as both wave and particle.
- de Broglie: λ = h/p.
- Fission: split heavy nuclei (U-235); chain reaction.
- Fusion: join light nuclei (H isotopes); powers stars.
- Mass-energy: E = mc².`,
        keyTerms: [
          { term: "Photon", definition: "A packet (quantum) of light energy with energy E = hf." },
          { term: "Photoelectric effect", definition: "Emission of electrons from a metal when light above threshold frequency shines on it." },
          { term: "Fission", definition: "Splitting of a heavy nucleus into lighter ones, releasing energy." },
          { term: "Fusion", definition: "Joining of light nuclei into heavier ones, releasing energy." },
        ],
        examples: [
          {
            title: "Photoelectric threshold",
            body: "Red light (low frequency) on zinc ejects no electrons, however bright. UV light (high frequency) ejects electrons, even dim. Each photon must have enough energy.",
          },
          {
            title: "E = mc²",
            body: "If 0.001 kg of mass is converted to energy: E = 0.001 × (3×10⁸)² = 9 × 10¹³ J — comparable to a small nuclear weapon.",
          },
        ],
        durationMin: 55,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "Photon energy is given by…",
              options: ["E = mc²", "E = hf", "E = IR", "E = ½mv²"],
              answerIdx: 1,
              explanation: "E = hf, where h is Planck's constant and f is frequency.",
            },
            {
              prompt: "The photoelectric effect shows that light behaves as…",
              options: ["only a wave", "only a particle", "particles (photons)", "neither"],
              answerIdx: 2,
              explanation: "Discrete photons explain the threshold frequency effect.",
            },
            {
              prompt: "Nuclear power stations use…",
              options: ["fusion", "fission", "combustion", "photons"],
              answerIdx: 1,
              explanation: "Current reactors split U-235 or Pu-239 — fission.",
            },
            {
              prompt: "Mass-energy equivalence is…",
              options: ["E = mc", "E = mc²", "E = m/c", "E = ½mc²"],
              answerIdx: 1,
              explanation: "Einstein's E = mc².",
            },
          ],
        },
      },
    ],
  },
];
