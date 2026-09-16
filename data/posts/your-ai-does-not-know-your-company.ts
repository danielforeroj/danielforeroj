import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'Your AI Does Not Know Your Company',
  slug: 'your-ai-does-not-know-your-company',
  date: '2026-01-28T14:00:00Z',
  excerpt:
    'The model is not the bottleneck. The context is. Most companies ask a general assistant a question only their own systems can answer, and then blame the model for guessing.',
  metaDescription:
    'The model is not the bottleneck, the context is. Why company questions need a context layer, what breaks without one, and how to build it in the right order.',
  tags: ['ai', 'context', 'data', 'agents', 'operations', 'enterprise'],
  content_md: `
# Your AI Does Not Know Your Company

## Key Takeaways
- **A general assistant knows the world. It does not know your customer.** That gap is not a model problem, it is a context problem.
- **Bad context does not produce silence, it produces confident answers.** The failure mode is a plausible sentence, not an error message.
- **Retrieval is not one thing.** Keyword search still beats embeddings on real enterprise corpora, and the winning setups use both.
- **Identity resolution is the unglamorous core.** One customer across four systems that disagree is the actual problem.
- **Build the context layer first, then agents.** Agents inherit whatever the context layer gets wrong, and act on it.

---

Every week someone shows me an assistant that answers questions about their business. Then I ask it something only their business can answer. How much does this client owe us, what did we promise them in October, why did this account stop buying.

The demo ends there, or worse, it does not. It answers anyway.

That is the part most people miss. When a model lacks context it does not stop. It produces a fluent, structurally correct, entirely invented answer. Grounding is what changes that behaviour, and grounding is work you do, not a setting you enable.

## The evidence is boring and consistent

Salesforce surveyed data leaders at the end of 2025 and found that 26 percent of an organization's data is considered untrustworthy, and that 70 percent of respondents believe their most valuable insights sit in data they cannot access. ([Salesforce, November 2025](https://www.salesforce.com/news/stories/data-analytics-trends-2026/))

Informatica's 2026 survey of 600 data leaders put the same thing more bluntly: 57 percent named data reliability as the top barrier to moving AI from pilot to production, and roughly half called it the primary blocker for agentic AI specifically. Sixty nine percent already have generative AI in production. Seventy six percent say governance is behind how employees already use it. ([Informatica, January 2026](https://www.informatica.com/about-us/news/news-releases/2026/01/20260127-new-global-cdo-report-reveals-data-governance-and-ai-literacy-as-key-accelerators-in-ai-adoption.html))

Read those two together. Production is not the hard part any more. Trust is.

And it is not only enterprise anxiety. Stanford researchers tested legal research tools that are built on retrieval, over a preregistered set of queries, and still measured hallucination rates of 17 percent and 33 percent depending on the product. ([Stanford RegLab](https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/)) These are products sold specifically on being grounded. Grounding reduces invention. It does not delete it.

## What a context layer actually is

Not a chatbot. Not a vector database. Not a dashboard with a text box on top.

A context layer is the thing that reads the systems a company already runs, resolves them into one record per subject, keeps what matters with where it came from, and hands that out as context to whatever is about to answer or act.

Three properties make it real:

1. **It indexes what already exists.** No migration. If the answer requires the client to reorganise their business first, the project dies in month two.
2. **It separates observed from inferred.** What a customer said is not the same as what a model concluded about them. A conclusion with no evidence behind it should be refused at the moment it is created, not caught later.
3. **It serves bounded, cited context.** The block that goes to the model says what it contains and what it left out. That is the part nobody else in the category wants to answer, and it is the part that makes the output auditable.

We built On Duty around exactly that shape, and the design constraint that mattered most was agnosticism. A business will not have one AI. It will have the assistant its team already pays for, the one embedded in a tool it bought, something a developer wired up, and whatever it adopts next year. Each of those knows a different slice and none of them knows the customer. The context layer sits underneath all of them.

## Identity is the real problem

Here is the test I use. Take a customer who wrote to support on WhatsApp, paid an invoice, appears in the CRM under a slightly different company name, and has a contract in a shared drive. Ask the system to tell you about that customer.

If it returns four different people, you do not have a context problem, you have an identity problem, and every AI feature you build on top of it will inherit that.

The research on entity resolution is honest about the difficulty: across benchmarks from hundreds of records to five million, no single matching algorithm wins everywhere, precision and recall need separate mechanisms, and one false positive can silently merge two unrelated companies into one entity through transitive closure. ([arXiv, July 2026](https://arxiv.org/abs/2607.26298))

That last failure is the dangerous one. A missed match looks like missing data. A wrong match looks like an answer.

## Retrieval is not solved, and it is not one technique

The industry spent two years assuming embeddings were the answer. Then people measured on real corpora.

A benchmark built on around half a million documents in real formats, Slack, Gmail, Drive, tickets, code, found plain keyword search reaching 68.8 percent correctness against 51.4 percent for dense vector search, and vector search dropping to 32.8 percent on semantic questions. ([EnterpriseRAG-Bench, May 2026](https://arxiv.org/abs/2605.05253))

Keyword search is not fashionable. It is very good at names, invoice numbers, product codes and acronyms, which is most of what anyone actually asks a business system.

More context is also not automatically better. Anthropic's engineering team describes context rot, where recall degrades as the context window fills, and recommends passing identifiers and retrieving just in time rather than dumping everything in. ([Anthropic, September 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents))

## The order that works

- **Inventory first.** List the systems where customer truth actually lives. It is usually more than the client thinks and includes at least one spreadsheet nobody admits to.
- **Resolve identity second.** One record per customer, with the conflicts surfaced rather than averaged away.
- **Then answering.** A question box over a resolved record, with citations, before anything writes to a system.
- **Then action.** And when something is about to act on a customer, a decision runs first. That is a different post, and the reason Selah exists.

Most teams run this backwards. They buy the agent, then discover the agent needs context, then discover the context needs identity, then discover identity needs the data work nobody funded.

## The uncomfortable summary

If a model gets your business wrong, the honest question is not which model you are using. It is whether anything in your stack could have told it the right answer.

Usually the answer is no. The information existed. It was in four systems, under three spellings, with no one responsible for reconciling them. The model did not hallucinate your company. It described the version of your company your systems describe.

## FAQ

- **Is this just RAG?** Retrieval is one mechanism inside it. A context layer also owns identity, provenance and what gets refused, which retrieval alone does not.
- **Do we need it if we only use ChatGPT internally?** More, not less. A general assistant with no grounded context is exactly the configuration that invents confidently.
- **How long does it take?** The indexing is fast. The identity work takes as long as your worst system, and that is the honest estimate to give your board.
`,
};

export default post;
