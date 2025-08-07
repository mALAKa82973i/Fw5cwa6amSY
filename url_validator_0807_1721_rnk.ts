// 代码生成时间: 2025-08-07 17:21:30
import { URL as NodeURL } from 'url';

// Function to validate the format of a URL using a regular expression
function isValidUrl(url: string): boolean {
  // Regular expression to match a basic URL format
  const urlRegex = /^(http[s]?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?$/;
  
  return urlRegex.test(url);
}

// Function to check if the URL is reachable and returns a boolean indicating its availability
async function isUrlReachable(url: string): Promise<boolean> {
  try {
    // Using Node's URL class to parse the URL, throws error if invalid format
    new NodeURL(url);
    
    // Using fetch API to check if the URL is reachable
    const response = await fetch(url);
    
    // Check if the response status code is in the range of 200-299
    return response.ok;
  } catch (error) {
    // Handle errors (invalid format or unreachable URL)
    console.error('Error checking URL:', error);
    return false;
  }
}

// Example usage
async function checkUrl(url: string): Promise<void> {
  if (!isValidUrl(url)) {
    throw new Error('Invalid URL format.');
  }
  
  const isReachable = await isUrlReachable(url);
  if (isReachable) {
    console.log(`The URL ${url} is reachable and valid.`);
  } else {
    console.log(`The URL ${url} is not reachable or valid.`);
  }
}

// Export functions for external use
export { isValidUrl, isUrlReachable, checkUrl };