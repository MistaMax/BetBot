# BetBot
a bot to place bets
# Config
Create your own config.json with the variables in the example.config.json
# Logging
Make a logs directory and put a default.log file in it.
# Fix for windows npm
npm config set prefix /usr/local



# Setting up multiserver with helm

Deploy your application into Kubernetes:

helm install nodeserver chart/nodeserver
Note: If an error is encountered because the previous docker run is still running, delete and retry the helm install:

helm del --purge nodeserver
helm install nodeserver chart/nodeserver
Check that all the "pods" associated with your application are running:

kubectl get pods
In earlier steps, we set the replicaCount to 3, so you should expect to see three nodeserver-deployment-* pods running.

Now everything is up and running in Kubernetes. It is not possible to navigate to localhost:3000 as usual because your cluster isn't part of the localhost network, and because there are several instances to choose from.

Kubernetes has a concept of a 'Service', which is an abstract way to expose an application running on a set of Pods as a network service. To access our service, we need to forward the port of the nodeserver-service to our local device:

You can forward the nodeserver-service to your device by:
kubectl port-forward service/nodeserver-service 3000


# Monitoring
Installing Prometheus into Kubernetes can be done using its provided Helm chart. This step needs to be done in a new Terminal window as you'll need to keep the application port-forwarded to localhost:3000.

kubectl create namespace prometheus
kubectl config set-context --current --namespace=prometheus
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/prometheus --namespace=prometheus
You can then run the following two commands in order to be able to connect to Prometheus from your browser:

On Linux and macOS:

export POD_NAME=$(kubectl get pods --namespace prometheus -l "app=prometheus,component=server" -o jsonpath="{.items[0].metadata.name}")
kubectl --namespace prometheus port-forward $POD_NAME 9090
On Windows:

for /f "tokens=*" %i in ('"kubectl get pods --namespace prometheus -l app=prometheus,component=server -o jsonpath={.items[0].metadata.name}"') do set POD_NAME=%i
kubectl --namespace prometheus port-forward %POD_NAME% 9090
This may fail with a warning about status being "Pending" until Prometheus has started, retry once the status is "Running" for all pods:

kubectl -n prometheus get pods --watch

Installing Grafana into Kubernetes
Installing Grafana into Kubernetes can be done using its provided Helm chart.

In a third Terminal window:

kubectl create namespace grafana
kubectl config set-context --current --namespace=grafana
helm repo add grafana https://grafana.github.io/helm-charts
helm install grafana grafana/grafana --set adminPassword=PASSWORD --namespace=grafana
You can then run the following two commands in order to be able to connect to Grafana from your browser:

On Linux and macOS:

export POD_NAME=$(kubectl get pods --namespace grafana -o jsonpath="{.items[0].metadata.name}")
kubectl --namespace grafana port-forward $POD_NAME 3001:3000
On Windows:

for /f "tokens=*" %i in ('"kubectl get pods --namespace grafana -o jsonpath={.items[0].metadata.name}"') do set POD_NAME=%i
kubectl --namespace grafana port-forward %POD_NAME% 3001:3000
You can now connect to Grafana at the following address, using admin and PASSWORD to login:

http://localhost:3001

In order to connect Grafana to the Prometheus service, go to http://localhost:3001/datasources and click Add Data Source. Select Prometheus.

This opens a panel that should be filled out with the following entries:

Name: Prometheus
URL: http://prometheus-server.prometheus.svc.cluster.local

Now click on Save & Test to check the connection and save the Data Source configuration.

Grafana now has access to the data from Prometheus.

Installing a Kubernetes Dashboard into Grafana
The Grafana community provides a large number of pre-created dashboards which are available for download, including some which are designed to display Kubernetes data.

To install one of those dashboards, click on the + icon and select Import.

In the provided panel, enter 1621 into the Grafana.com Dashboard field in order to import dashboard number 1621, and press Load.

Note: If 1621 is not recognized, it may be necessary to download the JSON for 1621 (select Download JSON), and use Upload JSON in the Grafana UI.

This then loads the information on dashboard 1621 from Grafana.com.

Change the Prometheus field so that it is set to Prometheus and click Import.

This will then open the dashboard, which will automatically start populating with data about your Kubernetes cluster.

Once you are finished, you should exit all the running terminal processes with CTRL + C, and then use the following commands to delete the helm releases and remove your Kubernetes pods:

helm delete nodeserver -n default
helm delete prometheus -n prometheus
helm delete grafana -n grafana
To change your Kubernetes context back to default use:

kubectl config set-context --current --namespace=default