---
title: 'Why building browser agents is hard'
date: '2026-03-22T12:00:00.000Z'
description: 'Building browser agents is not like Cursor building code. The thing you are building is also an agent.'
thumbnail: '/img/blog/thumbnail25.jpg'
---

# Why Building Browser Agents Is Hard

There's a tempting analogy between AI code generation and AI browser automation. Tools like Cursor and Copilot use an AI agent to write code. Surely building a browser agent is the same thing: an AI agent that writes browser automation scripts. Right?

No. The problem is fundamentally different, and the difference is the source of most of the pain in the space.

## The two-agent problem

In code generation, one agent builds a static artifact. The artifact is code. It's inert. You run it, observe the output, and decide if it works. The agent and the artifact are cleanly separated.

In browser automation, you're using an agent to build another agent. The artifact isn't static code that you can inspect and run deterministically. It's a set of behaviours that will be executed in a complex, stateful environment by an entity that may need to make decisions at runtime.

This creates a meta-problem: which agent do you talk to?

**Option A: A separate builder agent constructs the runtime agent.** This is the Cursor model applied to browser automation. You have a conversation with a builder (like a chat assistant), and it produces scripts or workflows that a separate runtime system executes. The problem is that the builder has no live context. It can't see the browser. It doesn't know what the page looks like at step 7 of a 12-step workflow. So it guesses, and it guesses wrong.

**Option B: One agent builds itself by doing the task.** You let the agent run the workflow, and it writes scripts as it goes based on what it actually sees. This is more grounded, but it introduces a new problem: the agent can only learn from the states it encounters during building. If it never hits an edge case during supervised runs, it won't handle that edge case in production.

Neither option is clean. Both have failure modes that don't exist in code generation.

## Browsers are stateful, and that's the root of the problem

Code runs against a known state. You have inputs, you have outputs, you can write tests. A browser is a live, mutable environment where nothing is guaranteed.

Pages render differently based on network speed, screen size, authentication state, A/B tests, time of day, and whether a modal decided to appear. Elements shift position. Selectors break. Auth sessions expire mid-workflow. A dropdown that existed yesterday has been replaced by a search box today.

This means the environment the agent builds in is not the environment it runs in.

When you supervise an agent building a workflow, you're watching it on one instance of the page, at one point in time, with one set of conditions. You confirm each step, and it looks great. Then you deploy it to run 500 times overnight, and it hits a cookie banner it's never seen, a loading spinner that takes 3 seconds longer than expected, or a form field that moved because someone on the product team pushed a CSS change.

The guided mode is not a reflection of runtime behaviour when unguided. This is the core problem.

## Why "just record my clicks" doesn't work

The most intuitive solution is demonstration: record a human doing the task, then replay it. Several companies have tried this. It works for the happy path.

The problem is that real workflows aren't just happy paths. There are typically one or two happy paths and five to ten edge cases. To capture all of them by demonstration, you'd need to spend an hour recording every possible branch. Then you need the system to somehow compose those recordings into a script with branching logic. Then you need self-healing for the cases you didn't record.

By the time you've built all of that, you've essentially built an agent anyway. You've just done it the hard way.

## The build-time / run-time gap

This is what makes the problem interesting and hard. In every other domain of software, you can narrow the gap between how something behaves in development and how it behaves in production. You write tests. You use staging environments. You deploy canaries.

With browser agents, the gap is structural. The browser is a shared, mutable surface controlled by a third party. You can't pin the version. You can't mock it reliably. You can't write unit tests for "what if the page looks slightly different today."

The agent needs to be robust to an environment it can't fully predict, built by a process that can only show it a fraction of the states it will encounter. Closing this gap, making the build-time experience predictive of run-time behaviour, is the core challenge of the space.

Every approach to building browser agents is ultimately a different bet on how to close this gap. Recording bets on demonstration. Script generation bets on code quality. Self-healing bets on runtime adaptation. The right answer is probably some combination of all three, but nobody has nailed it yet.

That's what makes it worth working on.
