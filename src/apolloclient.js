import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const graphqlEndpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://0.0.0.0:8080/graphql';
console.log("GraphQL Endpoint: " + graphqlEndpoint);
console.log("GraphQL Environment: " + process.env.REACT_APP_GRAPHQL_ENDPOINT);

const link = new HttpLink({ uri: graphqlEndpoint })
const cache = new InMemoryCache()
const client = new ApolloClient({
  link,
  cache,
  fetchOptions: {
    mode: 'no-cors',
  },
})
export default client