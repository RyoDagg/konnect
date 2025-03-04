import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config';

class APIService {
  private async getHeaders() {
    const token = await AsyncStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private async request(method: string, path: string, body?: any, params?: any) {
    const headers = await this.getHeaders();
    const url = new URL(`${API_URL}${path}`);
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }

    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url.toString(), options);
    return response.json();
  }

  get(path: string, params?: any) {
    return this.request('GET', path, undefined, params);
  }

  post(path: string, body: any, params?: any) {
    return this.request('POST', path, body, params);
  }

  put(path: string, body: any) {
    return this.request('PUT', path, body);
  }

  patch(path: string, body: any, params?: any) {
    return this.request('PATCH', path, body, params);
  }

  del(path: string) {
    return this.request('DELETE', path);
  }

  async setToken(token: string) {
    await AsyncStorage.setItem('token', token);
  }

  async removeToken() {
    await AsyncStorage.removeItem('token');
  }
}

const API = new APIService();
export default API;
