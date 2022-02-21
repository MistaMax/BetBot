helm delete nodeserver
helm install nodeserver chart/nodeserver
kubectl get pods
kubectl create namespace prometheus
kubectl config set-context --current --namespace=prometheus
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/prometheus --namespace=prometheus
for /f "tokens=*" %i in ('"kubectl get pods --namespace prometheus -l app=prometheus,component=server -o jsonpath={.items[0].metadata.name}"') do set POD_NAME=%i
kubectl --namespace prometheus port-forward %POD_NAME% 9090:9094
kubectl create namespace grafana
kubectl config set-context --current --namespace=grafana
helm repo add grafana https://grafana.github.io/helm-charts
helm install grafana grafana/grafana --set adminPassword=PASSWORD --namespace=grafana
for /f "tokens=*" %i in ('"kubectl get pods --namespace grafana -o jsonpath={.items[0].metadata.name}"') do set POD_NAME=%i
kubectl --namespace grafana port-forward %POD_NAME% 3001:3000
kubectl --namespace default port-forward service/nodeserver-service 3000