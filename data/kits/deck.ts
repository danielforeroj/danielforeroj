import type { Kit } from './types';

// DECK (English, US): the deck and narrative kit. Videos en-01, en-04, en-08, en-13, en-14.
// Sources: scripts in C:/agents/studio/specs/faceless/semana/2026-11-30/en.md,
// evidence in C:/agents/studio/conocimiento/Evidencia de Daniel.md (ev-17, ev-22, ev-26, ev-28),
// theses T22 and T23 in studio-contenido/references/posturas-contrarias.md.

const kit: Kit = {
  word: 'DECK',
  slug: 'deck',
  videos: [
    {
      id: 'en-01',
      lang: 'en',
      promise:
        "Comment DECK and I'll send you the deck and narrative kit, so your next deck shows a channel investors can actually check.",
    },
    {
      id: 'en-04',
      lang: 'en',
      promise:
        "Comment DECK and I'll send you the deck and narrative kit, so your next round gets covered instead of ignored.",
    },
    {
      id: 'en-08',
      lang: 'en',
      promise:
        "Comment DECK and I'll send you the deck and narrative kit, so the market stores your company the way you want.",
    },
    {
      id: 'en-13',
      lang: 'en',
      promise:
        "Comment DECK and I'll send you the deck and narrative kit, so each investor reads the version built for them.",
    },
    {
      id: 'en-14',
      lang: 'en',
      promise:
        "Comment DECK and I'll send you the deck and narrative kit, so press compounds instead of exposing a weak story.",
    },
  ],
  content: {
    en: {
      title: 'The deck and narrative kit',
      promise:
        'A distribution slide investors can check, an announcement with a fact behind it, one sentence the market repeats, the right deck for each investor, and a story ready for press.',
      minutes: 40,
      howTo: [
        'Go in order. Each section answers one video and ends with something you fill in, paste or send.',
        'Copy the sheets straight into Google Sheets or Excel. The formulas come with them.',
        'Paste the prompts into Claude or ChatGPT with your real deck, pipeline and customer answers attached. Generic inputs get generic output.',
        'Sections 3 and 5 build the same sentence. Do them before you brief anyone on PR.',
      ],
      sections: [
        // ---------------------------------------------------------------- en-01
        {
          id: 'distribution-slide',
          title: 'Rebuild the distribution slide',
          videos: ['en-01'],
          intro:
            'Turn "community and partnerships" into a channel with a name, a number and a ninety day plan an investor can verify.',
          blocks: [
            { type: 'rule', text: 'Investors fund the slide they can check.' },
            {
              // ev-26 (MVP in a weekend, moat is distribution and traction), ev-28 (the one word plan)
              type: 'p',
              text: "An MVP ships in a weekend now, so tech stopped being the moat. The moat is distribution and traction. If your distribution plan is one word, you don't have a plan.",
            },
            {
              type: 'compare',
              bad: {
                title: 'A plan in one word',
                items: [
                  '"Community and partnerships"',
                  'Partner logos with no customers behind them',
                  'Five channels, none with a number',
                  'No time frame, no cost per customer',
                ],
              },
              good: {
                title: 'A channel an investor can check',
                items: [
                  'The partner by name, the customers they reach, what they get per referral',
                  'Conversations this month from that channel, and how many became pilots',
                  'The one channel you double down on for the next ninety days',
                  'What you expect a customer from it to cost',
                ],
              },
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Name the channel',
                  body: 'Not "partnerships". Which partner, with which customers, and what they get when they send you one.',
                },
                {
                  title: 'Put a number on it',
                  body: 'How many conversations this month from that channel, and how many turned into pilots. Count from your CRM or inbox, not from memory.',
                },
                {
                  title: 'Show the next ninety days',
                  body: 'The one channel you are doubling down on, and what you expect a customer to cost. Use the calculator below.',
                },
                {
                  title: 'Check it like an investor would',
                  body: 'Could someone call the partner or open your pipeline and confirm every number on the slide? If not, cut the claim.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'channel-ledger',
              title: 'Channel ledger',
              columns: [
                'Channel (named)',
                'Customers it reaches',
                'What the partner gets per referral',
                'Conversations this month',
                'Pilots this month',
                'Conversation to pilot',
                'Spend this month',
                'Cost per pilot',
              ],
              rows: [
                ['Example (hypothetical): [Partner] referrals', '[Segment]', '[Rev share, credit, co-sell terms]', '12', '3', '=E2/D2', '1500', '=G2/E2'],
                ['', '', '', '', '', '=E3/D3', '', '=G3/E3'],
                ['', '', '', '', '', '=E4/D4', '', '=G4/E4'],
                ['', '', '', '', '', '=E5/D5', '', '=G5/E5'],
              ],
              note: 'The example row is made up to show the math. Delete it once your own channels are in. One row per channel; the one with the best cost per pilot is usually the one you name on the slide.',
            },
            {
              type: 'p',
              text: 'The calculator defaults are placeholders, not benchmarks. Replace every one with your own numbers before anything goes on a slide.',
            },
            {
              type: 'calc',
              id: 'channel-cost',
              title: 'What a customer from this channel will cost in the next 90 days',
              inputs: [
                { id: 'spend', label: 'Planned spend on the channel, next 90 days', value: 9000, unit: '$', hint: 'Placeholder. Use your budget.' },
                { id: 'conversations', label: 'Conversations you expect from it in 90 days', value: 40, hint: 'Placeholder. Base it on this month in your ledger.' },
                { id: 'pilotrate', label: 'Conversations that become pilots', value: 25, unit: '%', hint: 'From your ledger, not a guess.' },
                { id: 'closerate', label: 'Pilots that become paying customers', value: 30, unit: '%', hint: 'From your own history.' },
                { id: 'ceiling', label: 'The most you can pay for one customer', value: 3000, unit: '$', hint: 'Your number, set from what a customer is worth to you.' },
              ],
              outputs: [
                { label: 'Pilots expected', expr: 'conversations * pilotrate / 100', format: 'number' },
                { label: 'Customers expected', expr: 'conversations * pilotrate / 100 * closerate / 100', format: 'number' },
                { label: 'Expected cost per customer', expr: 'spend / (conversations * pilotrate / 100 * closerate / 100)', format: 'money' },
              ],
              verdict: {
                expr: 'ceiling - spend / (conversations * pilotrate / 100 * closerate / 100)',
                pass: 'The channel clears your ceiling. Put this cost per customer on the slide.',
                fail: 'The channel costs more per customer than you can pay. Fix the inputs or pick another channel before it goes on the slide.',
              },
            },
            {
              type: 'template',
              title: 'Distribution slide outline',
              body: `SLIDE: Distribution

Headline: [The channel and what it produced, in one line. For example: "[Partner] sends us [segment]: [N] conversations, [N] pilots this month"]

Left column: the channel
- Partner: [name]
- Customers they reach: [segment]
- What they get per referral: [rev share / credit / co-sell terms]

Center column: proof, this month
- Conversations from this channel: [N]
- Pilots started: [N]
- How an investor can verify it: [partner contact / CRM export / signed LOI]

Right column: next 90 days
- The one channel we double down on: [name]
- Expected cost per customer: [$ from the calculator]
- What we will show at day 90: [number and how it is counted]

Rule: cut anything on this slide an investor cannot check.`,
            },
            {
              type: 'template',
              title: 'Prompt: audit the slide like a skeptical investor',
              body: `You are a seed investor who funds only what you can verify. Attached: my deck [PDF or slide text] and my pipeline export [CSV from the CRM].

1. Quote every claim about distribution, go to market, partnerships or community, word for word, with its slide number.
2. For each claim, mark yes or no on four tests: (a) names a specific channel or partner, (b) names a specific customer segment, (c) gives a number with a time frame, (d) an outsider could verify it.
3. Cross-check every number on the slides against the pipeline export. List each number the export does not support.
4. Rewrite the distribution slide using only claims that pass all four tests. Where data is missing, write [MISSING: what I need to find] instead of filling the gap.
5. List the three questions you would ask me about this slide on a first call.

Rules: do not invent partners, numbers or customers. Do not soften the critique. No marketing language.`,
              note: 'Attach the real export. Without it, step 3 has nothing to check against.',
            },
            {
              type: 'check',
              id: 'distribution-check',
              title: 'Before the deck goes out',
              items: [
                'The slide names the partner, not the category',
                'It says which customers that partner reaches',
                'It says what the partner gets per referral',
                'It shows conversations this month and how many became pilots',
                'Every number traces to a CRM export, an inbox or a signed document',
                'It names one channel for the next ninety days, not five',
                'It states what you expect a customer to cost',
                'This slide got at least as much rewrite time as the product slides',
              ],
            },
          ],
        },
        // ---------------------------------------------------------------- en-04
        {
          id: 'announcement',
          title: 'Run an announcement that gets covered',
          videos: ['en-04'],
          intro:
            'Find the fact that turns the raise into a story, build a list of ten journalists who cover your launch market, and reach them inside 48 hours.',
          blocks: [
            { type: 'rule', text: 'The money is the trigger. The fact is the story.' },
            {
              // ev-22: headline with a fact, 10 verified journalists in the launch market, 48 hours, a wire with no fact is noise
              type: 'p',
              text: '"We raised a seed round" is not news. A headline needs something true that changes what a reader thinks. A wire with no fact is noise. Ten right reporters with a real fact is a story.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Find the fact',
                  body: 'A customer number, a first in your market, a partner that only signs with proven teams. That is the headline. Use the prompt below to dig it out of your own materials.',
                },
                {
                  title: 'Write the sentence only you could give',
                  body: 'The one sentence a reporter could not have written without you. If you cannot write it, the announcement is not ready. Move the date.',
                },
                {
                  title: 'Build the list of ten',
                  body: 'Journalists who actually cover your launch market. Verified, by name, by beat, each with a recent piece that proves the beat.',
                },
                {
                  title: 'Reach all ten inside 48 hours',
                  body: 'Fact in the first line. The founder available that same week, with slots offered in the email.',
                },
                {
                  title: 'Put the founder on the call',
                  body: 'Reporters cover people with a point of view, not press releases. Write down three opinions the founder will defend on the record.',
                },
              ],
            },
            {
              type: 'check',
              id: 'fact-test',
              title: 'Is it a fact or a press release?',
              items: [
                'It is true and you can prove it on request',
                'It changes what a reader in your launch market thinks',
                'A reporter could not have written it without you',
                'It works as a headline without the funding amount',
                'It sits in the first line of the pitch, not the third paragraph',
              ],
            },
            {
              type: 'template',
              title: 'Prompt: find the fact in your raise',
              body: `Context: we are announcing a [stage] round of [amount] led by [lead investor]. Launch market: [country or segment]. Attached: our deck, our last investor update and our metrics [paste or attach].

Task: find candidate headline facts. A fact is something true and checkable that changes what a reader in [launch market] thinks. The kind I want: a customer number, a first in our market, a partner that only signs with proven teams.

Output:
1. Up to five candidate facts, each with the exact line from the attachments that proves it.
2. For each, the headline a trade reporter in [launch market] would write.
3. Rank them by how much each changes what a reader believes, with one line of reasoning.
4. Flag any candidate that is only interesting because of the funding amount.

Do not invent or round up any number. If the materials hold no real fact, say so, and tell me what we would need to have done for one to exist.`,
            },
            {
              type: 'sheet',
              id: 'journalist-list',
              title: 'The ten journalists',
              columns: [
                'Name',
                'Outlet',
                'Beat',
                'Recent piece on that beat (link)',
                'Why our fact fits their beat',
                'Verified email or channel',
                'Sent (date and time)',
                'Reply',
                'Founder call booked',
              ],
              rows: [
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
              ],
              note: 'Add rows until you have ten. Verify each name against a piece they actually published on that beat, not a database entry.',
            },
            {
              type: 'template',
              title: 'Pitch email to one reporter',
              body: `Subject: [The fact, short enough to be a headline]

Hi [First name],

[The fact, one sentence, with the number or the first.]

Why it matters for your readers: [one sentence tied to their beat, referencing their piece on [topic] from [date]].

The trigger: today we announced [round] led by [lead investor]. The money goes to [the one thing it buys].

[Founder name], our [title], is available [two concrete slots this week] to talk about [the point of view the founder holds]. I can share [data / customer reference / demo] under embargo until [date, time, time zone].

[Your name]
[Phone]`,
              note: 'One email per reporter, written for their beat. If you cannot fill the "why it matters for your readers" line, they are not on the right list.',
            },
            {
              type: 'check',
              id: 'announcement-48h',
              title: 'The 48 hour run',
              items: [
                'The fact is picked and proven before the wire goes out',
                'Ten verified reporters, each with a recent piece on the beat',
                'Every pitch leads with the fact',
                "The founder's calendar is held open that same week",
                'Three founder opinions are written down for the calls',
                'All ten reached inside 48 hours',
                'Replies and calls logged in the sheet',
              ],
            },
          ],
        },
        // ---------------------------------------------------------------- en-08
        {
          id: 'five-questions',
          title: 'Five questions, one sentence each',
          videos: ['en-08'],
          intro:
            'Write how you want the market to store your company, then check it against what three customers and one investor say without your help.',
          blocks: [
            { type: 'rule', text: "If the market can't store it, it can't buy it." },
            {
              // T23: narrative is how the market stores your company in its head
              type: 'p',
              text: "Narrative is not decoration. It is how the market stores your company in its head. The best product in a category can still lose when nobody can repeat what it does.",
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Write your five answers',
                  body: 'What does it do? Why does it matter now? Who is it for? Why does it win against what they use today? Why should they trust you? One sentence each.',
                },
                {
                  title: 'Start with question two',
                  body: 'Why now is where most founders go vague, and it is the first thing a buyer needs to believe. Tie it to a dated change, not a trend.',
                },
                {
                  title: 'Ask three customers and one investor',
                  body: 'Same five questions, answered without your help. Send them in writing with the message below, so you cannot steer.',
                },
                {
                  title: 'Mark every mismatch',
                  body: "Wherever their answer doesn't match yours, that is the work. Not more content, not more press.",
                },
                {
                  title: 'Rewrite and rerun',
                  body: 'Fix the biggest gap first, then ask again. The gaps are your narrative work for the next quarter.',
                },
              ],
            },
            {
              type: 'compare',
              bad: {
                title: 'Weak why now',
                items: ['AI is growing fast', 'The market is huge', 'Everyone is talking about [trend]'],
              },
              good: {
                title: 'Strong why now',
                items: [
                  'This rule takes effect in March and our buyers have to comply',
                  '[A dated change] forces [buyer] to [act] by [date]',
                  '[The cost or limit that blocked this] stopped being true on [date]',
                ],
              },
            },
            {
              type: 'sheet',
              id: 'five-answers',
              title: 'Your answers against theirs',
              columns: [
                'Question',
                'Your answer (one sentence)',
                'Customer 1',
                'Customer 2',
                'Customer 3',
                'Investor',
                'Outside answers that match yours (0 to 4)',
                'Gap to work on',
              ],
              rows: [
                ['1. What does it do?', '', '', '', '', '', '', ''],
                ['2. Why does it matter now?', '', '', '', '', '', '', ''],
                ['3. Who is it for?', '', '', '', '', '', '', ''],
                ['4. Why does it win against what they use today?', '', '', '', '', '', '', ''],
                ['5. Why should they trust you?', '', '', '', '', '', '', ''],
                ['Total matches (out of 20)', '', '', '', '', '', '=G2+G3+G4+G5+G6', ''],
              ],
              note: 'Paste each answer word for word. Do not paraphrase what customers said; their exact words are the raw material for section 5.',
            },
            {
              type: 'template',
              title: 'Message to the three customers and the investor',
              body: `Hi [Name],

I'm working on how we explain [Company], and I want your words, not mine. Could you answer these five in one sentence each? There are no wrong answers, and short is better.

1. What does [Company] do?
2. Why does it matter now?
3. Who is it for?
4. Why would someone pick it over what they use today?
5. Why should they trust us?

Please answer from memory, without looking at our site. Reply here whenever works this week.

Thank you,
[Your name]`,
            },
            {
              type: 'template',
              title: 'Prompt: find the gaps',
              body: `Attached: a table with five positioning questions. Column B is the founder's answer. Columns C to F are answers from three customers and one investor, written without help.

For each question:
1. Say whether each outside answer matches the founder's answer in meaning (match / partial / no), quoting the words that decide it.
2. Quote any phrase that appears in two or more outside answers. Those are the words the market already uses.
3. Name the gap in one line: what the market stores that the founder didn't say, or what the founder says that the market doesn't store.

Then:
4. Rank the five questions from biggest gap to smallest.
5. Propose a rewritten one sentence answer for the two biggest gaps, built from the outside answers' own words where possible.

Do not grade the founder's answer on style. Judge only whether outsiders repeat it. If an answer is missing, say so instead of guessing.`,
            },
          ],
        },
        // ---------------------------------------------------------------- en-13
        {
          id: 'two-decks',
          title: 'Two decks, one use of funds',
          videos: ['en-13'],
          intro:
            'Sort your investors by thesis and send each one the version built for how they read the slide that splits the room.',
          blocks: [
            { type: 'rule', text: "The deck isn't for you. It's for the person reading it." },
            {
              // ev-17: quantum security team, 2 to 4 weeks from seed, about 15 investor conversations, deck with and without the blockchain layer, use of funds as the narrative
              type: 'p',
              text: 'A quantum security team two to four weeks from their seed, about fifteen investor conversations in, had a blockchain layer that split the room. The advice was two decks, one with the layer and one without, and the use of funds as the story.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Find the slide that splits the room',
                  body: 'Go through your meeting notes: at which slide did interest rise, and at which did it drop? That piece is your divisive layer.',
                },
                {
                  title: 'Sort the list by thesis',
                  body: "Who funds that layer, who avoids it, who doesn't care. Tag each one from evidence: their stated thesis and what they already hold.",
                },
                {
                  title: 'Build two orders of the same deck',
                  body: 'The core deck without the divisive piece, then a version that leads with it. Same company, same numbers.',
                },
                {
                  title: 'Make the use of funds the narrative',
                  body: 'In both, show exactly what the money buys, milestone by milestone. It is the slide both versions share, so make it the strongest.',
                },
                {
                  title: 'Send one version per fund',
                  body: 'Log which version each investor got. Never send both to the same fund, and never let the numbers differ between them.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'investor-thesis',
              title: 'Investor list sorted by thesis',
              columns: [
                'Investor',
                'Fund',
                'Stated thesis (from their site or posts)',
                'What they already hold that proves it',
                'Stance on [the layer]: funds / avoids / indifferent',
                'Version to send',
                'Sent (date)',
                'Next step',
              ],
              rows: [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
              ],
              note: '"Funds" gets the layer-first deck. "Avoids" and "indifferent" get the core deck. No evidence for a stance means research before you send.',
            },
            {
              type: 'sheet',
              id: 'use-of-funds',
              title: 'Use of funds, milestone by milestone',
              columns: ['Milestone', 'What the money buys', 'Amount', 'Share of the round', 'Target date', 'How you will prove it happened'],
              rows: [
                ['[Milestone 1]', '[Hires, build, pilots, licenses]', '', '=C2/C6', '', ''],
                ['[Milestone 2]', '', '', '=C3/C6', '', ''],
                ['[Milestone 3]', '', '', '=C4/C6', '', ''],
                ['[Milestone 4]', '', '', '=C5/C6', '', ''],
                ['Total round', '', '=C2+C3+C4+C5', '', '', ''],
              ],
              note: 'Format column D as percent. This table is the same, word for word, in both decks.',
            },
            {
              type: 'template',
              title: 'Slide order for both versions',
              body: `CORE DECK (for funds that avoid [the layer] or don't care)
1. The one sentence (section 5)
2. The problem, in the buyer's words
3. The product, without [the layer]
4. Traction and the distribution slide (section 1)
5. Why now
6. Use of funds, milestone by milestone
7. Team, and why trust you
8. The ask
Appendix: [the layer], one slide, shown only if asked

LAYER-FIRST DECK (for funds whose thesis includes [the layer])
1. The one sentence, with [the layer] in it
2. Why [the layer] matters for this problem now
3. The product, with [the layer] at the core
4. Traction and the distribution slide
5. Use of funds: same milestones, same amounts
6. Team, and why trust you
7. The ask

Both versions: same numbers, same use of funds slide, word for word.`,
            },
            {
              type: 'check',
              id: 'two-deck-check',
              title: 'Before you send either version',
              items: [
                'Every investor has a stance tagged from evidence, not a guess',
                'Both decks carry identical numbers',
                'The use of funds slide is the same in both, word for word',
                'Each milestone says what the money buys and how you will prove it happened',
                'No fund receives both versions',
                'You logged which version each investor got',
              ],
            },
          ],
        },
        // ---------------------------------------------------------------- en-14
        {
          id: 'before-pr',
          title: 'The sentence test before any PR',
          videos: ['en-14'],
          intro:
            'Get to one sentence that three customers repeat the same way, then put it everywhere before a single article runs.',
          blocks: [
            { type: 'rule', text: "Good PR distributes trust. It doesn't manufacture substance." },
            {
              // T22: PR does not fix weak positioning, it exposes it
              type: 'p',
              text: "PR doesn't create a story. It distributes the one you already have. PR doesn't fix weak positioning, it exposes it. With the sentence, every article compounds. Without it, every article confuses people a little more.",
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Write one sentence',
                  body: 'What you do, for who, and why now. No jargon. Start from your answers to questions one to three in section 3.',
                },
                {
                  title: 'Read it to three customers',
                  body: 'Ask each one to say it back in their own words. Write down exactly what they say. Do not correct them.',
                },
                {
                  title: 'Cut until they match',
                  body: 'If they all say something different, the work is the sentence, not the press. Cut and test again.',
                },
                {
                  title: 'Put it everywhere',
                  body: 'The top of your site, your profiles, and the first line of every pitch to a reporter. Reporters repeat what they can understand in one read.',
                },
                {
                  title: 'Then brief the agency',
                  body: 'The sentence is the first line of the brief, and the agency distributes it. If they want to rewrite it, run the customer test on their version first.',
                },
              ],
            },
            {
              type: 'template',
              title: 'The sentence and the say-it-back script',
              body: `THE SENTENCE
[Company] helps [who, specific] [do what, in plain words] because [why now: a dated change].

THE SCRIPT (call or in person, one customer at a time)
"I'm going to read you one sentence about us. Then tell me, in your own words, what we do. There's no right answer."

[Read the sentence once. Do not repeat it.]

"So, what do we do?"

[Write their exact words. No follow-up hints.]

"Who would you say it's for?"
"Why would someone need it now rather than next year?"`,
            },
            {
              type: 'sheet',
              id: 'say-it-back',
              title: 'Say-it-back log',
              columns: ['Round', 'Sentence tested', 'Customer 1 said', 'Customer 2 said', 'Customer 3 said', 'All three match (Y/N)', 'What to cut next'],
              rows: [
                ['1', '', '', '', '', '', ''],
                ['2', '', '', '', '', '', ''],
                ['3', '', '', '', '', '', ''],
              ],
              note: 'Use three different customers each round if you can, so nobody is repeating what they heard last time.',
            },
            {
              type: 'template',
              title: 'Prompt: cut the jargon',
              body: `Our one sentence: "[sentence]"
How three customers repeated it: "[customer 1]", "[customer 2]", "[customer 3]"
Our buyer: [role, industry, market]

1. List every word in our sentence that none of the three customers used. Mark which ones a buyer in [industry] would never say out loud.
2. List the words the customers used that our sentence does not.
3. Write three shorter versions that keep what, for who and why now, using the customers' words. No category buzzwords, no adjectives that cannot be checked.
4. For each version, say which customer phrase it borrows from.

Do not add any claim that is not in the original sentence or the customer answers.`,
            },
            {
              type: 'check',
              id: 'before-agency',
              title: 'Before you sign an agency',
              items: [
                'Three customers repeated the sentence and their versions match',
                'It is the top line of your site',
                'It is in your founder and company profiles',
                'It is the first line of every pitch to a reporter',
                'It agrees with your answers to questions one to three in section 3',
                'You have a fact for the first story (section 2)',
                'The agency brief opens with it',
              ],
            },
          ],
        },
      ],
      next: {
        text: 'If you want the distribution slide, the decks and the press run built with you before your next round, start here.',
        cta: 'Work with Daniel',
        page: 'work',
      },
    },
  },
};

export default kit;
