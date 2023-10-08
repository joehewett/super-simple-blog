---
title: "Can GPT-N crack SHA256?"
date: "2023-10-02T18:07:44.675Z"
description: "Could in be done in theory? Maybe"
thumbnail: "/img/blog/thumbnail12.png"
---

There's an oft quoted thought experiment, popularised by Eliezer Yudkowsky, that asks us to consider the fact that somewhere in the training data for a large language model, there exists the result of a hash function, followed by the string of characters that were hashed to produce that result. We're forced to think about what a language model optimizing for next token prediction is to do in tis scenario. If the language model is to predict the sequence of tokens that follow the hash function, surely it must crack the hash function. 

The question is, can it?

## Language models and hash functions

Language models are fundamentally functions that map inputs to outputs. They do so by learning patterns during training time that generalise to varying degrees of efficacy to the inputs seen at test time. 

A hash function maps arbitrary inputs in a given domain to a fixed-size output to produce a digest. The space of possible digests (codomain) is limited. Hash functions are one-way encryption, and the original input string cannot be derived from the digest, unless the function an inverse function is known that allows the user to go from the digest back to the originally hashed string (technical note: given the surjectivity of hash functions, i.e. that each item in the codomain is the image of one or more elements in the domain, there can be no true inverse; in the case of a hash collision, deriving the true input value for a given digest is not possible. It is coincidentally these hash collisions that can be used to crack hash functions.)

A good hash function is uniform, in that its inputs map randomly to its outputs; hashing two strings that are identical bar one character should produce two outputs distributed randomly in the space of possible digests, i.e. outputs that bear no discernible similarity to each other. 

However, there is no proof that any real hash functions (e.g. SHA256) lacks patterns between the objects in the domain and codomain. It could therefore be possible that during the course of the model training on digest -> input pairs, the model could learn the some form of inverse function to map between a digest and an input. 

This feels theoretically possible, and if anything was capable of uncovering minute hidden patterns in the digest-input pairs of modern hashing algorithms, it feels like it would be a multi-billion parameter language model designed precisely to approximate intractably complex functions. 

I think that training a large language model on the digest-input pairs of decreasingly trivial hash functions and seeing whether they can spot patterns in the data would be a very interesting project. 

### Note: maintaining a lookup table

If the LM can't grip onto any discernible patterns in the digest-input map sufficiently to learn the inverse mapping, it could instead store a table of digests and their corresponding output in its memory and consult the table when encountering a digest.

However, given the nature of hashing algorithms, this is likely to be computationally infeasible. If we take SHA256, we would need 2^256 entries in our table, which is a number larger than the number of atoms in the universe;

The output space of SHA256 is 256 bits, which represented in hexidecimal would be 64 characters \[0-9a-f\].. For reference, the output space contains about 1.2*10^77 possible values, whilst the input space is essentially infinite. Given that the age of the universe is somewhere around 3x10^27 nanoseconds, it seems infeasible that such a large lookup table could be stored in a neural network given current technology. 

# Thoughts on the thought experiment 

Given the above, it seems unlikely that the original speaker was implying that language models any time soon will be capable of learning how to derive the input string given an arbitrary SHA256 digest. 

Instead, I think the speaker was trying to get across the notion that the training data used to train large language models is not always human data. Getting perfect scores doing next-token prediction on the datasets that we use to train LLMS doesn't "just" require that you emulate a humans consciousnes-function and use it to rattle off tokens when presented with some input string. Instead, LMs have to get to grips with reams of non-human data too, like hash digests or weather patterns. The simulations ongoing inside large language models are far more profound than we can possibly understand. 