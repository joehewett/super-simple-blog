---
title: 'Debugging Kubernetes for Beginners'
date: '2022-08-07T13:00:00.000Z'
description: 'A few beginner steps towards debugging Kubernetes deployments.'
thumbnail: '/img/blog/thumbnail1.png'
---

These debugging notes assume you're running minikube and skaffold.

First, check minikube is running (`minikube start`) and ensure that the app is running e.g. `skaffold dev`.

`kubectl get services `
`kubectl get pods -o wide`

If a service is misbehaving, the above commmand should give you sufficient information to identify it.

Get the Pod ID of the offending service

`kubectl describe pod $id`

Examine the events in the output and identify the problem e.g. `unreachableserver/nginx:1:14` etc. 

If no events seem relevant, try deleting the pod and looking at the events from the new pod.

Note: our pods are usually orchestrated by replica sets and deployments, so we're unlikely to want to terminate a pod on its own (if it's controlled by a replica set, for example, it will probably consistently spin back up when terminated). You can try killing the deployment instead of the pod as shown below. 
- `kubectl delete pod $id`
- `kubectl get pods`
- `kubectl get pod $new_id`

# Common Problems
Below are a number of problems you're likely to run in to at some point or another

### ImagePullBackoff / ErrImgPull
A better guide exists for this problem: [Kubernetes Troubleshooting Walkthrough - ImagePullBackoff](https://managedkube.com/kubernetes/k8sbot/troubleshooting/imagepullbackoff/2019/02/23/imagepullbackoff.html)

If you're having trouble pulling the image from the remote image repository, try the following:

- Try SSH into the pod to see what's going on 
	- `kubectl exec -i -t $pod_name -n $namespace -- /bin/bash`
	- Try and resolve the docker registry DNS by pinging it 

If you're using a private registry, check that the secret exists and is correct. 
- Secrets should be in the same namespace

Some registries hav firewalls that limit IP addresses. Try to find out if the firewall is blocking the image pull. 

### OOMKilled
https://www.containiq.com/post/oomkilled-troubleshooting-kubernetes-memory-requests-and-limits

Increase the memory limit of the offending pod: 

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: keras-pod
  namespace: 
spec:
  containers:
  - name: keras
    image: 
    resources:
      requests:
        memory: "3500Mi"
      limits:
        memory: "5000Mi"
```
