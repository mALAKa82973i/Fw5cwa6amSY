// 代码生成时间: 2025-08-17 07:30:41
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from '@apollo/client/link/context';

// GraphQL query to fetch webpage content
const GET_WEBPAGE_CONTENT_QUERY = gql`
  query GetWebpageContent($url: String!) {
    webpageContent(url: $url) {
      title
      url
      content
    }
  }
`;

// Custom HTTP link with authentication
const httpLink = createHttpLink({
  uri: 'https://your-apollo-server.com/graphql', // Replace with your Apollo Server URL
  fetch,
});

// Auth link to add auth headers to the request
const authLink = setContext((_, { headers }) => {
  // Add your authentication logic here
  // For example, get the token from an environment variable
  const token = process.env.YOUR_AUTH_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

// Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Function to fetch webpage content using the Apollo Client
async function fetchWebpageContent(url: string): Promise<{ title: string; url: string; content: string }> {
  try {
    // Execute the GraphQL query
    const { data } = await client.query({
      query: GET_WEBPAGE_CONTENT_QUERY,
      variables: { url },
    });

    // Return the fetched data
    return data.webpageContent;
  } catch (error) {
    // Handle errors appropriately
    console.error('Failed to fetch webpage content:', error);
    throw error;
  }
}

// Example usage
const url = 'https://example.com';
fetchWebpageContent(url)
  .then(content => console.log(content))
  .catch(error => console.error('Error:', error));