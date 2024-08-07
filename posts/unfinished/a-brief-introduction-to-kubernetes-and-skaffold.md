---
title: 'A brief introduction to Kubernetes & Skaffold'
date: '2022-08-07T00:00:00.000Z'
description: 'A few personal notes on Kubernetes and Skaffold'
thumbnail: '/img/blog/thumbnail2.png'
---

If you prefer to learn by doing, check out the [Skaffold Quickstart](https://skaffold.dev/docs/quickstart)

TLDR; Kubernetes allows us to orchestrate containers. Skaffold facilitates CI for Kubernetes.

# What is Kubernetes? 
Most applications are comprised of a number of discrete services (e.g. frontend, backend, database, queue) that interact with eachother. 

The entire application, or each of its individual services can be containerised.  
- Containerisation allows just-in-time expansion (*scaling*) of resources for each service
- It means that we can remove parts without affecting any of the other contents (*immutability*). 
- Containers also allow for programs to be detached and independent from the system they are built on or running on (*portability*). 

**Kubernetes** allows us to automate container operations. Kubernetes orchestrates our containers for us, meaning we don't have to worry about any manual deployment or management of containers ourselves. 

# Kubernetes Clusters 
[See the kubernetes docs here](https://kubernetes.io/docs/concepts/overview/components/)

## Cluster Structure 
- Each application is deployed in a Kubernetes #cluster. 
- A cluster is a what you get when you deploy an application. 
	- Each cluster is comprised of at least 1 worker node.
		- A worker #node is a machine that runs containerised applications. 
			- Nodes host Pods. 
			- A #Pod is a group of one or more containers that have shared storage and network resources, and a specification for how to run the containers
			- 
			- Pod contents are co-located, co-scheduled, and run in a shared context 
			- The shared context of a Pod is a set of namespaces, cgroups etc. A Pod is sort of like a group of Docker containers with sahred namespaces and shared filesystem volumes. 
			- You don't usually create Pods yourself. This is done by a controller. 



## Control Plane Components

See the [Kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#backing-up-an-etcd-cluster) for more. 
- There are a number of components that are needed to make global decisions about the cluster. 
- These components are usually all hosted on the same machine
	- Usually not a machine that is hosting user containers. 

- **kube-apiserver** - exposes the Kubernetes API. The API server is the frontend for the Kubernetes control plane
- **etcd** - Consistent and highly-available key-value store for all cluster data.
	- Worthwhile having a backup plan for those data. See [here](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#backing-up-an-etcd-cluster)
- **kube-scheduler** - watches for newly created #Pod with no #node and assigns a node for them to run on 
- **kube-controller-manager** - Runs controller processes. 
	- Each controller is a separate process but to reduce complexity, they are all compiled into a single binary and run on a single process 
- **cloud-controller-manager** - A Kubernetes control palne component that embeds cloud-specific control logic
	- Allows you to link your cluster to your cloud providers API. 
		- If you host your cluster in-house or inside your own PC, you will not have a cloud manager.


# Tools

## kubectl
**kubectl** ([documentation](https://kubernetes.io/docs/reference/kubectl/)) is a command-line tool that allows you to run commands against Kubernetes clusters. Specifically, it provides a mechanism for interacting with the cluster #control-plane via the Kubernetes API. 
kubectl allows you to:
- Deploy applications
- Inspect clusters
- Manage resources
- View logs

### kubectl Commands
See the [cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/) for more. 
- `kubectl get services` - list all services in the namespace
- `kubectl get pods -o wide` - list all pods in current namespace (with details)
- `kubectl apply -f ./my-manifest.yaml` - create a resource
- `kubectl explain pods` - get documentation for pod manifests 
- `kubectl logs my-pod` - get pod logs 
- `kubectl api-resources` - list all supported resources types



# Skaffold
See the [documentation](https://skaffold.dev/docs/). 

A command line tool that facilitates continuous development for Kubernetes applications. Skaffold handles building, pushing and deploying our application to our kubernetes #cluster. 

### skaffold.yaml
**skaffold.yaml** is a single pluggable declarative configuration file for the project. 

Tip: Cloud Code provides assistance for writing skaffold.yaml files

For details, see the [skaffold.yaml documentation](https://skaffold.dev/docs/references/yaml/?version=v2beta29). 



### Debugging Skaffold with Cloud Code
[Cloud Code IDE Extension for Visual Code](https://skaffold.dev/docs/install/#managed-ide) 

Cloud Code automatically configures container images for debugging, so that you can debug Kubernetes services easily in your IDE. 

# Minikube
Minikube allows us to deploy a single-node, local cluster for our kubernetes application. 

# Kustomize
Kustomize ([documentation](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/)) is a tool to customise Kubernetes objects through a Kustomization file. i

### Generating Resources
Kustomize can help handle ConfigMaps and Secrets

For example, to generate a secret from a literal key-value pair, we can add an entry to `literals` list in `secretGenerator`. Here is an example of generating a Secret with a data item from a key-value pair.

**Secrets**
- From .env files (NAME=VALUE, one per line)
- Consume the entire contents of a file to make one secret value 
- Get literals from the kustomization file itself

E.g. literals: 

in kustomization.yaml, add:
```
secretGenerator:
- name: example-secret-2
  literals:
  - username=admin
  - password=secret
```

The generated secret would look like this: 
```yaml
apiVersion: v1
data:
  password: c2VjcmV0
  username: YWRtaW4=
kind: Secret
metadata:
  name: example-secret-2-t52t6g9
type: Opaque
```
`


### Bases & Overlays 
- A #base is a directory with a kustomization.yaml, which contains a set of resources and associated customisation
- An #overlay is a directory with a kustomization.yaml that refers to other kustomization directories as its bases. 
	- A base has no knowledge of an overlay
	- A base can be used in multiple overlays
	- An overlay may have multiple bases
		- The overlay would compose all of the resources from the its bases, and may have additional customisation on top. 

### Kustomize Feature List
See all [here](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/#kustomize-feature-list).

- Namespace: add namespace to all resources
- namePrefix: value of this field is prepended to the names of all resources
- resources: each entry in this list must resolve to an existing resource configuration file
- bases: each enty in this list must resolve to a directory containing a kustomization.yaml 


