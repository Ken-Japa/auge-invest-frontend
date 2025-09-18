import { BaseApiService } from './baseService';

// Simple in-memory cache with TTL
class MemoryCache {
  private cache = new Map<string, { data: any; expires: number }>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set(key: string, data: any, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      expires: Date.now() + ttl,
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expires) {
        this.cache.delete(key);
      }
    }
  }
}

// Request deduplication
class RequestDeduplicator {
  private pendingRequests = new Map<string, Promise<any>>();

  async deduplicate<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
    // If request is already in progress, return the existing promise
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key) as Promise<T>;
    }

    // Create new request
    const request = requestFn().finally(() => {
      // Remove from pending requests when completed
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, request);
    return request;
  }
}

export class OptimizedApiService extends BaseApiService {
  private cache = new MemoryCache();
  private deduplicator = new RequestDeduplicator();

  constructor() {
    super();
    // Cleanup expired cache entries every 10 minutes
    setInterval(() => this.cache.cleanup(), 10 * 60 * 1000);
  }

  // Enhanced get method with caching and deduplication
  protected async cachedGet<T>(
    endpoint: string,
    params?: Record<string, any>,
    cacheTTL: number = 5 * 60 * 1000, // 5 minutes default
    enableCache: boolean = true
  ): Promise<T> {
    const cacheKey = `${endpoint}_${JSON.stringify(params || {})}`;

    // Check cache first
    if (enableCache && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Use request deduplication
    const result = await this.deduplicator.deduplicate(
      cacheKey,
      () => this.get<T>(endpoint, params)
    );

    // Cache the result
    if (enableCache) {
      this.cache.set(cacheKey, result, cacheTTL);
    }

    return result;
  }

  // Optimized pagination method
  async getPaginatedData<T>(
    endpoint: string,
    options: {
      page?: number;
      pageSize?: number;
      filters?: Record<string, any>;
      cacheTTL?: number;
      enableCache?: boolean;
    } = {}
  ): Promise<T> {
    const {
      page = 0,
      pageSize = 20, // Reduced from 100 to 20 for better performance
      filters = {},
      cacheTTL = 5 * 60 * 1000,
      enableCache = true,
    } = options;

    const params = {
      page,
      pageSize,
      ...filters,
    };

    return this.cachedGet<T>(endpoint, params, cacheTTL, enableCache);
  }

  // Method to invalidate cache for specific patterns
  invalidateCache(pattern?: string): void {
    if (pattern) {
      // Invalidate entries matching pattern
      for (const [key] of this.cache['cache'].entries()) {
        if (key.includes(pattern)) {
          this.cache['cache'].delete(key);
        }
      }
    } else {
      // Clear all cache
      this.cache.clear();
    }
  }

  // Batch request method for multiple endpoints
  async batchRequests<T>(
    requests: Array<{
      endpoint: string;
      params?: Record<string, any>;
      cacheTTL?: number;
    }>
  ): Promise<T[]> {
    return Promise.all(
      requests.map(({ endpoint, params, cacheTTL }) =>
        this.cachedGet<T>(endpoint, params, cacheTTL)
      )
    );
  }

  // Prefetch method for anticipated requests
  async prefetch(
    endpoint: string,
    params?: Record<string, any>,
    cacheTTL?: number
  ): Promise<void> {
    try {
      await this.cachedGet(endpoint, params, cacheTTL);
    } catch (error) {
      // Silently fail for prefetch requests
      console.warn('Prefetch failed:', endpoint, error);
    }
  }
}

// Singleton instance
export const optimizedApiService = new OptimizedApiService();