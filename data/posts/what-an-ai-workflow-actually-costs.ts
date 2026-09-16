import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'What An AI Workflow Actually Costs',
  slug: 'what-an-ai-workflow-actually-costs',
  date: '2026-05-26T14:00:00Z',
  excerpt:
    'Per-token pricing tells you almost nothing about what a workflow costs to run. The cost lives in tokens you did not plan for: retries, reasoning, context you resend, and agents talking to agents.',
  metaDescription:
    'Token prices tell you little about what an AI workflow costs. Where the cost actually lives, what caching and batching change, and how to budget per task.',
  tags: ['ai', 'cost', 'unit-economics', 'agents', 'operations', 'infrastructure'],
  content_md: `
# What An AI Workflow Actually Costs

## Key Takeaways
- **Budget per task, not per token.** Nobody sells a customer a million tokens.
- **The expensive tokens are the ones you did not write.** Reasoning, retries, resent context, agents talking to agents.
- **Caching and batching are the two largest levers, and both are structural.** They change how you design the workflow, not just a config value.
- **Prices fall, and they fall unevenly.** Design so that swapping a model is a routing decision, not a rewrite.
- **The cheapest workflow is the one that does not run.** Filtering before inference beats optimising inference.

---

The question I get from founders is always the same. What does this cost to run. The answer they expect is a price per million tokens. That number is real, and it tells you almost nothing.

It is like pricing a delivery business by the litre of fuel. Correct, and useless for deciding whether the route makes money.

## Where the cost actually is

Four categories, roughly in order of how often they surprise people.

**Reasoning tokens.** Models that think before answering bill that thinking at output rates, and you do not get to read it. OpenAI's own guidance tells developers to reserve around 25,000 tokens for reasoning and output when sizing a request. ([OpenAI](https://developers.openai.com/api/docs/guides/reasoning)) A prompt of 400 words can generate a bill dominated by text nobody will ever see.

**Multiplication by architecture.** Agents use several times more tokens than a chat turn, and multi-agent systems are roughly an order of magnitude beyond that. Anthropic put the multipliers at about 4x for agents and about 15x for multi-agent, and found token usage alone explained 80 percent of performance variance in their research system. ([Anthropic, June 2025](https://www.anthropic.com/engineering/multi-agent-research-system)) Read that twice. Most of the quality gain people attribute to clever orchestration is bought with tokens.

**Resent context.** Every turn of a long conversation resends the history. A twenty turn support thread does not cost twenty units, it costs something closer to the sum of a growing prefix, unless you cache.

**Retries and fallbacks.** Measured on production traffic through a gateway, 3.5 percent of requests completed only after a fallback to another model, but those requests carried 5.1 percent of tokens and 4.9 percent of cost. Failures concentrate in long context agent calls, which are the expensive ones. ([Vercel, May 2026](https://vercel.com/blog/ai-gateway-production-index))

## The two levers that matter

**Caching.** On Anthropic's pricing, writing to the cache costs 1.25x base input for the short lived tier and 2x for the longer one, while a cache read costs 0.1x. That means you are ahead after a single read at the short tier, and after two at the long one. ([Anthropic](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)) OpenAI prices cached input at a tenth of uncached for its current models, with a minimum cacheable prefix. ([OpenAI](https://developers.openai.com/api/docs/guides/prompt-caching))

The design consequence is what matters. Caching rewards a stable prefix. If your system prompt, tool definitions and company context sit at the front and do not change, you pay full price once. If you interpolate a timestamp or a customer name into the top of the prompt, you invalidate everything behind it and pay full price every call. I have watched a team cut cost by a quarter by moving two lines of a prompt.

**Batching.** Fifty percent off at the major providers for work that can wait. Enrichment, classification, summarising yesterday, scoring a backlog. Anthropic lets batching stack with caching. ([Anthropic](https://platform.claude.com/docs/en/build-with-claude/batch-processing))

Most workflows that people build as real time are not real time. Nobody needs a lead scored in 900 milliseconds. Somebody decided it felt better.

## Budget per task

Take the workflow, estimate tokens for one complete task including retries, multiply by price, then divide the monthly cost by the number of tasks. That number is the one you can put in a business case, next to what the task costs when a person does it.

For engineering work there is now a public reference point. Anthropic documents enterprise Claude Code usage at around 13 dollars per developer per active day, and 150 to 250 dollars per developer per month, with 90 percent of users under 30 dollars per active day. ([Anthropic](https://code.claude.com/docs/en/costs))

Two things about that number. It is small against a salary. And it is highly variable, which is why the useful control is not a lower price, it is a ceiling per task and an alert when it moves.

## Cheap tokens are not the same as cheap answers

The instinct, when a bill arrives, is to move everything to a smaller model. Sometimes that works. Sometimes the smaller model needs three attempts, a longer prompt, and a repair step, and you have spent more to get a worse answer more slowly.

The pattern that has held up for us is boring and effective:

1. **Filter before inference.** Rules and code first. The cheapest call is the one you do not make, and a surprising share of items in any queue can be routed without a model at all.
2. **Route by consequence.** Small model for classification and extraction, large model for the judgement call, human for the irreversible one.
3. **Cache the stable, batch the patient.**
4. **Cap the loop.** Every agent gets a maximum number of steps and a budget. An agent without a ceiling will happily spend your month on one stubborn task.
5. **Measure cost per successful task**, not per call. A cheap call that fails is not cheap.

## Prices move, so do not marry a model

Inference prices have been falling fast and unevenly. Epoch AI's analysis puts the rate of decline at anywhere from 9x to 900x per year depending on the task, and around 40x per year for GPT-4 level performance on hard science questions. ([Epoch AI, March 2025](https://epoch.ai/data-insights/llm-inference-price-trends)) That study is dated now, which is itself the point: any number I quote here has a shelf life.

What follows from that is architectural. Keep the model behind an interface. Keep prompts in data, not scattered through code. Keep an eval suite that can tell you whether a swap is actually an upgrade, because the cheap new model that looks equivalent on the vendor's benchmark may not be equivalent on your work.

## What this looks like when it is done right

A workflow with a known cost per task, a ceiling, an alert, and a routing table. A prefix that stays stable so the cache earns its keep. A batch job for everything that can wait until tonight. A hard limit on agent steps. And a number you can say out loud to a client: this costs us X per case, they were paying Y, here is the difference.

That last sentence is the whole business case. Everything above it is plumbing.
`,
};

export default post;
