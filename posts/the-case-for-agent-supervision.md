---
title: 'The case for human-agent-agent co-operation'
date: '2024-11-16T00:07:44.675Z'
description: 'Why an agentic future requires supervision on-the-fly'
thumbnail: '/img/blog/thumbnail25.jpg'
---


# The Case for Human-Agent Co-operation

In this post I'll give a brief overview of my thoughts on human and AI supervision of agents in a co-operative manner, and why I think it will be required to unlock wide scale deployments of agentic systems in high risk, economically useful domains. I'll briefly touch on why I think supervision solves a novel problem not addressed by evaluations done prior to deployment. My thinking in this post is influenced by the AI control research done by Redwood and Scalable Oversight work done by a range of researchers. 

### New paradigms of computation

It seems plausible that the near future will bring powerfully agentic systems that can reason under uncertainty and strategise sufficiently well that they will be able to pursue a wide variety of long horizon, complex tasks. In the short term, perhaps this means solving customer support queries, but in the long term this might mean that agents could successfully operate entire functions at companies, or even one day operate their own companies that provide real utility. 

One imagines that alongside a lot of risk, this will unlock immense opportunity to positively improve our societies, much of which will no doubt manifest in ways we can't fathom at present. 

These types of systems appear to be new in important ways, and I think they will require a lot of rethinking of how our existing systems function (and perhaps also our society at large, although that's a topic for another day). Instead of us as humans designing a system for a purpose, testing it, and then deploying it, the system will be deployed into a complex environment where it needs to solve tasks that were unknown before runtime, that the system itself has not been trained on. 

My intuition tells me that there aren't great parallels to learn from here, but I'd really appreciate feedback from more experience software engineers, machine learning practitioners and system builders to validate this point. 

One key difference I believe is important is that the state space and action space of an agent is extremely large. An agent with access to just code execution and web browsing is, for all intents and purposes, unbounded in the complexity of environments within which it can find itself. The result of a single tool call can dramatically alter an agent's trajectory, from bricking the agents environment and disabling it, to unlocking new resources that it can use to do new things in pursuit of its objective.

### Radical runtime uncertainty

In this world, we're going to have extremely high uncertainty of:
- what exact goal an agent is pursuing at any given moment
- the extent to which it's pursuing that goal competenently
- the probability that it can achieve that goal from its current state
- whether an action the agent is going to execute imminently is going to have negative consequences
and miriad other factors. 

Yet it seems obviously useful to have answers to these questions. If I have thousands of instances of an agent running in parallel (closing sales, providing support to customers, making trades etc.), then I would like to know the answers to these questions.

Lack of information could lead to a number of failures modes that you could easily imagine: 
- deleting database information
- taking my server offline
- revealing confidential information
- pushing a bug to production
- violating ToS for a provider in some way
- losing a client

Offline tests are of course useless at giving me live information relating to the state of my agent at runtime, so I can't rely on those to give me useful information. 

One way of solving this that I have used successfully in the past is to manually review every consequential agent action prior to it being executed. This works well, but is unsustainable above a few instances of an agent running continuously. 

## Supervision 

In the context of intelligent agents, supervision, sometimes called monitoring, is a collaborative process in which humans and AI systems can co-operatively supervise an agent that is actively in pursuit of a goal, by observing the agent as it is running and assisting it in altering its actions when unintended behaviour is detected. 

These actions must first be detected (using hard-coded rules, an LLM, classifiers or a human) and then the actioned with one of the following actions: 
- approve (action can be executed on the world)
- resample (agent must try again)
- resample with feedback (agent must try again but is given feedback at to why its action was rejected)
- terminate (agent execution cycle should stop)
- modify (action should be changed and then executed)

There are a number of reasons why this is novelly useful, which I'll explain in the following 

### 1) supervision can detect low probability failures unforseen at development time 
There are some failures modes that might only manifest once in tens or hundreds of thousands of instances of an agent solving a problem in a given domain. The nature of agentic systems and the unspecified environments within which they operate makes them fertile ground for unforeseen catastrophic failure. Writing checks for these failures during development is not possible, and as such they must be detected on the fly.  

### 2) supervision can enable policy compliance at runtime 
There are many ways to pursue a task successfully, but some of those might be in line with some human specified policy that the agent is subject to as a functionary of a given enterprise. Depending on how the legality of agents evolves, it will probably be useful to put checks in place to try to prevent violations of policies that we want an agent to follow. In edge cases, we might want the decision to be escalated to a human, perhaps a lawyer. 

### 3) supervision enables a tighter development loop 
LLMs are strange creatures, and understanding their minute differences and behaviours requires large amounts of interaction between human and system, espcially at the edges of the normal distribution of the systems behaviour. The more co-operation and interaction that a system architect has with their own creation, the more likely they are to uncover its subtle failure modes. By detecting these autonomously, we can run millions of instances of the agent and only involve the human on interesting, high information rollouts. 

### "Why can't the agent supervise itself?" 
At this point, you might ask why these co-operation protocols can't be baked into the system itself. They could be, but I think that you'll get most benefit from abstrating out this logic into its own external system, for reasons such as: 
- specialisation in a specific domain is good 
- abstracting out this logic means that it can be iterated on in a distributed fashion by more than just the developers of a given agent system 
- Depending on how the future looks, it might be important for the agent to not be aware of supervision that it is subject to


## Final Thoughts
I think that supervision at runtime is a missing piece of the agent puzzle that we're going to have to solve if we want safe and reliable deployment of agents in the wild across arbitrary tasks, and especially those in high-risk domains.
