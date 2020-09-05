import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

/* Local */
import introspectionQueryResultData from 'graphql/fragments-gen'

function createClient() {
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    credentials: 'same-origin',
  })

  const authLink = setContext((_: any, { headers }) => {
    const token = localStorage.getItem('accessToken')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const cache = new InMemoryCache({
    possibleTypes: introspectionQueryResultData.possibleTypes,
  })

  return new ApolloClient({
    cache,
    link: authLink.concat(httpLink),
  })
}

export const client = createClient()
