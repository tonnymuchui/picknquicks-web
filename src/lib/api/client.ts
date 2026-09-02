import axios from 'axios';

import { apiBaseUrl } from './config';

function createClient() {
  return axios.create({
    baseURL: apiBaseUrl,
    timeout: 10_000,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const apiClient = createClient();
export const publicApiClient = createClient();
