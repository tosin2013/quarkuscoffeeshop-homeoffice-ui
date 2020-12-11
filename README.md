# quarkuscoffeeshop-homeoffice-ui

This project requires a backend GraphQL service that provides the data we display. This must be configured with the environment variable GRAPHQL_ENDPOINT. If not set, it will default to 'http://0.0.0.0:8080/graphql' for development purposes.

        npm install

        npm run start:dev

# Deployment to OpenShift
-n  is the namespace/project

        oc new-app \
        -n dotnet-cafe-demo \
        --name=quarkuscoffeeshop-homeoffice-ui nodejs:latest~https://github.com/quarkuscoffeeshop/quarkuscoffeeshop-homeoffice-ui.git

        oc expose svc/quarkuscoffeeshop-homeoffice-ui



#Full Stack Deployment on OpenShift

oc new-project quarkuscoffeeshop-homeoffice

oc new-app \
-n quarkuscoffeeshop-homeoffice \
--name postgres \
--template="openshift/postgresql-persistent" \
-e POSTGRESQL_USER=coffeeshopuser \
-e POSTGRESQL_PASSWORD=redhat-20 \
-e POSTGRESQL_DATABASE=coffeeshopdb


oc new-app \
-n quarkuscoffeeshop-homeoffice \
--name quarkuscoffeeshop-homeoffice-backend quay.io/quarkus/ubi-quarkus-native-s2i:20.3.0-java11~https://github.com/quarkuscoffeeshop/homeoffice-backend.git \
-e POSTGRES_JDBC_URL="jdbc:postgresql://postgresql:5432/coffeeshopdb?currentSchema=coffeeshop" \
-e POSTGRESQL_USER=coffeeshopuser \
-e POSTGRESQL_PASSWORD=redhat-20

oc expose svc/quarkuscoffeeshop-homeoffice-backend

oc new-app \
-n quarkuscoffeeshop-homeoffice \
--name=quarkuscoffeeshop-homeoffice-ui nodejs:latest~https://github.com/quarkuscoffeeshop/quarkuscoffeeshop-homeoffice-ui.git \
-e GRAPHQL_ENDPOINT=http://homeoffice-backend:8080/graphql

oc expose svc/quarkuscoffeeshop-homeoffice-ui

oc annotate deployment -l app=quarkuscoffeeshop-homeoffice-ui app.openshift.io/connects-to='["quarkuscoffeeshop-homeoffice-backend"]'
oc annotate deployment -l app=quarkuscoffeeshop-homeoffice-backend app.openshift.io/connects-to='["postgres"]'
oc label dc -l app=postgres app.kubernetes.io/name=postgresql
oc label deployment -l app=quarkuscoffeeshop-homeoffice-backend app.kubernetes.io/name=quarkus
oc label deployment -l app=quarkuscoffeeshop-homeoffice-ui app.kubernetes.io/name=nodejs
