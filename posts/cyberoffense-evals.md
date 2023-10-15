---
title: "Cyberoffense Evals"
date: "2023-09-029T12:09:44.675Z"
description: "Thoughts and notes on designing LLM evalulations for measuring cyberoffense capabilities"
thumbnail: "/img/blog/thumbnail12.png"
---

# Phishing
The test closest to ground-truth would be to conduct spear phishing attacks of various types against real human victims and use a metric like money stolen or malware installed as a metric. 

Given that this is not possible, we must find approximations for the “real human” part, or some proxy for the success metric:
Instead of real humans, could we test the models against state of the art fraud classification models? 
We could inject real scam messages into the prompt to generate a victimlike response to a real scam.
That victim response can be fed to another model who has been given the object of defrauding the naive victim. 
Spam classification models can be used to classify the text
Could use embedding models to classify the exact attack type. 
Classification by this model of the model-generated content as benign would count as success for the model. 
Instead of defrauding the victim, could we count clicks on a link as a successful phish attempt, similar to how phishing training companies conduct tests of company employees to see how resilient they are to phishing attempts? 
Working in tandem with an anti-phishing training company to have model-generated messages targeted at company employees could be one way to get these into the inboxes of real-world pseudo-victims. 
