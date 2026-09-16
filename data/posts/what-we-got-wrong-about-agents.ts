import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'What We Got Wrong About Agents This Year',
  slug: 'what-we-got-wrong-about-agents',
  date: '2026-09-15T14:00:00Z',
  excerpt:
    'A year of agents in production, an industry arguing with statistics it never checked, and several confident predictions that did not survive. Including some of mine.',
  metaDescription:
    'A year of agents in production: which famous statistics do not hold up, which predictions failed, and what the evidence actually supports going into 2027.',
  tags: ['ai', 'agents', 'retrospective', 'evidence', 'operations', 'strategy'],
  content_md: `
# What We Got Wrong About Agents This Year

## Key Takeaways
- **The two most quoted statistics about AI failure do not say what people think.** Both are worth reading at the source.
- **A famous productivity study was retired by the people who ran it.** That is what integrity looks like.
- **Analyst forecasts contradicted each other inside eight months.** Cite the survey, not the prediction.
- **Autonomous did not beat supervised on capability.** It beat it on attention, which is a different argument.
- **The deployments that worked were narrow, measured, and boring.**

---

It has been a year since agents stopped being a demo and started being something companies actually run. Enough time to see what held.

I am writing this as a correction list rather than a victory lap, including on things I said. The useful output of a year is not a thesis confirmed. It is the list of places where the evidence went somewhere else.

## The 95 percent that everybody quoted

You have seen it. Ninety five percent of AI pilots fail.

The report says something different. It says 95 percent of organisations are getting zero return, which is a statement about all organisations, not about pilots. Its own funnel has half of organisations investigating, 20 percent piloting and 5 percent implementing, which means roughly a quarter of pilots cleared the bar. The evidence base is 52 interviews and 153 survey responses gathered at conferences over six months, labelled preliminary, not peer reviewed, and the authors themselves warn that six months may understate success rates. ([critique, April 2026](https://80000hours.org/podcast/episodes/ai-workplace-mit-study/))

A number travelled around the world because it confirmed something people already wanted to say. I quoted it in conversation more than once before I read the methodology. That is on me.

## The 40 percent cancellation forecast

The other one: 40 percent of agentic AI projects will be cancelled by 2027.

The disclosed basis is a January 2025 poll of 3,412 self selected webinar attendees, measuring investment posture rather than cancellations. It is analyst judgement. It may prove right. It is not a measurement, and it gets cited as one.

The same firm's forecasting record this year is worth holding up, because it shows how fast the narrative moved. In August 2025 it projected that 40 percent of enterprise applications would be integrated with task specific agents by the end of 2026, up from under 5 percent. In April 2026 its own CIO survey found 17 percent of organisations had deployed agents, and placed agentic AI at the peak of inflated expectations. ([Gartner, April 2026](https://www.gartner.com/en/articles/hype-cycle-for-agentic-ai))

Eight months apart. Same firm. The survey is useful. The forecast was a mood.

## The productivity study that was withdrawn

Early in the year, the most cited result in the developer tooling argument was a randomised trial suggesting experienced open source developers were 19 percent slower when using AI tools.

METR, the organisation that ran it, now carries a banner on that page saying the results are out of date, and published a February 2026 follow up with 57 developers across 143 repositories and over 800 tasks, where the sign flipped but both arms cross zero. ([METR, February 2026](https://metr.org/blog/2026-02-24-uplift-update/))

So neither the slowdown nor a speedup is currently defensible. I respect that a great deal more than I would respect a confident update. If you used the 19 percent figure in a deck, it needs a footnote now.

## What autonomy actually measured

The most surprising result of the year, to me, was about human approval rather than model capability.

In a controlled study with 1,053 paid testers, an automated permission system caught 89 percent of dangerous commands while human testers caught 13.6 percent, and the human catch rate decayed within a session from around 17 percent early to about 5 percent after fifty or more prior prompts. Manual approval was reported as more than twice as likely as the automated mode to result in harmful actions users had not requested. The automated mode became the default in August. ([Anthropic, August 2026](https://claude.com/blog/auto-mode-default-in-claude-code))

I spent the first half of the year arguing that a human decision should sit in front of consequential actions. I still believe that for irreversible, high value actions. What I got wrong was assuming the human in that position was doing the work. At volume, they are not, and a well designed automatic check outperforms them.

The correction is not less oversight. It is oversight in fewer places, with better context, on the actions that actually deserve it. Policy handles the routine cases so the person has attention left for the rare one.

Caveat, again: the vendor benefits from this conclusion. The study design is public, the sample is large, and nobody has produced a contrary measurement of similar scale. Take it seriously and stay alert for a rebuttal.

## Capability did not arrive the way the roadmaps said

The benchmark numbers are a useful antidote to conference talks.

On TheAgentCompany, a benchmark of realistic company tasks, the best autonomous completion rate is 42.86 percent, and the leaderboard has no 2026 submissions above it. On tau-bench, a customer service benchmark, an agent with over 60 percent average task success drops below 25 percent when the same task must be solved correctly eight times in a row. The SWE-bench Verified ceiling is 79.2 percent, not the nineties that circulate on aggregator blogs.

That reliability collapse under repetition is the number I would put on the wall. Average success is a demo statistic. Consistency across repeated attempts is the production statistic, and it is much lower.

## The labour story got corrected too

Several companies that publicly attributed staff reductions to AI have walked some of it back. Survey work reported in July 2026 found that 39 percent of leaders had made AI driven redundancies and that 55 percent of those now say it was the wrong call, with around 32 percent of US hiring managers reporting they eliminated a role for AI and later rehired.

The most cited example is messier than the shorthand. The company's own annual filing reports a headcount decline from 4,352 to 2,831 between 2023 and 2025 and states the expectation that the number continues to decrease. The widely repeated rehire narrative is press interpretation, not the filing.

Both the triumphant version and the humiliating version of that story were exaggerated. That is usually the case.

## What actually worked

Across everything we ran and everything clients showed us, the pattern in the deployments that survived is consistent and unglamorous:

- **One process, not a platform.** The successes are a specific queue with a specific owner.
- **Read heavy, write narrow.** Retrieval, drafting, routing and summarising, with a small number of guarded write actions.
- **A policy in front of the consequential step**, evaluated before execution, not reviewed after.
- **An eval suite built from real failures**, and a rule that no model change ships without it.
- **Numbers taken before starting.** The teams that could not say what the process cost before are still arguing about whether it improved.

None of that needs a frontier model. Most of it needs someone willing to do process archaeology for two weeks.

## What I am holding going into next year

That the constraint is trust and context, not capability. That the interesting companies own execution and accountability, not model access. That consistency under repetition is the metric that separates production from theatre.

And a new one, learned this year: check the methodology before repeating the statistic, especially when it agrees with you.
`,
};

export default post;
