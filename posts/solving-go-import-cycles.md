---
title: "Breaking the import cycle in Go"
date: "2023-10-14T18:07:44.675Z"
description: "A quick summary of techniques to keep in mind when reasoning about import cycles"
thumbnail: "/img/blog/thumbnail15.png"
---

If package X accepts/stores/calls methods on/returns types defined package Y, but doesn't actually access Y's (non-method) functions or variables directly, X can use an interface that the type in Y satisfies rather than actually importing Y. 

That's how interfaces can help reduce dependencies (cyclic and otherwise) in a nutshell.

# Avoiding Imports Entirely

* Write config functions for hooking packages up to each other at run time rather than compile time.
  * Instead of routes importing all the packages that define routes, it can export routes.Register, which main (or code in each app) can call. In general, configuration info probably flows through main or a dedicated package; scattering it around too much can make it hard to manage.
* Pass around basic types and interface values. 
  * If you're depending on a package for just a type name, maybe you can avoid that. Maybe some code handling a []Page can get instead use a []string of filenames or a []int of IDs or some more general interface (sql.Rows) instead.
* Consider having 'schema' packages with just pure data types and interfaces
  * so User is separate from code that might load users from the database. It doesn't have to depend on much (maybe on anything), so you can include it from anywhere. Ben Johnson gave a lightning talk at GopherCon 2016 suggesting that and organizing packages by dependencies.

# Organising Code into Packages

* As a rule, split a package up when each piece could be useful on its own. 
  * If two pieces of functionality are really intimately related, you don't have to split them into packages at all; you can organize with multiple files or types instead. Big packages can be OK; Go's net/http is one, for instance.
* Break up grab-bag packages (utils, tools) by topic or dependency. 
  * Otherwise you can end up importing a huge utils package (and taking on all its dependencies) for one or two pieces of functionality (that wouldn't have so many dependencies if separated out).
* Consider pushing reusable code 'down' into lower-level packages untangled from your particular use case. 
  * If you have a package page containing both logic for your content management system and all-purpose HTML-manipulation code, consider moving the HTML stuff "down" to a package html so you can use it without importing unrelated content management stuff.

# The Golden Rule

Low level tools should **never** import use-case-specific code


An example of solving cyclic imports [(link)](https://github.com/tzvatot/cyclic-import-solving-exaple/commits/main)

