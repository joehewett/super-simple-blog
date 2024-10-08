---
title: "Are LLMs capped at human intelligence?"
date: "2023-10-08T10:12:44.675Z"
description: "Thoughts on the claim that transformers doing next token prediction cannot surpass human performance"
thumbnail: "/img/blog/thumbnail13.png"
---

# Are LLMs capped at human intelligence?

I have heard the claim that there is a upper bound on the intelligence of Large Language Models, and that that upper bound lies below human intelligence. The argument is sometimes based on the fact that LLMs are trained to predict the next token in datasets 'generated by humans'. 

In other cases, information theory is invoked; LLMs* are inherently limited to the information contained within the training set. This means that they cannot generate new information or knowledge that is not already present in the training data, which is, in their view, a low resolution subset of human knowledge.


### Definitions 
The specific claim I want to tackle is that LLMs cannot surpass human intelligence, and I'll try to make a case for why I think that the theoretical limit of the intelligence of LLMs lays far beyond our own. I make no claim to know where the limit lies with concrete predictions of what LLMs are unable to do. 

I increasingly think that the word "intelligence" is the wrong word for this discussion. Intelligence seems to be missing some of the essence of what we really want to describe, which is "the thing that allows an entity to dictate the future world state". Some have suggested capabilities as the word, so I'll use that going forward.

To narrow the scope somewhat, when I refer to 'LLM' I mean a transformer-based model trained in a self-supervised setting using next token prediction.

---


### 1. GPT training data is not limited to human-generated text

The datasets used to train large language models contain decidedly non-human data. Alongside novels, articles and tweets, the dataset contains historic time series data, weather patterns, machine generated log lines, stock prices, medical data and more.

An optimizer attempting to minimize loss on such a dataset will be forced to attempt to approximate the underlying data-generating processes. This means that a language model is not a model of human language, or even of a language-generating human, but a model of the world.

Consider the fact that somewhere in the training data there exists the result of a hash function, followed by the string of characters that were hashed to produce that result. If the language model is to predict the sequence of tokens that follow the hash function, it must crack the hash function. This is not to say that any model would be able to crack a modern hash function; the point here is that there are text-generating processes that have contributed to the training data on which models have been trained, that far exceed natural language in their complexity. 

---

### 2. GPT architectures are not final

[Attention Is All You Need](https://arxiv.org/abs/1706.03762) introduced us to the transformer in 2017. In the intervening years, the transformer has been responsible for many of the critical breakthroughs we have seen in AI. It is a sufficient architecture for many tasks, and its limits are not yet understood; architectures very similar to those that we have today could continue to deliver more general and capable systems. But the transformer, and the implementation details of our current architectures, are not necessarily the end of the road.

We could find that the design of the most capable models we have today are proveably capped in their capabilities, but that does not mean that large language models are a dead end. There will be other roads to explore, and other architectures to try.

A [quote from Gwern Branwen](https://gwern.net/scaling-hypothesis) sums this thought up well:

_"This year, GPT-3 is scary because it’s a magnificently obsolete architecture from early 2018 (used mostly for software engineering convenience as the infrastructure has been debugged), which is small & shallow compared to what’s possible, with a simple uniform architecture trained in the dumbest way possible (unidirectional prediction of next text token) on a single impoverished modality (random Internet HTML text dumps) on tiny data (fits on a laptop), sampled in a dumb way8, its benchmark performance sabotaged by bad prompts & data encoding problems (especially arithmetic & commonsense reasoning), and yet, the first version already manifests crazy runtime meta-learning—and the scaling curves still are not bending!"_

---

### 3. The Scaling curves are not bending 

Transformer-based language models can be of varying parameter count, and they can be trained for different amounts of time on different amounts of data.

Researchers have trained thousands of models using different combinations of these 3 values. They vary the amount of training data, the size of the model, and the FLOPS used to train the model, and then observe how the model performs.

It turns out, that the capabilities of the resulting model are not random. The models ability on a given benchmark is a roughly a function of it's parameter count, training compute and training set. 

When the Scaling Laws were discovered, it was a big revelation; it meant that we could predict the abilities of models in advance of training them, and make intelligent decisions about how varying amounts of resources needed to create a model would impact the resulting model*.

The critical point here is that these curves mapping quantity of input resources to model performance have not plateaued yet. It is still the case that we can use increasingly more vast quantities of compute, data and model parameters to create increasingly more capable models.

The limit is currently not a theoretical one, but a question of finding sufficient compute and training data, given that GPUs are in short supply and the corpus of human-generated data has been all but exhausted. 

If we can get around these issues i.e. by finding ways to use synthetic data that don't result in mode collapse, we can expect our model perfroamnce to continue advancing up and to the right. 

---
\* The Scaling Laws are useful, but they don't tell us about emergent capabilities, only test loss. Using the Scaling Laws we couldn't have predicted the emergence of chain of thought prompting in large language models, and equally we can't use them to tell us if and when capabities like advanced theory of mind, desire for achievement of objectives, or deception will emerge, for example.

---

### 4. LLM intelligence is incomparable to our own

When we think about an entity's ability to dictate the arrangement of the atoms in our lightcone, we might be tempted to boil that capacity down to a single value like "Intelligence" or "IQ". I don't think this is a helpful way of thinking about the problem.

This is the paradigm in which Artificial General Intelligence is usually discussed, and it invokes the feeling that humanity is playing on a one dimensional field against machine intelligence, and that once their number is higher than our number it's over for us as a species. 

Rather than thinking about competing entities as existing on some kind of uni-dimensional scale, I think it's more helpful to imagine a venn diagram, and ideally some kind of high dimensionality venn diagram where different axes represent things like intelligence, speed, computational capacity, quantity of information stores, reasoning ability, planning capacity and so on. 

Another dimension might be "desire to achieve an objective". It may sound contrived, and under the Instrumental Convergence and Orthogonoality ontology we default to believing that this scales linearly with the capabilities of a model, but I think it's actually a free variable. 

It may be the case that LMs are poor are spatial awareness (so too would you be if your knowledge of the world came from statistical correlation between words rather than embodiment) but they excel in their ability to compress data. Whilst long range planning may not be impressive at the moment, LLM's knowledge of and ability to recall the worlds information is far superior to that of your average human. 

[Simulator theory](https://generative.ink/posts/simulators/) suggests that LLMs are best thought of as simulators. Rather than being agents acting in the world, they theaters capable of writing and orchestrating plays within themselves. In the language of simulator theory, the simulator can create and act out arbitrary simulacra. 

Achieving optimal loss is not a question of approximating the average human being, it instead requires approximating the base reality that brought about all text generating processes that contributed to the training data.

This is a distinctly alien capability that LLMs excel at. To be able to model arbitrary text-generating processes with the uncanny accuracy that LLMs do requires a level of sophistication that we have neither the vocabulary nor tools to fully fathom.

Yet the a uni-dimensional view of intelligence within humans and machines doesn't give us the fidelity to capture that sort of thing. Language models are doing is vastly different to the computation that the human brain is doing, and reasoning about them by comparing them to the human skews any subsequent line of enquiry.

----

- Parameter count: as the complexity of the model increases, so does its ability to model more complex functions; in the same way that a linear equation can only plot a straight line on a graph but a cubic polynomial can be used to approximate slightly more complex data, so too can a model with more parameters more closely approximate the complexities of reality.
- Training data: the more data a model is given to train on, the more information it has to learn about the world, and the more patterns exist latent in the data hat the neural network can learn so that it can make better predictions at test time.
- Compute: training the model for longer allows the model more time to learn the training data, similarly to how a student with more time to revise for an exam can be expected to outperform a student given less time. 
