---
title: 'Blog post 1'
date: '2021-08-30T13:07:44.675Z'
description: 'This is a test blog from Markdown'
thumbnail: '/img/blog/blog-thumbnail.png'
---

Test markdown text here

## This is a test Markdown
o
First, check minikube is running (`minikube start`) and ensure that the app is running e.g. `skaffold dev`.

`kubectl get services `
`kubectl get pods -o wide`

Get the Pod ID of the offending service

`kubectl describe pod $id`

Examine the events in the output and identify the problem e.g. `unreachableserver/nginx:1:14` etc. 

If no events seem relevant, try deleting the pod and looking at the events from the new pod
- `kubectl delete pod $id`
- `kubectl get pods`
- `kubectl get pod $new_id`



### ImagePullBackoff / ErrImgPull
Try these instructions: [Kubernetes Troubleshooting Walkthrough - ImagePullBackoff](https://managedkube.com/kubernetes/k8sbot/troubleshooting/imagepullbackoff/2019/02/23/imagepullbackoff.html)

If you're having trouble pulling the image from the remote image repository, try the following:

- Try SSH into the pod to see what's going on 
	- `kubectl exec -i -t $pod_name -n $namespace -- /bin/bash`
	- Try and resolve the docker registry DNS by pinging it 

If you're using a private registry, check that the secret exists and is correct. 
- Secrets should be in the same namespace

Some registries hav firewalls that limit IP addresses. Try to find out if the firewall is blocking the image pull. 


## OOMKilled
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
