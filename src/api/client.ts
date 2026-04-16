/**
 * @file api/client.ts
 * @description Axios base instance with baseURL, timeout, and interceptors.
 * All requests go through this single typed instance.
 */

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

/** Base URL for all Rick and Morty API requests */
const BASE_URL = 'https://rickandmortyapi.com/api';

/** Default timeout in milliseconds */
const TIMEOUT_MS = 10_000;

/** Typed Axios instance */
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Request interceptor — logs outgoing requests in development.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (__DEV__) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.params);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor — normalises errors into a consistent shape.
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (__DEV__) {
      console.error('[API Error]', error.response?.status, error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
