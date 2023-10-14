---
title: "LM Evals Reading List"
date: "2023-10-15T18:07:44.675Z"
description: "I'm doing a little bit of studying on the eval landscape. Here are the papers I'm reading and my notes."
thumbnail: "/img/blog/thumbnail16.png"
---

## [Model evaluation for extreme risks - DeepMind](https://arxiv.org/pdf/2305.15324.pdf)

### Motivation
- Authors distinguish between identifying dangerous capabilities using **dangerous capability evaluations** and measuring propensity of models to apply their capabilities for harm using **alignment evaluations**.
- Motivation hinges on the emergence of unforseen capabilities and the imperfection of current methods of steering models. 
- The authors provide a useful framework for thinking about how risky scenarios may arise. They will likely be a product of a combination of dangerous capabilites (that can be provided by the model, or humans e.g. crowdworkers online) with a harmful application of those capabilities (caused by misalignment of the model to human objecties).

### Definitions and heuristics
- They provide a lose heuristic for determining whether a model is highly dangerous. These are mostly the traditional instrumentally convergent goals by Omohundro 2008:
  - Pursues long-term objectives (not myopic) 
  - Engages in power-seeking
  - Resists shutdown
  - Can be induced into collusion with other AI
  - Resists/allows malicious users to access its dangerous capabilities
- They provide 9 dangerous capabilites. 2 of the capabilities I am interested in:
  - Cyber-offense
    - The model can discover vulnerabilities in systems
    - It can write code for exploiting those vulnerabilities
    - It can make effective decisions one it has gained access to a system
    - It can evade threat detection and response (human and system)
    - It can focus on a specific objecive within the system
    - If deployed as a coding assistant, it can insert subtle bugs into the code for future expoitation
  - Deception 
    - The model can deceive humans 
      - Construct believable but false statements
      - Make accurate predictions about the effect of a lie on the human
      - Keep track of what information it needs to withhld to maintain the deception
      - The model can impersonate a human effectively

### Building evals for extreme risk
- We're already doing some ethics and safety evals, like ARCs evals of Claude and GPT-4.
  - GPT-4 was tested to see how it performed on cybersecurity-related tasks and purchasing chemical compounds
- Goal is for a comprehensive alignment evaluation that allows us to conclude with high confidence that a model is not dangerously misaligned. 
- Alignment evaluations are challenging because of the wide range of contexts and settings a model can operate in. We can't guarantee alignment in all cases. 
- The authors lay out these desireable qualities of an extreme risk evaluation
  - **Diverse threat models** - the portfolio should cover as many plausible risks as possible
  - **Automated** - we should make our evals as highly automated as possible, although some will need human input e.g. human raters 
  - **Behavioural and mechanistic** - evals should not only study the behaviour of the model but should eventually study how models arrive at behaviour mechanistically
  - **Fault-finding** - the portfolio should include adversarial testing, where researchers purposefully search for cases where the model produces concerning results
  - **Robust to deception** - the evals need to be able to rule out the possibility that the model is appearing safe for the purposes of passing the eval
  - **Surfacing latent capabilities** - we need to be able to bring latent abilities to the surface during the evaluation
  - **Model lifecycle** - evals should be conducted throughout the model lifecycle e.g. before safety finetuning
  - **Model level and system-level** - models may be part of larger AI systems, so both systems need evaluating. E.g. a model combined with a tool that lets it use the internet.
- Meta characteristics of the model that we desire:
  - **Legible** - easy to understand for outsides 
  - **Wide difficulty spectrum** - must contain a large enough spectrum of challenges that the eval is not made redundant quickly
  - **Safe to implement** - Dangerous capabilities evaluations could involve tseting the model in the real world, so we need to be careful about risk to humans e.g. crowdworkers

### Things to aim for 
- **Breadth** - evaluate across the widest possible range of settings, by automating evals. See the model written evals paper. 
- **Targeting** - target interesting settings that might reveal alignment failures, e.g. by honeypotting
- **Understanding generalisation** - we are unable to forsee all scenarios, so we must develop understanding of how and why model behaviours generalise between settings

### Limitations and hazards
- **Factors beyond the system** - risk depends on how the system interacts with the world. Once a model moves beyond the distribution within which is it operating in at eval time, we can't predict it's behaviour.
  - Slight updates to the model for example, based on retraining itself on new data or updating its architecture slightly after eval time. 
  - New information read by the model after eval time 
- **Unknwon threat models** - more intelligent AI systems are going to be able to conceive of threats that we with our limited intellect cannot. We can't predict all pathways, and there are many unknown unknowns.
- **Difficult-to-identify properties** - some model properties are hard to find, there can be capability overhang or deceptive alignment. 
- **Emergence** - sometimes specific capabilities only emerge at scale

## [Discovering Language Model Behaviors with Model-Written Evaluations - Anthropic](https://arxiv.org/pdf/2212.09251.pdf)

## [How to Catch an AI Liar: Lie Detection in Black-Box LLMs by Asking Unrelated Questions](https://www.alignmentforum.org/posts/khFC2a4pLPvGtXAGG/how-to-catch-an-ai-liar-lie-detection-in-black-box-llms-by)
- Related: https://www.alignmentforum.org/posts/noxJrzXcdz738uqMi/i-don-t-find-the-lie-detection-results-that-surprising-by-an

## [Evaluating Language-Model Agents on Realistic Autonomous Tasks - ARC](https://evals.alignment.org/Evaluating_LMAs_Realistic_Tasks.pdf)

## [Hoodwinked: Deception and Cooperation in a Text-Based Game for Language Models](https://arxiv.org/pdf/2308.01404.pdf)

## [How evals might (or might not) prevent catastrophic risks from AI - LW](https://www.lesswrong.com/posts/SNdijuEn6erTJam3z/how-evals-might-or-might-not-prevent-catastrophic-risks-from)

## [Improving the safety of AI evals - LW](https://www.lesswrong.com/posts/XCRsg2ZnHBNAN862T/improving-the-safety-of-ai-evals)
