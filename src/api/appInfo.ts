import { version as reactVersion } from 'react';
import type { AppInfo } from '../types';

const ROUTER_VERSION_FALLBACK = '6';

/**
 * Endpoint served by the ASP.NET host. It is optional: when it is not
 * available the client falls back to the versions bundled into the build.
 */
const APP_INFO_ENDPOINT = 'api/appinfo';

interface AppInfoResponse {
  environment?: string;
  routerVersion?: string;
}

function localAppInfo(): AppInfo {
  return {
    reactVersion,
    routerVersion: ROUTER_VERSION_FALLBACK,
    environment: import.meta.env.MODE,
  };
}

export async function fetchAppInfo(signal?: AbortSignal): Promise<AppInfo> {
  const local = localAppInfo();

  try {
    const response = await fetch(APP_INFO_ENDPOINT, {
      headers: { Accept: 'application/json' },
      signal,
    });

    if (!response.ok) {
      return local;
    }

    const payload = (await response.json()) as AppInfoResponse;

    return {
      reactVersion: local.reactVersion,
      routerVersion: payload.routerVersion ?? local.routerVersion,
      environment: payload.environment ?? local.environment,
    };
  } catch {
    return local;
  }
}
