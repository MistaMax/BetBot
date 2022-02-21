helm delete nodeserver
helm delete prometheus -n prometheus
helm delete grafana -n grafana
kubectl delete namespace prometheus
kubectl config set-context --current --namespace=default
