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