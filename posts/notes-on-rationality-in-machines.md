---
title: 'Notes on rationality in machines'
date: '2021-08-30T13:07:44.675Z'
description: 'A brain dump of some of my thoughts on rationality in machines.'
thumbnail: '/img/blog/thumbnail9.png'
---

These are some old introductory notes for people startng to think about AI Safety. I've left them here for posterity.

### What is rational decision making?
Rationality is a hard topic to pin down. There is no concrete definition that catches all possible interpretations. In the context of intelligent agents, though, a rational agent is an agent that has preferences about how it would like the world to be, can deal with uncertainty by modeling the world and assigning values to certain states, and always takes the action that is most likely to benefit it in the long term. 

So if that’s what a rational agent is, what’s a rational decision? We can say that a rational decision is one based on the application of logic to known facts about the world, made in order to maximise the value of an agent's utility function*”.

In other words, a self driving car might have a utility function that specifies it should deliver its passengers to their destination safely**. If it knows facts about the world including its location and the location of another car driving towards it at full speed, then a rational decision, by the above definition, would involve the correct application of logic to these known facts in pursuit of the maximisation of the expected utility of the utility function. 

The result of this rational decision*** would, hopefully, involve the self-driving car moving out of the way rather than, say, accelerating.

### Are current intelligent systems rational?
In systems that can be described as Artificial Narrow Intelligence (All AI systems that we have today; competent in narrow ranges of activities), attempting to make the most rational decision is usually a good thing, assuming that we have correctly specified the utility function. This is because systems that coherently and rationally pursue an objective are more likely to succeed than systems that don’t. 

Imagine a chess-playing AI that had a perfectly calculated joint probability distribution of every possible move, allowing it to make the move that was most likely to win each time. We’d suspect that this system would beat another AI that randomly chose every move. So if a rational AI system is more likely to succeed in completing an objective, does this mean we should strive for maximum rationality in all AI systems?

### What does the future of rationality in machines look like?
What happens when we consider Artificial General Intelligence? These systems will reason at a higher level than humans, and millions of times faster. This poses a problem for our species. If a generally intelligent agent can rationalise and execute a strategy more effectively than humans can, then isn’t it likely to do so regardless of any human objection? If the agent's goals are not perfectly aligned with ours, then this poses a serious problem.

This problem is analogous to the relationship between gorillas and humans. Despite the fact we were “created” by apes, the fate of the gorilla now depends on humans due to the strategic advantage we now have over them. 

If we wanted to eradicate gorillas, we could. If we don’t take gorillas into consideration in any of our decisions, we’ll likely eradicate them accidentally via habitat loss and pollution. This is the crux of the AI alignment problem; how do we build intelligent agents that respect our values such that we don’t end up being subject to their will?

Why not just directly specify that the system should be nice to humans, you say? Direct specification has a few problems..
- Perverse instantiation - regardless of how accurately you define your utility function, it’s likely an intelligent agent will find a loophole that allows it to fulfil the utility function in a potentially catastrophic way. See the paperclip maximiser thought experiment.
- the instrumental convergence thesis which implies that regardless of what an agent wants, it will try to acquire resources and eliminate threats
- the orthogonality thesis which says that the desires of an agent can be anything - more intelligent agents don’t necessarily pursue “more intelligent” goals

So where do we go from here? It seems, understandably, like a somewhat intractable problem. Fortunately, all is not lost; a community of AI enthusiasts and researchers, bound together by the AI Alignment forum, LessWrong and disparate Google Docs, are working on these issues fervently. Lots of progress has been made in mapping out this territory, and it’s our ambition to highlight more of the good work being done in future posts.

-* A utility function is a product of Utility Theory. Utility Theory helps us to reason when we have uncertainty about the world. Combining Utility Theory with Probability Theory leads to decision-theoretic agents 
-** We don’t know how to accurately encode anthropomorphic objectives like this into machine readable instructions. For example, what does “arrive at your destination safely” look like when represented in binary? What does “safely” even mean? 
-*** There’s nuance here, and the trivial example given doesn’t fully reflect the complexity of what it means to rationalise, but it should give a rough idea. For an indepth look at a lot of what’s generally thought about rationality, see The Sequences by Eliezer Yudkowsky https://www.lesswrong.com/rationality


