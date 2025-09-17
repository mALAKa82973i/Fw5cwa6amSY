// 代码生成时间: 2025-09-17 15:33:15
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';

// Define the GraphQL mutation for sending notifications
const SEND_NOTIFICATION_MUTATION = gql`
  mutation SendNotification($message: String!) {
    sendNotification(message: $message) {
      id
      message
    }
  }
`;

// Define the GraphQL query for retrieving notifications
const GET_NOTIFICATIONS_QUERY = gql`
  query GetNotifications {
    notifications {
      id
      message
    }
  }
`;

// Define the Notification class to model notification data
class Notification {
  id: string;
  message: string;

  constructor(id: string, message: string) {
    this.id = id;
    this.message = message;
  }
}

// Define the NotificationService class to handle notification operations
class NotificationService {
  private client: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  // Send a notification to the server
  async sendNotification(message: string): Promise<Notification> {
    try {
      const result = await this.client.mutate({
        mutation: SEND_NOTIFICATION_MUTATION,
        variables: { message },
      });

      if (result.data && result.data.sendNotification) {
        return new Notification(result.data.sendNotification.id, result.data.sendNotification.message);
      } else {
        throw new Error('Failed to send notification');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  // Retrieve notifications from the server
  async getNotifications(): Promise<Notification[]> {
    try {
      const result = await this.client.query({
        query: GET_NOTIFICATIONS_QUERY,
      });

      if (result.data && result.data.notifications) {
        return result.data.notifications.map((notification) => new Notification(notification.id, notification.message));
      } else {
        throw new Error('Failed to retrieve notifications');
      }
    } catch (error) {
      console.error('Error retrieving notifications:', error);
      throw error;
    }
  }
}

// Example usage of the NotificationService
const main = async () => {
  const apolloClient = new ApolloClient({
    uri: 'YOUR_GRAPHQL_ENDPOINT', // Replace with your GraphQL endpoint
  });

  const notificationService = new NotificationService(apolloClient);

  try {
    // Send a notification
    const sentNotification = await notificationService.sendNotification('Hello, this is a test notification!');
    console.log('Notification sent:', sentNotification);

    // Retrieve notifications
    const notifications = await notificationService.getNotifications();
    console.log('Retrieved notifications:', notifications);
  } catch (error) {
    console.error('Error in notification system:', error);
  }
};

main();
