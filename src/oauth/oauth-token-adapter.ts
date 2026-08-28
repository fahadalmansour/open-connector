import type { OAuthClientConfig } from "./oauth-client-config-service.ts";

/** Normalized provider token data returned to the shared OAuth lifecycle. */
export interface OAuthTokenResult {
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
  expiresAt?: string;
  metadata: Record<string, unknown>;
}

export interface OAuthCodeExchangeInput {
  code: string;
  clientConfig: OAuthClientConfig;
  redirectUri: string;
  tokenUrl: string;
  fetcher: typeof fetch;
  signal?: AbortSignal;
  createError(message: string): Error;
}

export interface OAuthAccessTokenRefreshInput {
  refreshToken: string;
  clientConfig: OAuthClientConfig;
  fetcher: typeof fetch;
  signal?: AbortSignal;
  createError(message: string): Error;
}

/** Provider-local token protocol hooks for OAuth flows that are not standard authorization-code OAuth. */
export interface OAuthTokenAdapter {
  exchangeCode?(input: OAuthCodeExchangeInput): Promise<OAuthTokenResult>;
  refreshAccessToken?(input: OAuthAccessTokenRefreshInput): Promise<OAuthTokenResult>;
}

/** Lazy loader seam used by shared OAuth orchestration without importing provider runtimes eagerly. */
export interface OAuthTokenAdapterLoader {
  loadOAuthTokenAdapter?(service: string): Promise<OAuthTokenAdapter | undefined>;
}
