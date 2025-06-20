import { API_BASE_URL, API_ENDPOINTS } from './constants.js';

const buildUrl = (endpoint, params = '') => {
  return `${API_BASE_URL}${endpoint}${params}`;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorMessage = `API Error: ${response.status} - ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return await response.json();
};

export const getAllBoards = async () => {
  const url = buildUrl(API_ENDPOINTS.BOARDS);
  const response = await fetch(url);
  return await handleResponse(response);
};

export const getBoardsByCategory = async (categories) => {
  const categoryParam = Array.isArray(categories)
    ? categories.join(',')
    : categories;
  const url = buildUrl(API_ENDPOINTS.BOARDS, `?category=${encodeURIComponent(categoryParam)}`);
  const response = await fetch(url);
  return await handleResponse(response);
};

export const searchBoards = async (searchQuery, categories = null) => {
  const params = new URLSearchParams();

  if (searchQuery && searchQuery.trim()) {
    params.append('search', searchQuery.trim());
  }

  if (categories) {
    const categoryParam = Array.isArray(categories)
      ? categories.join(',')
      : categories;
    params.append('category', categoryParam);
  }

  const url = buildUrl(API_ENDPOINTS.BOARDS, `?${params.toString()}`);
  const response = await fetch(url);
  return await handleResponse(response);
};

export const getBoardById = async (boardId) => {
  const url = buildUrl(API_ENDPOINTS.BOARDS, `/${boardId}`);
  const response = await fetch(url);
  return await handleResponse(response);
};

export const createBoard = async (boardData) => {
  const url = buildUrl(API_ENDPOINTS.BOARDS);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(boardData),
  });
  return await handleResponse(response);
};

export const deleteBoard = async (boardId) => {
  const url = buildUrl(API_ENDPOINTS.BOARDS, `/${boardId}`);
  const response = await fetch(url, {
    method: 'DELETE',
  });
  return await handleResponse(response);
};

export const getAllCards = async () => {
  const url = buildUrl(API_ENDPOINTS.CARDS);
  const response = await fetch(url);
  return await handleResponse(response);
};

export const getCardsByBoardId = async (boardId) => {
  const url = buildUrl(API_ENDPOINTS.CARDS, `?boardId=${boardId}`);
  const response = await fetch(url);
  return await handleResponse(response);
};

export const getCardById = async (cardId) => {
  const url = buildUrl(API_ENDPOINTS.CARDS, `/${cardId}`);
  const response = await fetch(url);
  return await handleResponse(response);
};

export const createCard = async (cardData) => {
  const url = buildUrl(API_ENDPOINTS.CARDS);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardData),
  });
  return await handleResponse(response);
};

export const updateCard = async (cardId, cardData) => {
  const url = buildUrl(API_ENDPOINTS.CARDS, `/${cardId}`);
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardData),
  });
  return await handleResponse(response);
};

export const likeCard = async (cardId) => {
  const url = buildUrl(API_ENDPOINTS.CARDS, `/${cardId}/like`);
  const response = await fetch(url, {
    method: 'PUT',
  });
  return await handleResponse(response);
};

export const pinCard = async (cardId) => {
  const url = buildUrl(API_ENDPOINTS.CARDS, `/${cardId}/pin`);
  const response = await fetch(url, {
    method: 'PUT',
  });
  return await handleResponse(response);
};

export const deleteCard = async (cardId) => {
  const url = buildUrl(API_ENDPOINTS.CARDS, `/${cardId}`);
  const response = await fetch(url, {
    method: 'DELETE',
  });
  return await handleResponse(response);
};

export const getAllComments = async () => {
  const url = buildUrl(API_ENDPOINTS.COMMENTS);
  const response = await fetch(url);
  return await handleResponse(response);
};

export const getCommentsByCardId = async (cardId) => {
  const url = buildUrl(API_ENDPOINTS.COMMENTS, `?cardId=${cardId}`);
  const response = await fetch(url);
  return await handleResponse(response);
};

export const getCommentById = async (commentId) => {
  const url = buildUrl(API_ENDPOINTS.COMMENTS, `/${commentId}`);
  const response = await fetch(url);
  return await handleResponse(response);
};

export const createComment = async (commentData) => {
  const url = buildUrl(API_ENDPOINTS.COMMENTS);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  });
  return await handleResponse(response);
};

export const updateComment = async (commentId, commentData) => {
  const url = buildUrl(API_ENDPOINTS.COMMENTS, `/${commentId}`);
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  });
  return await handleResponse(response);
};

export const deleteComment = async (commentId) => {
  const url = buildUrl(API_ENDPOINTS.COMMENTS, `/${commentId}`);
  const response = await fetch(url, {
    method: 'DELETE',
  });
  return await handleResponse(response);
};
