---
title: "Talks I have given"
date: "2023-10-02T18:07:44.675Z"
description: ""
thumbnail: "/img/blog/thumbnail15.png"
---

I want to keep a log of talks and lectures that I give, for posterity. 

I have only included talks from summer 2023 onwards. 

### GCHQ's Cyberfirst Academy 2023-08-18
Key points
- Explored the problem space of conversational scams
- Discussed a novel approach to combatting cybercrime using language models 

### KCL Tech Cybersecurity Panel 2023-10-07
Key points:
- Spoke on the arms race dynamics of cybercrime and cybercrime disruption 
- Tried to give students concrete steps to begin working in cybercrime if they have no experience; 
    - Switch your OS to a Linux distribution or if you're running windows, enable WSL for development; any engineering job you do will require that you use Linux so it's worth starting to learn. 
    - If you have no programming experience, start with a YouTube tutorial to help you get a website deployed. Use `create-react-app` or similar to help, and `git` for version control. Once you have your repo up and running, you can deploy your site using `vercel`.
    - Once you have some experience with using git for version control and deploying a simple website, try and follow a fullstack tutorial and create a new site that has both a frontend and a backend. 
      - For example, you could build a [ToDo app](https://www.youtube.com/watch?v=PvMDWbAPPK4) using the MERN stack 
    - If you're going to store data, you can include a database which will teach you schema design.
      - Creating an application with both a frontend and a backend will teach you about API design as well, and give you context for various real life security issues:
        - Is your site vulnerable to SQL injection? 
        - Have you added authentication to your API? Can anyone get any information from any endpoint or are they protected? 
        - If you allow user inputs on your site or via your API, is your site vulnerable to XSS? 
I think that working a real project is the only way to actually learn the necessary skills that a job is going to require from you.
Onece you have this context, you will be better placed to start understanding thinks like:
- Networking
- Protocols (You will have seen your fair share of HTTP40X errors by now!)
- Security considerations like SQL injection, XSS etc. 
- What does it mean to design an efficient database schema?

If you're going to apply to an engineering job, think about:
- What does your GitHub profile look like? This will be the first thing the recruiter will look at 
- How is your code quality? 
- Are you testing our code? 
- Have you use a linter to keep the code uniform?
- Is your main project complete with a README with running instructions? 
- Have you used useful commit messages with well-sized commits? 
- Is anyone using your project? 
- Does your GitHub show that you have committed to any other projects besides your own? 

Overall the panel was enjoyable and the audience seemed receptive to hearing some practical advice - a rarity in an academic environment. 
