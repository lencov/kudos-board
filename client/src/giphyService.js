const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorMessage = `GIPHY API Error: ${response.status} - ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return await response.json();
};

export const searchGifs = async (query, limit = 20, offset = 0) => {
  if (!query || !query.trim()) {
    return { data: [] };
  }

  const url = `${GIPHY_BASE_URL}/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query.trim())}&limit=${limit}&offset=${offset}&rating=g&lang=en`;

  try {
    const response = await fetch(url);
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error('Failed to search GIFs:', error);
    return { data: [] };
  }
};

export const getTrendingGifs = async (limit = 20, offset = 0) => {
  const url = `${GIPHY_BASE_URL}/trending?api_key=${GIPHY_API_KEY}&limit=${limit}&offset=${offset}&rating=g`;

  try {
    const response = await fetch(url);
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error('Failed to get trending GIFs:', error);
    return { data: [] };
  }
};

export const getGifById = async (gifId) => {
  const url = `${GIPHY_BASE_URL}/${gifId}?api_key=${GIPHY_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error('Failed to get GIF by ID:', error);
    return null;
  }
};
