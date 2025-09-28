import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { getAuthToken } from "@/utils/auth";

import { API_BASE_URL } from "./config";
import { ErrorCode,handleApiError } from "./errorHandler";

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
  code?: ErrorCode;
}

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 240 * 60 * 1000; // 4 hours

/**
 * Invalidates cache entries that match the given URL.
 * @param url The URL to invalidate cache for.
 */
function invalidateCacheForUrl(url: string) {
  for (const key of cache.keys()) {
    if (key.includes(url)) {
      cache.delete(key);
    }
  }
}

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = getAuthToken();
        if (token) {
          config.headers.Authorization = `${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        return Promise.reject(handleApiError(error));
      }
    );
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const cacheKey = JSON.stringify({ url, params: config?.params });
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`Cache hit for ${url}`);
      return Promise.resolve({
        data: cached.data,
        status: 200,
        statusText: "OK",
        headers: {},
        config: config || {},
      } as AxiosResponse<T>);
    }

    console.log(`Cache miss for ${url}`);
    const response = await this.client.get<T>(url, config);
    cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
    return response;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    // Invalidate cache for the specific URL to ensure fresh data
    invalidateCacheForUrl(url);
    return this.client.post<T>(url, data, config);
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    // Invalidate cache for the specific URL to ensure fresh data
    invalidateCacheForUrl(url);
    return this.client.put<T>(url, data, config);
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    // Invalidate cache for the specific URL to ensure fresh data
    invalidateCacheForUrl(url);
    return this.client.delete<T>(url, config);
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    // Invalidate cache for the specific URL to ensure fresh data
    invalidateCacheForUrl(url);
    return this.client.patch<T>(url, data, config);
  }
}

const apiClient = new ApiClient(API_BASE_URL);

export default apiClient;
