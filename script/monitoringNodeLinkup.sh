helm delete nodeserver
helm install nodeserver chart/nodeserver
kubectl create namespace prometheus
kubectl config set-context --current --namespace=prometheus
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/prometheus --namespace=prometheus
export POD_NAME=$(kubectl get pods --namespace prometheus -l "app=prometheus,component=server" -o jsonpath="{.items[0].metadata.name}")
kubectl --namespace prometheus port-forward $POD_NAME 9090 &
kubectl port-forward service/nodeserver-service 3000 &