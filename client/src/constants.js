export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  HEALTH: '/health',
  BOARDS: '/boards',
  CARDS: '/cards',
  COMMENTS: '/comments'
};

export const BOARD_CATEGORIES = {
  ALL: 'all',
  RECENT: 'recent',
  CELEBRATION: 'celebration',
  THANK_YOU: 'thank you',
  INSPIRATION: 'inspiration'
};

export const DISPLAY_TYPES = {
  HOME: 'home',
  SEARCH: 'search'
};

export const VIEW_TYPES = {
  HOME: 'home',
  BOARD_DETAILS: 'board-detail'
};
