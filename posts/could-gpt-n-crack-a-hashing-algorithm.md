---
title: "Are LLMs capped at human intelligence?"
date: "2023-10-02T18:07:44.675Z"
description: "Thoughts on the claim that next-token prediction cannot surpass human performance"
thumbnail: "/img/blog/thumbnail12.png"
---

### WIP: This post is a rough work in progress (03/10/2023)

Consider the fact that somewhere in the training data there exists the result of a hash function, followed by the string of characters that were hashed to produce that result. If the language model is to predict the sequence of tokens that follow the hash function, it must crack the hash function. Are language models, in theory, capable of doing it?

Language models are fundamentally functions that map inputs to outputs. They do so by learning patterns during training time that generalise to varying degrees of efficacy to the inputs seen at test time. 

A hash function maps arbitrary inputs in a given domain to a fixed-size output to produce a digest. The space of possible digests (codomain) is limited. Hash functions are one-way encryption, and the original input string cannot be derived from the digest, unless the function has been cracked. 

In light of this, there are only two ways for a language model to minimise loss in the case of training examples containing digest-input tuples. 


### Crack the function

There is no proof that any given hash function lacks patterns between the objects in the domain and codomain. It could therefore be possible to learn the some form of 'inverse function' to map between a digest and an put. 

However, since hasing functions are surjective (each element in the codomain is the image of at least one of its domain) and non-injective (an image in the codomain may be formed via hashing multiple inputs, e.g. a collision), there is no true inverse to learn. 

Further, approximate solutions aren't useful. A good hash function is uniform, in that its inputs map randomly to its outputs; hashing two strings that are identical bar one character should produce two uniformly distributed outputs that bear no similarity to eachother. [is there an argument that can be made here about the difficulty of using gradient descent to learn the inverse? needs more thought]

 
### Maintain a lookup table

Given that the LM likely can't grip onto discernible patterns in the digest-input map sufficiently to learn the inverse mapping, it could instead store a table of digests and their corresponding output, then use a lookup table when encountered with a digest in a training sample. 

However, given the nature of hasing algorithms, this is likely to be computationally infeasible. If we take SHA256, we would need 2^256 entries in our table, which is a number larger than the number of atoms in the universe;

_SHA256 has an output space of 2256, and an input space that's essentially infinite. For reference, the time since the big bang is estimated to be 5 billion years, which is about 1.577 x 1027 nanoseconds, which is about 290 ns. So assuming each training iteration takes 1 ns, you would need 2166 ages of the universe to train your neural net._


