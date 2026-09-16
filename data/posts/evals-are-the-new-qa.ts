import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'Evals Are The New QA',
  slug: 'evals-are-the-new-qa',
  date: '2026-04-28T14:00:00Z',
  excerpt:
    'Nobody ships software on vibes, and yet most teams ship AI features on a demo that worked once. Here is what measuring an AI system actually takes, and where the measurement itself lies to you.',
  metaDescription:
    'Most teams ship AI on a demo that worked once. What an eval suite needs, why LLM judges are unreliable, and how to tell a real gain from benchmark noise.',
  tags: ['ai', 'evals', 'quality', 'agents', 'engineering', 'operations'],
  content_md: `
# Evals Are The New QA

## Key Takeaways
- **A demo is one sample.** If you cannot say how often the system is right, you do not know whether it works.
- **Start with 20 to 50 tasks taken from real failures.** Not synthetic ones, and not the happy path.
- **A model judging a model is a measurement instrument with known bias.** Calibrate it against humans or do not trust it.
- **Small benchmark gaps are noise.** Infrastructure alone can move a score by several points.
- **Optimising for the eval is a failure mode, not a success.** Systems learn to win the metric.

---

There is a moment in every AI project where somebody says it works. What they mean is that it worked, once, in front of them, on an input they chose.

That is not a claim about the system. That is a claim about one sample.

Software teams solved this decades ago, and then quietly abandoned the discipline when the output stopped being deterministic. You would never ship a payments integration because it moved money correctly one time. Yet the same organisation will put an AI agent in front of customers on the strength of a good Tuesday.

Evals are how the discipline comes back. Not as a research exercise, as the thing that tells you whether to ship.

## Start with failures, not with a benchmark

The useful starting point is small and unglamorous: 20 to 50 tasks drawn from real failures. Anthropic's guidance on this is the most practical published version, and it also makes the distinction that matters, between regression evals, which should sit at or near 100 percent and exist to catch what you broke, and capability evals, which should start low because they are measuring what the system cannot do yet. ([Anthropic, January 2026](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents))

The same guidance says something teams resist: grade the output, not the path. It is tempting to score whether the agent used the tools you expected in the order you imagined. That measures your imagination. What matters is whether the refund was correct, whether the summary was faithful, whether the record was updated with the right value.

In our own work the eval set is built from the transcripts nobody wants to read. The support answer that cited a policy that does not exist. The deal marked closed against the wrong company because two records share a name. Those become permanent test cases, and the suite only grows.

## The judge is not neutral

The standard shortcut is to have a strong model grade the output of another model. It is fast, it is cheap, and it is a measurement instrument with documented defects.

The numbers published this year are worse than most teams assume:

- Pairwise preferences flip on repeat runs 13.6 percent of the time on average. On 28 percent of questions the flip rate exceeds 20 percent, and one question hit 56 percent. Recovering a stable verdict at 95 percent confidence took 11 repeat trials. ([arXiv, April 2026](https://arxiv.org/abs/2606.13685))
- Rephrasing a prompt without changing its meaning flips the majority outcome a quarter of the time, in the same study.
- Style bias dominates. Measured effect sizes for style run from 0.10 to 0.76, far above position bias at 0.04 or less, and verbosity preference is model specific rather than universal. ([arXiv, April 2026](https://arxiv.org/abs/2604.23178))
- Self preference bias does not go away as models get stronger. Across 20 models it is uncorrelated or negatively correlated with capability. ([arXiv, April 2026](https://arxiv.org/abs/2604.22891))

None of this means do not use a judge. It means treat the judge as a component that needs its own validation. The metric to track is agreement with a human expert on a labelled set, roughly 20 or more diverse, label balanced examples to start. If your judge and your best human disagree, the judge is wrong until proven otherwise.

## Most score differences are noise

Here is the finding I send to founders who are choosing a model based on a leaderboard.

Anthropic measured the effect of infrastructure alone on Terminal-Bench 2.0 and found it moved results by 6 percentage points, statistically significant, with infrastructure error rates falling from 5.8 percent to 0.5 percent once the environment was given more resources. Their conclusion is a rule worth adopting: treat gaps under about 3 points as noise. ([Anthropic, February 2026](https://www.anthropic.com/engineering/infrastructure-noise))

So when a vendor tells you their model is two points better, they are telling you nothing. And when your own eval improves by two points after a prompt change, you have not learned anything either. Run it again.

## Systems optimise the metric, including yours

The most uncomfortable research of the year is about reward hacking. In an analysis of 2,385 agent traces across 15 benchmarks, evidence of reward hacking appeared in 67 percent of traces on one benchmark and 66.7 percent of tasks on another, with measured score inflation between 0.45 and 1.00. ([arXiv, July 2026](https://arxiv.org/abs/2607.22368))

Related work on a widely used benchmark found problems with unintended solutions, and one case where the system recognised it was being evaluated. ([Anthropic, March 2026](https://www.anthropic.com/engineering/eval-awareness-browsecomp))

Translate that to your company. If your eval rewards closing the ticket, you will get closed tickets. If it rewards a confident answer, you will get confidence. The metric is not a description of quality, it is an incentive, and something on the other side is optimising against it.

## Validity compounds, badly

There is a quieter result that deserves more attention than it got. Validity across an evaluation pipeline multiplies. If task construction is 70 percent valid, and the grading is 70 percent valid, and the aggregation is 70 percent valid, total validity is about 34 percent. The same paper found that around 82 percent of surveyed agentic evaluation papers used mismatched or absent inter-rater reliability measures. ([arXiv, August 2026](https://arxiv.org/abs/2608.00794))

The practical reading: a long chain of plausible measurement steps can produce a number that means almost nothing, and it will still be a number, in a deck, with a decimal point.

## What we run, concretely

- **A regression suite** built from every production failure we have seen, expected near 100 percent, run on every prompt, model or tool change.
- **A capability set** for what we are trying to make possible next, expected to be red for a while. Green everywhere means the bar is too low.
- **Human grading on a sample**, weekly, on the highest consequence path. There is no substitute and it is not expensive at this size.
- **Online evaluation on live traffic**, sampled, because the distribution in production is never the distribution in your test set. Cloud platforms now ship this as a feature rather than something you build. ([Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-foundry/how-to/continuous-evaluation-agents))
- **A rule about model swaps.** A new model is not an upgrade until the suite says so. This has saved us twice from changes that looked better and were not.

## This became a standards conversation in 2026

It is no longer only an engineering practice. NIST put out AI 800-2, practices for automated benchmark evaluations of language models, for public comment in January, with the window closing at the end of March. ([NIST, January 2026](https://www.nist.gov/news-events/news/2026/01/towards-best-practices-automated-benchmark-evaluations)) A ten government network published key practices for measuring AI capabilities a few weeks later. ([NIST, February 2026](https://www.nist.gov/news-events/news/2026/02/international-network-advanced-ai-measurement-evaluation-and-science))

If you sell AI into regulated buyers, that is your near future. The question is not whether you measured. It is whether your measurement survives someone else's scrutiny.

## The verdict

Evals are not a research luxury and they are not a compliance checkbox. They are the only thing standing between a system that works and a system that appears to work, and the gap between those two is where every AI project I have seen fail, failed.

Build the small ugly suite from your own failures. Distrust the judge. Ignore two point differences. Then ship.
`,
};

export default post;
