export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
export const API_VERSION = 'v2';

// Ensure no double slashes if API_BASE_URL ends with /
const cleanBaseUrl = API_BASE_URL.replace(/\/$/, '');
export const API_URL = `${cleanBaseUrl}/api/${API_VERSION}`;
