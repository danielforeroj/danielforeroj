import type { Kit } from './types';

// FOCUS: the founder focus kit (English). Video en-21 (sources ev-20, ev-25).
// The case: ev-20 and ev-25 (solar park tokenization team, 2026-05-06; Daniel, studio session 2026-11-12).
// The moat rule: ev-26 (Daniel, studio session 2026-11-12).
// Every other amount in the calculators and every filled row in the sheets is a labeled example.

const kit: Kit = {
  word: 'FOCUS',
  slug: 'focus',
  videos: [
    {
      id: 'en-21',
      lang: 'en',
      promise: "Comment FOCUS and I'll send you the founder focus kit, so you prove demand before you burn runway on a platform.",
    },
  ],
  content: {
    en: {
      title: 'The founder focus kit',
      promise:
        'Write the one question that matters, answer it on someone else\'s rails for a fraction of the build cost, and decide with numbers when your own platform is worth building.',
      minutes: 35,
      howTo: [
        'Four sections in order: the question, build or rails, the demand test, the go or no-go. Each one feeds the next.',
        'Fill the question card first. Every later sheet and calculator refers back to it.',
        'Copy the sheets into Google Sheets or Excel, and set every threshold yourself before the test starts.',
        'Come back to the last section when the test window closes, not before.',
      ],
      sections: [
        // ---------------------------------------------------------------- the question
        {
          id: 'one-question',
          title: 'Write the one question',
          videos: ['en-21'],
          intro:
            'Before you spend on a build, write the one thing you need to know. For most founders it is not "can we build it". It is "will people buy it".',
          blocks: [
            {
              type: 'rule',
              text: 'Will people buy this? Not, can we build it?',
            },
            {
              // ev-20, ev-25: solar parks tokenization case. Cost estimate, competitor rails, the advice, deal not closed.
              type: 'p',
              text: 'A team tokenizing solar parks wanted to build their own platform first, at roughly **5,000 to 6,000 dollars a month** in development in LATAM, before they knew if anyone wanted to buy. Another platform already had the tokenization and fractional ownership infrastructure they needed. My advice was to launch there, test the appetite, and come back to build with the model proven. That deal did not close, and I would give the same advice again.',
            },
            {
              type: 'compare',
              bad: {
                title: 'Build questions (they feel like progress)',
                items: [
                  'Can we build our own platform?',
                  'Which stack should we use?',
                  'How long until v1 is ready?',
                  'Will investors like the product?',
                  'How do we make it scale?',
                ],
              },
              good: {
                title: 'Demand questions (they decide the build)',
                items: [
                  'Will [WHO] pay [AMOUNT] for [OFFER]?',
                  'How many of them commit within [WEEKS]?',
                  'What do the first buyers say is missing?',
                  'Which channel brings buyers who actually pay?',
                  'Does anyone come back for a second purchase?',
                ],
              },
            },
            {
              type: 'template',
              title: 'The demand question card',
              body: `THE QUESTION
Will [WHO, AS NARROW AS POSSIBLE] [PAY / SIGN / COMMIT] [AMOUNT OR ACTION] for [OFFER, IN ONE LINE] within [WEEKS]?

WHAT "YES" LOOKS LIKE (set now, before any test)
- At least [NUMBER] buyers [paid / signed / committed money], not "said they were interested".
- At a price of at least [PRICE].
- By [DATE].

WHAT "NO" LOOKS LIKE
- Fewer than [NUMBER] by [DATE], after reaching at least [NUMBER] qualified prospects.

WHAT WE WILL NOT BUILD TO ANSWER THIS
- [OWN PLATFORM / CUSTOM APP / INTEGRATION / ...]

WHO DECIDES WHEN THE WINDOW CLOSES
- [NAMES]. The decision date is [DATE] and it does not move.`,
              note: 'Every number on this card is yours to set. The point is to write it before the results, so the results cannot argue with you.',
            },
            {
              type: 'template',
              title: 'Prompt: pressure-test your question before you spend',
              body: `You are a skeptical operator reviewing a founder's plan. Your only job is to make sure the next dollar goes to answering a demand question, not a build question.

My offer: [ONE PARAGRAPH].
Who I think buys it: [SEGMENT].
What I was planning to build first, and what it costs per month: [PLAN AND COST].
My draft demand question card: [PASTE THE CARD].

Do this:
1. Say whether my question is a demand question (answered by buyers committing money or a signed action) or a build question (answered by the team). If it is a build question, rewrite it as a demand question.
2. Point out every vague word in the card ("interest", "traction", "users", "soon") and ask me for the number or the date that replaces it.
3. List the three cheapest ways to get the answer without building my own platform: existing platforms, marketplaces, manual delivery, a pre-sale, a pilot on someone else's product. For each, say what it would not tell me.
4. Tell me what part of my planned build is NOT needed to answer the question.

Rules:
- Do not recommend building anything unless I show you buyers already committed.
- Do not count investor interest, waitlist signups or compliments as demand.
- Do not invent market sizes or benchmarks. If you need a number to judge, ask me for it.`,
            },
            {
              type: 'check',
              id: 'question-check',
              title: 'Is your question ready?',
              items: [
                'It names one buyer segment, not "everyone who might need this".',
                'It is answered by buyers paying or signing, not by the team shipping.',
                'The "yes" and "no" thresholds are written, with numbers and a date.',
                'Investor meetings are not part of the answer. Ten good investor meetings do not tell you if customers will buy.',
                'The list of what you will not build to answer it has at least one line.',
              ],
            },
          ],
        },

        // ---------------------------------------------------------------- build or rails
        {
          id: 'build-or-rails',
          title: "Build, or use someone else's rails",
          videos: ['en-21'],
          intro:
            'Find the cheapest way to answer your question. Usually that is a platform that already does the hard part and already has some of your buyers.',
          blocks: [
            {
              // ev-26: distribution and traction as the moat; an MVP ships in under a weekend.
              type: 'rule',
              text: 'An MVP ships in less than a weekend now. Distribution and traction are the moat, so spend runway on finding buyers, not on rebuilding rails that already exist.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'List every platform that already does your core capability',
                  body: 'Include direct competitors. If a competitor already has the infrastructure and the distribution, launching on it is the fastest test you can buy.',
                },
                {
                  title: 'Check where your buyers already are',
                  body: 'A platform with the right buyers is worth more than one with better features. Ask the provider who uses it, and check yourself.',
                },
                {
                  title: 'Price the test on each option',
                  body: 'Setup, monthly fee, revenue share, and the months you need to answer the question. Put them in the sheet and the calculator.',
                },
                {
                  title: 'Write down what you give up',
                  body: 'Control of the experience, the customer relationship, the data, the brand, the exit. Some of it is fine for a test. Some of it is a deal breaker. Decide which before you sign.',
                },
                {
                  title: 'Pick the option that answers the question fastest',
                  body: 'Not the cheapest forever, not the most elegant. The one that gets real buyers in front of a real price soonest.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'rails-options',
              title: 'Rails options compared',
              columns: ['Option', 'Does the core capability (Y/N)', 'Your buyers already there (Y/N)', 'Setup cost', 'Monthly fee', 'Revenue share %', 'Months to answer the question', 'Expected revenue in the test', 'Cost of the test', 'Can you take your customers and data out (Y/N)', 'Deal breaker'],
              rows: [
                ['Example: build our own', 'Y (after the build)', 'N', '0', '5000', '0', '6', '0', '=D2+E2*G2+F2/100*H2', 'Y', 'Months of burn before the first buyer'],
                ['Example: [PLATFORM A]', 'Y', 'Y', '1000', '300', '5', '3', '20000', '=D3+E3*G3+F3/100*H3', 'Y', ''],
                ['Example: [PLATFORM B]', 'Y', 'N', '0', '0', '10', '3', '20000', '=D4+E4*G4+F4/100*H4', 'N', 'Customer list stays with them'],
                ['', '', '', '', '', '', '', '', '=D5+E5*G5+F5/100*H5', '', ''],
                ['', '', '', '', '', '', '', '', '=D6+E6*G6+F6/100*H6', '', ''],
              ],
              note: 'All amounts in the example rows are placeholders, except the build line, which uses the low end of the solar park team\'s estimate (5,000 dollars a month in LATAM). Put your own numbers in every row.',
            },
            {
              type: 'calc',
              id: 'cost-of-the-answer',
              title: 'What the answer costs: build first or test on rails',
              inputs: [
                {
                  id: 'buildmonthly',
                  label: 'Monthly cost to build and run your own platform',
                  value: 5000,
                  unit: 'USD',
                  hint: 'The solar park team\'s estimate was 5,000 to 6,000 dollars a month in LATAM. Use your own quote.',
                },
                { id: 'buildmonths', label: 'Months until your own platform can take its first buyer', value: 4, hint: 'Example value. Use your team\'s estimate, then add a margin.' },
                { id: 'testmonths', label: 'Months the test needs to answer the question', value: 3, hint: 'From your question card.' },
                { id: 'setup', label: 'Rails: setup cost', value: 1000, unit: 'USD', hint: 'Example value. Ask the provider.' },
                { id: 'fee', label: 'Rails: monthly fee', value: 300, unit: 'USD', hint: 'Example value. Ask the provider.' },
                { id: 'share', label: 'Rails: revenue share', value: 5, unit: '%', hint: 'Example value. Ask the provider.' },
                { id: 'revenue', label: 'Revenue you expect during the test', value: 20000, unit: 'USD', hint: 'Your own estimate. Zero is fine if unsure.' },
              ],
              outputs: [
                { label: 'Build first: spend before you get the answer', expr: 'buildmonthly*(buildmonths+testmonths)', format: 'money' },
                { label: 'Rails: cost of the same answer', expr: 'setup+fee*testmonths+share/100*revenue', format: 'money' },
                {
                  label: 'Runway kept by testing on rails',
                  expr: 'buildmonthly*(buildmonths+testmonths)-(setup+fee*testmonths+share/100*revenue)',
                  format: 'money',
                },
                { label: 'Months sooner you get the answer on rails', expr: 'buildmonths', format: 'number' },
              ],
              verdict: {
                expr: 'buildmonthly*(buildmonths+testmonths)-(setup+fee*testmonths+share/100*revenue)',
                pass: 'Test on the rails first. Building now spends more runway for the same answer, and gets it later.',
                fail: 'The rails cost more than building for this test. Check the inputs, then check the deal breakers before you build.',
              },
            },
            {
              type: 'template',
              title: 'Message to the platform you want to launch on',
              body: `Hi [NAME], I lead [YOUR COMPANY]. We have [ASSET OR OFFER: e.g. a portfolio of assets, a product line, a service] and we want to offer it to [BUYER SEGMENT] on [PLATFORM] instead of building our own infrastructure first.

Before we commit, five questions:
1. What does it cost us: setup, monthly fee, revenue share, anything else?
2. Which of your users look like [BUYER SEGMENT], and roughly how active are they?
3. Who owns the customer relationship and the customer data? Can we export them if we leave?
4. What can we not control: pricing, terms, branding, communications with buyers?
5. What are the exit terms if we move to our own platform later?

We would like to launch a first offer within [WEEKS]. Could we talk on [DAY] at [TIME]?

[YOUR NAME]`,
              note: 'Question 3 and question 5 decide whether these rails are a test or a trap. Get both answers in writing.',
            },
            {
              type: 'check',
              id: 'rails-terms',
              title: 'Before you sign with the rails',
              items: [
                'I know the total cost of the test window, written, in my currency.',
                'I can export my customers and their data when I leave.',
                'I can talk to my buyers directly, not only through the platform.',
                'The exit terms are written and I have read them.',
                'Nothing in the terms stops me from building my own platform later.',
              ],
            },
          ],
        },

        // ---------------------------------------------------------------- demand test
        {
          id: 'demand-test',
          title: 'Run the demand test',
          videos: ['en-21'],
          intro:
            'Launch on the borrowed rails with a real price, count commitments against the thresholds you already wrote, and log what your first users say is missing.',
          blocks: [
            {
              type: 'rule',
              text: 'Borrowed rails also teach you what to build, because your first users tell you what is missing.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Launch with a real price',
                  body: 'A free offer answers a different question. Charge what you would charge on your own platform, or close to it.',
                },
                {
                  title: 'Drive buyers to it yourself',
                  body: 'Do not wait for the platform to bring them. Reach the number of qualified prospects your card says, through the channels you would use anyway.',
                },
                {
                  title: 'Count only commitments',
                  body: 'Paid, signed, or money committed. Interest, likes and "send me more info" go in a separate column and do not count toward the threshold.',
                },
                {
                  title: 'Log every "I wish it could"',
                  body: 'Each time a buyer or a lost prospect says what is missing, write it down in their words and mark whether the rails could ever do it.',
                },
                {
                  title: 'Review every week, decide once',
                  body: 'Weekly: fill the log. At the decision date on your card: go to the last section. Do not change the threshold in the middle of the test.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'demand-log',
              title: 'Weekly demand log',
              columns: ['Week', 'Qualified prospects reached', 'Conversations', 'Commitments (paid or signed)', 'Revenue committed', 'Interested, not committed', 'Commit rate per conversation', 'Running commitments', 'Threshold from your card'],
              rows: [
                ['Example: week 1', '40', '12', '2', '3000', '6', '=D2/C2', '=D2', '[NUMBER]'],
                ['Example: week 2', '35', '10', '1', '1500', '4', '=D3/C3', '=H2+D3', '[NUMBER]'],
                ['Week 3', '', '', '', '', '', '=D4/C4', '=H3+D4', '[NUMBER]'],
                ['Week 4', '', '', '', '', '', '=D5/C5', '=H4+D5', '[NUMBER]'],
                ['Week 5', '', '', '', '', '', '=D6/C6', '=H5+D6', '[NUMBER]'],
                ['Week 6', '', '', '', '', '', '=D7/C7', '=H6+D7', '[NUMBER]'],
              ],
              note: 'Example rows are made up to show the formulas. Column G shows an error until you fill the conversations for that week; that is expected.',
            },
            {
              type: 'sheet',
              id: 'missing-log',
              title: 'What users say is missing',
              columns: ['Date', 'Who (buyer or lost prospect)', 'What they asked for, in their words', 'Did it cost us the sale (Y/N)', 'Can the rails do it (Y / N / with workaround)', 'How often heard (count)'],
              rows: [
                ['[DATE]', 'Example: lost prospect', '"I need to pay in installments"', 'Y', 'N', '3'],
                ['[DATE]', 'Example: buyer', '"Reports in my own currency"', 'N', 'With workaround', '1'],
                ['', '', '', '', '', ''],
                ['', '', '', '', '', ''],
                ['', '', '', '', '', ''],
              ],
              note: 'The rows with Y in column D and N in column E are your first build spec. Everything else can wait.',
            },
            {
              type: 'template',
              title: 'Prompt: turn the test into a build spec',
              body: `You are reviewing the results of a demand test I ran on someone else's platform. Below: my demand question card, my weekly demand log, and my log of what users said was missing.

Produce:
1. A plain verdict against the card: did commitments reach the "yes" threshold, the "no" threshold, or neither, by the decision date? Show the arithmetic.
2. From the missing log: the requests that cost a sale AND the rails cannot do. Rank them by how often they were heard. These are the only candidates for my own platform.
3. The requests the rails can do with a workaround, and what the workaround costs us per month in time or money (ask me if you need a number).
4. One paragraph: what my own platform would need on day one, based only on rows 2 and 3. Nothing else.

Rules:
- Count only commitments as demand. Ignore "interested" in the verdict.
- Do not add features nobody asked for, even if they are standard in the category.
- If the data is too thin to support a verdict, say so and say what would make it enough.

Card: [PASTE]
Demand log: [PASTE]
Missing log: [PASTE]`,
            },
          ],
        },

        // ---------------------------------------------------------------- go / no-go
        {
          id: 'go-no-go',
          title: 'Go or no-go on your own platform',
          videos: ['en-21'],
          intro:
            'At the decision date, choose one of three moves: build your own, stay on the rails and keep selling, or stop and change the offer.',
          blocks: [
            {
              type: 'rule',
              text: 'Build your own only when the demand is proven and those rails are holding you back.',
            },
            {
              type: 'check',
              id: 'go-conditions',
              title: 'Build only if every line is true',
              items: [
                'Commitments reached the "yes" threshold on the card, by the decision date, without moving the threshold.',
                'The commitments are paid or signed, not interest.',
                'At least one request from the missing log cost us sales and the rails cannot do it, even with a workaround.',
                'Or: the fees and revenue share on the rails now cost more than building, per the calculator below.',
                'We know what day one of our own platform needs, from the build spec, and nothing more.',
                'We can fund the build months and keep selling on the rails while we build.',
              ],
            },
            {
              type: 'calc',
              id: 'build-payback',
              title: 'Payback of moving to your own platform',
              inputs: [
                {
                  id: 'buildmonthly',
                  label: 'Monthly cost to build and run your own platform',
                  value: 5000,
                  unit: 'USD',
                  hint: 'The solar park team\'s estimate was 5,000 to 6,000 dollars a month in LATAM. Use your own quote.',
                },
                { id: 'buildmonths', label: 'Months to build before you can move buyers', value: 4, hint: 'Example value. Use your team\'s estimate.' },
                {
                  id: 'runmonthly',
                  label: 'Monthly cost to keep your own platform running after launch',
                  value: 1000,
                  unit: 'USD',
                  hint: 'Example value. Hosting, maintenance and the people who keep it up. Ask your team.',
                },
                { id: 'railsfees', label: 'What the rails cost you per month now (fees plus revenue share)', value: 1500, unit: 'USD', hint: 'Example value. From your last statements.' },
                {
                  id: 'lostsales',
                  label: 'Revenue per month you lose because the rails cannot do something',
                  value: 2000,
                  unit: 'USD',
                  hint: 'Example value. Only lost sales from the missing log, not hopes.',
                },
                { id: 'maxpayback', label: 'Your limit: longest payback you accept', value: 18, unit: 'months', hint: 'You set this from your runway.' },
              ],
              outputs: [
                { label: 'Spend before your own platform takes buyers', expr: 'buildmonthly*buildmonths', format: 'money' },
                { label: 'Monthly gain once you move (fees saved plus sales recovered, minus running cost)', expr: 'railsfees+lostsales-runmonthly', format: 'money' },
                { label: 'Payback in months after launch', expr: 'buildmonthly*buildmonths/(railsfees+lostsales-runmonthly)', format: 'number' },
              ],
              verdict: {
                expr: 'maxpayback*(railsfees+lostsales-runmonthly)-buildmonthly*buildmonths',
                pass: 'Within your limit. If every line of the checklist above is true, build.',
                fail: 'Outside your limit, or the move never pays back (the monthly gain is zero or negative). Stay on the rails and keep selling.',
              },
            },
            {
              type: 'template',
              title: 'Decision memo (one page, written on the decision date)',
              body: `DECISION: [BUILD OUR OWN / STAY ON THE RAILS AND KEEP SELLING / STOP OR CHANGE THE OFFER]
Date: [DATE]. Decided by: [NAMES].

The question: [FROM THE CARD]
The thresholds we set before the test: yes = [ ], no = [ ].
What happened: [COMMITMENTS], [REVENUE COMMITTED], from [PROSPECTS REACHED] prospects and [CONVERSATIONS] conversations.

If BUILD:
- What the rails cannot do that cost us sales: [ROWS FROM THE MISSING LOG]
- Day one scope: [ONLY THOSE]
- Cost and months: [FROM THE CALCULATOR]. Payback: [MONTHS].
- We keep selling on the rails until [DATE OR CONDITION].

If STAY:
- Demand is proven; the rails are not holding us back yet.
- We revisit this memo when [THE CONDITION THAT WOULD CHANGE IT: a lost-sales number, a fee level].

If STOP OR CHANGE:
- What buyers told us instead: [TOP REASONS, IN THEIR WORDS]
- The next question card: [NEW QUESTION, NEW THRESHOLDS, NEW DATE]`,
              note: 'Stop or change is a good result. It cost you a test window on someone else\'s rails, not months of your own build.',
            },
          ],
        },
      ],
      next: {
        text: 'If you want a second read on your question card or your build plan before you commit the runway, book an intro call.',
        cta: 'Book an intro call',
        page: 'book',
      },
    },
  },
};

export default kit;
