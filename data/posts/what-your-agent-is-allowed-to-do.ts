import { Post, PostType } from '../../types';

const post: Post = {
  type: PostType.BLOG,
  title: 'What Your Agent Is Allowed To Do',
  slug: 'what-your-agent-is-allowed-to-do',
  date: '2025-12-18T14:00:00Z',
  excerpt:
    'Everyone is asking what their agent can do. Almost nobody has written down what it may do. Capability arrived first, permission is arriving late, and the order matters.',
  metaDescription:
    'Everyone asks what an agent can do. Few have written down what it may do. Why permission has to be decided before execution, not reviewed afterwards.',
  tags: ['ai', 'agents', 'governance', 'security', 'selah', 'operations'],
  content_md: `
# What Your Agent Is Allowed To Do

## Key Takeaways
- **Capability is not permission.** Tool access answers what an agent can do. Nothing in most stacks answers what it may do.
- **The risk is the action, not the model.** A wrong sentence is embarrassing. A wrong refund is money.
- **Deciding after the fact is not governance, it is a log.** The decision has to happen before the call executes.
- **Prompt injection makes the agent's own reasoning an untrusted input.** Guardrails inside the prompt are advice, not control.
- **Fully autonomous is usually the wrong goal.** The useful goal is autonomy inside declared limits.

---

This was the year agents got hands. Tool calling became standard, the protocol for connecting models to systems consolidated fast, and by December the Model Context Protocol had been donated to a foundation with platinum members from every major cloud and model vendor, roughly 97 million monthly SDK downloads and around ten thousand active servers behind it. ([Model Context Protocol, December 2025](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/))

Connecting a model to a real system went from a project to an afternoon.

What did not arrive at the same speed is the answer to a different question. Not what can this agent reach. What is it allowed to do with what it reaches.

## The two questions are not the same

Capability is a technical property. The agent has a token, an endpoint and a schema. It can send the message, update the record, issue the credit, change the price.

Permission is a business property. Under what conditions, on which accounts, up to what amount, at what hour, by whose authority, with what evidence.

Almost every stack I audit has an excellent answer to the first and no answer at all to the second, or rather, one answer, buried in a prompt, phrased as a polite instruction. Please do not issue refunds over one hundred dollars. Please confirm with a human before contacting a customer.

That is not a control. That is a request made to a system that was designed to be persuadable.

## Why the prompt is the wrong place for the rule

Two reasons, and the second is the one that ends the argument.

The first is that a rule written in a prompt is subject to the same probabilistic process as everything else in the prompt. It usually works. Usually is not a control.

The second is prompt injection. An agent that reads a customer email, a web page, a PDF or a ticket is reading text it did not write and cannot trust. That text reaches the same context window as your instructions. If the agent's own reasoning can be steered by content it retrieved, then any limit that lives inside that reasoning can be steered too.

This is the structural point that changes how you build. The agent's plan is an untrusted artifact. You can use it, you cannot rely on it to enforce anything.

So the enforcement has to sit outside the agent, in the path between deciding and doing, where a policy you wrote evaluates a proposed action and returns a verdict the agent cannot argue with.

## Before, not after

Most of what is sold as AI governance is observability. Traces, logs, dashboards, a record of what the agent did and why. That work is necessary and I am not dismissing it. But a log tells you what happened. It does not prevent it.

If an agent refunds the wrong customer, an excellent trace of the wrong refund is an excellent record of a loss.

The decision has to happen before execution. An agent proposes an action, a policy engine evaluates it against rules that exist outside the model, and returns one of three answers: permit, hold, deny. Permit executes. Deny does not, and says why. Hold goes to a person, with the context needed to decide, and it waits.

That is the shape we built Selah around, and three design choices in it are the ones that survive contact with production.

**It is fail closed.** If the decision engine is unavailable, the action does not happen. The opposite default, allow when the checker is down, means your safety property disappears exactly when your infrastructure is unhealthy, which is the moment it is most needed.

**It is fast enough not to be removed.** A control that adds noticeable latency to every action gets disabled by the first engineer under delivery pressure. The budget is single digit milliseconds, not seconds, and that constraint shapes the whole design.

**Every decision is recorded in a tamper evident log.** Not because an auditor will ask, though they will. Because a permit and a deny are both claims about what your policy said at a moment in time, and those claims need to be checkable later.

## What to write down, concretely

You do not need a product to start. You need a document, and most teams have never written it.

For each agent, and for each tool it can reach:

1. **Actions.** Which specific operations. Not "the CRM", the four operations it may perform in the CRM.
2. **Limits.** Amounts, counts per hour, which record types, which customer segments, which environments.
3. **Conditions.** What must be true first. Identity verified. Balance confirmed. Contract active. Evidence attached.
4. **Escalation.** What goes to a person, who that person is, how fast they must respond, and what happens if they do not. An undefined timeout is a decision nobody made.
5. **Irreversibility.** Which actions cannot be undone. Those get the strictest treatment regardless of how routine they look.

Write it for the agent you already have in production. The exercise takes an afternoon and it tends to be uncomfortable, because the honest answer to several rows is we do not know, and that is precisely the finding.

## The objection, answered

The objection I hear is that this slows the agent down and defeats the purpose.

It does slow some actions down. Deliberately. The alternative is not a faster agent, it is a faster incident.

And it is worth being precise about what governance costs. Reading, summarising, drafting, retrieving, analysing: none of that needs a gate. The gate belongs on the small set of actions that touch money, customers, credentials, production systems or anything you cannot take back. In most workflows that is a minority of the calls and the majority of the risk.

Governance does not make AI less useful. Bad governance, the kind that reviews everything or nothing, makes it unusable.

## Where this goes

Agents will get more capable. Tool ecosystems will keep consolidating. The interesting constraint over the next few years is not what a model can do, it is what an organisation can responsibly let it do, and who can prove it.

Intelligence without control is not intelligence. It is exposure with a good user interface.

## FAQ

- **Is this not what an API key already does?** A key says who is calling. It does not say whether this particular call, on this account, for this amount, right now, is allowed.
- **Can the model not check its own policy?** It can, and it is worth doing as a first filter. It should not be the last word. A system should not be the only judge of whether it is allowed to act.
- **Where do we start?** Take the one action your agent performs that you would not want to explain to a customer. Put a rule in front of that.
`,
};

export default post;
