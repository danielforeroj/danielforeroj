import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'Human In The Loop Is Not A Strategy',
  slug: 'human-in-the-loop-is-not-a-strategy',
  date: '2026-07-28T14:00:00Z',
  excerpt:
    'Put a human in the loop is the answer every executive gives and almost nobody designs. The measured approval rates say what is actually happening: people click yes.',
  metaDescription:
    'Put a human in the loop is the answer nobody designs. What approval data shows about rubber-stamping, and how to build oversight that actually catches things.',
  tags: ['ai', 'agents', 'governance', 'human-oversight', 'compliance', 'operations'],
  content_md: `
# Human In The Loop Is Not A Strategy

## Key Takeaways
- **Approval is not review.** Measured approval rates sit above 90 percent, and attention decays within a single session.
- **A person who approves everything has been converted into a liability shield.**
- **Oversight only works when it is rare, contextual and accountable.** Volume is the enemy.
- **Regulators are about to require it in Europe**, which will produce a wave of oversight that exists on paper.
- **Design the escalation, not the checkbox.** Who, how fast, with what context, and what happens when they are unavailable.

---

Every conversation about AI risk ends in the same sentence. We will keep a human in the loop.

It sounds like a control. Most of the time it is a sentence that lets a meeting end.

I have asked the follow up questions in enough rooms to know how it goes. Which human. Reviewing what exactly. With what information in front of them. How many of these per day. What is their response time. What happens at two in the morning. What happens when they are on holiday. What happens when they disagree with the agent.

The answers run out quickly, usually at question two.

## The measured version of what actually happens

This is no longer a matter of opinion. There is data, and it is uncomfortable.

Anthropic published usage figures for its coding agent showing that developers approve around 93 percent of permission prompts. ([Anthropic, March 2026](https://anthropic.com/engineering/claude-code-auto-mode))

Ninety three percent. These are technical users, reviewing actions in their own environment, on a system they chose, with the context right in front of them. That is the best case for human review and it is already close to a formality.

Attention also decays inside a single session. Anthropic's work on measuring agent autonomy found that new users turn on full auto approval in around 20 percent of sessions, while experienced users do it in over 40 percent, and that about 0.8 percent of agent actions are irreversible. ([Anthropic, February 2026](https://www.anthropic.com/research/measuring-agent-autonomy))

Two things follow. First, the people closest to the system trust it more over time, which is rational and also the mechanism by which oversight quietly disappears. Second, a small fraction of actions cannot be undone, which is exactly where review is worth something and exactly where it is least likely to be applied, because those actions look like all the others in the queue.

I will name the obvious caveat: a model vendor has a commercial interest in the conclusion that human approval is theatre. Weigh it accordingly. But the direction matches what anyone who has watched an approval queue already knows.

## Mandated oversight does not mean actual oversight

If you want evidence that a legal requirement is not a control, look at what happened with New York City's hiring algorithm law.

Researchers checked 391 employers subject to it. Eighteen had posted the required audit report. Thirteen had posted the required transparency notice. That is 4.6 percent and 3.3 percent, with enforcement already in effect. ([FAccT 2024](https://arxiv.org/abs/2406.01399))

The law existed. The oversight did not.

Now consider what is about to happen in Europe. The AI Act's high risk obligations, including Article 14 on human oversight, apply from 2 August 2026. The text requires systems to be designed so that they can be effectively overseen by natural persons, and requires those persons to have the competence, training and authority to intervene. ([EU AI Act, Article 14](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R1689))

Competence, training and authority. Read that against a 93 percent approval rate and you can predict the next two years: a large amount of documented oversight that does not oversee anything, and a smaller amount of real design work by teams that took it seriously.

The same pattern is coming to the United States by a different route. Colorado repealed and reenacted its AI act in May 2026, with obligations starting in January 2027 and a right for a consumer to request meaningful human review and reconsideration of a consequential decision. ([Colorado SB 26-189](https://leg.colorado.gov/bills/sb26-189)) Meaningful is doing a lot of work in that sentence, and it will be litigated.

## Why volume destroys oversight

The mechanism is simple and it is not about lazy people.

If a reviewer sees fifty requests an hour and 49 of them are fine, the rational strategy is to approve quickly. The cost of scrutinising everything is real and immediate. The cost of missing something is rare and deferred. Any system that produces high volume, low variance approval requests will train its reviewers into rubber stamps, and the better the agent gets, the faster that happens.

Which leads to the counterintuitive design rule: **fewer approvals produce better oversight.**

If you want a human decision to mean something, it has to be rare enough to deserve attention, and it has to arrive with enough context that thinking is possible.

## How to design it so it is not theatre

1. **Gate by consequence, not by category.** Do not review every message. Review every refund above a threshold, every credential change, every deletion, every first contact with a regulated customer. Most actions should never reach a person.
2. **Make hold a real state.** Permit, hold, deny. A hold has an owner, a deadline and a default. If nobody responds within the window, the action does not execute. A timeout that silently approves is not oversight, it is a delay.
3. **Give the reviewer the evidence, not the request.** What the agent proposes, why, what it read, what it left out, what it is uncertain about, and what happens if it is wrong. If the screen only shows an action and two buttons, you have built a lottery.
4. **Name the person, not the team.** Queues owned by everyone are owned by no one. Assign, with a backup, with hours.
5. **Measure the reviewers.** Approval rate, time spent, and how often review changed the outcome. If a queue runs at 99 percent approval, either the gate is set wrong or the review is not happening. Both are findings.
6. **Let them say no without friction.** If rejecting means writing a justification and defending it in a meeting, you have priced rejection out of the market.

## Human in the loop versus human on the loop

They are different and the distinction matters when you write a policy.

**In the loop** means the action waits for a person. It is correct for irreversible, high value, low volume actions. It costs latency and it consumes attention, so spend it deliberately.

**On the loop** means the action proceeds and a person monitors, samples and can stop the system. It is correct for high volume, reversible actions where waiting would break the workflow. It requires something people rarely build: an actual stop button, that someone is authorised to press, without a meeting.

Most organisations claim the first and operate the second. The gap between the claim and the operation is where the incident happens.

## The part I will keep repeating

Human in the loop is not a strategy unless you can name who, what they review, how fast they respond, and what happens when they are unavailable. Until those four answers exist, the phrase is not a safeguard, it is an assignment of blame that has not happened yet.

And if the honest answer is that nobody can review this at the volume it runs, then the correct response is not to add an approval screen. It is to write the policy that decides the routine cases without a person, so the person is only spending attention where it changes the outcome.
`,
};

export default post;
