import type { Kit } from './types';

// PIPELINE: the pipeline kit (English). Videos en-09, en-12, en-19.
// Sources: en-09 is T24 (gtm-playbook-web3.ts, section 10 and "Common Failure Modes"),
// en-12 is T36 (unbound-social voice sample 8, verified by Daniel 2026-09-24),
// en-19 is T27 (LinkedIn post post-e3575233, 2026-09-23).
// Every amount in the calculator and every filled row in the sheets is a labeled example.

const kit: Kit = {
  word: 'PIPELINE',
  slug: 'pipeline',
  videos: [
    {
      id: 'en-09',
      lang: 'en',
      promise: "Comment PIPELINE and I'll send you the pipeline kit, so your next conference turns into meetings.",
    },
    {
      id: 'en-12',
      lang: 'en',
      promise: "Comment PIPELINE and I'll send you the pipeline kit, so your launch starts with buyers, not a translation.",
    },
    {
      id: 'en-19',
      lang: 'en',
      promise: "Comment PIPELINE and I'll send you the pipeline kit, so your first contract turns into the real purchase.",
    },
  ],
  content: {
    en: {
      title: 'The pipeline kit',
      promise:
        'Turn your next conference into booked meetings, start a LATAM launch with buyers instead of a translation, and use your first contract to write the second.',
      minutes: 40,
      howTo: [
        'Three sections, one per video: a conference, a LATAM launch, a first enterprise contract. Start with the one on your calendar.',
        'Copy the sheets into Google Sheets or Excel before you start. They are the part you will work from every week.',
        'The prompts expect real notes or transcripts pasted in, and they are told to mark gaps instead of filling them with guesses.',
        'Checklist ticks stay in this browser, so you can come back and use them as your live list.',
      ],
      sections: [
        // ---------------------------------------------------------------- en-09 (T24)
        {
          id: 'conference',
          title: 'Make a conference pay',
          videos: ['en-09'],
          intro:
            'Who you go to see, what you write down after each conversation, the note you send within 24 hours, and the sheet you call from on Monday.',
          blocks: [
            {
              type: 'rule',
              text: "Photos aren't pipeline. Meetings are. Every conversation becomes a tracked follow-up within 24 hours.",
            },
            {
              type: 'p',
              text: 'Most of what an event could produce dies in the first day after it. Event budgets for next year are being set now, so price the event by what one booked meeting costs you, before you buy the ticket and again after you fly home.',
            },
            {
              type: 'calc',
              id: 'event-cost-per-meeting',
              title: 'What one meeting from this event costs you',
              inputs: [
                { id: 'ticket', label: 'Tickets for your team', value: 2000, unit: 'USD', hint: 'Example value. Use your own.' },
                { id: 'booth', label: 'Booth, sponsorship or side event', value: 0, unit: 'USD', hint: 'Zero if you only attend.' },
                { id: 'travel', label: 'Flights and hotel', value: 2500, unit: 'USD', hint: 'Example value. Use your own.' },
                { id: 'dinners', label: 'Dinners and hosting', value: 800, unit: 'USD', hint: 'Example value. Use your own.' },
                {
                  id: 'meetings',
                  label: 'Meetings booked from the event',
                  value: 6,
                  hint: 'Before the event: the number you plan from your target list. After: the real count from your log.',
                },
                {
                  id: 'maxcost',
                  label: 'Your ceiling: the most one booked meeting is worth to you',
                  value: 1000,
                  unit: 'USD',
                  hint: 'You set this from your deal size and close rate. Example value.',
                },
              ],
              outputs: [
                { label: 'Total cost of the event', expr: 'ticket+booth+travel+dinners', format: 'money' },
                { label: 'Cost per booked meeting', expr: '(ticket+booth+travel+dinners)/meetings', format: 'money' },
              ],
              verdict: {
                expr: 'maxcost-(ticket+booth+travel+dinners)/meetings',
                pass: 'Under your ceiling. Go, and protect the meeting count with the 24 hour note.',
                fail: 'Over your ceiling. Book more meetings before you fly, cut the spend, or skip this one.',
              },
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Two weeks out, write the target list',
                  body: 'Every person you need to see, and the one thing you will propose to each of them. If you cannot write the proposal, that person is not a target yet.',
                },
                {
                  title: 'Ask for the slot before you fly',
                  body: 'Send the pre-event message to the top of the list. A meeting is easier to get when the time already exists on both calendars.',
                },
                {
                  title: 'After every conversation, write one thing',
                  body: "What is hurting them right now, in their words. A 20 second voice note before you walk to the next person is enough. Nothing else is required: not their title, not the small talk.",
                },
                {
                  title: 'Within 24 hours, send the note',
                  body: 'The problem they told you, one idea for it, and a time for a call. Not "great to meet you". A problem, an idea, a time.',
                },
                {
                  title: 'Log every one with the next step',
                  body: 'Each conversation gets a row, an owner and a date. On Monday you call down the sheet instead of scrolling through business cards.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'event-targets',
              title: 'Target list (fill before the event)',
              columns: ['Name', 'Company', 'Role', 'Why them, now', 'The one thing I will propose', 'Slot asked for (Y/N)', 'Slot confirmed (date, time)'],
              rows: [
                ['Example: [NAME]', 'Example: mid-size logistics company', 'Head of operations', 'Announced a new warehouse last month', 'A two week pilot on [YOUR OFFER] for the new site', 'Y', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
                ['', '', '', '', '', '', ''],
              ],
              note: 'If a row has no proposal, it is a wish, not a target. Fill the proposal or delete the row.',
            },
            {
              type: 'template',
              title: 'Pre-event message (send 7 to 10 days before)',
              body: `Hi [FIRST NAME], I will be at [EVENT] on [DATES].

I have been looking at [ONE SPECIFIC THING ABOUT THEIR COMPANY: a launch, a hire, a new market, a public number]. We help [TYPE OF COMPANY] with [OUTCOME], and I have one idea for [THEIR SITUATION] I would like to show you in 15 minutes.

Would [DAY] at [TIME] near [VENUE OR AREA] work, or is there a better slot while you are there?

[YOUR NAME]`,
              note: 'One proposal, one time. Do not attach a deck. If they say yes, the slot goes in the target list the same day.',
            },
            {
              type: 'template',
              title: 'The 24 hour note (email, LinkedIn or WhatsApp)',
              body: `Hi [FIRST NAME], at [EVENT] you told me [THE PROBLEM, IN THEIR WORDS].

One idea for it: [ONE CONCRETE IDEA, ONE OR TWO SENTENCES. What you would do first, not your company overview].

Could we look at it for 20 minutes on [DAY] at [TIME]? If that does not work, send me a time that does.

[YOUR NAME]`,
              note: 'Three parts, nothing else: the problem, an idea, a time. If you cannot remember their problem, you did not write it down, and the note will not work.',
            },
            {
              type: 'template',
              title: 'Prompt: turn your event voice notes into notes and log rows',
              body: `You are my follow-up assistant after a conference. Below are my raw voice note transcripts from [EVENT], one per conversation, plus my offer.

My offer: [ONE PARAGRAPH: what you sell, to whom, the outcome].
My calendar slots for calls next week: [LIST OF SLOTS].

For each conversation:
1. Extract: name, company, role (if said), and THE PROBLEM in their own words. Quote it if I quoted them.
2. Write a follow-up note with exactly three parts: the problem, one concrete idea tied to my offer, one specific time from my slots. Under 90 words. No "great to meet you", no "hope you enjoyed the event", no company overview.
3. Output one row for my log: Name | Company | Met at | Problem | Idea offered | Proposed time | Next step | Owner.

Rules:
- If a note has no problem in it, do NOT invent one. Write "NO PROBLEM CAPTURED" and put that row in a separate list called "Ask before writing".
- Do not offer anything my offer does not cover.
- Use a different slot for each person; if I run out of slots, say so.
- Output the notes first, then the log rows as a table I can paste into a sheet.

Voice notes:
[PASTE TRANSCRIPTS]`,
            },
            {
              type: 'sheet',
              id: 'event-log',
              title: 'Event log (one row per conversation)',
              columns: ['Name', 'Company', 'Met at', 'What is hurting them', 'Idea I offered', 'Note sent (date)', 'Hours after meeting', 'Call booked (date)', 'Next step', 'Owner', 'Due'],
              rows: [
                ['Example: [NAME]', 'Example company', '[EVENT], day 1', 'Month-end close takes them two weeks', 'Automate the invoice matching step first', '[DATE]', '18', '[DATE]', 'Call, bring the one-page plan', '[YOU]', '[DATE]'],
                ['', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', '', '', ''],
              ],
              note: 'Any row with more than 24 in "Hours after meeting" is a note sent late. Any row with no "Call booked" by Friday gets one more message and then a decision: keep or drop.',
            },
            {
              type: 'check',
              id: 'event-day-routine',
              title: 'Every evening of the event',
              items: [
                'Every conversation today has a voice note with their problem in it.',
                'Every note from today is sent, or scheduled to send before 24 hours have passed.',
                'Every conversation is a row in the event log, with an owner and a due date.',
                'Tomorrow\'s target slots are confirmed, or I have messaged to confirm them.',
                'Monday morning is blocked on my calendar to call down the log.',
              ],
            },
          ],
        },

        // ---------------------------------------------------------------- en-12 (T36)
        {
          id: 'latam',
          title: 'Enter LATAM through buyers, not a translation',
          videos: ['en-12'],
          intro:
            'Answer three questions with five local buyers in one afternoon, pick one country, price it the way buyers there pay, and start through whoever already has their trust.',
          blocks: [
            {
              type: 'rule',
              text: 'A translated pitch is not a market entry. Payments, trust, distribution, regulation and buyer behavior all work differently.',
            },
            {
              type: 'compare',
              bad: {
                title: 'The translated launch',
                items: [
                  'Same product and pitch, in Spanish',
                  'A Spanish landing page as the main channel',
                  'Prices in dollars',
                  'Five countries announced at once',
                  'Card checkout only',
                  'Cold outreach to buyers who have never heard of you',
                ],
              },
              good: {
                title: 'The buyer-first launch',
                items: [
                  'Five local buyers answer three questions before anything ships',
                  'The channel is where they decide: often a WhatsApp chat and a referral',
                  'Prices in local currency from day one',
                  'One country until it has paying customers',
                  'The payment methods your buyers actually use',
                  'First deals through a distributor, association or partner they already trust',
                ],
              },
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Pick one country',
                  body: 'Write down why that one: buyers you can reach this month, a partner who already sells there, a payment method you can support. If you cannot write a reason, you are picking by market size, not by access.',
                },
                {
                  title: 'Book five buyers for one afternoon',
                  body: 'People in that country who would sign or pay for what you sell. Not advisors, not friends from the ecosystem.',
                },
                {
                  title: 'Ask the three questions',
                  body: 'How do you pay for this kind of thing? Where do you decide to buy it? Who do you already trust for it? Use the interview script below and fill one row per buyer.',
                },
                {
                  title: 'Set the local price and the payment path',
                  body: 'Local currency from day one, with the methods your five buyers named. A dollar price tells a LATAM buyer you are not really there yet.',
                },
                {
                  title: 'Start through whoever has their trust',
                  body: 'If three of five name the same distributor, association or partner, that is your first conversation, before any ad or landing page.',
                },
                {
                  title: 'Get paying customers, then expand',
                  body: 'Write the number of paying customers that earns country two. You set it now, so the next country is a decision and not a mood.',
                },
              ],
            },
            {
              type: 'template',
              title: 'Buyer interview script (20 minutes, one buyer)',
              body: `Context for me: [COUNTRY], [WHAT YOU SELL], [TYPICAL BUYER ROLE].

Opening (1 min)
"I am not selling today. We are deciding how to launch [PRODUCT TYPE] in [COUNTRY], and I would rather ask buyers than guess."

1. How you pay (5 min)
- "The last time you bought something like this, how did you pay? Card, transfer, cash, installments, something else?"
- "Who approved the payment, and what did they need to see?"
- "Would a price in dollars change anything for you? Why?"

2. Where you decide (5 min)
- "Walk me through the last time you chose a provider for this. Where did it start?"
- "Was there a WhatsApp chat, a call, a referral, a website? Which one actually moved you?"
- "Who else was in that decision?"

3. Who you trust (5 min)
- "Who do you ask before buying something like this? A distributor, an association, a colleague, a local partner?"
- "Is there anyone whose recommendation would make you take a meeting this week?"

Close (4 min)
- "If this existed in [LOCAL CURRENCY] at [PRICE], paid by [METHOD THEY NAMED], what would stop you from trying it?"
- "Can I come back to you when it is live?" (Write down the exact answer.)`,
              note: 'Ask about what they did last time, not what they would do. Past behavior is the answer you can build on.',
            },
            {
              type: 'sheet',
              id: 'latam-interviews',
              title: 'Five buyers, three questions',
              columns: ['Buyer (role, company type)', 'Country', 'How they pay', 'Who approves payment', 'Where they decide', 'Who they trust', 'Reaction to local price', 'Come back when live? (Y/N)'],
              rows: [
                ['Example: operations lead, distributor', '[COUNTRY]', 'Transfer, 30 days', 'Owner', 'WhatsApp group with peers, then a call', 'Their industry association', 'Fine in local currency, unsure in dollars', 'Y'],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
              ],
              note: 'Read the columns down, not the rows across. If three of five say the same thing in a column, that is your launch decision for that question.',
            },
            {
              type: 'template',
              title: 'Prompt: turn the five interviews into a launch brief',
              body: `You are helping me decide how to launch in [COUNTRY]. Below are my notes from [NUMBER] buyer interviews, each answering: how they pay, where they decide, who they trust.

What I sell: [ONE PARAGRAPH].
My current plan: [WHAT YOU WERE GOING TO DO BEFORE THE INTERVIEWS].

Produce:
1. For each of the three questions: the answer most buyers gave, how many gave it, and the direct quotes that support it.
2. Where my current plan contradicts what buyers said, line by line.
3. A launch brief: payment methods to support, price currency, the channel where the first conversations happen, and the first partner or association to approach, each tied to the interview evidence.
4. What the interviews did NOT answer, as a list of questions for the next five buyers.

Rules:
- Use only what is in my notes. Do not add general claims about "LATAM buyers" or about [COUNTRY] that the notes do not support. If you know something relevant from outside the notes, put it in a separate section called "To verify", never in the brief.
- If fewer than three buyers agree on an answer, say the answer is not settled.

Notes:
[PASTE THE SHEET OR YOUR NOTES]`,
            },
            {
              type: 'template',
              title: 'First message to the partner buyers already trust (WhatsApp or email)',
              body: `Hi [NAME], [MUTUAL CONTACT OR THE BUYER WHO NAMED THEM] told me that when [TYPE OF COMPANY] in [COUNTRY] need [PROBLEM], they ask you first.

We are launching [PRODUCT] in [COUNTRY], priced in [LOCAL CURRENCY], and we would rather reach buyers through someone they already trust than through ads.

I would like to propose [WHAT THEY GET: a referral fee, a reseller margin, a co-branded offer for their members, something they win when the customer wins]. Could we talk for 20 minutes on [DAY] at [TIME]?

[YOUR NAME]`,
              note: 'Lead with what the partner gets when their people buy, not with your logo next to theirs.',
            },
            {
              type: 'check',
              id: 'latam-launch-ready',
              title: 'Before you launch in the first country',
              items: [
                'Five buyers in this country answered the three questions, and the answers are in the sheet.',
                'The price is in local currency.',
                'The payment methods the buyers named are working, including the slow ones (transfer, installments).',
                'Someone answers the channel where buyers decide (for many, a WhatsApp number) in their language and during their business hours.',
                'The first partner, distributor or association the buyers trust has been contacted.',
                'I checked with a local advisor what I need to sell legally in this country (invoicing, registration, any sector rules).',
                'The number of paying customers that earns a second country is written down.',
              ],
            },
          ],
        },

        // ---------------------------------------------------------------- en-19 (T27)
        {
          id: 'second-workflow',
          title: 'Plan the second workflow before you sell the first',
          videos: ['en-19'],
          intro:
            'Use the first contract to write the second: the log you keep while you deliver, the midpoint meeting with one number and one idea, and the proposal you hand over at close.',
          blocks: [
            {
              type: 'rule',
              text: 'Nobody buys the first workflow. They try it. The second workflow is where the real purchase happens.',
            },
            {
              type: 'p',
              text: 'They sign the first one because it is small enough to explain to whoever approves the budget. By the second, you know their systems, their exceptions and their people. That context is what you are really selling.',
            },
            {
              type: 'template',
              title: 'Scope the first workflow so the budget approver can say yes',
              body: `First workflow, in one sentence for [BUDGET APPROVER ROLE]:
"[YOUR COMPANY] will [ONE TASK] for [ONE TEAM], so that [ONE NUMBER THEY ALREADY TRACK] goes from [TODAY] to [TARGET] in [WEEKS]."

What is in: [ONE PROCESS, ONE TEAM, ONE SYSTEM]
What is out (for now): [NEIGHBORING PROCESSES YOU ALREADY SUSPECT]
The number we will show at the midpoint: [METRIC, HOW WE MEASURE IT, WHO CONFIRMS IT]
Same people on our side from start to close: [NAMES]`,
              note: 'The "what is out" line is not a loss. It is the first draft of workflow two.',
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'While you deliver, log every exception and every neighboring process',
                  body: 'Every time someone says "except when", "that depends on", "the other team handles that" or "we also do this by hand", it goes in the log the same day.',
                },
                {
                  title: 'Halfway through, show one number and one idea',
                  body: 'One number from the first workflow, confirmed by their side, and one concrete idea for the next, taken from the log. Not a roadmap. One idea.',
                },
                {
                  title: 'Close the delivery with the second workflow already written',
                  body: 'Same team, same context. The handoff meeting ends with the proposal for workflow two on the table, not with "let us know if you need anything".',
                },
                {
                  title: 'Keep the same people on the account',
                  body: 'If the people who built the context leave the account, the second workflow starts from zero and you are back to competing on price.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'exception-log',
              title: 'Exception and neighbor log (keep it from day one)',
              columns: ['Date', 'Who said it (role)', 'Type (exception / neighboring process)', 'What they said', 'Systems involved', 'How they handle it today', 'Who feels it most', 'Candidate for workflow 2 (Y/N)'],
              rows: [
                ['[DATE]', 'Example: AP analyst', 'Exception', '"Invoices in a second currency we do by hand"', 'ERP, email', 'Spreadsheet, two people, every Friday', 'Finance lead', 'Y'],
                ['[DATE]', 'Example: ops manager', 'Neighboring process', '"Purchasing sends us the same data again"', 'Purchasing tool, ERP', 'Copy and paste', 'Ops manager', 'Y'],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
              ],
              note: 'The rows marked Y with the same "Who feels it most" are your workflow two. That person is your next sponsor.',
            },
            {
              type: 'template',
              title: 'Prompt: pull exceptions and neighboring processes from call transcripts',
              body: `You are reviewing transcripts from the delivery of a project for a client. The project scope is: [ONE SENTENCE SCOPE OF WORKFLOW 1].

Find every place where someone from the client:
- describes an exception to the process we are automating ("except when", "unless", "it depends", "sometimes we have to"),
- mentions a process next to ours that touches the same data, team or system,
- describes manual work, rework, or waiting on another team.

For each one output a row: Date | Speaker role | Type (exception / neighboring process / manual work) | Exact quote | Systems mentioned | Candidate for workflow 2 (Y/N, with a one-line reason).

Rules:
- Quote exactly. Do not paraphrase into something more convenient.
- Do not invent volumes, hours or costs. If the transcript gives a number, include it with the quote; if not, leave the field empty.
- Ignore anything already inside the scope of workflow 1.
- At the end, group the Y rows by the person who feels the problem most and suggest at most two workflow 2 candidates, each with the quotes that support it.

Transcripts:
[PASTE]`,
            },
            {
              type: 'template',
              title: 'Midpoint meeting agenda (30 minutes)',
              body: `Midpoint review: [WORKFLOW 1 NAME], [CLIENT TEAM]
Attendees: [SPONSOR], [BUDGET APPROVER IF POSSIBLE], [THE SAME DELIVERY TEAM]

1. Where we are (5 min): what is live, what is left, the date we close.
2. The number (10 min): [METRIC] went from [BEFORE] to [NOW], measured by [METHOD], confirmed by [THEIR PERSON]. What it means for [THE NUMBER THE APPROVER CARES ABOUT].
3. What we learned (5 min): the two or three exceptions from the log that matter most, in their words.
4. One idea for next (8 min): "[WORKFLOW 2 IN ONE SENTENCE]", because [QUOTE FROM THE LOG]. Ask: "Who would own this on your side?"
5. Next step (2 min): the date we bring the written proposal, before the workflow 1 handoff.`,
            },
            {
              type: 'template',
              title: 'Workflow 2 proposal (one page, handed over at close)',
              body: `Workflow 2: [NAME]
For: [SPONSOR NAME AND ROLE]

What we saw during workflow 1:
- [EXCEPTION OR NEIGHBORING PROCESS, WITH THE QUOTE AND DATE]
- [SECOND ONE]

What we propose: [ONE SENTENCE: task, team, number, weeks]
Why us, now: we already know [SYSTEMS], [EXCEPTIONS] and [PEOPLE]. The same team starts on [DATE], with no discovery phase.
Result of workflow 1: [THE NUMBER, CONFIRMED BY THEIR SIDE]
What is out of scope: [LIST, which is the draft of workflow 3]
Investment and terms: [PRICE, PAYMENT, DURATION]
Decision needed by: [DATE], so the team stays on the account without a gap.`,
            },
            {
              type: 'check',
              id: 'workflow-handoff',
              title: 'Before the workflow 1 handoff meeting',
              items: [
                'The exception log has entries from every week of delivery.',
                'The midpoint number is confirmed in writing by someone on their side.',
                'The workflow 2 proposal is written and names the person who feels the problem most.',
                'The same delivery people are named in the workflow 2 proposal.',
                'The decision date for workflow 2 is before the delivery team would roll off.',
                'The handoff agenda ends with workflow 2, not with "any questions".',
              ],
            },
          ],
        },
      ],
      next: {
        text: 'If you want the follow-up, the launch research and the account log running on agents instead of on memory, work with me.',
        cta: 'Work with Daniel',
        page: 'work',
      },
    },
  },
};

export default kit;
