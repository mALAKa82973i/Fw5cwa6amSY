// 代码生成时间: 2025-08-06 15:47:54
import { Injectable } from '@apollo/federation';
import { ApolloError } from '@apollographql/apollo-server-errors';
import fetch from 'node-fetch'; // Assuming the use of node-fetch for HTTP requests

@Injectable()
export class NetworkConnectionChecker {
  /**
   * Checks if the network connection is active by pinging a specified URL.
   *
   * @param url The URL to ping for checking network connection status.
   * @returns A promise that resolves to a boolean indicating connection status.
   */
  public async checkConnection(url: string): Promise<boolean> {
    try {
      // Attempt to fetch the specified URL to check the network connection
      const response = await fetch(url);

      // If the response status is 200-299, it indicates a successful connection
      return response.status >= 200 && response.status < 300;
    } catch (error) {
      // If an error occurs during the fetch, we consider the connection as inactive
      console.error('Error checking network connection:', error);
      throw new ApolloError('Network connection check failed', 'NETWORK_ERROR');
    }
  }
}
