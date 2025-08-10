// 代码生成时间: 2025-08-11 02:51:15
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { URL } from 'url';
import fetch from 'node-fetch';

// Define a type for the URL validation response
interface UrlValidationResponse {
    isURLValid: boolean;
    message?: string;
}

// Define the GraphQL resolver functions
const resolvers = {
    Query: {
        // Resolver for URL validation
        urlValidation: async (_, args: { url: string }): Promise<UrlValidationResponse> => {
            try {
                // Attempt to parse the URL
                new URL(args.url);

                // Check if the URL is reachable
                const response = await fetch(args.url, { method: 'HEAD' });
                if (response.ok) {
                    // URL is valid and reachable
                    return { isURLValid: true, message: 'URL is valid and reachable.' };
                } else {
                    // URL is valid but not reachable
                    return { isURLValid: true, message: 'URL is valid but not reachable.' };
                }
            } catch (error) {
                // URL is invalid
                return { isURLValid: false, message: 'Invalid URL.' };
            }
        },
    },
};

// Build the schema and create the Apollo Server
const schema = await buildSchema({
    resolvers,
});

const server = new ApolloServer({
    schema,
    context: {},
    playground: true,
    introspection: true,
});

// Start the server
server.listen().then(({ url }) => {
    console.log(`Server is running at ${url}`);
});