---
title: 'Debugging Kubernetes for beginners'
date: '2022-08-07T13:00:00.000Z'
description: 'A few beginner steps towards debugging Kubernetes deployments.'
thumbnail: '/img/blog/thumbnail1.png'
---

    - (Warning: I think that most jobs in cybersecurity will require good engineering skills, so these tips are an example of a practical roadmap towards gaining some basic engineering experience. These tips are just some examples of things you can do to make yourself more likely to get a job in cybersecurity, 
    - Not many students have spent much time using Linux, but most jobs will require that you use some kind of linux distro. Switch your OS to a Linux distribution or if you're running windows, enable WSL for development; it's worth starting to learn if you're just starting out. 
    - If you have no programming experience, start with a YouTube tutorial to help you get a simple website deployed. 
      - Use `create-react-app` or similar to help
      - Use `git` for version control. 
      - Once you have your repo up and running, you can deploy your site using `vercel`.
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
- What does your GitHub profile look like? This will be one of the main things that your recruiter will look at
- How is your code quality? 
- Are you testing your code? 
- Have you use a linter to keep the code uniform?
- Is your main project complete with a README with running instructions? 
- Have you used useful commit messages with sensible commits? 
- Bonus: is anyone using your project? The gold standard would be to have software that someone else is using, although this is unlikely. 
- Bonus: does your GitHub show that you have committed to any other projects besides your own? 
