import Cookies from "js-cookie";

const apiURL = import.meta.env.VITE_APP_API_URL;

export function decodeAccessToken(accessToken:string) {
  try {
    const tokenParts = accessToken.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('Invalid token');
    }
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload;
  } catch (error) {
    console.error('Error decoding access token:', error);
    throw error;
  }
}

export async function refreshAccessToken(url:string) {
  try {
    const response = await fetch(`${url}/refresh`, {
      method: 'GET',
      credentials: 'include', 
    });
    
    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    
    const { accessToken } = data;
    Cookies.set('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    throw error;
  }
}

