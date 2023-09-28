---
title: 'Automating the Merging of Renovate Chore Branches'
date: '2023-09-28T15:36:44.675Z'
description: 'A bash script to make Renovate chores less time consuming'
thumbnail: '/img/blog/thumbnail10.png'
---

# Automating the Merging of Renovate Chore Branches

Renovate can sometimes produce numerous chore branches in your git repositories, requiring you to manually merge them. This script automates the process.

You can find the full script here https://gist.github.com/joehewett/d45754434da79c1c3cd9d7aee66d570a

Note: this is a low tech solution to a low tech problem. You might eventually be better off using a more sophisticated tool like [Renovate's built in automerge](https://docs.renovatebot.com/key-concepts/automerge/). Until then, this script should do the trick.

### Getting started

```sh
chore_branches=$(git branch --sort=committerdate -r --list "*renovate*")
```

This line lists all branches that include the word "renovate", sorted by the date of the last commit made in reverse order. These are stored in the variable `chore_branches`.

Next, the script checks to ensure you're working on your 'staging' branch and also that you have chore branches available.

### Preparing to Merge

Before starting the merge process, the script performs some housekeeping tasks:

- It pulls the latest changes from the origin.
- It creates a new branch with the structure `<username>/merge-chores-<date>`.
- It prompts the user to confirm they want to merge the selected chore branches into the new branch.

### Merging the Chore Branches

- The script iterates over the chore branches, from the oldest to the newest, rebasing them onto the new branch. 
- The rebase process involves checking out the chore branch, resetting it to the origin, and then rebasing it onto the main branch. 
```sh
  git checkout "${chore#*/}"
  git reset --hard @{u}
```
- If a rebase conflict arises, the script prompts the user to resolve this conflict in a separate terminal before proceeding:
```sh
    if ! git merge --no-ff "${chore#*/}" -m "Merge branch '${chore#*/}' into ${branch}"
    then
        printf 'Merge failed for branch %s\n' "${chore#*/}"
        exit 1
    fi
```

If the rebase is successful, the chore branch is then merged into the new branch and the script continues to the next chore branch. If the merge fails, the script exits.

Once all chore branches are merged, the script tidies up the `go.mod` file and runs `go generate`, commiting the updates each time.

### After the Merge

After successfully merging all chore branches into the new branch, the script prompts the user to create an upstream branch for the new branch. 
Additionally, the script offers to delete the chore branches. Before deleting, the script asks the user to confirm by typing 'delete'.


