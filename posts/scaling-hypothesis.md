---
title: "The Scaling Hypothesis made simple"
date: "2023-10-02T18:07:44.675Z"
description: "Explaining the scaling hypothesis to those without prior context"
thumbnail: "/img/blog/thumbnail4.png"
---

### Resources
- Gwern's 'The Scaling Hypothesis' is probably the closest you'll get to an authoratative account [(link)](https://gwern.net/scaling-hypothesis) (he probably coined it, let's be honest) 
- Dario Amodei (Anthropic CEO) has a nice podcast with Dwarkesh that mainly revolves around scaling [(link)](https://www.dwarkeshpatel.com/p/dario-amodei#details)
- If your preferred learning format is ML-adjacent Edgy Memes then this Ethan Caballero video is good [(link)](https://www.youtube.com/watch?v=UPlv-lFWITI)

### What is it?

The Scaling Hypothesis suggests that artificial intelligence is a question primarily of vastly scaling our existing architectures. By applying our traditional learning algorithms at a vast scale we will reach increasingly sophisticated neural networks that evolve complex behaviour naturally.

The Scaling Hypothesis directly contradcits what some argue; that advanced intelligence might need innovative architectures or advanced optimization processes rather than simple units combined with vast amounts of compute. 

### Evidence that bigger is better

OpenAI's GPT-3 offers compelling evidence supporting the hypothesis. With minimal alterations from its predecessors, GPT-2 and GPT-1, scaling GPT-3 led to a model that outperforms many specialized models. Similar trends are also observable in reinforcement learning studies with large, open-ended domains, where bigger models show better performance.

Proponents suggest further scaling of our existing models as a path to AGI. 

### What does it mean to scale?

We can scale a model by increasing the quantity of:
- Parameters: as the complexity of the model increases, so does its ability to model more complex functions; in the same way that a linear equation can only plot a straight line on a graph but a cubic polynomial can be used to approximate more complex data, so too can a model with more parameters more closely approximate the complexities of reality.
- Training data: the more data a model is given to train on, the more information it has to learn about the world, and the more patterns exist latent in the data that the neural network can learn so that it can make better predictions at test time when encountered with long-tail scenarios.
- Compute: training the model for longer allows the model more time to learn the training data, similarly to how a student with more time to revise for an exam can be expected to outperform a student given less time.

### Worries about scaling

The prospect of creating intelligence without equivalent wisdom is a worrying aspect of the hypothesis. The Scaling Hypothesis suggests that organizations with substantial resources could achieve AGI more readily than organisations with more expertise or wisdom, potentially leading to AGI without any safeguards against misalignment.

As these models scale and become complex, our comprehension diminishes. This could create problems, as unregulated training could lead to dangerous capabilities. Hence, some in AI safety are exploring the requirement of architectural breakthroughs for advanced AI to ensure safety.

### Pitfalls

In the face of the complexities of the Scaling Hypothesis, the potential difference between scaling data and computation might pose limitations. Data availability, in particular, could emerge as a potential bottleneck. 
