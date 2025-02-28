import { API_URL } from './config';

const LOGIN_PATH = '/login';

interface Headers {
  [key: string]: string;
}

interface Options {
  headers?: Headers;
}

class APIService {
  baseUrl: string;
  headers: Headers;

  constructor() {
    this.baseUrl = API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') ? `jwt ${localStorage.getItem('token')}` : '',
    };
  }

  setToken(token: string): void {
    // Set token in headers
    localStorage.setItem('token', token);
    this.headers['Authorization'] = `jwt ${token}`;
  }

  removeToken(): void {
    // Remove token from headers
    localStorage.removeItem('token');
    this.headers['Authorization'] = '';
  }

  async post(endpoint: string, data: any, options: Options = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        ...this.headers,
        ...options.headers,
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (response.status === 401) window.location.href = LOGIN_PATH;
    return await response.json();
  }

  async postFormData(endpoint: string, data: FormData): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: this.headers.Authorization,
      },
      body: data,
      credentials: 'include',
    });
    if (response.status === 401) window.location.href = LOGIN_PATH;
    return await response.json();
  }

  async get(endpoint: string, options: Options = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        ...this.headers,
        ...options.headers,
      },
      credentials: 'include',
    });
    if (response.status === 401) window.location.href = LOGIN_PATH;
    return await response.json();
  }

  async patch(endpoint: string, data: any, options: Options = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
        ...options.headers,
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (response.status === 401) window.location.href = LOGIN_PATH;
    return await response.json();
  }

  async put(endpoint: string, data: any, options: Options = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        ...this.headers,
        ...options.headers,
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (response.status === 401) window.location.href = LOGIN_PATH;
    return await response.json();
  }

  async delete(endpoint: string, options: Options = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        ...this.headers,
        ...options.headers,
      },
      credentials: 'include',
    });
    if (response.status === 401) window.location.href = LOGIN_PATH;
    return await response.json();
  }
}

const api = new APIService();
export default api;
