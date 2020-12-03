# quarkuscoffeeshop-homeoffice-ui
Testing trigger
npm install

npm run start:dev

# Deployment to OpenShift
-n  is the namespace/project

        oc new-app \
        -n dotnet-cafe-demo \
        --name=quarkuscoffeeshop-homeoffice-ui nodejs:latest~https://github.com/quarkuscoffeeshop/quarkuscoffeeshop-homeoffice-ui.git

        oc expose svc/quarkuscoffeeshop-homeoffice-ui
test1
