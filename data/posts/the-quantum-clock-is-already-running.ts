import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'The Quantum Clock Is Already Running',
  slug: 'the-quantum-clock-is-already-running',
  date: '2026-03-25T14:00:00Z',
  excerpt:
    'You do not need a quantum computer to be affected by one. The migration to post-quantum cryptography is already happening in your browser, and the part your company owns is the part nobody has started.',
  metaDescription:
    'Post-quantum migration is already happening in browsers while servers lag. What the standards say, what the estimates moved, and what to do this year.',
  tags: ['quantum', 'security', 'cryptography', 'infrastructure', 'governance'],
  content_md: `
# The Quantum Clock Is Already Running

## Key Takeaways
- **The migration started without you.** More than half of browser traffic already uses post-quantum key agreement. Servers are far behind.
- **The estimate for breaking RSA moved by an order of magnitude in one paper.** That is the real news of the last two years.
- **Harvest now, decrypt later is a motivated assumption, not a documented incident.** Say that honestly and the argument gets stronger, not weaker.
- **The standards exist. Signatures are the unfinished half.**
- **The work is inventory before cryptography.** You cannot migrate what you cannot list.

---

Quantum computing gets discussed as if it were a single future event that either arrives or does not. That framing is useless for anyone running a company.

The useful framing is a clock. Something you store or transmit today has a lifetime. If that lifetime extends past the date a sufficiently capable quantum computer exists, then your decision about encryption today is a decision about the future, whether or not you made it deliberately.

## The number that changed the conversation

In 2019, the reference estimate for factoring RSA-2048 was roughly 20 million noisy qubits running for about eight hours.

In May 2025, the same researcher published a revised estimate: under a week, with fewer than one million noisy qubits. Roughly a twentyfold reduction in the hardware requirement, achieved through better arithmetic, better error correcting codes and cheaper magic state preparation. ([arXiv, May 2025](https://arxiv.org/abs/2505.15917))

No new hardware was needed for that result. The algorithms got better. That is the part people miss when they track qubit counts as if they were the only variable: the target moves toward the hardware, not just the hardware toward the target.

Expert opinion has shifted with it. The 2025 Quantum Threat Timeline report, published this month, surveyed 26 experts and put the average likelihood of breaking RSA-2048 within a day, within ten years, at 28 to 49 percent depending on how the question was framed. That is the highest ten year figure in the seven years the survey has run. Sixty nine percent of respondents put the fifteen year likelihood at 50 percent or more. ([Global Risk Institute, March 2026](https://globalriskinstitute.org/publication/quantum-threat-timeline-report-2025b/))

Neither imminent nor irrelevant. Both of those positions are lazy.

## Half the internet already migrated and nobody noticed

Here is the fact that surprises every executive I show it to. Post-quantum key agreement went from 29 percent to 52 percent of human HTTPS traffic to Cloudflare over the course of 2025, and passed 60 percent by February 2026. ([Cloudflare, December 2025](https://blog.cloudflare.com/radar-2025-year-in-review/))

Your browser did that. You were not consulted.

The server side is where the gap is. As of late 2025, only a few percent of origin servers supported post-quantum key agreement. The traffic figure is high because a handful of very large front doors upgraded, not because the long tail did.

That asymmetry is the whole opportunity and the whole risk. The parts of your stack operated by someone else are being handled. The parts you operate are not.

## The standards are real, and one half is missing

The key encapsulation and signature standards were finalised in August 2024: ML-KEM, ML-DSA and SLH-DSA. ([NIST](https://csrc.nist.gov/projects/post-quantum-cryptography/post-quantum-cryptography-standardization)) A backup key encapsulation mechanism, HQC, was selected in March 2025 with its own standard expected to follow. Guidance on using key encapsulation properly was finalised in September 2025. ([NIST SP 800-227](https://csrc.nist.gov/pubs/sp/800/227/final))

Shipping followed quickly in the places engineers control directly. OpenSSH added hybrid post-quantum key exchange in 9.9 and made it the default in 10.0 in April 2025, and later versions warn when a connection is not post-quantum. ([OpenSSH release notes](https://www.openssh.com/releasenotes.html)) OpenSSL 3.5 shipped the new algorithms the same month. Signal and Apple both moved messaging to post-quantum key agreement.

What has not happened is authentication. There is still no public post-quantum certificate in general use, and the sober expectation is first certificates during 2026 with broad browser trust later. ([Cloudflare, October 2025](https://blog.cloudflare.com/pq-2025/))

So the honest status is: confidentiality in transit is being solved now, identity is next, and identity is harder because it involves every certificate authority, every device that validates one, and every embedded system nobody has touched in nine years.

## On harvest now, decrypt later

The standard argument for urgency is that adversaries are recording encrypted traffic today to decrypt it once they can. It is a reasonable assumption. Long lived secrets exist, storage is cheap, and intelligence services collect.

I looked for the evidence and could not find a public, documented case. Government guidance frames it as a risk to manage, not an incident to report.

I say that in client conversations because the argument survives it. You do not need a proven interception to justify migrating data with a twenty year confidentiality requirement. Medical records, legal archives, identity documents, state communications, long term contracts. If the secret must hold until 2040, the question is not whether someone is recording, it is whether you would be comfortable if they were.

For a payment confirmation that is worthless in an hour, the honest answer is that this is not your priority. Say that too. Credibility on this topic comes from being willing to tell a client what does not matter.

## Regulators set dates, and dates are what move budgets

The UK guidance is the clearest published timeline: discovery and a migration plan by 2028, highest priority migration by 2031, complete by 2035. It was published in March 2025 and reviewed again this year without substantive change. ([NCSC](https://www.ncsc.gov.uk/guidance/pqc-migration-timelines))

The EU issued a coordinated implementation roadmap in June 2025 following the Commission recommendation of 2024. ([European Commission](https://digital-strategy.ec.europa.eu/en/library/coordinated-implementation-roadmap-transition-post-quantum-cryptography)) Germany's BSI requires hybrid deployment, classical and post-quantum together, rather than a straight replacement, and France's ANSSI takes the same position.

That hybrid requirement is worth understanding. It exists because the new algorithms are young, and a defect in one of them should not leave you with nothing. Anyone selling you a pure post-quantum deployment as more modern is selling you less safety, not more.

In the US, NIST's proposed deprecation timeline is still a draft rather than policy, which is a distinction worth keeping straight when someone quotes 2030 and 2035 at you as though they were law.

## What to actually do this year

1. **Inventory.** Every place you use cryptography, including the ones inside products you bought. This is the step everyone skips and the step that takes the longest. The UK timeline allocates three years to discovery and planning for a reason.
2. **Classify by lifetime.** How long does each secret need to hold. That single question sorts your whole estate into urgent, eventual, and irrelevant.
3. **Ask your vendors, in writing, on a date.** Not whether they support post-quantum cryptography. When, for which product, with which algorithms, in hybrid or not. The answers will vary enormously and the variance is the information.
4. **Turn on what is free.** Modern SSH and TLS stacks give you hybrid key agreement by upgrading. That is a maintenance ticket, not a project.
5. **Buy crypto agility, not algorithms.** Anything you procure now should let you change algorithm without changing product. That is the requirement that survives whatever gets standardised next.

## The verdict

I am not going to tell you a quantum computer will break your encryption next year. Nobody credible is saying that.

What I will tell you is that the estimate moved by twenty times in one paper, that your browser already migrated, that your servers probably have not, that regulators have published dates, and that the inventory step alone takes years.

The clock does not care whether you find the topic interesting.
`,
};

export default post;
