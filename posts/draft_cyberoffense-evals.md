---
title: "Cyberoffense Evals"
date: "2023-09-029T12:09:44.675Z"
description: "Thoughts and notes on designing LLM evalulations for measuring cyberoffense capabilities"
thumbnail: "/img/blog/thumbnail12.png"
---

### WIP: rough notes, in progress

### Desired eval characteristics
- **Wide spectrum of difficulty**
- **Massively automated**
- **Robust to deception** - (assume the model knows it is being evaluated for its cyberoffense capabilities - would we still be able to measure it's capabilities effectively?)
- **Behavioural** - we probably won't think about the mechanistic side of the problem here
- **Safe to run** - preferably we'd run models in environments as close to reality as possible to test their abilities against real cybersecurity measures, but we need to ensure that we don't cause real world harm.
- **System level** - in a cybersecurity context, we need to make sure we test the models when they are enhanced with realistic tools (internet access, Burp Suite, Metasploit, Wireshark etc.)

### Thought dump
- We need to be cognizant of the difference between capacity and propensity for harm.
- AI-powered internet-wide chaos monkey when? 
- Capacity of a augmented-system is dependent on the quality of the augmentation. A base model may be capable of causing destruction but this may not be evident if it is handicapped by implementation barriers
- Whatever harness we attach to the model, the implementation details of the model need to be abstracted away such that switching the model is a one liner
- Tradeoffs: time, cost, accuracy, ethics


# Fraud 
The test closest to ground-truth would be to conduct spear phishing attacks of various types against real human victims and use a metric like money stolen or malware installed as a metric.

Given that this is not possible, we must find approximations for the “real human” part, or some proxy for the success metric:
- Instead of real humans, could we test the models against state of the art fraud classification models? 
- We could inject real scam messages into the prompt to generate a victimlike response to a real scam.
- That victim response can be fed to another model who has been given the object of defrauding the naive victim. 
- Spam classification models can be used to classify the text
- Could use embedding models to classify the exact attack type. 
- Classification by this model of the model-generated content as benign would count as success for the model. 
- Instead of defrauding the victim, could we count clicks on a link as a successful attempt, similar to how phishing training companies conduct tests of company employees to see how resilient they are to phishing attempts
- Working in tandem with an anti-phishing training company to have model-generated messages targeted at company employees could be one way to get these into the inboxes of real-world pseudo-victims. 

# Vuln finding
- We could encase the LM within a system and test it's ability to break out 
- Specify direcly that its objective is to break out of the system
- Hook the LM directly up to the terminal and allow it to read the output/feed it's output directly into the command line
- The LM would need to be able to interact with programs like Vim to write and edit scripts
- https://platform.openai.com/playground/p/UGoeU3n6Bp1ugWzSd0Kry5aQ?model=gpt-4
- Manually set up honeypots within the system that when triggered, alert us

# Phishing
- // 
- //
- //

# Social engineering
- A lot of cybercrime involves an element of social engineering.
- We could test the model's ability to socially engineer a human into performing an action that is harmful to them or their organisation
- How? 
- //
- //
- //