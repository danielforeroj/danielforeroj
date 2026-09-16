import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'Are You In The Answer',
  slug: 'are-you-in-the-answer',
  date: '2026-02-24T14:00:00Z',
  excerpt:
    'Buyers stopped reading ten blue links and started reading one answer. If your brand is not inside that answer, you are not in the consideration set, and your analytics will not tell you why.',
  metaDescription:
    'Buyers now read one AI answer, not ten links. What the data shows about clicks and citations, why rank no longer predicts them, and how to measure yourself.',
  tags: ['ai', 'geo', 'aeo', 'search', 'marketing', 'growth'],
  content_md: `
# Are You In The Answer

## Key Takeaways
- **The question changed.** It is no longer where you rank. It is whether you are named when a buyer asks about your category.
- **Ranking predicts citation less and less.** Half of what an engine cites is no longer what wins the page.
- **Clicks are down and sessions end earlier.** The visit you used to get is now an answer someone else summarised.
- **Every assistant behaves differently.** One cites constantly and names brands rarely, another does the opposite.
- **Measure it before you optimise it.** Most teams are guessing about a surface they have never looked at.

---

A client asked me last month why traffic was down while the business felt fine. The pipeline had not collapsed. Search impressions were stable. Clicks were not.

That is the shape of the shift. Demand did not go anywhere. The interface in front of it did.

## What the numbers say

The most methodologically careful public study of click behaviour remains the Pew Research work, which observed real browsing rather than asking people what they do. On searches where an AI summary appeared, 8 percent of visits included a click on a traditional result, against 15 percent where no summary appeared. One percent clicked a link inside the summary. Twenty six percent of sessions ended entirely, against 16 percent without. ([Pew Research Center, July 2025](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/))

The effect has deepened since. An analysis of 300,000 keywords comparing December 2023 with December 2025 put the click through rate drop for position one at 58 percent when an AI overview is present, up from the 34.5 percent the same team measured a year earlier. ([Ahrefs, February 2026](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/)) It is correlational, and the authors say so, but the direction is not in dispute.

On the publisher side, Chartbeat data reported in the Reuters Institute's 2026 trends work showed Google referrals to publishers down 33 percent globally year over year to November 2025, and down 38 percent for US organic. ([Press Gazette, January 2026](https://pressgazette.co.uk/media-audience-and-business-data/google-traffic-down-2025-trends-report-2026/))

Those are three different populations measured three different ways, which is why I trust the direction and not the decimals.

## Ranking stopped being the proxy

For twenty years the whole discipline had one convenient property: if you ranked, you were seen. That link is weakening.

In mid 2025, a study of AI overview citations found that 76.1 percent of cited URLs also appeared in the classic top ten. ([Ahrefs, July 2025](https://ahrefs.com/blog/search-rankings-ai-citations/)) In the scans we run now, in our own clients' categories, the overlap is visibly lower than that, and it keeps drifting. I expect the next public study to confirm it.

Which means a rank report is drifting away from the question your buyer actually asks. It still tells you who wins the page. It is no longer a reliable proxy for who gets named in the answer.

## The engines are not one thing

Treating "AI search" as a single channel is the most common mistake I see in strategy decks.

Run the same category question through four assistants and you get four different shapes of answer. One returns a long list of cited sources and almost never names a vendor. Another names three companies with confidence and cites almost nothing. One leans on whatever has a crawlable comparison page. One leans on forums.

I am describing our own scans rather than a published study, because the published work on this is thin and mostly vendor produced. But the structural point is not subtle: one assistant is a research surface, where being a citable source is what matters, and another is a recommendation surface, where being a named brand is what matters. They are not one channel and they do not respond to the same work.

## The part nobody wants to hear about crawlers

There is an economic asymmetry underneath all of this. Cloudflare measured crawl to referral ratios in 2025: roughly 38,000 to one for Anthropic, about 1,091 to one for OpenAI, 195 to one for Perplexity, against 5 to one for Google, with training driving around 80 percent of AI bot activity. ([Cloudflare, August 2025](https://blog.cloudflare.com/crawlers-click-ai-bots-training/)) Cloudflare notes a caveat that inflates one of those figures, and the numbers have surely moved since, but the shape is right. The old bargain, we crawl you and we send you visitors, does not hold at the same exchange rate.

Two practical consequences.

First, blocking training does not block answer time retrieval, and they are different bots. OpenAI documents three: one for training, one for surfacing results in ChatGPT search, and one for user initiated fetches, where it states robots.txt may not apply. ([OpenAI](https://developers.openai.com/api/docs/bots)) Google's control covers training and grounding but gives no opt out from AI overviews specifically. ([Google](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)) If someone on your team blanket blocked AI crawlers last year to protect content, check what they actually blocked.

Second, do not spend a sprint on llms.txt. Of around 38,000 domains publishing a valid one, 97 percent received zero requests for it in the month studied, and most of the fetches that did happen came from coding agents and audit tools. ([Ahrefs](https://ahrefs.com/blog/llmstxt-study/)) I ship one anyway because it costs an hour. I would not present it to a board as a strategy.

## What actually seems to work

The academic anchor for this field is still the original generative engine optimization paper, which found that citing sources, adding quotations and adding statistics raised visibility by up to 40 percent on their benchmark. ([arXiv, 2023](https://arxiv.org/abs/2311.09735))

That is a suspiciously comfortable result for anyone who writes carefully, and it matches what we see:

- **Answer the question in the first hundred words**, in plain language, before the context and the caveats.
- **Put a number in it.** Specific, attributed, dated. Models reach for text they can quote without hedging.
- **Be the source, not the summary.** Original data, original methodology, your own numbers. Nothing gets cited for restating the consensus.
- **Name yourself clearly and consistently.** Entity confusion is a real failure. If three spellings of your company exist, you are splitting your own signal.
- **Keep the facts consistent across your own properties.** Contradicting yourself across your site, your docs and your profiles is how a model decides it does not trust any of it.

## Measure first

You cannot manage this from Google Analytics. Referral traffic from an assistant is thin or invisible, so the only honest approach is to ask the engines directly, repeatedly, and record what they say: the category question, the answer, which brands appear, which sources are cited, on what date, on which model.

That is the loop we built unbound geo around, and building it taught me the thing I would tell anyone starting: the measurement is not the product. Knowing you are absent is worth very little. Knowing which sources the engine trusts in your category, and becoming one of them, is the work.

## The verdict

Search did not die. It got summarised. The buyer still exists, still has budget, still has the same problem. They are just reading one paragraph now instead of choosing from ten links.

The only question that matters is whether your name is in that paragraph. Most companies have never checked.
`,
};

export default post;
