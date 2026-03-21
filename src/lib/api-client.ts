/**
 * Centralized HTTP client for Spring Boot API calls.
 * Uses credentials: 'include' so httpOnly cookies are sent cross-origin.
 *
 * Usage:
 *   import { apiClient } from '@/lib/api-client';
 *   const data = await apiClient.get<MyType>('/speaking/scenarios');
 *   await apiClient.post('/speaking/sessions', { scenarioId: '...' });
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

type RequestOptions = {
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const headers: Record<string, string> = {
      ...options?.headers,
    };

    // Only set Content-Type for JSON bodies (not FormData)
    if (body && !(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
      credentials: 'include', // Send httpOnly cookies cross-origin
      signal: options?.signal,
    });

    // Handle 401 — skip refresh for auth endpoints (they use 401 for bad credentials)
    const isAuthEndpoint = path.startsWith('/auth/');
    if (response.status === 401 && !isAuthEndpoint) {
      const refreshed = await this.tryRefresh();
      if (refreshed) {
        // Retry the original request
        const retryResponse = await fetch(url, {
          method,
          headers,
          body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
          credentials: 'include',
          signal: options?.signal,
        });

        if (!retryResponse.ok) {
          throw new ApiError(retryResponse.status, await retryResponse.text());
        }
        const retryContentType = retryResponse.headers.get('content-type');
        if (!retryContentType || !retryContentType.includes('application/json')) {
          return {} as T;
        }
        return retryResponse.json();
      }

      // Refresh failed — let the caller handle it (AuthContext, ProtectedRoute, etc.)
      throw new ApiError(401, 'Session expired');
    }

    if (!response.ok) {
      let errorBody: string;
      try {
        errorBody = await response.text();
      } catch {
        errorBody = response.statusText;
      }
      throw new ApiError(response.status, errorBody);
    }

    // Handle empty responses (204 No Content, etc.)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return {} as T;
    }

    return response.json();
  }

  /**
   * Attempt to refresh the access token using the refresh_token cookie.
   * Returns true if refresh succeeded.
   */
  private async tryRefresh(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', path, undefined, options);
  }

  async post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('POST', path, body, options);
  }

  async put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('PUT', path, body, options);
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', path, undefined, options);
  }

  async patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('PATCH', path, body, options);
  }

  /**
   * Upload file(s) via FormData.
   */
  async upload<T>(path: string, formData: FormData, options?: RequestOptions): Promise<T> {
    return this.request<T>('POST', path, formData, options);
  }
}

export class ApiError extends Error {
  status: number;
  body: string;

  constructor(status: number, body: string) {
    super(`API Error ${status}: ${body}`);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
