import { Post, PostType, HomeContent } from '../types';

export const initialHomeContent: HomeContent = {
  hero_title: "Daniel Forero",
  hero_tags: ["Father", "Husband", "Marketer", "Crypto Degen", "AI Nerd", "Angel Investor", "Gamer"],
  logos: [
    { name: 'Google', logoUrl: 'https://cdn.svgporn.com/logos/google.svg' },
    { name: 'Apple', logoUrl: 'https://cdn.svgporn.com/logos/apple.svg' },
    { name: 'Solana', logoUrl: 'https://cdn.svgporn.com/logos/solana.svg' },
    { name: 'Immutable', logoUrl: 'https://cdn.svgporn.com/logos/immutable.svg' },
    { name: 'Rarible', logoUrl: 'https://cdn.svgporn.com/logos/rarible.svg' },
    { name: 'Aptos', logoUrl: 'https://cdn.svgporn.com/logos/aptos.svg' },
    { name: 'Chevron', logoUrl: 'https://cdn.svgporn.com/logos/chevron.svg' },
    { name: 'T-Mobile', logoUrl: 'https://cdn.svgporn.com/logos/t-mobile.svg' },
    { name: 'Auth0', logoUrl: 'https://cdn.svgporn.com/logos/auth0.svg' },
    { name: 'Cloudflare', logoUrl: 'https://cdn.svgporn.com/logos/cloudflare.svg' },
    { name: 'Stripe', logoUrl: 'https://cdn.svgporn.com/logos/stripe.svg' },
    { name: 'Twilio', logoUrl: 'https://cdn.svgporn.com/logos/twilio.svg' },
    { name: 'OpenAI', logoUrl: 'https://cdn.svgporn.com/logos/openai.svg' },
    { name: 'Vercel', logoUrl: 'https://cdn.svgporn.com/logos/vercel.svg' },
  ],
  about: {
    title: "Who’s this guy?",
    body: "I turn Web3 ideas into real-world businesses, and then make sure the world hears about them.\n\nOver the past decade, I’ve helped my clients raise over $100M combined, push millions in stablecoin flows across borders, and crack open new revenue models for everyday users. My growth playbook has powered mainstream traction for global brands, generated nine-figure TVL, and even put blockchain on the pop-culture stage with headline NFT drops for Quentin Tarantino, Doja Cat, and Jennifer Esposito."
  },
  operator: {
    title: "Operator ➜ Angel Investor",
    body: "Alongside my operating roles, I back founders who are reinventing finance, identity, and ownership—then jump in as a hands-on advisor to turn theory into traction. If you’re raising and fit that bill, let’s talk.\n\nI'm looking for relentless founders with a clear vision and the grit to execute."
  },
  socials: [
    { name: 'Instagram', url: 'https://www.instagram.com/danielforeroj/' },
    { name: 'X', url: 'https://www.x.com/danielforeroj/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/danielforeroj/' },
    { name: 'Telegram', url: 'https://t.me/danielforeroj/' },
  ],
  hero_buttons: [
    { label: 'Get in touch', url: 'mailto:hello@danielforeroj.com'},
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/danielforeroj/'},
  ],
  ventures: [
    {
      title: "GTM Mentor at Outlier Ventures",
      body: "Advising the next generation of Web3 founders on go-to-market strategy, product positioning, and narrative development within the Outlier Ventures accelerator program.",
      ctaLabel: "Learn More About Outlier Ventures",
      ctaUrl: "https://outlierventures.io"
    },
    {
      title: "Managing Partner at Multiplied (DMC)",
      body: "The marketing & PR agency behind headline-grabbing launches for protocols and brands alike, including Solana’s wormhole, Immutable X, Quentin Tarantino’s NFT, among many others.",
      ctaLabel: "Learn More About Multiplied (DMC)",
      ctaUrl: "https://multipliedhq.com"
    },
    {
      title: "Partner at SpaceDev",
      body: "The second largest DevShop in LATAM. Worked with Aptos, Rarible, Apple, Google, Chevron, Blockus, etc.",
      ctaLabel: "Learn More About SpaceDev",
      ctaUrl: "https://spacedev.io"
    },
    {
      title: "Partner at Capa",
      body: "Leveraging stablecoin infrastructure to move money across LATAM with zero FX drag. Raised USD$3M in pre-seed.",
      ctaLabel: "Learn More About Capa",
      ctaUrl: "https://capa.fi"
    }
  ]
};


export const posts: Post[] = [
{
  type: PostType.BLOG,
  title: 'Fuck Web3 Jargon',
  slug: 'fuck-web3-jargon',
  date: '2025-11-06T20:15:00Z',
  excerpt: 'If your product needs a glossary to sign up, you don’t have a product problem—you have a language problem. This is a field guide to killing crypto-speak, writing for real people, and shipping UX that converts.',
  answer: 'Web3 growth stalls because most products force people to learn jargon before they can do anything useful. Replace every crypto-ism with plain, local language that explains the benefit first: social/email sign-in before wallets, total cost in local currency before “gas,” and recovery instructions without acronyms. Use progressive disclosure so advanced settings stay hidden until needed, add short answer boxes and FAQ schema so answer engines can cite you, and publish bilingual microcopy for LATAM. Clarity builds trust, cuts drop-off at critical steps, and keeps you compliant with regulators who expect transparent risk language.',
  content_md: `
# Fuck Web3 Jargon

## Key Takeaways
- **Plain language converts.** Jargon increases cognitive load and erodes trust. Evidence from usability research shows clear, concise language improves comprehension and task completion for *experts and non-experts alike*.
- **Trust is fragile.** Most people still doubt crypto’s reliability and safety—confusing language makes that worse. Speak human, show fees, show risks, and make the first step easy.
- **UX, not hype, is the barrier.** The biggest adoption blocker isn’t regulation or throughput—it’s user experience. Reduce jargon and design progressive disclosure for wallets, fees, and signing.
- **Design for answer engines.** Write short, extractable explanations (and FAQ schema) so AI/answer engines quote *you* when people ask “What is gas?” or “How do smart wallets work?” (AEO/GEO).
- **Make it bilingual by default.** If you care about LATAM, ship Spanish/Portuguese microcopy that avoids literal translations of crypto slang and explains actions in local terms.

---

## The Cost of Crypto-Speak

Crypto didn’t stall because blockchains can’t do more transactions. It stalled because too many products assume everyone wants to learn a new language before they can do anything useful.

Users are trying to solve simple jobs—send money, buy a thing, prove ownership, access a perk. When the path is lined with unexplained compounds like “AA wallets,” “zk-SNARKs,” “gas oracles,” and “MEV protection,” many bounce. The research is boring but blunt: **clarity beats cleverness**. Professionals, not just novices, prefer plain language; cognitive load kills conversion during forms and onboarding.

Trust is also a language. When **63% of Americans say they aren’t confident that the current ways to invest in or use crypto are reliable and safe**, every ambiguous word—“stake,” “farm,” “airdrop”—adds friction. You won’t earn confidence with cooler jargon; you earn it with plain words, transparent fees, and predictable outcomes.

---

## The Principle: Write for People, Not Practitioners

Plain language isn’t “dumbing down.” It’s **designing for understanding** so more people can use your product successfully—including experts who are busy and want to move fast. The UK government’s plain-language standard says it well: it improves comprehension for users with different literacy levels and for readers who speak English as an additional language. That is LATAM product reality.

---

## The Five Places Jargon Kills Conversion (and How to Fix Each)

### 1) Wallet Creation & First Signature
**Problem:** “Create a non-custodial account, back up your seed, sign a message.”
**Fix:** *Progressive disclosure.* Start with social/email sign-in or embedded smart wallets. Use microcopy that explains *why* we’re asking for a signature in one line (“We use a quick signature to verify it’s you—no fees, no spending”). If you support smart wallets, say what that changes: “No seed phrases to store. Recover with your email + a backup.” Smart-wallet onboarding exists—describe it in human terms.

**Before → After**
“Sign this ECDSA message” → “Quick check: tap ‘Approve’ so we know this account is yours. This doesn’t move funds.”

### 2) Fees and “Gas”
**Problem:** “Estimated gas: 0.0023 ETH (base + priority).”
**Fix:** Show a *total in local currency* first. “Network fee: $0.19 (paid to the network to process your transaction).” Add a “Why a fee?” tooltip with 2 sentences. Stop treating “gas” like a sacred term.

**Before → After**
“Your gas limit is 21000” → “Network fee: $0.09 — this pays computers to process your transfer.”

### 3) Risk & Reversibility
**Problem:** “On-chain transactions are immutable. DYOR.”
**Fix:** Use adult language: “On-chain transfers can’t be undone. Double-check the address. If something looks wrong, stop and chat with support.”

**Before → After**
“DYOR NFA” → “This isn’t financial advice. Learn how returns and fees work before you invest.”

### 4) Privacy & Proofs
**Problem:** “We use zk-SNARKs so your data stays private.”
**Fix:** Explain the *benefit*: “You can prove you’re eligible without sharing your data.” If you need a name, add it after: “(This uses a privacy math trick called a ‘zero-knowledge proof.’)” For readers who care, link to a short explainer.

**Before → After**
“Anonymous KYC via ZKPs” → “Prove you’re over 18 without uploading your ID.”

### 5) Rewards & Airdrops
**Problem:** “Stake LP tokens to farm points and qualify for retroactive airdrops.”
**Fix:** Translate rewards into the user’s win. “Hold your pass to unlock lower trading fees and early access. You’ll also earn points that can be redeemed later.”

---

## The “Say It Straight” Style Guide (Steal This)

**Write like this:**
- Use **one-line purpose statements** at the top of screens: “Send money fast with a clear fee before you pay.”
- Prefer **verbs to nouns**: “Send,” “Swap,” “Sell” over “Settlement,” “Liquidity,” “Realization.”
- **Define once, nearby.** If you must use a crypto term, explain it in 9–20 words the first time.
- **Use examples.** “If you send $100, you’ll see the total fee and the exact amount the other person receives.”
- **Brevity wins.** Aim for 8–14 words per sentence in prompts and helper text.

**Avoid like the plague:**
- “DYOR” (say “Learn how it works before you invest”)
- “Non-custodial mnemonic seed” (say “Recovery phrase you must keep private”)
- “Slippage tolerance” (say “Price may change by up to X% while your trade is processing”)
- “Bridging” (say “Move your funds from Network A to Network B”)
- “Liquidity event” (say “When withdrawals/trades open”)

---

## LATAM: Language and Culture Notes You Can’t Skip

- **Local currency and fees** by default (ARS, COP, MXN, PEN, BRL). People decide with local numbers first.
- **Spanish ≠ Spanish.** Pick a neutral Latin American Spanish for UI, avoid region-specific slang, and write for 6th–8th grade reading level.
- **Portuguese matters.** If Brazil is on your roadmap, invest in native PT-BR copy.
- **Explain compliance choices** plainly: “To follow local rules, some features aren’t available in your country yet.”
- **Influencers ≠ journalists.** People do get news from creators, but you’re responsible for accuracy; never outsource risk language.
- **Scam context.** Regulators have flagged a flood of misleading promotions. Be explicit about risks, eligibility, and who your product is for. Plain risk language is part of trust.

---

## Microcopy Makeovers (Copy-and-Paste)

**Email/Sign-Up**
- Before: “Create a Web3-native, self-custodial wallet with optional MPC recovery.”
- After: “Create your account. You control it. Recover with your email if you lose your phone.”

**Transactions**
- Before: “Approve contract interaction; set gas limit and priority fee.”
- After: “Review and approve. You’ll see the total, including the network fee, before you pay.”

**Security**
- Before: “Never disclose your seed phrase.”
- After: “Write down your recovery phrase and keep it offline. Anyone who sees it can take your money.”

**Support**
- Before: “Due to the immutable nature of blockchain, refunds are not possible.”
- After: “On-chain transfers can’t be reversed. If something looks wrong, stop and contact us.”

**ZK/Privacy**
- Before: “Eligibility is proven using zk-SNARKs.”
- After: “Prove you qualify without sharing your data (uses a privacy-proof method).”

---

## Patterns That Replace Jargon with UX

1) **Progressive disclosure**
Put advanced settings (gas, slippage, networks) behind “Advanced” accordions. Use sensible defaults. This reduces thinking during critical steps—exactly how you reduce cognitive load in forms.

2) **Explainer drawers**
One-tap “What is this?” panels: 2 sentences + a diagram. No new tab, no medium post.

3) **Local totals and receipts**
Show the final amount the recipient gets, the fee, and the time estimate. In local currency first.

4) **Smart wallets, explained in one beat**
“Create a wallet in seconds—no seed phrase. Recover with your email or a backup device.” (Then add a “Learn more” for people who want the cryptography details.)

5) **Default safety**
Warnings in plain language for risky actions (“This token has a history of price swings. Double-check before you trade.”). Don’t rely on abbreviations like “NFA.” Regulators are watching misleading promos—your words must be clear.

---

## AEO/GEO: How to Win the “What Is Gas?” Query

Answer engines and LLMs increasingly summarize results. You want your explanations cited when users ask simple questions. Do this on your docs/blog:

- Start each explainer with a **90–120-word answer box** that defines the thing and the user benefit.
- Add **FAQ schema** (JSON-LD) with 4–6 direct Q&As (“How much are network fees?”, “Are transactions reversible?”).
- Use **tables** for comparisons (networks, fees, limits) and **bold labels** for key entities (Base, Polygon, Brazil).
- Publish **author pages** with credentials and link to external **primary sources** (whitepapers, audits).
- Keep pages fast and accessible.

---

## Metrics: Prove That Plain Language Pays

Track changes from a jargon-heavy baseline to your new copy:

- **Onboarding completion rate** (account created → first successful action)
- **Time on critical step** (should go down)
- **Support ticket tags** (seed phrase, gas, slippage, network)
- **Mis-send rate / wrong network attempts**
- **Trust indicators** (“I understand the fees,” “I know how to recover my account”)
- **Return visits** after first action

If you can, run a usability test: task + think-aloud + SUS/UMUX scores. Government service manuals have simple, battle-tested guidance on user research cadence—steal it.

---

## Implementation Playbook (Two Weeks)

**Day 1–2: Inventory & intent**
List every place jargon appears: onboarding screens, modals, settings, docs, emails, alerts. Note the user’s *intent* on each screen in one sentence.

**Day 3–5: Rewrite**
Apply the style guide, microcopy makeovers, and bilingual pass. Replace abbreviations with sentences. Add “why this matters” tooltips.

**Day 6–7: AEO/GEO pass**
Convert top 10 FAQs into short answer boxes + FAQ schema. Publish author pages for your PM/engineer who owns each explainer.

**Day 8–10: UX patterns**
Add progressive disclosure and local-currency totals. If you support smart wallets, describe recovery in one sentence on the creation screen.

**Day 11–14: Test & ship**
Run 5–8 user tests in your target market (WhatsApp recruitment works in LATAM). Compare completion rates and edit ruthlessly.

---

## “But Our Users Are Advanced”

Great. Advanced users love speed and clarity. \`gasPrice\` and \`nonce\` still exist—just hide them under **Advanced**. Experts will find the knobs; everyone else gets a paved road.

And for the truly technical concepts (like ZK proofs), respect the reader with a plain description first, then link to the math. “Prove you qualify without sharing data” is always the *first* sentence; “zk-SNARK” is the *label*, not the pitch.

---

## The Stakes

People store recovery phrases in Notes apps, paste them into chats, and fall for fake support accounts—not because they’re careless, but because we made security **linguistic**, not **obvious**. Your words are part of your defense-in-depth. (And yes, wallets remain hard; even researchers flag usability as a core problem.)

---

## The Pledge

If your product needs a glossary to sign up, it needs a rewrite. Start with one journey. Replace each crypto-ism with a sentence a smart 12-year-old understands. Add local totals, show risks in human words, and design defaults that make the right action the easy action.

Jargon is a habit. Clarity is a strategy. Choose the one that compounds.
`,
  faqs: [
    {
      question: 'How do I remove jargon from wallet onboarding?',
      answer: 'Start with social or email sign-in, explain that the first signature simply proves the account is yours, and describe recovery in one sentence (e.g., “Recover with your email or backup device—no seed phrase to memorize”).'
    },
    {
      question: 'What should I show instead of “gas fees”?',
      answer: 'Show the total cost in local currency first, label it as a network fee that pays to process the transaction, and keep advanced gas controls behind an accordion for power users.'
    },
    {
      question: 'How can I make copy AEO/GEO-friendly?',
      answer: 'Lead with a 90–120 word answer box, add 4–6 FAQ questions with direct answers, use descriptive H2/H3s, and include author/source links so answer engines can quote you confidently.'
    },
    {
      question: 'What bilingual tweaks matter for LATAM?',
      answer: 'Write neutral Spanish and native PT-BR microcopy, avoid literal translations of slang, default to local currencies, and explain compliance or feature availability in plain language.'
    }
  ],
  tags: ['web3', 'ux', 'product', 'marketing', 'plain-language', 'latam', 'seo', 'aeo', 'privacy', 'wallets']
},

{
  type: PostType.BLOG,
  title: 'My GTM Playbook for Web3',
  slug: 'gtm-playbook-web3',
  date: '2025-11-06T20:00:00Z',
  excerpt: 'A field-tested, no-fluff go-to-market playbook for Web3 teams. Pragmatic strategy, hybrid funnels, onchain activation, and an operating cadence that turns momentum into defensibility—now with AI SEO/AEO tactics that get you cited by answer engines.',
  answer: 'This Web3 GTM playbook starts with AI SEO/AEO: publish answer-box intros, FAQ schema, and author signals so answer engines cite you. Use plain language and hybrid funnels—Web2 channels like email and SEO paired with Web3 primitives such as onchain credentials or fee discounts—to prove value fast. Define painfully specific ICPs and a category narrative, design one meaningful first onchain action, and run weekly experiments with clear metrics. Pair attribution across off-chain events and onchain behavior, keep partners and communities as repeatable systems, and localize content for priority geos. Operate in short cycles so momentum compounds into defensible growth.',
  content_md: `
# My GTM Playbook for Web3

## Key Takeaways
- **AI SEO (AEO/GEO) first.** Structure pages so answer engines (Google AI Overviews, Perplexity, ChatGPT) can lift concise answers, cite you, and send qualified traffic. Focus on direct Q&A blocks, entities, schema, author pages, and sources.
- **Plain language over crypto-speak.** If a sentence needs a glossary, rewrite it.
- **Hybrid funnels win.** Use Web2 distribution (SEO, email, partnerships) with Web3 primitives (onchain credentials, fee discounts) to prove value fast.
- **Design the first onchain action.** One action that demonstrates real utility—no vanity mints.
- **Operate weekly.** A boring, repeatable test cadence beats one-off stunts.
- **Measure what matters.** Tie off-chain attribution to onchain behavior and lifetime value, not vanity mints or airdrop farmers.
- **Partners are a system.** L1/L2s, wallets, and on/off-ramps become distribution when incentives echo your user’s success.

---

## AI SEO for Web3 GTM (AEO/GEO): How to Get Cited by Answer Engines

**Answer Engine Optimization (AEO)** means structuring content so AI systems can extract a clean, trustworthy answer and *mention your brand* in their responses. In practice, that means: (1) concise, scannable answers up top; (2) clear entities (people, projects, chains, regions) throughout; (3) schema markup (FAQPage/HowTo/Article) in JSON-LD; (4) visible author expertise and citations; and (5) fast pages. These tactics increase your odds of being quoted by AI Overviews and tools like Perplexity—exactly where early-stage users now discover products.

Closely related, **Generative Engine Optimization (GEO)** is the broader practice of shaping content for AI platforms that synthesize answers (ChatGPT, Perplexity, Gemini). The play is to combine authority signals (brand/author expertise and sources) with technically structured content that’s easy for LLMs to parse—think tight answer boxes, schema, tables, definitions, and FAQs that mirror real queries.

### A fast AEO/GEO checklist you can implement this week
- **Lead with a 90–120 word answer box** that directly solves the query (“What is X?”, “How do I do Y on Base/Polygon?”). Place it above the fold, then expand.
- **Mark up content with schema** (Article, FAQPage, HowTo). For Web3 docs, add FAQ blocks for fees, eligibility, networks, and KYC status—then ship JSON-LD.
- **Strengthen author pages + E-E-A-T signals** (bio, credentials, LinkedIn/X, speaking, notable work). AI systems and modern search reward identifiable experts.
- **Cite primary sources** (audits, docs, whitepapers, fee tables). LLMs prefer content with references they can quote.
- **Structure for extraction**: descriptive H2/H3s, bullets, tables, glossaries of chain-specific terms, and short definitions.
- **Ship speed**: compress images, lazy-load embeds, and monitor Core Web Vitals. Slow pages get less visibility—human and machine.

*How this plugs into Web3 GTM:* publish plain-language explainers (EN/ES) with the answer box + FAQ schema, then map them to your **first onchain action** (credential, fee discount, or trial credit). Your AEO/GEO pages become persistent top-of-funnel that AI surfaces, while your product delivers a quick, verified win.

---

## Principles I Do Not Compromise

1) **Plain language beats crypto-speak.** Talk to a normal person. If a sentence needs a glossary, rewrite it.  
2) **Product–Market–Network Fit.** PMF is not enough. You need to fit into the networks where your users already coordinate: Telegram groups, X lists, Discord servers, local WhatsApp communities, vertical forums.  
3) **Progressive disclosure.** Start off-chain. Move on-chain when it improves the user’s outcome. Remove unnecessary wallet walls.  
4) **Trust by default.** Transparent fees, doxxed leadership or credible validators, third-party security, clear disclaimers, and responsible geography controls.  
5) **Distribution is a system, not a stunt.** Reproducible motions that can be taught to new hires and partners.  
6) **Hybrid funnels win.** Web2 tactics with Web3 primitives. Newsletters plus allowlists, SEO plus quests, events plus onchain credentials.  
7) **Speed and antifragility.** Weekly experiments and fast decision cycles. Systems that benefit from volatility rather than break.

---

## The GTM Spine: Step by Step

### 1) Define ICPs and Jobs To Be Done

Write short profiles that are painfully specific. Include one sentence for the core job to be done and the switching trigger.

- **Segment:** DeFi power users in LATAM saving in stablecoins to escape currency risk.  
  **JTBD:** Move money into a safer, yield-bearing asset quickly, with low fees, and the ability to cash out locally.  
  **Trigger:** Local currency dips 5 percent in a week or card limits change.

- **Segment:** Prosumers in gaming communities looking for provable ownership and secondary sale liquidity.  
  **JTBD:** Acquire, flex, and trade in-game assets without getting scammed or locked in.

For each ICP define their wallet maturity, risk tolerance, KYC comfort, preferred channels, and the single metric that screams success. If you cannot do this in two pages, you do not have focus yet.

**Artifact:** ICP one-pagers with JTBD, channels, first action, activation hurdle, value proof.

---

### 2) Craft a Category Narrative You Can Defend

Pick a simple, non-jargon statement that names the problem, stakes a position, and promises a win the user can feel. Use this four-part template:

- **Problem:** What normal people experience today.  
- **Enemy:** The status quo that makes it worse.  
- **Promise:** The better future in plain words.  
- **Proof:** The receipts you can show.

Example: “Sending money across borders is slow and expensive. Banks make it hard and take their cut. We make it instant and affordable with stable settlement and transparent fees. You can test it in five minutes with a free credit and see the rate before you send.”

**Artifacts:** One-page narrative, FAQ with hard questions, bilingual variants if you operate in LATAM or non-English markets.

---

### 3) Distribution Thesis: Owned, Earned, Paid, Partner

Stop treating distribution like a random act of virality. Write your stack.

- **Owned:** Website that loads fast, a blog with real POV, an email list, a docs site that non-devs can read, and a founder’s X/LinkedIn presence that sounds human.  
- **Earned:** Thought-leadership with strong data, founder interviews on relevant podcasts, niche communities where you answer questions before you pitch.  
- **Paid:** Tactical, not default. Performance ads to amplify what is already working. Campaigns with clear postback and fraud checks.  
- **Partner:** Layer-1s and Layer-2s, wallets, on/off-ramps, analytics partners, creator affiliates. Map who benefits if you win.

**Artifacts:** Channel map with goals, inputs, and cadence. Partner matrix with intros, value exchange, and next action.

---

### 4) The First Onchain Action

Design the smallest meaningful onchain action that proves the product’s promise, not a vanity mint.

- **Credential with value:** Finish onboarding and receive a non-transferable credential that unlocks lower fees or early features.  
- **Quest with purpose:** Do the core action once, see the benefit in minutes, and earn something that actually matters in product.  
- **Economic rewards with guardrails:** Fee discounts, credits, or loyalty points with clear, sustainable economics.

Subsidize fees intelligently at the start. Remove anything that looks like a cash grab or confusing airdrop math.

**Artifacts:** Activation spec with UX flow, fee policy, abuse rules, and the success metric to declare the test done.

---

### 5) Funnel Architecture: Off-chain to On-chain

**Top of funnel:** SEO for real questions (and now AEO/GEO-optimized answer boxes), founder POV on X, short product demos, and localized content. **Mid funnel:** Email nurture with a three-part sequence: problem story, proof demo, and a clear next step.  
**Activation:** Progressive wallet connection. Social logins first, then unlock wallet-required features when the user wants the benefit.  
**Post-activation:** In-product journeys and automated lifecycle emails. A “Do the next thing” nudge inside the app, not just on social.

**Artifacts:** Funnel map, email sequences, product tours, and event tracking plan.

---

### 6) Data and Attribution That Works in Web3

You need both off-chain analytics and onchain context.

- **Off-chain:** UTMs, event tracking, postbacks to measure performance, fraud filters.  
- **Onchain context:** Track the first transaction, the cost to acquire it, and the user’s behavior over time.  
- **North-star:** Choose one. For a consumer app it might be weekly active transacting users. For a protocol it might be quality developers shipping and TVL from non-incentivized activity.

**Artifacts:** Metrics glossary, dashboard mockups, data QA checklist.

---

### 7) Content Engine That Compounds

Content is a system, not a viral lottery ticket.

- **Founder POV:** A weekly note that says something useful.  
- **Explainers:** Plain-language posts that answer the top ten questions your support team sees—each with an AEO-friendly answer box and FAQ schema. - **Data stories:** One chart that proves a claim and a paragraph that teaches something.  
- **Local language:** If you care about LATAM, ship Spanish and Portuguese.  
- **User stories:** Screenshots and specifics. Cut the fluff.

**Artifacts:** Editorial calendar, reusable templates, headline bank, visual system.

---

### 8) Community Without the Cult

Community is earned by usefulness. Start small.

- **Office hours:** 60 minutes a week to help real users.  
- **Contributor path:** Clear roles for moderators, translators, researchers.  
- **Feedback rituals:** Monthly “you asked, we shipped” threads.  
- **Boundaries:** Publish rules. Enforce them.

**Artifacts:** Community charter, contributor ladder, moderation scripts.

---

### 9) Growth Loops You Can Prove

Loops beat one-off campaigns. Start with one loop and tune it.

- **Referral loop:** Reward both sides with something that improves in-product economics.  
- **Creator loop:** Trackable links, fast payouts, and creative freedom.  
- **Partner loop:** Feature integrations that add real capability, not just logos.  
- **Data loop:** New users create better data which improves matching or pricing which earns more users.

**Artifacts:** Loop diagrams, incentive math, fraud rules, review cadence.

---

### 10) Events That Drive Pipeline

Conferences, side events, and salons work when they are specific.

- **Before:** Publish your schedule and a short value promise.  
- **During:** Capture proof. Short interviews, micro-demos, and curated intros.  
- **After:** Ship a recap with names and results.  
- **IRL to URL:** Convert every handshake into a trackable follow-up in 24 hours.

**Artifacts:** Event brief, target list, shot list, and post-event follow-up template.

---

### 11) PR That Actually Helps GTM

PR is not the GTM. It is an amplifier. Treat it like one.

- **Message market fit:** Announcements tied to real milestones, not wishful roadmaps.  
- **Founder readiness:** Media training and tight narratives.  
- **Editorial targets:** Reporters who understand your category and value proof.

**Artifacts:** Messaging doc, reporter map, press kit, and a calendar of real milestones.

---

### 12) Compliance and Geography

Respect the law. This is non-negotiable.

- Publish clear disclaimers and eligibility.  
- Run geo-controls where required.  
- Avoid making economic promises you cannot keep.  
- Document risk policies and refresh them.

**Artifacts:** Compliance checklist, geo-policy, and reviewer sign-offs.

---

### 13) AI Inside the GTM

Deploy practical marketing agents to remove toil and increase speed.

- **Research agent:** Competitive scans, keyword briefs, community sentiment.  
- **Content agent:** First drafts for posts, emails, release notes that a human polishes.  
- **Community agent:** Triage repetitive questions and route edge cases.  
- **Attribution agent:** Weekly anomaly detection across campaigns.

Keep humans in the loop for tone, judgment, and sensitive topics.

**Artifacts:** Agent SOPs, review gates, prompt library.

---

### 14) Week-to-Week Operating Cadence

A boring cadence beats chaotic genius.

- **Monday:** Review top metrics and last week’s experiments. Pick this week’s tests.  
- **Tuesday–Thursday:** Ship the work. Remove blockers same day.  
- **Friday:** Publish the changelog and lessons learned.  
- **Monthly:** Reset the narrative and partner priorities based on proof.

**Artifacts:** Weekly scorecard, experiment log, monthly narrative refresh.

---

### 15) Team Shape: When to Hire What

- **Zero to One:** Founder-led GTM with a generalist growth operator and a strong designer-writer. PR and performance are fractional.  
- **One to Ten:** Add lifecycle marketing, community ops, and a partnerships lead who can speak product.  
- **Ten Plus:** Pod model per market or vertical. Keep a small editorial braintrust to protect voice.

**Artifacts:** Role scorecards, onboarding docs, competency matrix.

---

## The First 90 Days: A Realistic Path

**Phase 1: Focus and Proof**  
Ship the narrative, ICPs, and first onchain action. Launch the baseline funnel and one content lane. Measure one north-star and two drivers.

**Phase 2: Loops and Partners**  
Add a referral or creator loop. Turn two partners into distribution, not just logos. Start a weekly founder note and monthly “you asked we shipped.”

**Phase 3: Scale What Works**  
Increase paid only behind proven winners. Localize content for priority geos. Add one more loop. Improve your attribution so you can defend spend.

---

## Common Failure Modes To Avoid

- **Token before traction.** Incentives without product value become liabilities.  
- **Community as entitlement.** Without boundaries and purpose you get noise, not support.  
- **Event tourism.** Photos do not equal pipeline. Meetings do.  
- **PR as product.** Announcements cannot carry weak retention.  
- **Attribution theater.** Dashboards without decisions waste time.

---

## Mini Case Notes

- **LATAM consumer finance:** The shift from abstract onchain rewards to concrete fee reductions and fast off-ramps doubled activation and cut support tickets.  
- **Creator partnerships:** Smaller creators with real credibility outperformed big names by a wide margin when incentives were aligned to in-product outcomes.  
- **Hybrid funnel:** Email plus simple quests beat “connect wallet first” by a lot. People adopt when they see value before they risk assets.

---

## What You Can Steal Today

- A one-page narrative people can repeat  
- ICPs with JTBD and triggers  
- A first onchain action that proves value  
- A weekly operating cadence and a short experiment backlog  
- A partner list where each partner clearly wins when your user wins

Ship those artifacts in the next two weeks and you will feel momentum. Sustain the cadence for two months and you will have a real GTM machine.

If you want help pressure testing your ICPs, designing the first onchain action, implementing AEO/GEO (answer boxes + schema + author pages), or turning partners into distribution, reach out. I’ll point you to the fastest path and the traps to avoid.
`,
  faqs: [
    {
      question: 'What is the first GTM move for a Web3 product?',
      answer: 'Publish an answer-box explainer with FAQ schema tied to a single onchain action that proves value—like a credential that unlocks lower fees—so answer engines surface you and users see a fast win.'
    },
    {
      question: 'How should I design the first onchain action?',
      answer: 'Pick one action that demonstrates real utility, keep it low-friction, and connect it to tangible benefits such as fee discounts or trial credits instead of vanity mints.'
    },
    {
      question: 'How do I structure funnels for Web3?',
      answer: 'Use hybrid funnels: SEO/email/social for top-of-funnel, progressive wallet connection for activation, and in-product nudges plus lifecycle emails for post-activation. Pair them with weekly experimentation.'
    },
    {
      question: 'What metrics matter most?',
      answer: 'Track the first successful onchain action, the cost to acquire it, retention of transacting users, and partner loops that turn into distribution rather than one-off logos.'
    }
  ],
  tags: ['web3', 'gtm', 'marketing', 'growth', 'aeo', 'seo', 'latam', 'playbook']
}
];
