import type { TopicUnit } from "../index";

export const englishTopics: TopicUnit[] = [
  {
    unitTitle: "Phonics & Early Reading",
    gradeBand: "1-2",
    lessons: [
      {
        title: "Sounds & Blending (CVC Words)",
        slug: "sounds-blending-cvc",
        summary:
          "Use phonics to blend consonant-vowel-consonant words, segment sounds for spelling, and read simple sentences with understanding.",
        objectives: [
          "Recognise all 44 phonemes (sounds) of English.",
          "Blend three sounds to read CVC words (e.g., c-a-t = cat).",
          "Segment a spoken word into its sounds for spelling.",
          "Read simple sentences and answer who/what questions.",
        ],
        content: `English spelling is built from **phonemes** — the smallest units of sound. There are about 44 phonemes in English, written using one or more letters called **graphemes**. To read a word, we **blend** the phonemes together; to spell a word, we **segment** it into its sounds.

A **CVC word** (consonant–vowel–consonant) like *cat* has three phonemes: /k/ /æ/ /t/. To read it, point to each letter, say its sound, then push the sounds together: c-a-t → cat. With practice this becomes automatic, and the brain recognises the whole word at a glance.

The **tricky words** — *the, was, said, are, they* — do not follow the usual sound-spelling rules. They have to be recognised by sight. Make a word wall and read them daily until they are automatic.

**Reading comprehension** at this stage is about literal understanding: who is in the story? what did they do? Encourage children to point to the words as they read, then retell the story in their own words. This builds the bridge from decoding to meaning.`,
        studyGuide: `**Quick revision — Phonics & Blending**

- 44 phonemes; written using graphemes (1 or more letters).
- Blend: push sounds together to read.
- Segment: split a word into sounds to spell.
- CVC = consonant–vowel–consonant (cat, dog, sun).
- Tricky words (the, was, said) — sight-read, do not sound out.`,
        keyTerms: [
          { term: "Phoneme", definition: "The smallest unit of sound in a word." },
          { term: "Grapheme", definition: "The letter(s) used to write a phoneme." },
          { term: "Blend", definition: "To push sounds together to read a word." },
          { term: "Segment", definition: "To split a word into its sounds for spelling." },
        ],
        examples: [
          {
            title: "Blending 'mum'",
            body: "Point and say each sound: /m/ /ʌ/ /m/. Push together: mum.",
          },
          {
            title: "Segmenting 'shop'",
            body: "Say the word slowly: sh-o-p. Three sounds; write each as you go.",
          },
        ],
        durationMin: 25,
        difficulty: "introductory",
        quiz: {
          timeLimit: 8,
          questions: [
            {
              prompt: "How many phonemes are in 'cat'?",
              options: ["2", "3", "4", "1"],
              answerIdx: 1,
              explanation: "/k/ /æ/ /t/ — three phonemes.",
            },
            {
              prompt: "Which is a CVC word?",
              options: ["tree", "ship", "sun", "chain"],
              answerIdx: 2,
              explanation: "sun = s-u-n, three sounds, consonant–vowel–consonant.",
            },
            {
              prompt: "Which is a 'tricky word' that you sight-read?",
              options: ["cat", "the", "sun", "bed"],
              answerIdx: 1,
              explanation: "'the' doesn't follow the usual phonics; learn it by sight.",
            },
            {
              prompt: "To spell 'dog' you should…",
              options: ["count the letters", "segment it into sounds /d/ /o/ /g/", "say it loudly", "draw a dog"],
              answerIdx: 1,
              explanation: "Segment the word into phonemes and write each in turn.",
            },
          ],
        },
      },
      {
        title: "Sentences & Punctuation",
        slug: "sentences-punctuation",
        summary:
          "Write simple sentences with capital letters and full stops, and use question marks and exclamation marks correctly.",
        objectives: [
          "Write a complete simple sentence with a subject and verb.",
          "Use a capital letter at the start and a full stop at the end.",
          "Use question marks and exclamation marks where appropriate.",
          "Join two ideas with 'and'.",
        ],
        content: `A **sentence** is a complete thought. It needs a **subject** (who or what the sentence is about) and a **verb** (what they do or are). "The dog barked" is a sentence; "barked loudly" is not, because there is no subject.

Every sentence begins with a **capital letter** and ends with a **full stop** (.). Sentences that ask a question end with a **question mark** (?). Sentences that show strong feeling — surprise, excitement, anger — end with an **exclamation mark** (!).

To make longer sentences, join two ideas with **and**: *The cat slept **and** the dog played.* You can also use **but, because, so, or** in later years. Avoid run-on sentences where two complete thoughts are joined by nothing — that's a comma splice.

A good sentence paints a picture. Instead of *The dog ran*, try *The big brown dog ran quickly across the field.* Adjectives (describing words) and adverbs (how something happens) add detail without losing clarity.`,
        studyGuide: `**Quick revision — Sentences & Punctuation**

- A sentence = subject + verb + complete thought.
- Start with a capital letter; end with . ? or !.
- Question → ? ; strong feeling → ! ; statement → .
- Join two ideas with 'and' (later: but, because, so, or).
- Add adjectives and adverbs for richer sentences.`,
        keyTerms: [
          { term: "Sentence", definition: "A complete thought with a subject and a verb." },
          { term: "Subject", definition: "Who or what the sentence is about." },
          { term: "Verb", definition: "An action or being word (run, jump, is, was)." },
          { term: "Capital letter", definition: "An uppercase letter used to start a sentence and for names." },
        ],
        examples: [
          {
            title: "Statement vs question",
            body: "Statement: The cat is sleeping. (ends with .) Question: Is the cat sleeping? (ends with ?)",
          },
          {
            title: "Joining with 'and'",
            body: "I went to the shop. I bought bread. → I went to the shop and bought bread.",
          },
        ],
        durationMin: 30,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which is a complete sentence?",
              options: ["Running fast", "The dog barked", "Under the table", "Big and small"],
              answerIdx: 1,
              explanation: "It has a subject (dog) and a verb (barked) — a complete thought.",
            },
            {
              prompt: "Which punctuation ends a question?",
              options: [".", "?", "!", ","],
              answerIdx: 1,
              explanation: "Questions end with a question mark (?).",
            },
            {
              prompt: "Choose the correctly punctuated sentence.",
              options: ["the cat sat on the mat.", "The cat sat on the mat", "The cat sat on the mat.", "the Cat sat on the Mat."],
              answerIdx: 2,
              explanation: "Capital letter at start, full stop at end.",
            },
            {
              prompt: "Join: 'I saw a bird. It was singing.' →",
              options: ["I saw a bird it was singing.", "I saw a bird and it was singing.", "I saw a bird, it was singing.", "I saw a bird but it was singing."],
              answerIdx: 1,
              explanation: "'and' joins the two complete ideas correctly.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Reading Comprehension & Creative Writing",
    gradeBand: "3-4",
    lessons: [
      {
        title: "Inference & Character Analysis",
        slug: "inference-character-analysis",
        summary:
          "Read between the lines to infer characters' feelings and motives using evidence from the text.",
        objectives: [
          "Distinguish literal and inferential questions.",
          "Use evidence from the text to support inferences.",
          "Describe a character using PEE (Point, Evidence, Explain).",
          "Predict what might happen next based on clues.",
        ],
        content: `**Literal questions** can be answered straight from the text: *What colour was the car?* **Inferential questions** ask you to read between the lines: *Why was the driver angry?* The text gives clues, but you have to think.

To answer an inferential question, look for **evidence** — words, actions or descriptions that hint at the answer. Then explain your reasoning. The **PEE** structure helps: make a **P**oint, give **E**vidence, then **E**xplain how the evidence supports your point.

When describing a character, look at four things: what they **say** (dialogue), what they **do** (actions), what they **think** (internal monologue), and what others **say about them**. Together these reveal personality, motives and feelings.

Predicting what happens next is a powerful comprehension strategy. Use the clues the author has planted — foreshadowing, mood, and patterns of cause and effect — and make a prediction that fits the evidence. As you read on, check whether your prediction was right.`,
        studyGuide: `**Quick revision — Inference & Characters**

- Literal = right there in the text. Inferential = between the lines.
- Use evidence to support every inference.
- PEE structure: Point → Evidence → Explain.
- Characterise via speech, actions, thoughts, others' comments.
- Predict from clues; check as you read.`,
        keyTerms: [
          { term: "Inference", definition: "A conclusion reached from evidence and reasoning, not stated directly." },
          { term: "Literal question", definition: "A question answered directly by the text." },
          { term: "Evidence", definition: "A quote or detail from the text that supports a point." },
          { term: "Foreshadowing", definition: "Clues that hint at later events." },
        ],
        examples: [
          {
            title: "PEE in action",
            body: "P: The driver was angry. E: 'He slammed the door and kicked the tyre.' E: The verbs 'slammed' and 'kicked' show violent, frustrated actions.",
          },
          {
            title: "Inference",
            body: "Text: 'Mia's eyes dropped and she sighed, looking at the unfinished homework.' Inference: Mia is tired and overwhelmed.",
          },
        ],
        durationMin: 35,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which is an inferential question?",
              options: ["What colour was the car?", "Where did Tom live?", "Why was the driver angry?", "What time was it?"],
              answerIdx: 2,
              explanation: "Inference requires reasoning from clues, not just looking up facts.",
            },
            {
              prompt: "PEE stands for…",
              options: ["Plan, Edit, Explain", "Point, Evidence, Explain", "Proof, Evidence, Example", "Phrase, Explain, Evaluate"],
              answerIdx: 1,
              explanation: "Point, Evidence, Explain — the standard analytical structure.",
            },
            {
              prompt: "Which best supports 'Tom was scared'?",
              options: ["Tom walked in.", "Tom's hands trembled and he whispered.", "Tom liked cakes.", "Tom had a hat."],
              answerIdx: 1,
              explanation: "Trembling hands and whispering are evidence of fear.",
            },
            {
              prompt: "A character described via speech, actions, thoughts and others' comments is being…",
              options: ["ignored", "characterised", "punished", "narrated"],
              answerIdx: 1,
              explanation: "These four channels together build a character's personality.",
            },
          ],
        },
      },
      {
        title: "Story Writing: Setting & Plot",
        slug: "story-setting-plot",
        summary:
          "Plan and write a short story with a clear setting, a problem, and a resolution.",
        objectives: [
          "Plan a story using a story mountain (opening, build-up, problem, resolution, ending).",
          "Describe a setting using the five senses.",
          "Build a clear problem the character must face.",
          "Resolve the problem and end the story with a final thought.",
        ],
        content: `A good story has a **shape**. The **story mountain** has five parts: the **opening** (introduce characters and setting), the **build-up** (something starts to happen), the **problem** (the conflict), the **resolution** (how the problem is solved), and the **ending** (what life is like now).

The **setting** is where and when the story happens. Describe it with the **five senses**: what can the character see, hear, smell, touch and taste? *The forest was dark and smelled of pine; an owl hooted somewhere close.* Sensory details pull the reader into the world.

The **problem** (or conflict) is the engine of the story. It can be external (a storm, a rival, a quest) or internal (fear, jealousy, a hard choice). Without a problem, nothing happens — the story just sits there.

The **resolution** should feel earned: the character changes, learns something, or uses what they have. Avoid sudden rescues by outside forces (deus ex machina); the main character should be the one who solves the problem. The ending can circle back to the opening image for a satisfying sense of completion.`,
        studyGuide: `**Quick revision — Story Writing**

- Story mountain: opening → build-up → problem → resolution → ending.
- Setting: 5 senses — sight, sound, smell, touch, taste.
- Problem/conflict: external or internal; the engine of the plot.
- Resolution: character solves it; avoid outside rescues.
- Ending: callback to the opening for a sense of completion.`,
        keyTerms: [
          { term: "Setting", definition: "The time and place where a story happens." },
          { term: "Plot", definition: "The sequence of events in a story, built around a conflict." },
          { term: "Conflict", definition: "The problem or struggle that drives the story." },
          { term: "Resolution", definition: "How the conflict is solved." },
        ],
        examples: [
          {
            title: "Story mountain",
            body: "Opening: Aisha finds a map. Build-up: she follows it into the woods. Problem: a river blocks her path. Resolution: she builds a raft. Ending: she returns home, braver than before.",
          },
          {
            title: "Five-sense setting",
            body: "The market: bright cloth (sight), vendors shouting (sound), spices (smell), hot bread (touch), sweet dates (taste).",
          },
        ],
        durationMin: 40,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which is the correct order of the story mountain?",
              options: ["Problem → Opening → Ending → Resolution → Build-up", "Opening → Build-up → Problem → Resolution → Ending", "Build-up → Opening → Problem → Ending → Resolution", "Opening → Problem → Build-up → Ending → Resolution"],
              answerIdx: 1,
              explanation: "Open, build tension, hit the problem, resolve, end.",
            },
            {
              prompt: "Which detail uses two senses?",
              options: ["The room was small.", "It was very quiet.", "The cold wind howled and stung my cheeks.", "He was tall."],
              answerIdx: 2,
              explanation: "Sound (howled) and touch (stung) — two senses.",
            },
            {
              prompt: "The 'problem' in a story is also called the…",
              options: ["setting", "conflict", "theme", "narrator"],
              answerIdx: 1,
              explanation: "The problem or struggle is the conflict.",
            },
            {
              prompt: "A good resolution is one where…",
              options: ["a stranger saves the day", "the main character solves it", "everyone dies", "the story stops abruptly"],
              answerIdx: 1,
              explanation: "The protagonist should drive the resolution.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Grammar, Argument & Analysis",
    gradeBand: "5-6",
    lessons: [
      {
        title: "Word Classes & Clause Structure",
        slug: "word-classes-clauses",
        summary:
          "Identify word classes (noun, verb, adjective, adverb, pronoun, preposition, conjunction) and analyse main and subordinate clauses.",
        objectives: [
          "Identify the eight main word classes in a sentence.",
          "Distinguish main and subordinate clauses.",
          "Use a range of conjunctions to extend sentences.",
          "Punctuate complex sentences with commas.",
        ],
        content: `Every word in English does a job. The main **word classes** are: **noun** (thing, person, place), **verb** (action or being), **adjective** (describes a noun), **adverb** (describes a verb, adjective or another adverb), **pronoun** (replaces a noun: he, she, it, they), **preposition** (shows relationship: in, on, under, between), **conjunction** (joining word: and, but, because), and **determiner** (the, a, an, some, every).

A **clause** is a group of words with a subject and a verb. A **main clause** makes sense on its own: *The dog barked.* A **subordinate clause** does not: *because it saw a stranger*. Sentences can combine them:

- **Simple**: one main clause. *The dog barked.*
- **Compound**: two main clauses joined by a conjunction. *The dog barked and the cat ran.*
- **Complex**: a main clause and a subordinate clause. *The dog barked because it saw a stranger.*

Commas matter in complex sentences: use a comma after a subordinate clause that comes first. *Because it saw a stranger, the dog barked.* Varying sentence types keeps writing lively and clear.`,
        studyGuide: `**Quick revision — Word Classes & Clauses**

- Noun, verb, adjective, adverb, pronoun, preposition, conjunction, determiner.
- Main clause = subject + verb + complete thought.
- Subordinate clause = needs the main clause to make sense.
- Simple, compound (main + main), complex (main + subordinate).
- Comma after a subordinate clause that opens a sentence.`,
        keyTerms: [
          { term: "Noun", definition: "A word that names a person, place, thing, or idea." },
          { term: "Verb", definition: "An action or being word." },
          { term: "Main clause", definition: "A clause that can stand alone as a sentence." },
          { term: "Subordinate clause", definition: "A clause that depends on a main clause for meaning." },
        ],
        examples: [
          {
            title: "Complex sentence",
            body: "Although it was raining (subordinate), we went out (main). Comma separates the clauses.",
          },
          {
            title: "Word classes",
            body: "In 'The clever fox quickly jumped over the fence': clever = adj; quickly = adv; jumped = verb; over = prep; the = determiner; fox/fence = nouns.",
          },
        ],
        durationMin: 40,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which word is an adverb in: 'She sang beautifully'?",
              options: ["She", "sang", "beautifully", "none"],
              answerIdx: 2,
              explanation: "Beautifully describes how she sang — an adverb.",
            },
            {
              prompt: "Which is a subordinate clause?",
              options: ["The dog barked.", "She ran home.", "When the bell rang", "Tom ate lunch."],
              answerIdx: 2,
              explanation: "'When the bell rang' cannot stand alone — it is subordinate.",
            },
            {
              prompt: "Which sentence is complex?",
              options: ["The cat slept.", "The cat slept and the dog played.", "The cat slept because it was tired.", "The cat."],
              answerIdx: 2,
              explanation: "Main clause + subordinate (because it was tired) = complex.",
            },
            {
              prompt: "Which is a preposition?",
              options: ["under", "quickly", "happy", "she"],
              answerIdx: 0,
              explanation: "'under' shows position — a preposition.",
            },
          ],
        },
      },
      {
        title: "Persuasive Writing & Rhetoric",
        slug: "persuasive-writing-rhetoric",
        summary:
          "Plan and write a persuasive text using ethos, pathos, logos and AFOREST techniques.",
        objectives: [
          "Use AFOREST techniques (Alliteration, Facts, Opinions, Rhetorical questions, Emotive language, Statistics, Triple rule of three).",
          "Appeal to ethos, pathos and logos.",
          "Structure an argument with a clear thesis and counter-argument.",
          "Use modal verbs and conditional clauses to hedge claims.",
        ],
        content: `**Persuasive writing** aims to convince the reader to think, feel or do something. The ancient Greeks identified three appeals: **ethos** (credibility — why should we trust the writer?), **pathos** (emotion — how does it make us feel?) and **logos** (logic — what is the evidence?).

The mnemonic **AFOREST** lists the most common persuasive devices: **A**lliteration, **F**acts, **O**pinions, **R**hetorical questions, **E**motive language, **S**tatistics, **T**he rule of three. A good persuasive text uses several of these together.

Every persuasive piece needs a **thesis**: a single sentence stating your position. *School uniforms should be compulsory.* Then build your argument with one main point per paragraph, supported by evidence (facts, statistics, examples).

A strong argument also addresses the **counter-argument**: what would the other side say, and why is your position stronger? Acknowledging the opposing view shows fairness and makes your own case more credible.

**Modal verbs** (might, could, should, must) and **conditional clauses** (if… then…) help you hedge claims so they are defensible. *If schools require uniforms, then bullying based on clothing may decrease.*`,
        studyGuide: `**Quick revision — Persuasive Writing**

- Three appeals: ethos (credibility), pathos (emotion), logos (logic).
- AFOREST: Alliteration, Facts, Opinions, Rhetorical Qs, Emotive language, Statistics, Three.
- Thesis in one sentence; one main point per paragraph.
- Address the counter-argument to strengthen your case.
- Hedge claims with modal verbs (could, should) and conditional clauses.`,
        keyTerms: [
          { term: "Ethos", definition: "Appeal to credibility or trust." },
          { term: "Pathos", definition: "Appeal to emotion." },
          { term: "Logos", definition: "Appeal to logic and evidence." },
          { term: "Thesis", definition: "The single-sentence statement of your position." },
        ],
        examples: [
          {
            title: "AFOREST in a sentence",
            body: "Banning plastic bags saves our seas, protects our wildlife, and preserves our future. (rule of three + emotive 'our').",
          },
          {
            title: "Counter-argument",
            body: "Some argue uniforms suppress expression. However, students express identity through hobbies and friendships, not clothing alone.",
          },
        ],
        durationMin: 45,
        difficulty: "core",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "Which appeal is mainly emotional?",
              options: ["Ethos", "Pathos", "Logos", "Kairos"],
              answerIdx: 1,
              explanation: "Pathos targets the audience's feelings.",
            },
            {
              prompt: "Which is the rule of three?",
              options: ["Buy one get one free", "Life, liberty, and the pursuit of happiness", "I came; I saw", "First, second, third"],
              answerIdx: 1,
              explanation: "Three parallel items make the rule of three.",
            },
            {
              prompt: "A thesis statement should be…",
              options: ["a question", "one sentence stating your position", "a quote", "a list of facts"],
              answerIdx: 1,
              explanation: "The thesis is a single clear statement of position.",
            },
            {
              prompt: "Which is a modal verb that hedges a claim?",
              options: ["is", "running", "might", "quickly"],
              answerIdx: 2,
              explanation: "'might' makes the claim softer and more defensible.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Critical Reading & Analytical Writing",
    gradeBand: "7-8",
    lessons: [
      {
        title: "Analysing Language & Structure",
        slug: "analysing-language-structure",
        summary:
          "Analyse how writers use language devices and structural choices to create effects on the reader.",
        objectives: [
          "Identify and explain language devices (metaphor, simile, personification, alliteration, repetition).",
          "Comment on structural choices (sentence length, paragraphing, focus shifts).",
          "Use analytical verbs (suggests, implies, conveys, emphasises).",
          "Write a structured analytical paragraph using PETAL.",
        ],
        content: `When we analyse a text, we look at two things: **language** (word-level choices) and **structure** (how the text is built). Both work together to create effects on the reader.

Common **language devices** include **metaphor** (a direct comparison: *the classroom was a zoo*), **simile** (a comparison with like or as: *as brave as a lion*), **personification** (giving human qualities to non-human things: *the wind whispered*), **alliteration** (repeated initial sounds: *the slippery snake slid*), and **repetition** (repeating a word or phrase for emphasis).

**Structural choices** include sentence length (short for impact, long for description), paragraph length, the order of information (chronological, flashback, in medias res), and shifts in focus (zooming in or out). A one-sentence paragraph often signals a turning point.

Analytical writing moves beyond spotting devices to explaining their **effect**. Use **analytical verbs** — *suggests, implies, conveys, highlights, emphasises, undermines* — instead of 'shows'. And use a structure like **PETAL**: **P**oint, **E**vidence, **T**echnique, **A**nalysis, **L**ink to writer's purpose.

A strong analytical paragraph always answers the question *so what?* — what is the writer trying to make the reader think, feel or do, and how do the choices create that effect?`,
        studyGuide: `**Quick revision — Analysing Language & Structure**

- Language: metaphor, simile, personification, alliteration, repetition.
- Structure: sentence length, paragraphs, focus shifts, ordering.
- Analytical verbs: suggests, implies, conveys, emphasises.
- PETAL: Point, Evidence, Technique, Analysis, Link.
- Always answer 'so what?' — the effect on the reader.`,
        keyTerms: [
          { term: "Metaphor", definition: "A direct comparison that says one thing IS another." },
          { term: "Personification", definition: "Giving human qualities to non-human things." },
          { term: "Structural choice", definition: "How a text is organised (paragraphs, sentence length, ordering)." },
          { term: "Analytical verb", definition: "A verb that explains effect (suggests, conveys, emphasises)." },
        ],
        examples: [
          {
            title: "PETAL paragraph",
            body: "P: The writer presents the storm as threatening. E: 'The wind clawed at the windows.' T: Personification. A: The verb 'clawed' makes the wind sound like a predator, suggesting violence and danger. L: This makes the reader feel the characters' fear.",
          },
          {
            title: "Effect of structure",
            body: "A single-line paragraph after a long descriptive passage creates a sudden jolt — directing the reader's attention to a key moment.",
          },
        ],
        durationMin: 45,
        difficulty: "advanced",
        quiz: {
          timeLimit: 10,
          questions: [
            {
              prompt: "'The classroom was a zoo' is an example of…",
              options: ["Simile", "Metaphor", "Personification", "Alliteration"],
              answerIdx: 1,
              explanation: "It directly calls the classroom a zoo — a metaphor.",
            },
            {
              prompt: "Which is an analytical verb?",
              options: ["is", "was", "conveys", "and"],
              answerIdx: 2,
              explanation: "'conveys' explains the effect the writer creates.",
            },
            {
              prompt: "PETAL stands for…",
              options: ["Plan, Edit, Type, Apply, List", "Point, Evidence, Technique, Analysis, Link", "Phrase, Explain, Tell, Argue, Link", "Proof, Edit, Type, Apply, Lead"],
              answerIdx: 1,
              explanation: "Point, Evidence, Technique, Analysis, Link.",
            },
            {
              prompt: "A one-sentence paragraph usually signals…",
              options: ["a spelling error", "a key moment or turning point", "the end of the text", "a list"],
              answerIdx: 1,
              explanation: "Single-line paragraphs punch the reader's attention onto a key moment.",
            },
          ],
        },
      },
      {
        title: "Writing to Argue & Evaluate",
        slug: "writing-argue-evaluate",
        summary:
          "Construct a balanced argument, evaluate opposing views, and write a discursive essay with a clear conclusion.",
        objectives: [
          "Plan a discursive essay with introduction, balanced paragraphs, and conclusion.",
          "Use connectives of addition, contrast, and consequence.",
          "Evaluate the strengths and weaknesses of an argument.",
          "Reference sources using a simple citation style.",
        ],
        content: `A **discursive essay** explores an issue from more than one angle before reaching a conclusion. Unlike pure persuasion, it tries to be **balanced**, presenting points for and against before weighing them up.

The structure is:

- **Introduction**: define the issue, outline why it matters, signpost your approach.
- **Body paragraphs**: one point per paragraph. Alternate between points for and against, or group all 'for' then all 'against' (block structure).
- **Conclusion**: weigh the points and reach a reasoned judgement. Do not introduce new material.

**Connectives** hold the essay together. Use **addition** (furthermore, in addition, moreover), **contrast** (however, on the other hand, nevertheless), **consequence** (therefore, consequently, as a result), and **order** (firstly, finally).

To **evaluate** an argument, ask: is the evidence reliable? Are there logical fallacies? Is the conclusion supported by the premises? Strong evaluation doesn't just say 'this is wrong' — it explains *why* and what would make the argument stronger.

When you cite sources, use a simple format: *(Smith, 2023)* in the text, and a list of references at the end. This shows you have read widely and lets readers check your evidence.`,
        studyGuide: `**Quick revision — Discursive Writing**

- Discursive = balanced; presents points for and against.
- Structure: intro → body paragraphs (one point each) → conclusion.
- Connectives: furthermore, however, therefore, firstly.
- Evaluate: reliability of evidence, logical fallacies, conclusion supported?
- Cite sources (Author, Year); list references at the end.`,
        keyTerms: [
          { term: "Discursive essay", definition: "An essay that explores multiple viewpoints before concluding." },
          { term: "Connective", definition: "A word or phrase linking ideas (furthermore, however)." },
          { term: "Logical fallacy", definition: "A flaw in reasoning that weakens an argument." },
          { term: "Citation", definition: "A short reference to a source, e.g. (Smith, 2023)." },
        ],
        examples: [
          {
            title: "Connective use",
            body: "Social media connects people globally. Furthermore, it provides a platform for marginalised voices. However, it also amplifies misinformation. Therefore, regulation is necessary.",
          },
          {
            title: "Evaluation",
            body: "Smith argues uniforms improve behaviour, but the study sampled only one school. A larger sample would strengthen the conclusion.",
          },
        ],
        durationMin: 50,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "A discursive essay should…",
              options: ["only present one side", "present balanced viewpoints before concluding", "never conclude", "use no connectives"],
              answerIdx: 1,
              explanation: "Discursive essays weigh multiple angles.",
            },
            {
              prompt: "Which is a connective of contrast?",
              options: ["furthermore", "moreover", "however", "therefore"],
              answerIdx: 2,
              explanation: "'however' signals a contrast.",
            },
            {
              prompt: "Which is a logical fallacy?",
              options: ["Citing a peer-reviewed study", "Attacking the person instead of the argument (ad hominem)", "Using statistics", "Acknowledging the counter-argument"],
              answerIdx: 1,
              explanation: "Ad hominem attacks the person, not the argument — a fallacy.",
            },
            {
              prompt: "A conclusion in a discursive essay should…",
              options: ["introduce new evidence", "weigh the points and reach a judgement", "repeat the introduction", "list every source"],
              answerIdx: 1,
              explanation: "Conclusions weigh evidence and deliver a reasoned judgement.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Literature & Critical Theory",
    gradeBand: "9-10",
    lessons: [
      {
        title: "Approaching Shakespeare & Pre-1900 Texts",
        slug: "shakespeare-pre-1900",
        summary:
          "Read Shakespeare and pre-1900 texts with confidence: unpack archaic language, dramatic context, and thematic depth.",
        objectives: [
          "Translate archaic words and pronouns (thou, doth, hath).",
          "Identify iambic pentameter and prose usage in Shakespeare.",
          "Analyse how context (Elizabethan/Jacobean) shapes meaning.",
          "Write a literature essay with embedded quotation and context.",
        ],
        content: `Shakespeare's language can feel foreign at first, but a few keys unlock it. **Archaic pronouns**: *thou/thee/thy/thine* are familiar singular forms (like 'tu' in French); *you/your/yours* were formal or plural. **Verb endings**: *-eth* (third person) and *-st* (second person) — *he hath*, *thou hast*. **Inverted word order** for emphasis: *'Never was seen so fair a thing.'*

Most of Shakespeare's verse is in **iambic pentameter**: ten syllables per line, alternating unstressed–stressed (da-DUM da-DUM da-DUM da-DUM da-DUM). The rhythm mirrors natural heartbeat and speech. A break in the rhythm (a caesura or a shared line) signals emotional intensity. Prose is used for low-status characters, comedy, and letters.

**Context matters**: Elizabethan and Jacobean beliefs about the divine right of kings, the Great Chain of Being, witchcraft, gender, and honour all shape the plays. A character's choices must be read through these lenses — judging them by 21st-century values alone misses meaning.

A literature essay needs **embedded quotation**: weave short quotes into your own sentence so the analysis flows. *When Macbeth calls the dagger 'a false creation', he reveals his psychological unraveling.* Always link the quotation to a purpose — what does it show about character, theme, or context?`,
        studyGuide: `**Quick revision — Shakespeare & Pre-1900**

- Archaic: thou/thee (familiar), you (formal/plural); -eth/-st verb endings.
- Iambic pentameter: 10 syllables, da-DUM x5; caesura = pause.
- Prose: low-status characters, comedy, letters.
- Context: divine right of kings, Great Chain of Being, witchcraft, gender.
- Embedded quotation: weave short quotes into your analysis.`,
        keyTerms: [
          { term: "Iambic pentameter", definition: "A 10-syllable line with alternating unstressed–stressed beats." },
          { term: "Caesura", definition: "A pause within a line of verse." },
          { term: "Soliloquy", definition: "A speech where a character speaks their thoughts aloud, alone on stage." },
          { term: "Context", definition: "The historical, social and cultural background of a text." },
        ],
        examples: [
          {
            title: "Iambic pentameter",
            body: "'Shall I compare thee to a summer's day?' — count: 10 syllables, da-DUM da-DUM da-DUM da-DUM da-DUM.",
          },
          {
            title: "Embedded quotation",
            body: "Lady Macbeth's command to 'unsex me here' reveals her rejection of femininity in pursuit of power.",
          },
        ],
        durationMin: 55,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "'Thou' is the…",
              options: ["plural formal", "singular familiar", "third person", "feminine only"],
              answerIdx: 1,
              explanation: "'thou' is the singular familiar pronoun, like 'tu' in French.",
            },
            {
              prompt: "Iambic pentameter has how many syllables per line?",
              options: ["5", "7", "10", "14"],
              answerIdx: 2,
              explanation: "Five iambs (unstressed-stressed pairs) = 10 syllables.",
            },
            {
              prompt: "Which is an embedded quotation?",
              options: ["'He was angry.' (quote)", "Macbeth's 'false creation' shows his unraveling.", "Quote: 'to be or not to be'", "Macbeth said something."],
              answerIdx: 1,
              explanation: "The quote is woven into the analytical sentence.",
            },
            {
              prompt: "Prose in Shakespeare is typically used for…",
              options: ["kings", "low-status characters and comedy", "ghosts only", "songs only"],
              answerIdx: 1,
              explanation: "Prose marks low-status speakers, comic scenes, and letters.",
            },
          ],
        },
      },
      {
        title: "Modern Fiction & Themes",
        slug: "modern-fiction-themes",
        summary:
          "Read 20th and 21st century fiction with attention to theme, narrative voice, and historical context.",
        objectives: [
          "Identify the narrator type (first person, third limited, omniscient).",
          "Track recurring themes and motifs across a text.",
          "Relate a text to its historical/social context (post-colonial, feminist, modernist).",
          "Compare two texts on a shared theme.",
        ],
        content: `Modern fiction (roughly 1900 onwards) experiments with **narrative voice** and **form**. Identify the **narrator**:

- **First person**: 'I' — intimate but biased. The reader knows only what this character knows.
- **Third person limited**: 'he/she' — close to one character's perspective.
- **Third person omniscient**: 'he/she' — the narrator knows everything, including all characters' thoughts.
- **Unreliable narrator**: the telling cannot be fully trusted (lying, naive, mentally unwell).

**Themes** are the big ideas a text explores — power, identity, justice, belonging, loss. **Motifs** are recurring elements (images, phrases, objects) that develop the theme. Tracking motifs is one of the surest ways into analysis: *the green light in The Great Gatsby*, *the conch in Lord of the Flies*.

**Context** reshapes meaning. A post-colonial reading of *Things Fall Apart* foregrounds the violence of empire; a feminist reading of *The Handmaid's Tale* foregrounds bodily autonomy; a modernist reading of *Mrs Dalloway* foregrounds consciousness and fragmented time.

When **comparing texts** on a shared theme, do not list similarities and differences separately. Weave them together: *Both novels use setting to isolate the protagonist; however, while Atwood's closed Republic of Gilead denies agency, Conrad's Congo exploits it through complicity.*`,
        studyGuide: `**Quick revision — Modern Fiction**

- Narrators: first person, third limited, third omniscient, unreliable.
- Theme = big idea; motif = recurring element developing theme.
- Context lenses: post-colonial, feminist, modernist, Marxist.
- Comparison: weave similarities and differences together, do not list.`,
        keyTerms: [
          { term: "Narrator", definition: "The voice telling the story; shapes what the reader knows." },
          { term: "Theme", definition: "A central idea explored by a text (power, identity, justice)." },
          { term: "Motif", definition: "A recurring image, phrase or object that develops a theme." },
          { term: "Unreliable narrator", definition: "A narrator whose credibility is compromised." },
        ],
        examples: [
          {
            title: "Narrator types",
            body: "'Call me Ishmael.' (Moby-Dick) — first person. 'He was an old man who fished alone.' (The Old Man and the Sea) — third person limited.",
          },
          {
            title: "Motif tracking",
            body: "In Lord of the Flies, the conch starts as a symbol of order; as it loses power, so does civilisation.",
          },
        ],
        durationMin: 55,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "'I walked into the room' uses which narrator?",
              options: ["First person", "Third limited", "Third omniscient", "Second person"],
              answerIdx: 0,
              explanation: "'I' = first person narration.",
            },
            {
              prompt: "A recurring image that develops a theme is called a…",
              options: ["metaphor", "motif", "summary", "stanza"],
              answerIdx: 1,
              explanation: "Motifs are recurring elements that build themes.",
            },
            {
              prompt: "A reader who can't fully trust the narrator has a(n)…",
              options: ["omniscient narrator", "unreliable narrator", "absent narrator", "chorus"],
              answerIdx: 1,
              explanation: "Unreliable narrators lie, misunderstand, or distort.",
            },
            {
              prompt: "Comparing two texts, you should…",
              options: ["list similarities then differences", "weave similarities and differences together", "only describe one text", "skip the comparison"],
              answerIdx: 1,
              explanation: "Woven comparison shows analytical thinking.",
            },
          ],
        },
      },
    ],
  },
  {
    unitTitle: "Advanced Literary Criticism & Academic Writing",
    gradeBand: "11-12",
    lessons: [
      {
        title: "Literary Theory & Critical Lenses",
        slug: "literary-theory-critical-lenses",
        summary:
          "Apply critical lenses (feminist, post-colonial, Marxist, psychoanalytic, eco-critical) to literary texts.",
        objectives: [
          "Define and apply major critical lenses.",
          "Analyse a text through two different lenses and compare.",
          "Use specialist critical vocabulary accurately.",
          "Construct an argument that engages with secondary criticism.",
        ],
        content: `Literary theory gives us lenses through which to read. Each lens asks different questions and brings different assumptions:

- **Feminist criticism** examines gender, power, and the representation of women. Asks: whose voice is heard? whose silenced?
- **Post-colonial criticism** examines the legacy of empire. Asks: who is the 'other'? how is the coloniser's gaze exposed?
- **Marxist criticism** examines class, labour, and economics. Asks: who owns the means of production? how is ideology naturalised?
- **Psychoanalytic criticism** (Freudian/Lacanian) examines unconscious desires, repression, the family romance. Asks: what does the text repress?
- **Eco-criticism** examines the relationship between literature and the environment. Asks: how is 'nature' constructed? what does the text say about extinction and the Anthropocene?

Applying a lens is not just labelling a text 'feminist' or 'Marxist'. A strong lens-driven essay uses the theory's specific concepts (e.g. *the male gaze*, *ideological state apparatus*, *abjection*) to generate new readings.

**Comparing lenses** deepens analysis. Read *Jane Eyre* through a feminist lens and you celebrate Jane's autonomy; read it through a post-colonial lens and you question the silence of Bertha Mason, the West Indian wife locked in the attic. Both readings are valid; together they expose tensions the text itself cannot resolve.

Engaging with **secondary criticism** signals scholarly rigour. Read what critics have written, summarise their arguments fairly, then position your own argument in relation: *While Gilbert celebrates Jane's flight, Spivak exposes how that freedom depends on Bertha's sacrifice. This essay argues that the novel's feminism is structurally inseparable from its colonial violence.*`,
        studyGuide: `**Quick revision — Literary Theory**

- Lenses: feminist, post-colonial, Marxist, psychoanalytic, eco-critical.
- Use the theory's specific concepts; do not just label.
- Compare lenses to expose tensions within the text.
- Engage with secondary criticism: summarise fairly, then position your argument.`,
        keyTerms: [
          { term: "Critical lens", definition: "A theoretical framework that guides interpretation." },
          { term: "Male gaze", definition: "(Feminist) The way visual arts and literature depict women as objects of male pleasure." },
          { term: "Othering", definition: "(Post-colonial) Reducing a person or group to 'the other' against a norm." },
          { term: "Ideology", definition: "(Marxist) The set of beliefs that supports the dominant class." },
        ],
        examples: [
          {
            title: "Two lenses on Jane Eyre",
            body: "Feminist: Jane's 'I' asserts female autonomy. Post-colonial: Bertha Mason's silencing exposes the colonial underside of that autonomy.",
          },
          {
            title: "Engaging with criticism",
            body: "While Gilbert reads Jane's flight as liberation, Spivak exposes its colonial cost. This essay argues the two are inseparable.",
          },
        ],
        durationMin: 60,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "Which lens foregrounds the legacy of empire?",
              options: ["Feminist", "Post-colonial", "Marxist", "Eco-critical"],
              answerIdx: 1,
              explanation: "Post-colonial criticism examines coloniser/colonised relationships.",
            },
            {
              prompt: "The 'male gaze' is a concept from…",
              options: ["Marxism", "Feminism", "Psychoanalysis", "Eco-criticism"],
              answerIdx: 1,
              explanation: "Coined by Laura Mulvey, a feminist film theorist.",
            },
            {
              prompt: "Applying a critical lens means…",
              options: ["just labelling a text", "using the theory's concepts to generate new readings", "ignoring the text", "skipping secondary criticism"],
              answerIdx: 1,
              explanation: "Lenses must produce analysis, not just labels.",
            },
            {
              prompt: "Engaging with secondary criticism involves…",
              options: ["ignoring other critics", "summarising fairly, then positioning your argument", "copying critics", "quoting without context"],
              answerIdx: 1,
              explanation: "Fair summary + your position = scholarly rigour.",
            },
          ],
        },
      },
      {
        title: "Academic Essay Writing & Research",
        slug: "academic-essay-research",
        summary:
          "Plan, draft and revise an academic English essay with a thesis, structured argument, and proper citations.",
        objectives: [
          "Develop a thesis from close reading and secondary research.",
          "Structure an essay with introduction, body, and conclusion.",
          "Use embedded quotation and proper MLA/APA citation.",
          "Revise for clarity, coherence, and academic register.",
        ],
        content: `An academic essay makes a **defensible argument** supported by evidence. It begins with a **thesis** — a specific, contestable claim that the rest of the essay proves. *In The Great Gatsby, the green light functions not as hope but as the colonised future, always receding as Gatsby approaches.*

A strong **introduction** moves from the general (the topic and its stakes) to the specific (your thesis). It signposts the essay's structure without listing every paragraph. End the introduction with the thesis.

**Body paragraphs** are the engine of the essay. Each paragraph develops ONE idea in support of the thesis. Structure: topic sentence → evidence (close reading + quotation) → analysis → link to thesis. Avoid "quotes-first" paragraphs; lead with the idea, then support it.

**Conclusion** does not merely restate. It draws out the **implications**: why does your argument matter? What does it reveal about the text, the period, or the human condition? End with significance, not summary.

**Citations** (MLA or APA) give credit and let readers follow your trail. For literary essays, MLA is standard: in-text *(Fitzgerald 98)*; works cited entry *Fitzgerald, F. Scott. The Great Gatsby. Scribner, 2004.* For research with social science angle, APA may apply.

**Revision** is where good essays become great. Read aloud to catch awkward sentences. Cut filler ('It is interesting to note that…'). Check that every paragraph serves the thesis. Trade drafts with a peer — fresh eyes catch what yours no longer see.`,
        studyGuide: `**Quick revision — Academic Essay**

- Thesis: specific, contestable, defensible claim.
- Intro: general → specific → thesis.
- Body: one idea per paragraph; topic sentence → evidence → analysis → link.
- Conclusion: implications and significance, not summary.
- Citations: MLA (Author Page) for literature; APA for social science.
- Revise: read aloud, cut filler, check every paragraph serves the thesis.`,
        keyTerms: [
          { term: "Thesis", definition: "A specific, contestable claim that the essay argues." },
          { term: "Close reading", definition: "Detailed analysis of how a text creates meaning." },
          { term: "MLA citation", definition: "(Modern Language Association) Author-page style used in literary essays." },
          { term: "Academic register", definition: "Formal, objective, hedged written style appropriate to academia." },
        ],
        examples: [
          {
            title: "Thesis vs topic",
            body: "Topic: 'Gatsby is about the American Dream.' Thesis: 'Gatsby exposes the American Dream as a colonised future, always receding.'",
          },
          {
            title: "MLA in-text",
            body: "Gatsby reaches for 'the green light' (Fitzgerald 98), a symbol whose distance from him is constitutive of its meaning.",
          },
        ],
        durationMin: 60,
        difficulty: "advanced",
        quiz: {
          timeLimit: 12,
          questions: [
            {
              prompt: "A strong thesis is…",
              options: ["a fact", "a general topic", "specific and contestable", "a quote"],
              answerIdx: 2,
              explanation: "Theses make a specific, defensible claim that could be argued against.",
            },
            {
              prompt: "The body of an academic essay should…",
              options: ["list quotes", "develop one idea per paragraph in support of the thesis", "skip analysis", "be a single paragraph"],
              answerIdx: 1,
              explanation: "Each paragraph develops one idea with evidence and analysis.",
            },
            {
              prompt: "Which is correct MLA in-text citation?",
              options: ["(Fitzgerald 98)", "(p. 98)", "[Fitzgerald, 98]", "(Fitzgerald, page 98)"],
              answerIdx: 0,
              explanation: "MLA uses (Author Page) with no comma.",
            },
            {
              prompt: "A good conclusion…",
              options: ["restates the introduction word-for-word", "draws out implications and significance", "introduces new evidence", "is optional"],
              answerIdx: 1,
              explanation: "Conclusions highlight significance, not summary.",
            },
          ],
        },
      },
    ],
  },
];
