---
title: "Technologies for an agent-based world"
date: "2024-08-27T00:00:00.000Z"
description: "Adoption of AI agents in the real world will be limited by infrastructure initially. What technologies will we need to facilitate the early adoption of agents?"
thumbnail: "/img/blog/thumbnail10.png"
---
Draft post, not finished. 

# Technologies for an agent-based world
General purpose agents are not yet ready to be deployed in the real world. The language models they're based on are still too weak, and the infrastructure to support them is lacking. Theres a reasonable probability that the former gets solved by big labs + scaling, but we will then be bottlenecked by the infrastructure, or lack thereof, that we have built to facilitate useful agents in the wild. This post outlines some of the technologies that I think will be needed as we move into this new world. 

# Agent Control Plane
We will need infrastructure for human-machine collaboration 
- Agentic systems that solve complex tasks in the real world don't currently work well, but we can safely assume that they will 
- They have a lot of failure modes now, but will have a decreasing number as models get more capable, which they are predicted to do. 
- But for the foreseeable future they will still get caught in loops, misinterpret tasks, confidently venture down pathways bound to fail and more. 
- In order to facilitate the early adoption of agents, and unlock their fledgling potential now, we need better ways of machines to defer to humans.
- I imagine this manifesting as a control plane operated by human(s). This could be distributed like Mechanical Turk, or done in-house by an employee. 
- The agent could call out to the human via a tool call, and then block on a response, continuing only when their dilemma has been solved. 
- There are interesting technical questions to solve like how to best determine when an agent requires human assistance, i.e. would this be done via self-report or oversight by another non-human agent? 
- If the workloads are distributed and help is given via gig workers, then questions of security are raised. What actions are given to the humans? Can they specify tool arguments freely? What information from the prompt is left unredacted?
- Alternatively the agent control plane could be bundled with the agents themselves and handled by the human staff of the company using the agents. This could mean that help could be given to agents via Slack which is a familiar piece of software that humans currently use to give assistance to others. 

# Better knowledge management 
Knowledge within organisations is badly managed leading to a large percentage of knowledge work being duplicate work or time spent locating and distilling existing work.
The work to centralise and organise knowledge is relatively unskilled labour but very tedious. 
Knowledge must be constantly updated as the frontier of an organisations knowledge evolves via channels like Slack, Teams Calls, Google Docs and Git.
Agents should be deeply integrated into knowledge repositories to do tasks like:
- identifying updates to existing knowledge
- identifying links between topics 
- eliminating duplicate work by centralising all knowledge on a given distinct topic into one location

# Better evaluations of strategizing and co-operation in LLMs
Agentic systems are currently weak but evidence suggests that will change as we scale models and discover architectural and algorithmic improvements
Useful agentic systems must be able to solve long horizon tasks which require complex planning and reasoning in multi-agent environments. In other words, agents must be able to strategize and co-operate.
It would be useful to be able to measure the abilities of current LLMs on tasks that require strategy and co-operation, so that we can evaluate where we are and how models are improving. 
The ability to deploy agents with minimal customisation into arbitrary environments, like strategy games, and evaluate their performance relative to humans or other agents powered by different models, could be useful from a scientific perspective. 

# Agent Telecoms
Communication channels that humans use are not designed for bots to use, and often actively discourage bot usage with things like captchas and 2FA. 
Agents must be able to communicate effectively with humans (see point 1) and each other. 
Ideally, agents would be able to communicate via channels that humans are already using, like email, instant messaging (WhatsApp, Telegram, Signal etc), Slack and others.
Eventually, agents will be able to use these services just like humans by navigating using a browser, but there are complexities that make this more difficult than it needs to be for AI agents in the short term
For example, to create and use a Gmail account, agents need to complete a sign up via the online form, get a 2FA code to your phone number to verify you are human (where does the agent find this phone number and access its messages?), enter the code into the form, then, if the agent wants programmatic access to emails rather than reading them via the UI, it must enable 2FA with an authenticator app like Microsoft Authenticator (or with a command line tool), then navigate to a hard-to-find page which provides App Password, generate an app key, then write code to configure an SMTP client to read mail using the correct configuration.
Processes such as these will bottleneck agents from sending and receiving messages to humans and each other, and should be streamlined if we are to make agents maximally efficient in the near term. 

 
# Agent Auth
As an increasing percentage of web traffic starts to come from AI powered agents, it will become more and more important to have agent specific auth. 
Currently, even harmless bots traversing the web and performing tasks will be blocked via Captchas and other bot-blocking mechanisms. 
As agents become responsible for increasing amounts of legitimate web traffic (e.g. booking hotels or signing in to a trading website to pull information about a company's financial reports) we should welcome this traffic rather than trying to block it. 
Early agentic systems will find their success rates lowered by these measures. 
Companies may still want to take measures to prevent abuse of their platform (i.e. x.com may want to block mass scraping and gmail may want to stop people using their platform for spam campaigns), but we should find a way for legitimate agents to perform their tasks without being inhibited. 
For example, when navigating to a web page login form, users should be able to select Human or AI and go to the correct login page. 
AI logins should rely on some kind of identification mechanism that ties them to a specific organisation. These organisations could be registered with a centralised authority or the verification could be decentralised and rely on some kind of reputation system. 
