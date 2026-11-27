import type { Kit } from './types';

const kit: Kit = {
  word: 'RAISE',
  slug: 'raise',
  videos: [
    {
      id: 'en-02',
      lang: 'en',
      promise: "Comment RAISE and I'll send you the fundraising kit, so you know if you have demand or just interest before you raise.",
    },
    {
      id: 'en-06',
      lang: 'en',
      promise: "Comment RAISE and I'll send you the fundraising kit, so you spot debt dressed as equity before you sign.",
    },
    {
      id: 'en-16',
      lang: 'en',
      promise: "Comment RAISE and I'll send you the fundraising kit, so equity follows the work and not the title.",
    },
  ],
  content: {
    en: {
      title: 'The fundraising kit',
      promise:
        'Before you raise: check whether you have demand or just interest, read every term sheet for debt dressed as equity, and write vesting that follows the work.',
      minutes: 40,
      howTo: [
        'Go in order: demand first, then the terms, then the vesting. Each section answers one video.',
        'Copy the sheets into Google Sheets or Excel. The formulas come with them.',
        'Paste the prompts into Claude or ChatGPT with your real documents. They return tables and questions, not opinions.',
        'Nothing here is legal or investment advice. A lawyer reviews every final term.',
      ],
      sections: [
        // Section for en-02
        {
          id: 'demand-or-interest',
          title: 'Demand or interest: the signal audit',
          videos: ['en-02'],
          intro:
            'Sort every signal behind your raise into customer money and investor attention. You leave knowing which one you have, and what to do next month if it is the wrong one.',
          blocks: [
            { type: 'rule', text: "Demand is proven with the customer's money. Not the fund's." },
            {
              // ev-31: post-quantum blockchain, $4M pre-seed, Q3 2026, no users, zero customer revenue.
              type: 'p',
              text:
                "Example of the gap: a post-quantum blockchain raised $4M in pre-seed in Q3 2026 with no users and zero customer revenue. That round proves investors were interested. It doesn't prove yet that anyone will pay.",
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'List every signal you use to justify the raise',
                  body:
                    'Everything in the deck, the updates and your head: metrics, logos, quotes, meetings, follow ups, term sheets, waitlists, pilots.',
                },
                {
                  title: 'Mark where each one came from',
                  body: 'Customer (someone who would use or buy the product) or investor (a fund, an angel, an accelerator, a strategic acting as investor).',
                },
                {
                  title: 'For the customer ones, ask if money moved',
                  body:
                    'A paid pilot, a signed order, a renewal. Interest calls, free pilots, unpaid LOIs and "we would buy this" quotes do not count.',
                },
                {
                  title: 'Count',
                  body: 'If most of your signals are investor signals, or customer signals with no money, you have interest. Use the sheet or the calculator below.',
                },
                {
                  title: 'If it is interest, spend the next month getting three customers to pay',
                  body:
                    'Even a little. Three paying customers change your next investor meeting more than another round of warm intros.',
                },
                {
                  title: 'Lead with the paying customer',
                  body: 'The best signal you can bring to a fund is a customer who already pays. Put it first, and label the rest as interest.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'signal-audit',
              title: 'Signal audit',
              columns: [
                'Signal',
                'Where it appears',
                'Investor signal (1 or 0)',
                'Customer, no money moved (1 or 0)',
                'Customer, money moved (1 or 0)',
                'Question to answer',
              ],
              rows: [
                ['Example: term sheet from a seed fund', 'Deck, traction slide', '1', '0', '0', 'Does any customer know this fund exists?'],
                ['Example: discovery calls with buyers', 'Investor update', '0', '1', '0', 'Which of them would pay for a pilot?'],
                ['Example: paid pilot with a mid size distributor', 'Deck, customers slide', '0', '0', '1', 'Will it renew, and at what price?'],
                ['', '', '', '', '', ''],
                ['', '', '', '', '', ''],
                ['', '', '', '', '', ''],
                ['Total', '', '=SUM(C2:C7)', '=SUM(D2:D7)', '=SUM(E2:E7)', ''],
                ['Demand share (customer money over all signals)', '', '', '', '=E8/(C8+D8+E8)', ''],
              ],
              note:
                'Mark exactly one 1 per row. The example rows are hypothetical: replace them with yours. If the demand share is under half, next month goes to three paying customers.',
            },
            {
              type: 'calc',
              id: 'demand-check',
              title: 'Demand or interest',
              inputs: [
                { id: 'investorSignals', label: 'Investor signals', value: 4, hint: 'Meetings, follow ups, term sheets, intros' },
                { id: 'customerNoMoney', label: 'Customer signals with no money moved', value: 3, hint: 'Interest calls, free pilots, waitlists' },
                { id: 'customerPaid', label: 'Customer signals where money moved', value: 1, hint: 'Paid pilots, signed orders, renewals' },
                { id: 'payingCustomers', label: 'Distinct customers paying today', value: 1 },
              ],
              outputs: [
                { label: 'Signals that are interest, not demand', expr: 'investorSignals + customerNoMoney', format: 'number' },
                { label: 'Signals that are demand', expr: 'customerPaid', format: 'number' },
                { label: 'Paying customers still to find (target: three)', expr: '3-payingCustomers', format: 'number' },
              ],
              verdict: {
                expr: 'customerPaid-investorSignals-customerNoMoney',
                pass: 'Most of your signals are customers paying. You have demand: lead your next investor meeting with it.',
                fail: 'Most of your signals are interest. Spend the next month getting three customers to pay, even a little, before you open the round.',
              },
            },
            {
              type: 'template',
              title: 'Prompt: audit the traction case in your deck',
              body: `You are reviewing the traction case for a startup raise. Be strict: your only job is to separate demand from interest.

Company: [ONE SENTENCE ON WHAT YOU SELL AND TO WHOM]
Stage and planned raise: [STAGE, AMOUNT, TARGET DATE]

Below are the materials I use to justify the raise (deck text, investor updates, pipeline notes, CRM export):
[PASTE MATERIALS]

Task:
1. Extract every signal I use as evidence that the market wants this: a metric, a logo, a quote, a meeting, a term sheet, a waitlist, a pilot.
2. Classify the source of each: CUSTOMER (someone who would use or buy the product) or INVESTOR (fund, angel, accelerator, or a strategic acting as investor).
3. For customer signals: did money move from the customer to us? YES only for a paid pilot, a signed order, a payment received or a renewal. Interest calls, unpaid LOIs, free pilots, waitlists and "we would buy this" quotes are NO.
4. If the materials don't say whether money moved, mark UNKNOWN and write the exact question I need to answer.

Output a table: Signal | Where it appears | Source | Money moved (YES / NO / UNKNOWN) | Counts as demand (YES only if CUSTOMER and YES).
Then give: the count of demand signals, the count of everything else, and the three signals in my deck an investor is most likely to see through, with the reason.

Rules: do not upgrade a signal because it sounds strong. Do not count investor money as market validation. Do not invent numbers: quote them from the materials or leave the cell blank.`,
              note: 'Paste the real deck text, not a summary of it. The point is to catch what you already wrote.',
            },
            {
              type: 'template',
              title: 'Message: turn an interested customer into a paying one',
              body: `Subject: A paid pilot for [THE OUTCOME THEY CARE ABOUT]

Hi [NAME],

When we spoke on [DATE], you said [THE PROBLEM, IN THEIR WORDS]. I'd like to turn that into a short paid pilot instead of another call.

What we'd do: [ONE SENTENCE OF SCOPE], for [DURATION].
What you'd see at the end: [THE RESULT WE MEASURE, AND HOW].
What it costs: [PRICE]. Small on purpose: the point is to prove it works for you. [OPTIONAL: THE FEE IS CREDITED TO THE FIRST CONTRACT IF YOU CONTINUE.]

If that works, I'll send a one page agreement this week. If the price or the scope is wrong, tell me what would make it a yes.

[YOUR NAME]`,
              note: 'Send it to everyone in the "customer, no money moved" column. Each yes moves a row to the demand column.',
            },
            {
              // ev-26: Daniel's opinion, studio session 2026-11-12. ev-15: the fundraising ladder.
              type: 'p',
              text:
                "My view: the real moat today is distribution and traction, because an MVP ships in less than a weekend. Ten good investor meetings can't overshadow the real goal, which is getting customers. When the demand is there, open the round as a program, and the list of funds comes last.",
            },
            {
              // ev-15: tracked link per investor, investor ready in 10 days, double opt in, no promise the round closes.
              type: 'check',
              id: 'before-the-fund-list',
              title: 'Before you open the list of funds',
              items: [
                'In the signal audit, the demand column is the longest one.',
                'Your numbers live in one place, and you update them before every investor meeting.',
                'Your company fits in one sentence.',
                'The data room has one tracked link per investor, so you know who opened what before the follow up.',
                'Intros only through warm paths, with double opt in: the investor agrees to the intro before you are introduced.',
                'Nobody, you included, promises that the round closes.',
              ],
            },
          ],
        },

        // Section for en-06
        {
          id: 'debt-dressed-as-equity',
          title: 'Debt dressed as equity: read the term sheet for it',
          videos: ['en-06'],
          intro:
            'Find the clauses that turn an investor into a lender, price what the deal really costs, and know what to say before you sign.',
          blocks: [
            { type: 'rule', text: 'Equity takes equity risk. Debt wants its money back no matter what.' },
            {
              type: 'p',
              text:
                "Not legal or investment advice. This is how to read the terms before your lawyer does, so you bring the right questions. A lawyer reviews the final draft. There's nothing wrong with debt. There's a lot wrong with paying for it twice.",
            },
            {
              type: 'steps',
              items: [
                {
                  // ev-16: strategic money already closed, not in the pitch; question was whether it counted inside the new round.
                  title: 'Inventory the money already in',
                  body:
                    'Every check that already closed, with its terms. In one AI infrastructure company, strategic money that had already closed was not in the pitch, and the question became whether it counted inside the new round. Settle that before you read a new term sheet.',
                },
                {
                  title: 'Search for anything that guarantees their return',
                  body: 'A minimum multiple, a put option, a forced buyback. Use the checklist below, and ask for side letters too.',
                },
                {
                  title: 'Check who carries the downside',
                  body: 'If the company loses and they still get paid, it is debt, whatever the document calls it.',
                },
                {
                  title: 'If it is debt, price it as debt',
                  body: 'Negotiate an interest rate and a term, and keep your cap table clean. The calculator below compares the two.',
                },
                {
                  title: 'Name it to the investor',
                  body: 'Use the message below. If the investor refuses to call it debt, that tells you how they see the deal.',
                },
              ],
            },
            {
              type: 'check',
              id: 'debt-clauses',
              title: 'The clauses to search for in every term sheet and side letter',
              items: [
                'A guaranteed return or a minimum multiple. Search: `guaranteed`, `minimum return`, `multiple`, `preferred return`.',
                'A put option: the investor can make the company or the founders buy their shares. Search: `put`, `sell back`, `require the Company to purchase`.',
                'A forced buyback or a mandatory redemption on a date or an event. Search: `redeem`, `redemption`, `repurchase`, `buyback`.',
                'Creditor terms: interest, a maturity or repayment date, security over company assets, personal guarantees from founders. Search: `interest`, `maturity`, `security`, `collateral`, `guarantee`.',
                'The downside test: if the company fails, does this investor still get paid? If yes, it is debt.',
                'Side letters and separate agreements: you asked for every document tied to this check, not only the term sheet.',
                'A standard liquidation preference orders who gets paid first in a sale. On its own it is not a guarantee: ask your lawyer how it interacts with anything above.',
              ],
            },
            {
              type: 'sheet',
              id: 'capital-map',
              title: 'Capital map: every check, read the same way',
              columns: [
                'Check or term sheet',
                'Amount',
                'What the document calls it',
                'Guaranteed return or minimum multiple (1 or 0)',
                'Put option (1 or 0)',
                'Forced buyback or redemption (1 or 0)',
                'Paid even if the company fails (1 or 0)',
                'Debt flags',
                'What you do',
              ],
              rows: [
                ['Example: strategic check already closed', '', 'Strategic investment', '0', '0', '0', '0', '=D2+E2+F2+G2', 'Decide if it counts inside the new round'],
                ['Example: new lead term sheet', '', 'Preferred equity', '1', '1', '0', '1', '=D3+E3+F3+G3', 'Price it as debt: rate and term, no equity'],
                ['', '', '', '', '', '', '', '=D4+E4+F4+G4', ''],
                ['', '', '', '', '', '', '', '=D5+E5+F5+G5', ''],
                ['', '', '', '', '', '', '', '=D6+E6+F6+G6', ''],
              ],
              note:
                'Example rows are hypothetical. Any check with a debt flag above 0 gets read, and negotiated, as a loan. Your lawyer confirms on the final draft.',
            },
            {
              type: 'calc',
              id: 'debt-cost',
              title: 'Are you paying twice?',
              inputs: [
                { id: 'amount', label: 'Amount invested', value: 250000, unit: '$', hint: 'Example value, replace it' },
                { id: 'multiple', label: 'Guaranteed multiple', value: 1.5, unit: 'x', hint: 'From the clause: 1.5 means they get back 1.5 times their money' },
                { id: 'years', label: 'Years until they can collect', value: 3, unit: 'years' },
                { id: 'equityPct', label: 'Equity they also take', value: 5, unit: '%', hint: 'If collecting the guarantee returns their shares, run it again with 0' },
                { id: 'exitValue', label: 'Your target company value', value: 10000000, unit: '$', hint: 'Your own target, used only to price the equity' },
                { id: 'loanRate', label: 'Simple annual rate on a plain loan', value: 12, unit: '%', hint: 'From a real lender quote, not a guess' },
              ],
              outputs: [
                { label: 'Guaranteed payout to the investor', expr: 'amount * multiple', format: 'money' },
                { label: 'Guaranteed gain on top of their money', expr: 'amount * multiple-amount', format: 'money' },
                { label: 'Value of the equity they also take, at your target', expr: 'equityPct / 100 * exitValue', format: 'money' },
                { label: 'Total cost of this deal', expr: 'amount * multiple-amount + equityPct / 100 * exitValue', format: 'money' },
                { label: 'Cost of a plain loan at the quoted rate', expr: 'amount * loanRate / 100 * years', format: 'money' },
              ],
              verdict: {
                expr: 'amount * loanRate / 100 * years-(amount * multiple-amount + equityPct / 100 * exitValue)',
                pass: 'On these numbers the deal costs less than the loan, even counting the equity. Still read every clause with your lawyer.',
                fail: 'A plain loan at your quoted rate costs less than this deal once the equity is counted. You would be paying twice: negotiate it as debt.',
              },
            },
            {
              type: 'template',
              title: 'Prompt: find the debt in a term sheet before the lawyer review',
              body: `You are helping a founder read investment documents before the lawyer review. You are not giving legal advice. You are finding clauses and quoting them.

Company: [NAME, STAGE, JURISDICTION]
Document: [TERM SHEET / SAFE / SIDE LETTER / SHAREHOLDERS AGREEMENT]
Money already in the company, with its terms: [EVERY CHECK ALREADY CLOSED, OR "NONE"]

[PASTE THE FULL DOCUMENT, INCLUDING SIDE LETTERS]

Find every clause that does any of the following, and quote it word for word with its section number:
1. Guarantees the investor a return or a minimum multiple.
2. Gives the investor a put option, or any right to make the company or the founders buy their shares.
3. Forces a buyback or a redemption on a date or an event.
4. Adds creditor terms: interest, maturity, a repayment date, security over assets, founder guarantees.
5. Pays the investor even if the company fails.
6. Pays anyone a fee tied to the amount raised.

Output a table: Section | Exact quote | Type (1 to 6) | Who carries the downside under this clause | Question for my lawyer.
Then one line: does this investor take equity risk, or does the money come back no matter what? Answer EQUITY, DEBT or MIXED, and name the clauses that decide it.

Rules: quote, don't paraphrase. If a clause is ambiguous, say so and add it to the questions. Don't tell me whether to sign. Don't invent terms that aren't in the text.`,
              note: 'Run it on every document tied to the check, then take the questions column to your lawyer.',
            },
            {
              type: 'template',
              title: 'Message: name the debt and offer two clean options',
              body: `Hi [INVESTOR NAME],

Thanks for the terms. Before we go further, one thing to name plainly.

Section [X] gives you [A MINIMUM MULTIPLE OF [N]x / A PUT OPTION / A FORCED BUYBACK ON [DATE OR EVENT]]. With that clause, the money comes back whether the company does well or not. That's how a loan works, and we're open to a loan.

Two ways we can do this:
1. A loan: [AMOUNT] at [RATE] over [TERM], no equity.
2. Equity: the same terms as the rest of the round, without section [X], so we share the risk the same way.

Either one works for us. What we can't do is pay for the same money twice, once as a guaranteed return and again in equity.

Which one fits you better?

[YOUR NAME]`,
              note: 'Have your lawyer check the loan terms you propose before you send it.',
            },
            {
              // ev-19: SEC view of transaction-based compensation, Neogenix (2012); founder offered a fee tied to the round.
              type: 'check',
              id: 'fees-tied-to-the-round',
              title: 'One more cost to catch before you sign: fees tied to the round',
              items: [
                'Is anyone (a finder, an advisor, a connector) offered a fee tied to the amount raised? In the US, the SEC treats transaction-based pay as the hallmark of a broker.',
                'If that person has no broker license, the contract can be voidable and investors can seek rescission. The risk is the company\'s, not the finder\'s (Neogenix, 2012).',
                'You checked whether the fee is legal before you talked about the number. A founder I advise was offered a fee tied to the round, and that check came first.',
                'You looked the person up on FINRA BrokerCheck and asked your lawyer how to pay for help without tying it to the round.',
              ],
            },
          ],
        },

        // Section for en-16
        {
          id: 'vesting-in-thirds',
          title: 'Vesting in thirds: equity that follows the work',
          videos: ['en-16'],
          intro:
            'Write the vesting for founders, early hires and advisors before the first share is issued, so nobody walks away with a large stake for little work.',
          blocks: [
            { type: 'rule', text: 'Equity should follow the work, not the title.' },
            {
              // ev-18: Daniel's vesting recipe; he has seen founders leave with large equity for little work; ~$500K threshold example.
              type: 'p',
              text:
                "I've watched founders walk away with a large stake for very little work. The fix isn't trust, it's how you write the vesting. Not legal, tax or investment advice: the half a million dollar threshold below is an example from a real cap table conversation, not a rule. Set your own number with your lawyer.",
            },
            {
              type: 'steps',
              items: [
                {
                  title: 'Split founder equity in thirds',
                  body:
                    'One third for the work already done. One third for two years of service. One third that vests when the company crosses a fundraising threshold, something like half a million dollars.',
                },
                {
                  title: 'Early hires vest on time, plus a tranche tied to their metric',
                  body: 'The metric is the one their role moves. A sales hire on signed revenue, a product hire on the release that ships. Write how it is measured.',
                },
                {
                  title: 'Advisors vest on metrics and time, or on deliverables',
                  body: 'Never on time alone. An advisor who stops showing up should stop vesting.',
                },
                {
                  title: 'Put it in writing before the first share is issued',
                  body: 'With a lawyer, not in a chat. Write down what happens to unvested equity when someone leaves.',
                },
              ],
            },
            {
              type: 'sheet',
              id: 'vesting-plan',
              title: 'Vesting plan',
              columns: [
                'Person',
                'Role',
                'Total equity (% of company)',
                'For work already done (% of their total)',
                'For service (% of their total)',
                'For a milestone or KPI (% of their total)',
                'Equity for work done (% of company)',
                'Equity for service (% of company)',
                'Equity for milestone (% of company)',
                'Split check (must be 100)',
                'Service period',
                'Milestone or KPI, and who verifies it',
              ],
              rows: [
                ['Example: cofounder A', 'CEO', '', '34', '33', '33', '=C2*D2/100', '=C2*E2/100', '=C2*F2/100', '=D2+E2+F2', '2 years', 'Fundraising threshold: [YOUR NUMBER], verified by signed closing documents'],
                ['Example: cofounder B', 'CTO', '', '34', '33', '33', '=C3*D3/100', '=C3*E3/100', '=C3*F3/100', '=D3+E3+F3', '2 years', 'Same threshold as cofounder A'],
                ['Example: first sales hire', 'Sales', '', '0', '50', '50', '=C4*D4/100', '=C4*E4/100', '=C4*F4/100', '=D4+E4+F4', '[PERIOD]', 'Signed revenue, verified by contracts and invoices'],
                ['Example: advisor', 'Advisor', '', '0', '50', '50', '=C5*D5/100', '=C5*E5/100', '=C5*F5/100', '=D5+E5+F5', '[PERIOD]', 'Deliverables written in the agreement, verified by the CEO'],
                ['', '', '', '', '', '', '=C6*D6/100', '=C6*E6/100', '=C6*F6/100', '=D6+E6+F6', '', ''],
              ],
              note:
                'The splits for the hire and the advisor are examples, not recommendations. Fill in total equity per person. An advisor row with 100 in the service column breaks the rule: never time alone.',
            },
            {
              type: 'calc',
              id: 'walkaway',
              title: 'What walks out the door if a cofounder leaves today',
              inputs: [
                { id: 'equity', label: 'Their total equity', value: 30, unit: '%', hint: 'Example value, replace it' },
                { id: 'serviceDone', label: 'Share of the service period completed', value: 25, unit: '%', hint: '0 to 100' },
                { id: 'milestone', label: 'Fundraising threshold reached', value: 0, hint: '1 if yes, 0 if no' },
                { id: 'valuation', label: 'Company value today', value: 5000000, unit: '$', hint: 'Your last price or your own estimate' },
              ],
              outputs: [
                { label: 'Vested with thirds (% of company)', expr: 'equity * (1 / 3 + serviceDone / 100 / 3 + milestone / 3)', format: 'number' },
                { label: 'Returns to the company with thirds (% of company)', expr: 'equity-equity * (1 / 3 + serviceDone / 100 / 3 + milestone / 3)', format: 'number' },
                { label: 'Value that leaves with them without vesting', expr: 'equity / 100 * valuation', format: 'money' },
                { label: 'Value that leaves with them with thirds', expr: 'equity / 100 * valuation * (1 / 3 + serviceDone / 100 / 3 + milestone / 3)', format: 'money' },
              ],
            },
            {
              type: 'check',
              id: 'before-first-share',
              title: 'Before the first share is issued',
              items: [
                "Every founder's thirds are written: work done, service period, fundraising threshold.",
                'The threshold is your number, set with your lawyer, not copied from a video.',
                'Each early hire has a time schedule plus a tranche tied to the metric their role moves.',
                'No advisor vests on time alone.',
                'Every milestone can be verified by someone other than the person it pays: a bank statement, a signed agreement, a system.',
                'It is written what happens to unvested equity when someone leaves.',
                'A lawyer drafted the documents. A chat message is not a vesting agreement.',
                'Tax questions are answered before the grant. Some elections, like the 83(b) in the US, have short deadlines.',
              ],
            },
            {
              type: 'template',
              title: 'Message: propose the thirds to your cofounder',
              body: `[NAME], before we issue any shares, I want us to agree on how equity vests, for both of us, in writing.

The proposal, the same rule for each founder:
1. One third for the work already done, issued now.
2. One third for two years of service, vesting [MONTHLY / QUARTERLY] over that time.
3. One third when the company raises [THE THRESHOLD WE SET WITH THE LAWYER].

If either of us leaves, what hasn't vested stays with the company, so whoever keeps building isn't carrying someone who stopped.

This isn't about trust. It's so the split follows the work, whatever happens to either of us. If you see it differently, tell me what you'd change, and then we take it to [LAWYER] to write it properly.

[YOUR NAME]`,
              note: 'Send it before the shares exist. After someone leaves, this conversation is a dispute.',
            },
            {
              type: 'template',
              title: 'Message: an advisor offer that vests on deliverables',
              body: `Hi [ADVISOR NAME],

We'd like you involved, and we want the equity to match what you'll actually do.

Proposal: [TOTAL]% of the company, in [NUMBER] parts:
1. [DELIVERABLE 1, FOR EXAMPLE: INTROS TO QUALIFIED BUYERS IN [SEGMENT] THAT TAKE A FIRST MEETING]: [SHARE]%
2. [DELIVERABLE 2 OR METRIC]: [SHARE]%
3. Time: [SHARE]% over [PERIOD], vesting only while the deliverables above are in progress.

Nothing vests on time alone. If a deliverable doesn't happen, that part stays with the company, no hard feelings.

If this works, our lawyer will send the agreement. If you'd weigh it differently, tell me how.

[YOUR NAME]`,
            },
            {
              type: 'template',
              title: 'Prompt: turn your cap table into a vesting brief for the lawyer',
              body: `You are preparing a vesting brief that a startup lawyer will turn into documents. You are not drafting the legal documents and you are not giving tax advice.

Cap table today: [PASTE: NAME, ROLE, SHARES OR %, DATE JOINED]
Rules we agreed:
1. Founders: one third for work done, one third over [SERVICE PERIOD], one third at a fundraising threshold of [AMOUNT].
2. Early hires: time-based vesting plus tranches tied to the metric their role moves.
3. Advisors: metrics and time, or deliverables. Never time alone.
Metrics we use: [LIST, WITH HOW EACH ONE IS MEASURED AND WHO REPORTS IT]

For each person, output: Name | Role | Total equity | Tranche 1 (what, when) | Tranche 2 | Tranche 3 | Metric or deliverable, and who verifies it | What happens to unvested equity if they leave.

Then flag, one line each:
1. Anyone who vests on time alone and is not a founder or an employee on a service tranche.
2. Any milestone the holder can declare met by themselves.
3. Any milestone that can't be checked against a document or a system (bank statement, signed agreement, dashboard).
4. Anything missing that a lawyer will ask for.

Then list the questions I should take to the lawyer, including tax elections and their deadlines in [JURISDICTION].

Rules: don't fill gaps with assumptions, mark them MISSING. Don't recommend percentages.`,
              note: 'Bring the output and the vesting plan sheet to the first meeting with your lawyer.',
            },
          ],
        },
      ],
      next: {
        text: 'If you want a second read on the round before it opens, from the signals to the term sheet to the cap table, start here.',
        cta: 'Work with me',
        page: 'work',
      },
    },
  },
};

export default kit;
