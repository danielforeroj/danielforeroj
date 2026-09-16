// One file per post, collected here. The array is sorted newest first, which is
// the order the homepage takes its "latest" slice from; the blog index sorts
// again on its own, so the two cannot disagree.
//
// Adding a post: copy content/post-template.ts into this folder, export the Post
// as default, and add the import below. Nothing else needs to change.

import type { Post } from '../../types';

import agentAllowedToDo from './what-your-agent-is-allowed-to-do';
import contextLayer from './your-ai-does-not-know-your-company';
import answerVisibility from './are-you-in-the-answer';
import quantumClock from './the-quantum-clock-is-already-running';
import evals from './evals-are-the-new-qa';
import workflowCost from './what-an-ai-workflow-actually-costs';
import quantumSupplyChain from './quantum-is-a-supply-chain-problem';
import humanInTheLoop from './human-in-the-loop-is-not-a-strategy';
import businessesThatWork from './ai-for-businesses-that-already-work';
import agentsThisYear from './what-we-got-wrong-about-agents';

export const newPosts: Post[] = [
  agentsThisYear,
  businessesThatWork,
  humanInTheLoop,
  quantumSupplyChain,
  workflowCost,
  evals,
  quantumClock,
  answerVisibility,
  contextLayer,
  agentAllowedToDo,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
