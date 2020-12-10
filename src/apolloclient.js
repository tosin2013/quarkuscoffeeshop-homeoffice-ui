import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

console.log("GraphQL Endpoint: " + process.env.GRAPHQL_ENDPOINT);
const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;

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