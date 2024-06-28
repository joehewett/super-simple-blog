---
title: "An opinionated overview of a modern production Kubernetes system in 2024"
date: "2024-06-27T00:00:00.000Z"
description: "A high-level guide to setting up a modern production system with Kubernetes, Terraform, and GitOps practices."
thumbnail: "/img/blog/thumbnail2.png"
---

This guide is a work in progress, and I intend to flesh it out with more specific details and examples.

## Introduction

I've been working on a fairly modern, cloud-native software system recently that has involved a few new technologies. As a team with minimal experience building large production-ready systems from the group up, there was a fairly steep learning curve. I wanted to outline some of the major components of the process so that it may serve as a guide for others going through the same thing, and to crystalise my thinking too.

This guide will walk you through the process of setting up a Kubernetes-based project, from local development to production deployment. We'll cover containerization, local Kubernetes clusters, infrastructure as code, continuous integration, and GitOps practices.

Remember that this is a high-level, opinionated overview, and the specifics will vary depending on your project requirements and preferred technologies. The goal is to provide a roadmap for building a large, modern, scalable, and reliable production system that can be worked on by a team of developers.

## Standard Technologies

Here's a list of default technologies we're going to be using

- [Go](https://go.dev/) for the programming language
- [K3S](https://k3s.io/) for local Kubernetes clusters or [Minikube](https://minikube.sigs.k8s.io/) if you prefer
- [Docker](https://www.docker.com/) for containerization
- [Flux](https://fluxcd.io/) for GitOps
- [Skaffold](https://skaffold.dev/) to facilitate CI/CD for local Kubernetes development
- [Kustomize](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/) for declarative management of Kubernetes resources
- [Terraform](https://www.terraform.io/) to provision cloud resources
- [AWS](https://aws.amazon.com/) or [GCP](https://cloud.google.com/) for cloud services

You might also use:

- [Localstack](https://www.localstack.cloud/) to emulate interaction with cloud resources in development

## Project Structure

A typical project structure might look like this:

```
newproject
├── backend     # Go code, OpenAPI spec, and local cluster config
├── manifests   # Kubernetes config in YAML with overlays for prod and staging
├── terraform   # Config for provisioning cloud resources for staging and prod
└── web         # Frontend code
```

## Deployment Process Overview

Here's an example of how a deployment process might look for a single branch project using Kubernetes:

1. Developer checks out a new feature branch and makes code changes
2. Developer runs `skaffold dev` to test changes on local K3S Kubernetes cluster
3. Developer commits changes and pushes to remote
   - CI runs lint and test stages
4. Developer merges feature branch to `main`
5. A new tag is created for the backend repo
   - CI builds and pushes new images to container registry
   - CI updates image versions in the manifests repo's staging overlay
6. GitOps tool (e.g., Flux) detects changes in manifests and updates the staging cluster
7. Developer triggers production deployment
   - Changes are applied to production cluster

## Setting Up Your Development Environment

We need our developers

### Local Kubernetes Cluster

To set up a local Kubernetes cluster for development:

1. Install K3S on your development machine
2. Set up your cluster configuration
3. Run the cluster setup script

**Tip:** Use tools like [Lens](https://k8slens.dev/) for better cluster visualization.

### Running Kubernetes Resources Locally

To get a container running on your local cluster:

1. Create a Dockerfile for your application
2. Install Skaffold
3. Configure `skaffold.yaml` to define which containers to spin up
4. Run `skaffold dev` or `skaffold run --tail`

## Managing Kubernetes Manifests

Use Kustomize to manage your Kubernetes manifests across different environments:

1. Create a `bases` directory for shared configurations
2. Create `overlays` directories for environment-specific configurations
3. Use `kustomization.yaml` files to compose your resources

Example structure:

```
manifests
├── bases
│   └── daemons
│       └── api
│           ├── deployment.yaml
│           ├── kustomization.yaml
│           └── service.yaml
└── overlays
    ├── prod
    │   ├── config
    │   ├── daemons
    │   └── kustomization.yaml
    └── staging
        ├── config
        ├── daemons
        └── kustomization.yaml
```

## Infrastructure as Code with Terraform

Use Terraform to provision your cloud resources:

1. Set up a Terraform repository
2. Define your infrastructure using Terraform configurations
3. Use modules to organize and reuse your infrastructure code
4. Provision separate environments for staging and production

## Continuous Integration and Deployment

Set up your CI/CD pipeline to automate building, testing, and deploying your application:

1. Configure your CI tool to build images when pushing to the main branch
2. Set up jobs to deploy images to your container registry
3. Implement a versioning strategy (e.g., using Git tags)
4. Configure your CI to update manifests with new image versions.
   - These will then be applied to your cluster by your GitOps tool (Flux in our case).

## GitOps with Flux

Use Flux to keep your cluster in sync with your manifests:

1. Install Flux on your Kubernetes cluster
2. Configure Flux to watch your manifests repository
3. Set up webhooks to alert Flux of changes to the manifests

Flux will automatically apply changes pushed to your manifests repository to your Kubernetes cluster, ensuring your desired state is always reflected in your running infrastructure.

## Conclusion

The above guide should give you a good starting point for building a modern Kubernetes production system. The details are quite sparse, but I hope that the outline can give you a path towards a robust and scalable system that can handle the demands of modern production system. Good luck!
